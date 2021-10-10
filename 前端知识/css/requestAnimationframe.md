#### 一、前言 ####

- 实现动画效果的方法比较多，Javascript 中可以通过定时器 setTimeout 来实现，CSS3 中可以使用 transition 和 animation 来实现，HTML5 中的 canvas 也可以实现。除此之外，HTML5 提供一个专门用于请求动画的API，那就是 requestAnimationFrame，顾名思义就是请求动画帧。

#### 二、window.requestAnimationFrame()是什么？ ####

- 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。
- 我们先初步认识一下它，根据文档。我们给它传递一个回调函数 test 。

		   let test = document.querySelector('#test')
		   let i=100
		   function animation(){
		     test.style.marginLeft = i+'px'
		   }
		
		   window.requestAnimationFrame(animation)

           可以看到，div向右移动了100px

- 但是它只执行了一次，怎么做动画呢？别急，再看看 MDN 怎么说。
- 注意：若你想在浏览器下次重绘之前继续更新下一帧动画，那么回调函数自身必须再次调用window.requestAnimationFrame()

		   let test = document.querySelector('#test')
		   let i=0
		   function animation(){

		     test.style.marginLeft = i+'px'
		     i++
		     window.requestAnimationFrame(animation)
		   }
		
		   window.requestAnimationFrame(animation)

           这个div会一直移动下去

#### 三、执行频率 ####

- 这时候有小伙伴就要问了，我没有像 setTimeout 和 setInterval 那样设置时间，它为什么会间隔执行呢？
- 它根本就不用手动设置执行间隔时间，而是根据浏览器屏幕刷新次数自动调整了,也就是说浏览器屏幕刷新多少次，它就执行多少次。
- 屏幕刷新频率（次数）： 屏幕每秒出现图像的次数。普通笔记本为60Hz，也就是 1s 大约执行 60 次，然后每执行一次大约是 16.6ms。

#### 四、回调参数 ####

- 回调函数会有一个参数指示当前被 requestAnimationFrame() 排序的回调函数被触发的时间。

		   let test = document.querySelector('#test')
		   let i=0
		   function animation(time){
		     if(i>300){
		       return
		     }
		     console.log(time)
		     test.style.marginLeft = i+'px'
		     i++
		     window.requestAnimationFrame(animation)
		   }
		
		   window.requestAnimationFrame(animation)

- 在同一个帧中的 多个回调函数 ，它们每一个都会接受到一个 相同的时间戳

		(() => {
		  function test1(timestamp) {
		    console.log(`🚀🚀hello ~ requestAnimationFrame1 ${timestamp}`);
		    requestAnimationFrame(test1)
		  }
		  function test2(timestamp) {
		    console.log(`🚀🚀hello ~ requestAnimationFrame2 ${timestamp}`);
		    requestAnimationFrame(test2)
		  }
		  requestAnimationFrame(test1)
		  requestAnimationFrame(test2)
		
		})()

- 可以看到，两个 requestAnimationFrame 在控制台输出的时间戳是一样的。也就是浏览器刷新一次的时候，执行所有的 requestAnimationFrame ，并且它们的回调参数是一模一样的。

#### 五、浏览器的自我拯救 ####

- 为了提高性能和电池寿命，因此在大多数浏览器里，当requestAnimationFrame() 运行在后台标签页或者隐藏的<iframe> 里时，requestAnimationFrame() 会被暂停调用以提升性能和电池寿命。
- 这个就厉害了，你要是当时没有浏览页面，并且也没关掉，那么 requestAnimationFrame() 一直在这跑，多消耗性能啊。

		   let test = document.querySelector('#test')
		   let i=0
		   function animation(){
		     if(i>300){
		       return
		     }
		     test.style.marginLeft = i+'px'
		     console.log(i)
		     i++
		     window.requestAnimationFrame(animation)
		   }
		
		   window.requestAnimationFrame(animation)


- 可以看到，控制台打印i，我切到另一个页面，几秒钟后我切回来的时候，依然是接着刚才的位置进行输出。

#### 六、返回值 ####

- requestAnimationFrame 会返回一个请求 ID，是回调函数列表中的一个唯一值，可以使用 cancelAnimationFrame 通过传入该请求 ID 取消回调函数。

		   let test = document.querySelector('#test')
		   let i=0
		   let requestId = null
		   function animation(){
		     test.style.marginLeft = i+'px'
		     console.log(i)
		     i++
		     requestId = window.requestAnimationFrame(animation)
		     if(i>300){
		      cancelAnimationFrame(requestId);
		     }
		   }
		
		   animation()

#### 七、优势 ####

- requestAnimationFrame采用系统时间间隔，保持最佳绘制效率。不会因为间隔时间过短，造成过度绘制，增加开销；也不会因为间隔时间过长，使动画卡顿。
- 从实现的功能和使用方法上，requestAnimationFrame与定时器setTimeout都相似，所以说其优势是同setTimeout实现的动画相比。

