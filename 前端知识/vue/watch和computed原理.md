- https://juejin.cn/post/6897934019942744077
- https://juejin.cn/post/6974293549135167495#heading-22
# 一、vue构造函数 #

		import { initMixin } from './init'
		import { stateMixin } from './state'
		import { renderMixin } from './render'
		import { eventsMixin } from './events'
		import { lifecycleMixin } from './lifecycle'
		
		function Vue(options) {
		  ...
		  this._init(options)
		}
		
		initMixin(Vue)       //定义_init方法。
		stateMixin(Vue)     //定义数据相关的方法$set,$delete,$watch方法。
		eventsMixin(Vue)    //定义事件相关的方法$on，$once，$off，$emit。
		lifecycleMixin(Vue) //定义_update，及生命周期相关的$forceUpdate和$destroy。
		renderMixin(Vue)    //定义$nextTick，_render将render函数转为vnode。


# 二、computed 的初始化部分 #

		export function initMixin(Vue) {
		  Vue.prototype._init = function(options) {
		    ...当执行new Vue时，进行一系列初始化并挂载
		  }
		}


- computed 的初始化发生在 Vue 实例化（源码：https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue%2Fblob%2Fv2.5.21%2Fsrc%2Fcore%2Finstance%2Finit.js）时执行的 initState 方法.

   

       // vue/src/core/instance/init.js
       	...
       export function initMixin (Vue: Class<Component>) {
        Vue.prototype._init = function (options?: Object) {
            const vm: Component = this
           ...
           initLifecycle(vm)
           initEvents(vm)
           initRender(vm)
           callHook(vm, 'beforeCreate')
           initInjections(vm)
           initState(vm) // 初始化 state，包括 data/props/computed/methods/watch
           initProvide(vm)
           callHook(vm, 'created')
           ...
         }
       }
       ...

- 接下来再看一下 initState（源码：https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue%2Fblob%2Fv2.5.21%2Fsrc%2Fcore%2Finstance%2Fstate.js）做了什么：

		```
	// vue/src/core/instance/state.js
		...
		export function initState (vm: Component) {
		  vm._watchers = []
		  const opts = vm.$options
		  if (opts.props) initProps(vm, opts.props)
		  if (opts.methods) initMethods(vm, opts.methods)
		  if (opts.data) {
		    initData(vm)
		  } else {
		    observe(vm._data = {}, true /* asRootData */)
		  }
		  if (opts.computed) initComputed(vm, opts.computed) // 初始化 computed，并传入 vm 实例和用户自定义 computed 对象
		  if (opts.watch && opts.watch !== nativeWatch) {
		    initWatch(vm, opts.watch)
		  }
		}
		...
	```
	
	


- 从源码中可以看到，initState 里面执行了一些状态(data/props/methods/computed/watch)相关的初始化操作，然后我们找到 initComputed(源码位置同 initState)，再去看看 computed 的初始化都做了什么。

- 先看下computed的使用：

   

       <body>
           <div id="app" style="color:red;background:green">{{fullName}}</div>
           <script src="./dist/vue.js"></script>
           <script>
               const vm=new Vue({
                   el:'#app',
                   data:{
                       firstName:'zhang',
                       lastName:'san'
                   },
                   computed:{
                       //函数
                       fullName(){
                           console.log('get')
                           return this.firstName+this.lastName;
                       }
                     //对象
       
                       fullName:{
                          get(){
                               console.log('get')
                              return this.firstName+this.lastName;
                           },
                          set(newVal){
                             console.log('set',newVal)
                          }
                       }
                     }
                })
                
           setTimeout(() => {
               vm.firstName='li'
           }, 2000);
           
       </script>
       </body>

