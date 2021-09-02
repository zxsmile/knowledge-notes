#### 一、浏览器事件循环 ####

- js分为同步任务和异步任务，同步任务都在主线程上执行形成一个执行栈，主线程之外存在一个回调队列
- 同步任务在执行的时候会调用浏览器的API，此时会产生一些异步任务
- 异步任务会在有了结果（比如被监听的事件发生时）后，将异步任务以及关联的回调函数放入回调队列中。
- 一旦执行栈中的所有同步任务执行完毕(此时js引擎空闲)，系统就会读取任务列队，将可运行的异步任务添加到可执行栈，开始执行
- 上述过程会不断重复，这就是 JavaScript 的运行机制，称为事件循环机制（Event Loop）。

- 回调队列可分为宏任务和微任务

#### 二、node事件循环 ####

1. 阶段概述

   - 定时器检测阶段(timers)：本阶段执行 timer 的回调，即 setTimeout、setInterval 里面的回调函数。
   - I/O事件回调阶段(I/O callbacks)：执行延迟到下一个循环迭代的 I/O 回调，即上一轮循环中未被执行的一些I/O回调。比如网络通信的错误回调
   - 闲置阶段(idle, prepare)：仅系统内部使用。
   - 轮询阶段(poll)：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和 setImmediate() 调度的之外），其余情况 node 将在适当的时候在此阻塞。
   - 检查阶段(check)：setImmediate() 回调函数在这里执行
   - 关闭事件回调阶段(close callback)：一些关闭的回调函数，如：socket.on('close', ...)。


- 输入数据阶段(incoming data)->轮询阶段(poll)->检查阶段(check)->关闭事件回调阶段(close callback)->定时器检测阶段(timers)->I/O事件回调阶段(I/O callbacks)->闲置阶段(idle, prepare)->轮询阶段...
- 通常情况下，当事件循环进入给定的阶段时，它将执行特定于该阶段的任何操作，然后执行该阶段队列中的回调，**直到队列用尽或最大回调数已执行**。当该队列已用尽或达到回调限制，执行该阶段产生的微任务，然后事件循环移动到下一阶段。【node11版本之前】

2. 三大重点阶段

- （1）timer

      - timers 阶段会执行 setTimeout 和 setInterval 回调，并且是由 poll 阶段控制的。 同样，在 Node 中定时器指定的时间也不是准确时间，只能是尽快执行。

- （2）poll

   ![](./images/node事件循环.jpg)

      - 进入poll阶段会先去看当前是否存在到时间的定时器，如果存在则进入timer阶段执行timer队列
      - 如果没有定时器, 会去看回调函数队列。

         - 如果 poll 队列不为空，会遍历回调队列并同步执行，直到队列为空或者达到系统限制
         - 如果 poll 队列为空时，会有两件事发生

           - 如果有 setImmediate 回调需要执行，poll 阶段会停止并且进入到 check 阶段执行回调
           - 如果没有 setImmediate 回调需要执行，会等待回调被加入到队列中并立即执行回调，这里同样会有个超时时间设置防止一直等待下去,一段时间后自动进入 check 阶段。

- （3）check 

      - check阶段。这是一个比较简单的阶段，直接执行 setImmdiate 的回调。

3. process.nextTick

- process.nextTick 是一个独立于 eventLoop 的任务队列。
- 在每一个 eventLoop 阶段完成后会去检查 nextTick 队列，如果里面有任务，会让这部分任务优先于微任务执行。

		setImmediate(() => {
		    console.log('timeout1')
		    Promise.resolve().then(() => console.log('promise resolve'))
		    process.nextTick(() => console.log('next tick1'))
		});
		setImmediate(() => {
		    console.log('timeout2')
		    process.nextTick(() => console.log('next tick2'))
		});
		setImmediate(() => console.log('timeout3'));
		setImmediate(() => console.log('timeout4'));


    - 在 node11 之前，因为每一个 eventLoop 阶段完成后会去检查 nextTick 队列，如果里面有任务，会让这部分任务优先于微任务执行，因此上述代码是先进入 check 阶段，执行所有 setImmediate，完成之后执行 nextTick 队列，最后执行微任务队列，因此输出为timeout1=>timeout2=>timeout3=>timeout4=>next tick1=>next tick2=>promise resolve
    - 在 node11 之后，process.nextTick 是微任务的一种,因此上述代码是先进入 check 阶段，执行一个 setImmediate 宏任务，然后执行其微任务队列，再执行下一个宏任务及其微任务,因此输出为timeout1=>next tick1=>promise resolve=>timeout2=>next tick2=>timeout3=>timeout

4. node版本差异

    - node11版本之前：当事件循环进入给定的阶段时，它将执行特定于该阶段的任何操作，然后执行该阶段队列中的回调，**直到队列用尽或最大回调数已执行**。当该队列已用尽或达到回调限制，执行该阶段产生的微任务，然后事件循环移动到下一阶段。
    - node11版本之后：一旦执行一个阶段里的一个宏任务(setTimeout,setInterval和setImmediate)就立刻执行对应的微任务队列

		setTimeout(()=>{
		    console.log('timer1')
		    Promise.resolve().then(function() {
		        console.log('promise1')
		    })
		}, 0)
		setTimeout(()=>{
		    console.log('timer2')
		    Promise.resolve().then(function() {
		        console.log('promise2')
		    })
		}, 0)
		
		
        - 如果是 node11 版本一旦执行一个阶段里的一个宏任务(setTimeout,setInterval和setImmediate)就立刻执行微任务队列，这就跟浏览器端运行一致，最后的结果为timer1=>promise1=>timer2=>promise2
        - 如果是 node10 及其之前版本要看第一个定时器执行完，第二个定时器是否在完成队列中.
        
           - 如果是第二个定时器还未在完成队列中，最后的结果为timer1=>promise1=>timer2=>promise2
           - 如果是第二个定时器已经在完成队列中，则最后的结果为timer1=>timer2=>promise1=>promise2