1. 提升性能，防止掉帧

- 浏览器 UI 线程：浏览器让执行 JavaScript 和更新用户界面（包括重绘和回流）共用同一个单线程，称为“浏览器 UI 线程”
- 浏览器 UI 线程的工作基于一个简单的队列系统，任务会被保存到队列中直到进程空闲。一旦空闲，队列中的下一个任务就被重新提取出来并运行。这些任务要么是运行 JavaScript 代码，要么执行 UI 更新。

- 通过setTimeout实现动画

   - setTimeout通过设置一个间隔时间不断改变图像，达到动画效果。该方法在一些低端机上会出现卡顿、抖动现象。这种现象一般有两个原因：
     - setTimeout的执行时间并不是确定的。

        - 在 JavaScript 中，setTimeout任务被放进异步队列中，只有当主线程上的任务执行完以后，才会去检查该队列的任务是否需要开始执行。所以，setTimeout的实际执行时间一般比其设定的时间晚一些。这种运行机制决定了时间间隔参数实际上只是指定了把动画代码添加到【浏览器 UI 线程队列】中以等待执行的时间。如果队列前面已经加入了其他任务，那动画代码就要等前面的任务完成后再执行
        
			let startTime = performance.now();
			setTimeout(() => {
			  let endTime = performance.now();
			  console.log(endTime - startTime);
			}, 50);
			/* 一个非常耗时的任务 */
			for (let i = 0; i < 20000; i++) {
			  console.log(0);
			}




 - 刷新频率受屏幕分辨率和屏幕尺寸影响，不同设备的屏幕刷新率可能不同，setTimeout只能设置固定的时间间隔，这个时间和屏幕刷新间隔可能不同
 - 以上两种情况都会导致setTimeout的执行步调和屏幕的刷新步调不一致，从而引起丢帧现象。
 - setTimeout的执行只是在内存中对图像属性进行改变，这个改变必须要等到下次浏览器重绘时才会被更新到屏幕上。如果和屏幕刷新步调不一致，就可能导致中间某些帧的操作被跨越过去，直接更新下下一帧的图像。
   
    - 假如使用定时器设置间隔 10ms 执行一个帧，而浏览器刷新间隔是 16.6ms（即 60FPS）
    - 在 20ms 时，setTimeout调用回调函数在内存中将图像的属性进行了修改，但是此时浏览器下次刷新是在 33.2ms 的时候，所以 20ms 修改的图像没有更新到屏幕上。
而到了 30ms 的时候，setTimeout又一次调用回调函数并改变了内存中图像的属性，之后浏览器就刷新了，20ms 更新的状态被 30ms 的图像覆盖了，屏幕上展示的是 30ms 时的图像，所以 20ms 的这一帧就丢失了。丢失的帧多了，画面就卡顿了。
使用 requestAnimationFrame 执行动画，最大优势是能保证回调函数在屏幕每一次刷新间隔中只被执行一次，这样就不会引起丢帧，动画也就不会卡顿


2. 节约资源，节省电源

- 使用 setTimeout 实现的动画，当页面被隐藏或最小化时，定时器setTimeout仍在后台执行动画任务，此时刷新动画是完全没有意义的（实际上 FireFox/Chrome 浏览器对定时器做了优化：页面闲置时，如果时间间隔小于 1000ms，则停止定时器，与requestAnimationFrame行为类似。如果时间间隔>=1000ms，定时器依然在后台执行）

		// 当开始输出count后，切换浏览器tab页，再切换回来，可以发现打印的值没有停止，甚至可能已经执行完了
		let count = 0;
		let timer = setInterval(() => {
		  if (count < 20) {
		    count++;
		    console.log(count);
		  } else {
		    clearInterval(timer);
		    timer = null;
		  }
		}, 2000);


- 使用requestAnimationFrame，当页面处于未激活的状态下，该页面的屏幕刷新任务会被系统暂停，由于requestAnimationFrame保持和屏幕刷新同步执行，所以也会被暂停。当页面被激活时，动画从上次停留的地方继续执行，节约 CPU 开销。

		// 当开始输出count后，切换浏览器tab页，再切换回来，可以发现打印的值从离开前的值继续输出
		let count = 0;
		function requestAnimation() {
		  if (count < 500) {
		    count++;
		    console.log(count);
		    requestAnimationFrame(requestAnimation);
		  }
		}
		requestAnimationFrame(requestAnimation);



3. 函数节流

- 一个刷新间隔内函数执行多次时没有意义的，因为显示器每 16.7ms 刷新一次，多次绘制并不会在屏幕上体现出来
- 在高频事件（resize，scroll等）中，使用requestAnimationFrame可以防止在一个刷新间隔内发生多次函数执行，这样保证了流畅性，也节省了函数执行的开销
- 某些情况下可以直接使用requestAnimationFrame替代 Throttle 函数，都是限制回调函数执行的频率

4. 减少DOM操作

- requestAnimationFrame 会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒60帧。