- Computed实现

		
		
	
		// vue/src/core/instance/state.js
			...
		const computedWatcherOptions = { lazy: true } // computedWatcher 的配置对象
   	function initComputed (vm: Component, computed: Object) {
		 
		   // 声明一个watchers且同时挂载到vm实例上
   	  const watchers = vm._computedWatchers = Object.create(null)
		 
		   // 在SSR模式下computed属性只能触发getter方法
   	  const isSSR = isServerRendering()
		
   	   // 遍历computed
		  for (const key in computed) {
		     // 取出computed对象中的每个方法并赋值给userDef
		    const userDef = computed[key]
		    const getter = typeof userDef === 'function' ? userDef : userDef.get
		    if (process.env.NODE_ENV !== 'production' && getter == null) {
		      warn(
		        `Getter is missing for computed property "${key}".`,
		        vm
		      )
   	    }
		
		     // 如果不是SSR服务端渲染，则创建一个watcher实例
		    if (!isSSR) {
		      // create internal watcher for the computed property.
		      watchers[key] = new Watcher(
		        vm,
		        getter || noop,
		        noop,
		        computedWatcherOptions
		      )
		    }
	
   
	​	    
		    if (!(key in vm)) {
   	        // 如果computed中的key没有设置到vm中，通过defineComputed函数挂载上去 
		      defineComputed(vm, key, userDef)
		    } else if (process.env.NODE_ENV !== 'production') {
		        // 如果data和props有和computed中的key重名的，会产生warning
		      if (key in vm.$data) {
		        warn(`The computed property "${key}" is already defined in data.`, vm)
		      } else if (vm.$options.props && key in vm.$options.props) {
		        warn(`The computed property "${key}" is already defined as a prop.`, vm)
		      }
		    }
		  }
		}
		...


- Watcher

	
		import { pushTarget, popTarget } from './Dep'
		
		class Watcher {
		  constructor(vm, exprOrFn, cb, options) {
		    this.vm = vm
		    if (typeof exprOrFn === 'function') {
		      this.getter = exprOrFn
		    }
		    if (options) {
		      this.lazy = !!options.lazy // 为computed 设计的
		    } else {
		      this.lazy = false
		    }
		    this.dirty = this.lazy
		    this.options = options
		    this.id = wId++
		    this.deps = []
		    this.cb = cb
		    this.depsId = new Set() // dep 已经收集过相同的watcher 就不要重复收集了
		    this.value = this.lazy ? undefined : this.get()
		  }
		  get() {
		    const vm = this.vm
		    pushTarget(this)
		    // 执行函数
		    let value = this.getter.call(vm, vm)
		    popTarget()
		    return value
		  }
		  addDep(dep) {
		    let id = dep.id
		    if (!this.depsId.has(id)) {
		      this.depsId.add(id)
		      this.deps.push(dep)
		      dep.addSub(this);
		    }
		  }
		  update(){
		    if (this.lazy) {
		      this.dirty = true
		    } else {
		      this.get()
		    }
		  }
		  // 执行get，并且 this.dirty = false
		  evaluate() {
		    this.value = this.get()
		    this.dirty = false
		  }
		  // 所有的属性收集当前的watcer
		  depend() {
		    let i = this.deps.length
		    while(i--) {
		      this.deps[i].depend()
		    }
		  }
		}



- 从上面这句this.value = this.lazy ? undefined : this.get()代码可以看到，computed创建watcher的时候是不会指向this.get的。只有在render函数里面有才执行。render的时候，读取页面上的变量会触发get,现在render函数还不能读取到值，因为我们还没有挂载到vm上面，上面defineComputed(vm, key, userDef)这个函数功能就是让computed挂载到vm上面。下面我们实现一下。


		function defineComputed(vm, key, userDef) {
		  let getter = null
		  // 判断是函数还是对象
		  if (typeof userDef === 'function') {
		    getter = createComputedGetter(key)
		  } else {
		    getter = userDef.get
		  }
		  Object.defineProperty(vm, key, {
		    enumerable: true,
		    configurable: true,
		    get: getter,
		    set: function() {} // 又偷懒，先不考虑set情况哈，自己去看源码实现一番也是可以的
		  })
		}
		// 创建computed函数
		function createComputedGetter(key) {
		  return function computedGetter() {
		    const watcher = this._computedWatchers[key]
		    if (watcher) {
		      if (watcher.dirty) {// 给computed的属性添加订阅watchers
		        watcher.evaluate()
		      }
		      // 把渲染watcher 添加到属性的订阅里面去，这很关键
		      if (Dep.target) {
		        watcher.depend()
		      }
		      return watcher.value
		    }
		  }
		}

