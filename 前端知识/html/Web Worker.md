#### 一、前言 ####

- 我们都知道JS是单线程的，所有任务在一个线程上，一次只能做一件事。虽然可以通过AJAX、定时器等可以实现"并行"，但还是没有改变JS单线程的本质，把一些复杂的运算放在页面上执行，还是会导致很卡，甚至卡死。
- 而HTML5标准中的Web Worker为JS创造多线程环境，允许主线程创建Worker线程并给它分配任务，而且在主线程执行任务的时候，worker线程可以同时在后台执行它的任务，互不干扰。这让我们可以将一些复杂运算、高频输入的响应处理、大文件分片上传等放在worker线程处理，最后再返回给主线程。很大程度上缓解了主线程UI渲染阻塞的问题，页面就会很流畅

#### 二、异步和webworker的区别是什么？ ####

- 异步主要是当主线程在进行处理的时候，遇到同步的就直接运行，如果遇到异步的就将异步的方法放到事件队列中，当主线程中所有的同步任务处理完成之后，再进行异步任务的处理，这也就是为什么会出现setTIme 0 设定了时间之后不是立即执行了。
- 他们的一个主要的区别是：异步任务实质上是在主线程上进行处理的，而webworker是创建了一个新的子线程进行处理。

#### 三、那么webWork所创建的这个线程的主要的功能是什么呢 ####

- 主要是负责处理一些数据的问题，比如请求数据，他并不可以对DOM进行操作，他和主线程所在的上下文并不一致，而且他只能够处理网络请求的文件

#### 四、使用限制 ####

1. 同源限制

- 分配给worker线程运行的脚本文件，必须与主线程的脚本文件同源。

2. 文件限制

- Worker 线程无法读取本地文件，即不能打开本机的文件系统（file://），它所加载的脚本，必须来自服务器。即使UI线程所属页面也是本地页面

3. DOM限制

- worker线程所在的全局对象，与主线程不一样，Worker 的全局对象WorkerGlobalScope，通过self或this引用,调用全局对象的属性和方法时可以省略全局对象。所以worker线程无法读取主线程所在网页的 DOM 对象，也无法使用document、window、parent这些对象。但是，Worker 线程可以使用navigator对象和location对象，不过只能只读不能改写；还可以使用XMLHttpRequest发送AJAX请求；还可以使用缓存。

4. 通信联系

- Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。

#### 五、基本用法 ####

1. 主线程

- 浏览器原生提供Worker()构造函数，用来供主线程生成 Worker 线程。

	var worker = new Worker(jsUrl, options)

- Worker()构造函数，可以接受两个参数。第一个参数是脚本的网址（必须遵守同源政策），该参数是必需的，且只能加载 JS 脚本，否则会报错。第二个参数是配置对象，该对象可选。它的一个作用就是指定 Worker 的名称，用来区分多个 Worker 线程。

	// 主线程
	var worker = new Worker('worker.js', { name : 'myWorker' });
	
	// Worker 线程
	self.name // myWorker

- Worker()构造函数的参数是一个脚本文件，该文件就是 Worker 线程所要执行的任务。由于 Worker 不能读取本地文件，所以这个脚本必须来自网络。如果下载没有成功（比如404错误），Worker 就会默默地失败。
- 然后，主线程调用worker.postMessage()方法，向 Worker 发消息。worker.postMessage()方法的参数，就是主线程传给 Worker 的数据。它可以是各种数据类型，包括二进制数据。

	worker.postMessage('这是发给worker线程的消息')

- 主线程通过worker.onmessage指定监听函数，接收子线程发回来的消息。通过 event.data 可以获取 Worker 子线程发过来的数据。

	worker.onmessage = function (event) {
	  doSomething(event.data);
	}
	function doSomething() {
	  ...
	}

- Worker 完成任务以后，主线程就可以把它关掉。

	worker.terminate()

2. Worker 线程

