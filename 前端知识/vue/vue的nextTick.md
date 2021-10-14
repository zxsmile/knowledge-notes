#### 一、vue异步更新DOM策略 ####

- 为什么vue更新dom采用的是异步更新呢？

	   例：<template>
		  <div>
		    <div>{{test}}</div>
		  </div>
		</template>

		export default {
		    data () {
		        return {
		            test: 0
		        };
		    },
		    mounted () {
		      for(let i = 0; i < 1000; i++) {
		        this.test++;
		      }
		    }
		}
		
- 上面的例子中，mounted的时候test的值会被++循环执行1000次。 每次++时，都会根据响应式触发setter->Dep->Watcher->update->patch。 如果这时候没有异步更新视图，那么每次++都会直接操作DOM更新视图，这是非常消耗性能的。 所以Vue.js实现了一个queue队列，在下一个tick的时候会统一执行queue中Watcher的run。同时，拥有相同id的Watcher不会被重复加入到该queue中去，所以不会执行1000次Watcher的run。最终更新视图只会直接将test对应的DOM的0变成1000。 保证更新视图操作DOM的动作是在当前栈执行完以后下一个tick的时候调用，大大优化了性能。


#### 二、watcher队列 ####

- 我们看下Vue.js源码的Watch实现。当某个响应式数据发生变化的时候，它的setter函数会通知闭包中的Dep，Dep则会调用它管理的所有Watch对象。触发Watch对象的update实现。我们来看一下update的实现。

		update () {
		    /* istanbul ignore else */
		    if (this.lazy) {
		        this.dirty = true
		    } else if (this.sync) {
		        /*同步则执行run直接渲染视图*/
		        this.run()
		    } else {
		        /*异步推送到观察者队列中，下一个tick时调用。*/
		        queueWatcher(this)
		    }
		}

- Vue.js默认是使用异步执行DOM更新。 当异步执行update的时候，会调用queueWatcher函数。

		 /*将一个观察者对象push进观察者队列，在队列中已经存在相同的id则该观察者对象将被跳过，除非它是在队列被刷新时推送*/
		export function queueWatcher (watcher: Watcher) {
		  /*获取watcher的id*/
		  const id = watcher.id
		  /*检验id是否存在，已经存在则直接跳过，不存在则标记哈希表has，用于下次检验*/
		  if (has[id] == null) {
		    has[id] = true
		    if (!flushing) {
		      /*如果没有flush掉，直接push到队列中即可*/
		      queue.push(watcher)
		    } else {

		      let i = queue.length - 1
		      while (i >= 0 && queue[i].id > watcher.id) {
		        i--
		      }

              //找到该watcher的位置，将新的watcher替换进去
		      queue.splice(Math.max(i, index) + 1, 0, watcher)
		    }

		    // queue the flush
		    if (!waiting) {
		      waiting = true
		      nextTick(flushSchedulerQueue)
		    }
		  }
		}

- 从queueWatcher代码中看出Watch对象并不是立即更新视图，而是被push进了一个队列queue，此时状态处于waiting的状态，这时候会继续会有Watch对象被push进这个队列queue，等到下一个tick运行时将这个队列queue全部拿出来run一遍，这些Watch对象才会被遍历取出，更新视图。同时，id重复的Watcher不会被多次加入到queue中去。这也解释了同一个watcher被多次触发，只会被推入到队列中一次。

#### 三、nextTick ####