- 从 watcher 源码里看到，dirty 属性默认是 true，所以当计算属性第一次被访问时，先执行了一次 evaluate 方法，方法内会执行 get 方法，并将 get 方法得到的值保存到 value 属性中，最后修改 dirty 的值为 false。
- 到这里我们就说到计算属性的第一个特性了 - 缓存值。试想一下，如果没有其他的地方修改 dirty 属性的值，那么是不是就意味着，当一个计算属性被访问一次之后，再访问该计算属性时，它的 watcher.dirty 都是 false，也就意味着 evaluate 不再执行，也就不会去重新求值，那么在计算属性 getter 函数的最后返回的 watcher.value 也就是之前保存的结果。就这样一个缓存特性就实现了。

- 我们紧接着先看一下计算属性的值是怎么计算的。上 get 方法

       get() {
	        const vm = this.vm
	        pushTarget(this)
	        // 执行函数
	        let value = this.getter.call(vm, vm)
	        popTarget()
	        return value
	      }


// Dep.js(源码：https://github.com/vuejs/vue/blob/v2.5.21/src/core/observer/dep.js#L58)
		const targetStack = []
		
		export function pushTarget (target: ?Watcher) {
		  targetStack.push(target)
		  Dep.target = target
		}
		
		export function popTarget () {
		  targetStack.pop()
		  Dep.target = targetStack[targetStack.length - 1]
		}

- get 方法主要是用来求值的，当 get 方法执行的时候，先把当前的 watcher 压入到活动的 watcher 栈（源码位置）里，然后执行 watcher 实例创建时传入的 getter 方法，取得计算属性的结果。那么在执行 getter 方法时，会访问到计算属性中依赖的 data，触发 data 的依赖收集，将计算属性的 watcher 保存到自己的 dep.subs 里，计算属性的 watcher成为了该data属性的一个依赖，当该属性变化时就会通知该watcher属性。到这里计算属性依赖 data 的特性也就实现了。由下面代码可以看出来。

		defineReactive(obj,key,value) {
		  
		      // 如果是对象类型的 也调用walk 变成响应式，不是对象类型的直接在walk会被return
		      this.walk(value)
		      // 保存一下 this
		      let self = this
		     // 创建 Dep 对象
		      let dep = new Dep()
		      Object.defineProperty(obj,key,{
		        enumerable:true,
		        configurable:true,
		  
		        get:() => {
		          // 在这里添加观察者对象 Dep.target 表示观察者
		          if(Dep.target){
		            dep.addSub(Dep.target)
		          }
		          return value
		        },
		  
		        set:newVal => {
		           if(value === newVal){
		             return
		           }
		           
		           // 赋值的话如果是newValue是对象，对象里面的属性也应该设置为响应式的
		           self.walk(newVal)
		            // 触发通知 更新视图
		           dep.notify()
		        }
		      })
		    }
		  } 

- 当 getter 执行完之后，把当前的计算属性 watcher 弹出活动的 watcher 栈，同时通过修改 Dep.target 为当前栈里的第一个 watcher。最后返回取到的计算属性结果。
- 现在我们再回到上边计算属性的 getter 函数，，watcher.evaluate()执行完毕之后，就会判断Dep.target 是不是true，如果有就代表还有渲染watcher，就执行watcher.depend()，然后让watcher里面的deps都收集渲染watcher，这就是双向保存的优势。
- 比如说name收集了computed watcher 和 渲染watcher。那么设置name的时候都会去更新执行watcher.update()，在watcher.update()里如果this.lazy为true，也就是该属性为计算属性，执行this.dirty = true，因为name改变了，则计算属性也改变了会触发计算属性的setter，则因为this.dirty为true，所以会执行watcher.evaluate()重新计算值

      update(){
	        if (this.lazy) {
	          this.dirty = true
	        } else {
	          this.get()
	        }
	  }