- Worker 线程内部需要有一个监听函数，监听message事件。通过 e.data 可以获取主线程发过来的数据。

	self.addEventListener('message', function (e) {
	    (e.data)
	}, false)
	function doSomething() {
	  ...
	}

- 上面代码中，self代表子线程自身，即子线程的全局对象。
- self.postMessage()方法用来向主线程发送消息。

	self.postMessage(...)

- Worker 也可以关闭自身

	self.close()

3.  Worker 加载脚本

- Worker 内部如果要加载其他脚本，有一个专门的方法importScripts()。

	importScripts('script1.js')

- 该方法可以同时加载多个脚本。

	importScripts('script1.js', 'script2.js');

    - 脚本的下载顺序是不固定的，但执行时会按照传入 importScripts() 中的文件名顺序进行，这个过程是同步的。直到所有脚本都下载并运行完毕， importScripts() 才会返回。

4. 错误处理

- 主线程可以监听 Worker 是否发生错误。如果发生错误，Worker 会触发主线程的error事件。Worker 内部也可以监听error事件。

	worker.addEventListener('error', function (event) {
	   console.log(
	    'ERROR: Line ', event.lineno, ' in ', event.filename, ': ', event.message
	  )
	});

#### 六、worker 线程直接写在主线程的页面里 ####

		const myTask = `onmessage = function (e) {
				        var data = e.data;
				        data.push('hello');
				        console.log('worker:', data); // worker: [1, 2, 3, "hello"]
				        postMessage(data);
                       }`;                                                                                                                                                                                                              
	                                                                                                                                                                                                                                      
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
		var blob = new Blob([myTask]);
		var myWorker = new Worker(window.URL.createObjectURL(blob));
		
		myWorker.onmessage = function (e) {
		    var data = e.data;
		    console.log('page:', data); // page: [1, 2, 3, "hello"]
		    console.log('arr:', arr); // arr: [1, 2, 3]
		};

		var arr = [1,2,3];
		myWorker.postMessage(arr);

- worker与其主页面之间的通信是通过onmessage事件和postMessage（）方法实现的。
- 在主页面与Worker之间传递的数据是通过拷贝（深拷贝），而不是共享来完成的。传递给worker对象会自动经过序列化，接下来在另一端还需要反序列化，所以worker不会共享同一个实例，最终的结果就是在每次通讯结束时生成了数据的一个副本。
- 也就是说，worker与其主页面之间只能单纯的传递数据，不能传递复杂的引用类型：如通过构造函数创建的对象等。并且，传递的数据也是经过拷贝生成的一个副本，在一端对数据进行修改不会影响另一端。 

#### 七、线程间转移二进制数据 ####

- 因为主线程与 worker 线程之间的通信是拷贝关系，当我们要传递一个巨大的二进制文件给 worker 线程处理时(worker 线程就是用来干这个的)，这时候使用拷贝的方式来传递数据，无疑会造成性能问题。
- 幸运的是，Web Worker 提供了一中转移数据的方式，允许主线程把二进制数据直接转移给子线程。这种方式比原先拷贝的方式，有巨大的性能提升。
- 一旦数据转移到其他线程，原先线程就无法再使用这些二进制数据了，这是为了防止出现多个线程同时修改数据的麻烦局面

		// 创建二进制数据
		var uInt8Array = new Uint8Array(1024*1024*32); // 32MB
		for (var i = 0; i < uInt8Array .length; ++i) {
		    uInt8Array[i] = i;
		}
		console.log(uInt8Array.length); // 传递前长度:33554432
		// 字符串形式创建worker线程
		var myTask = `
		    onmessage = function (e) {
		        var data = e.data;
		        console.log('worker:', data);
		    };
		`;
		
		var blob = new Blob([myTask]);
		var myWorker = new Worker(window.URL.createObjectURL(blob));
		
		// 使用这个格式(a,[a]) 来转移二进制数据
		myWorker.postMessage(uInt8Array.buffer, [uInt8Array.buffer]); // 发送数据、转移数据
		
		console.log(uInt8Array.length); // 传递后长度:0，原先线程内没有这个数据了