nextTick的实现比较简单，它接受2个参数（回调函数和执行回调函数的上下文环境），如果没有提供回调函数，那么将返回promise对象。执行的目的是在microtask或者task中推入一个function，在当前栈执行完毕（也许还会有一些排在前面的需要执行的任务）以后执行nextTick传入的function，看一下源码：'


 
    - 延迟一个任务使其异步执行，在下一个tick时执行，一个立即执行函数，返回一个queueNextTick函数，该函数接受回调函数和执行回调函数的上下文环境
    - 在立即执行nextTick函数的时候，会定义一个timerFunc函数，这个函数是表示了用那个方式（Promise、MutationObserver、setTimeout）执行nextTick队列的回调函数
    - 在当前调用栈执行完以后，执行timerFunc
    
			export const nextTick = (function () {
			  /*存放异步执行的回调*/
			  const callbacks = []
			  /*一个标记位，如果已经有timerFunc被推送到任务队列中去则不需要重复推送*/
			  let pending = false
			  /*一个函数指针，指向函数将被推送到任务队列中，等到主线程任务执行完时，任务队列中的timerFunc被调用*/
			  let timerFunc
			
			  /*下一个tick时的回调*/
			  function nextTickHandler () {
			    /*一个标记位，标记等待状态（即函数已经被推入任务队列或者主线程，已经在等待当前栈执行完毕去执行），这样就不需要在push多个回调到callbacks时将timerFunc多次推入任务队列或者主线程*/
			    pending = false
			    /*执行所有callback*/
			    const copies = callbacks.slice(0)
			    callbacks.length = 0
			    for (let i = 0; i < copies.length; i++) {
			      copies[i]()
			    }
			  }
			
			  
			  /*
			    这里解释一下，一共有Promise、MutationObserver以及setTimeout三种尝试得到timerFunc的方法
			    优先使用Promise，在Promise不存在的情况下使用MutationObserver，这两个方法都会在microtask中执行，会比setTimeout更早执行，所以优先使用。
			    如果上述两种方法都不支持的环境则会使用setTimeout，在task尾部推入这个函数，等待调用执行。
			    参考：https://www.zhihu.com/question/55364497
			  */
			  if (typeof Promise !== 'undefined' && isNative(Promise)) {

			    /*使用Promise*/
			    var p = Promise.resolve()
			    var logError = err => { console.error(err) }
			    timerFunc = () => {
			      p.then(nextTickHandler).catch(logError)
			      if (isIOS) setTimeout(noop)
			    }

                 /*使用MutationObserver*/
			  } else if (typeof MutationObserver !== 'undefined' && (
			    isNative(MutationObserver) ||
			    // PhantomJS and iOS 7.x
			    MutationObserver.toString() === '[object MutationObserverConstructor]'
			  )) {
			    
			    /*新建一个textNode的DOM对象，用MutationObserver绑定该DOM并指定回调函数，在DOM变化的时候则会触发回调,该回调会进入主线程（比任务队列优先执行），即textNode.data = String(counter)时便会触发回调*/
			    var counter = 1
			    var observer = new MutationObserver(nextTickHandler)
			    var textNode = document.createTextNode(String(counter))
			    observer.observe(textNode, {
			      characterData: true
			    })
			    timerFunc = () => {
			      counter = (counter + 1) % 2
			      textNode.data = String(counter)
			    }

               /*使用setTimeout*/
			  } else

			    /*使用setTimeout将回调推入任务队列尾部*/
			    timerFunc = () => {
			      setTimeout(nextTickHandler, 0)
			    }
			  }
			
			  /*
			    推送到队列中下一个tick时执行
			    cb 回调函数
			    ctx 上下文
			  */
			  return function queueNextTick (cb?: Function, ctx?: Object) {
			    let _resolve
			    /*cb存到callbacks中*/
			    callbacks.push(() => {
			      if (cb) {
			        try {
			          cb.call(ctx)
			        } catch (e) {
			          handleError(e, ctx, 'nextTick')
			        }
			      } else if (_resolve) {
			        _resolve(ctx)
			      }
			    })
			    if (!pending) {
			      pending = true
			      timerFunc()
			    }
			    if (!cb && typeof Promise !== 'undefined') {
			      return new Promise((resolve, reject) => {
			        _resolve = resolve
			      })
			    }
			  }
			})()


- 从上面的介绍，可以得知timeFunc()一共有三种实现方式。

  - Promise
  - MutationObserver
  - setTimeout

- 系统中会优先用Promise，在Promise不存在的情况下使用MutationObserver，这两个方法都会在microtask中执行，会比setTimeout更早执行，所以优先使用。
- 在主线程上，如果再遇到macrotask，就把它放到macrotask任务队列末尾，由于一次event loop只能取一个macrotask，所以遇到的宏任务就需要等待其它轮次的事件循环了；如果遇到microtask，则放到本次循环的microtask队列中去。这样就能明白为什么microtask会比macrotask先处理了。这也是nextTick总是要比setTimeout先要执行。

- 下面着重介绍一下MutationObserver。
	
	- MutationObserver是HTML5中的新API，是个用来监视DOM变动的接口。他能监听一个DOM对象上发生的子节点删除、属性修改、文本内容修改等等。
	- 调用过程很简单，但是有点不太寻常：你需要先给他绑回调：
	
    	var mo = new MutationObserver(callback)
	
    - 通过给MutationObserver的构造函数传入一个回调，能得到一个MutationObserver实例，这个回调就会在MutationObserver实例监听到变动时触发。
	- 这个时候你只是给MutationObserver实例绑定好了回调，他具体监听哪个DOM、监听节点删除还是监听属性修改，还没有设置。而调用他的observer方法就可以完成这一步:
		
        var domTarget = 你想要监听的dom节点
		mo.observe(domTarget, {
		      characterData: true //说明监听文本内容的修改。
		})

#### 四、总结 ####

1. nextTick是Vue提供的一个全局API由于vue的异步更新策略导致我们对数据的修改不会立刻体现在dom变化上，此时如果想要立即获取更新后的dom状态，就需要使用这个方法
2. Vue在更新DOM时是异步执行的。只要侦听到数据变化，Vue将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个watcher被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和DOM操作是非常重要的。nextTick方法会在队列中加入一个回调函数，确保该函数在前面的dom操作完成后才调用。
3. 所以当我们想在修改数据后立即看到dom执行结果就需要用到nextTick方法。
4. 比如，我在干什么的时候就会使用nextTick传一个回调函数进去，在里面执行dom操作即可。
5. 我也有简单了解nextTick实现，它会在callbacks里面加入我们传入的函数然后用timerFunc异步方式调用它们，首选的异步方式会是Promise。这让我明白了为什么可以在nextTick中看到dom操作结果。