#### 八、多个worker线程 ####

- 在主线程内可以创建多个 worker 线程
- worker 线程内还可以新建 worker 线程，使用同源的脚本文件创建。
- 在 worker 线程内再新建 worker 线程就不能使用window.URL.createObjectURL(blob)，需要使用同源的脚本文件来创建新的 worker 线程，因为我们无法访问到window对象。

#### 九、共享Worker ####

- 上面介绍的worker是只能被生成它的父页面所调用，他是被一个主页面所独占的，这样的worker就叫做专用worker
- 除了专用worker，还有一种工作线程可以被多个主页面所调用，这种worker就叫做共享Worker。
- window提供shareWorker类来创建共享Worker

    // 传入的参数与专用worker一致
    const share = new ShareWorker(URL, options)
    
     //share返回一个port属性
     //share.port
     //share.port.start() 开放传输的端口
     //share.port.end() 关闭传输的端口
     //share.port.postMessage() 发送消息，必须先调用share.port.start方法

- 简单示例

  - UI主线程

		const worker = new SharedWorker('./worker.js')                                                                                                                                                                                             
		worker.port.addEventListener('message', e => {                                                                                                                                                                                             
		  console.log(e.data)                                                                                                                                                                                                                      
		}, false)                                                                                                                                                                                                                                  
		worker.port.start()  // 连接worker线程                                                                                                                                                                                                     
		worker.port.postMessage('hi')                                                                                                                                                                                                              
		                                                                                                                                                                                                                                              
		setTimeout(()=>{                                                                                                                                                                                                                           
		  worker.port.close() // 关闭连接                                                                                                                                                                                                          
		}, 10000)                                                                                                                                                                                                                                  
		

  - Shared Web Worker线程

		let conns = 0                                                                                                                                                                                                                              
		                                                                                                                                                                                                                                              
		// 当UI线程执行worker.port.start()时触发建立连接                                                                                                                                                                                           
		self.addEventListener('connect', e => {                                                                                                                                                                                                    
		  const port = e.ports[0]                                                                                                                                                                                                                  
		  conns+=1                                                                                                                                                                                                                                 
		                                                                                                                                                                                                                                              
		  port.addEventListener('message', e => {                                                                                                                                                                                                  
		    console.log(e.data)  // 注意console对象指向第一个创建Worker线程的UI线程的console对象。即如果A先创建Worker线程，那么后续B、C等UI线程执行worker.port.postMessage时回显信息依然会发送给A页面。                                            
		  })                                                                                                                                                                                                                                       
		                                                                                                                                                                                                                                              
		  // 建立双向连接，可相互通信                                                                                                                                                                                                              
		  port.start()                                                                                                                                                                                                                             
		  port.postMessage('hey')                                                                                                                                                                                                                  
		})                                             


#### 十、应用场景 ####

1. 使用专用线程进行数学运算

- Web Worker 最简单的应用就是用来做后台计算，而这种计算并不会中断前台用户的操作

2. 图像处理

- 通过使用从<canvas> 或者<video> 元素中获取的数据，可以把图像分割成几个不同的区域并且把它们推送给并行的不同 Workers 来做计算

3. 大量数据的检索

- 当需要在调用 ajax 后处理大量的数据，如果处理这些数据所需的时间长短非常重要，可以在 Web Worker 中来做这些，避免冻结 UI 线程。

4. 背景数据分析

- 由于在使用 Web Worker 的时候，我们有更多潜在的 CPU 可用时间，我们现在可以考虑一下 JavaScript 中的新应用场景。例如，我们可以想像在不影响 UI 体验的情况下实时处理用户输入。利用这样一种可能，我们可以想像一个像 Word（Office Web Apps 套装）一样的应用：当用户打字时后台在词典中进行查找，帮助用户自动纠错等等。

 




















