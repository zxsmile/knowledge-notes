#### 一、Window:queueMicrotask()方法 ####

- Window 接口的 queueMicrotask() 方法，将微任务加入队列以在控制返回浏览器的事件循环之前的安全时间执行。也就是**queueMicrotask是可以将函数转换成微任务**

**1.语法**

  - queueMicrotask(callback)

**2.参数**

  - function

  - 当浏览器引擎确定可以安全调用你的代码时执行的 function。微任务（microtask）的执行顺序在所有进行中的任务（pending task）完成之后，在对浏览器的事件循环产生控制之前。

**3.返回值**

  无（undefined）

- 示例：

	queueMicrotask(() => {
	  // 函数的内容
	});

#### 二、前言 ####

- 很多手写版本都是使用 setTimeout 去做异步处理 ，但是 **setTimeout 属于宏任务，这与 Promise 是个微任务相矛盾，所以我打算选择一种创建微任务的方式去实现我们的手写代码。**

- 这里我们有几种选择，一种就是 Promise A+ 规范中也提到的，**process.nextTick（ Node 端 ） 与MutationObserver（ 浏览器端 ），考虑到利用这两种方式需要做环境判断，所以在这里我们就推荐另外一种创建微任务的方式 queueMicrotask**


#### 三、	Promise核心逻辑实现 ####

- 我们先简单实现一下 Promise 的基础功能。先看原生 Promise 实现的例子，第一步我们要完成相同的功能。

	const promise = new Promise((resolve, reject) => {
	   resolve('success')
	   reject('err')
	})
	
	promise.then(value => {
	  console.log('resolve', value)
	}, reason => {
	  console.log('reject', reason)
	})
	
	// 输出 resolve success

**1.分析基本原理**

 （1）首先Promise是一个类（构造函数），它接收一个函数（执行器）作为参数，这个函数（执行器）会立即执行。

 （2）Promise有三种状态：

       - Pending   等待

       - Fulfilled 完成

       - Rejected  失败

 （3）Promise的状态只能由Pending->Fulfilled或者Pending->Rejected，且一旦发生改变边不可二次修改

 （4）Promise中使用resolve和reject**两个函数**来更改状态

 （5）then方法内部做的事情就是状态判断：

      - 如果状态是成功，调用成功回调函数

      - 如果状态是失败，调用失败回调函数

**2.新建MyPromise类，传入参数函数（执行器）executor**

		// 新建 MyPromise 类

		class MyPromise {

		  constructor(executor){

            // 判断参数否为function
            if(typeof executor !== 'function'){
               throw new Error('MyPromise must accept a function as a parameter')
            }

		    // executor 是一个函数(执行器)，进入会立即执行
		    executor() 
		  }
		}


**2.executor传入resolve和reject方法**


		// 新建 MyPromise 类

		class MyPromise {

		  constructor(executor){

            // 判断参数否为function
            if(typeof executor !== 'function'){
               throw new Error('MyPromise must accept a function as a parameter')
            }

		    // executor 是一个函数(执行器)，进入会立即执行
            // 并传入resolve和reject方法

		    executor(this.resolve,this.reject) 
		  }

		  // resolve和reject为什么要用箭头函数？
		  // 如果直接调用的话，普通函数this指向的是window或者undefined
		  // 用箭头函数就可以让this指向当前实例对象
		  // 更改成功后的状态
         
          resolve = ()=>{}

         // 更改失败后的状态

          reject = () => {}
		}

**3.状态与结果的管理**

// 新建 MyPromise 类

		class MyPromise {

		  constructor(executor){

            // 判断参数否为function
            if(typeof executor !== 'function'){
               throw new Error('MyPromise must accept a function as a parameter')
            }
          
            // 储存状态的变量，初始值是 pending
             this.status = PENDING;

            // 成功之后的值
		     this.value = null;
		  
            // 失败之后的原因
		     this.reason = null;

		    // executor 是一个函数(执行器)，进入会立即执行
            // 并传入resolve和reject方法

		    executor(this.resolve,this.reject) 
		  }
          
       

		  // resolve和reject为什么要用箭头函数？
		  // 如果直接调用的话，普通函数this指向的是window或者undefined
		  // 用箭头函数就可以让this指向当前实例对象
		  // 更改成功后的状态
         
          resolve = (value)=>{

             // 只有状态是等待，才执行状态修改
            if(this.status === 'PENDING'){
               // 状态修改为成功
              this.status = FULFILLED
               // 保存成功之后的值
              this.value = value
            }
          }

         // 更改失败后的状态

          reject = (reason) => {

            // 只有状态是等待，才执行状态修改
            if(this.status === 'PENDING'){
               // 状态修改为失败
              this.status = REJECTED
               // 保存失败后的原因
              this.reason = reason
            }
          }
		}


**4. then 的简单实现**

	then(onFulfilled, onRejected) {
	  // 判断状态
	  if (this.status === FULFILLED) {
	    // 调用成功回调，并且把值返回
	    onFulfilled(this.value);
	  } else if (this.status === REJECTED) {
	    // 调用失败回调，并且把原因返回
	    onRejected(this.reason);
	  }
	}


**5.使用 module.exports 对外暴露 MyPromise 类**

	// MyPromise.js
	module.exports = MyPromise;

**6.完整代码**

	// MyPromise.js
	
	// 先定义三个常量表示状态
	const PENDING = 'pending';
	const FULFILLED = 'fulfilled';
	const REJECTED = 'rejected';
	
	// 新建 MyPromise 类
	class MyPromise {

	  constructor(executor){

        // 判断参数否为function
        if(typeof executor !== 'function'){
          throw new Error('MyPromise must accept a function as a parameter')
        }
          
        // 储存状态的变量，初始值是 pending
           this.status = PENDING;

        // 成功之后的值
		   this.value = null;
		  
        // 失败之后的原因
		   this.reason = null;

		// executor 是一个函数(执行器)，进入会立即执行
        // 并传入resolve和reject方法

		   executor(this.resolve,this.reject) 
	 }

	
	  // resolve和reject为什么要用箭头函数？
	  // 如果直接调用的话，普通函数this指向的是window或者undefined
	  // 用箭头函数就可以让this指向当前实例对象
	  // 更改成功后的状态
	  resolve = (value) => {
	    // 只有状态是等待，才执行状态修改
	    if (this.status === PENDING) {
	      // 状态修改为成功
	      this.status = FULFILLED;
	      // 保存成功之后的值
	      this.value = value;
	    }
	  }
	
	  // 更改失败后的状态
	  reject = (reason) => {
	    // 只有状态是等待，才执行状态修改
	    if (this.status === PENDING) {
	      // 状态修改为失败
	      this.status = REJECTED;
	      // 保存失败后的原因
	      this.reason = reason;
	    }
	  }
	
	  then(onFulfilled, onRejected) {
	    // 判断状态
	    if (this.status === FULFILLED) {
	      // 调用成功回调，并且把值返回
	      onFulfilled(this.value);
	    } else if (this.status === REJECTED) {
	      // 调用失败回调，并且把原因返回
	      onRejected(this.reason);
	    }
	  }
	}
	
	module.exports = MyPromise


使用我的手写代码:

	// 新建 test.js
	
	// 引入我们的 MyPromise.js
	const MyPromise = require('./MyPromise')
	const promise = new MyPromise((resolve, reject) => {
	   resolve('success')
	   reject('err')
	})
	
	promise.then(value => {
	  console.log('resolve', value)
	}, reason => {
	  console.log('reject', reason)
	})
	
	// 执行结果：resolve success

#### 四、在Promise类中加入异步逻辑 ####

- 上面还没有经过异步处理，如果有异步逻辑加如来会带来一些问题，例如：


	const MyPromise = require('./MyPromise')
	const promise = new MyPromise((resolve, reject) => {
	  setTimeout(() => {
	    resolve('success')
	  }, 2000); 
	})
	
	promise.then(value => {
	  console.log('resolve', value)
	}, reason => {
	  console.log('reject', reason)
	})
	
	// 没有打印信息！！！

分析原因：

 - 主线程代码立即执行，setTimeout 是异步代码，then 会马上执行，这个时候判断 Promise 状态，状态是 Pending，然而之前并没有判断等待这个状态。

 - 这里就需要我们处理一下 Pending 状态，我们改造一下之前的代码

**1.缓存成功与失败回调**

	// MyPromise.js

	// MyPromise 类中新增

	// 存储成功回调函数
	onFulfilledCallback = null;

	// 存储失败回调函数
	onRejectedCallback = null;

**2.then 方法中的 Pending 的处理**

	// MyPromise.js
	
	then(onFulfilled, onRejected) {
	  // 判断状态
	  if (this.status === FULFILLED) {
	    // 调用成功回调，并且把值返回
	    onFulfilled(this.value);
	  } else if (this.status === REJECTED) {
	    // 调用失败回调，并且把原因返回
	    onRejected(this.reason);
	  } else if (this.status === PENDING) {
	    // ==== 新增 ====
	    // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
	    // 等到执行成功失败函数的时候再传递
	    this.onFulfilledCallback = onFulfilled;
	    this.onRejectedCallback = onRejected;
	  }
	}

**3.resolve 与 reject 中调用回调函数**
	
	// MyPromise.js
	
	// 更改成功后的状态
	resolve = (value) => {
	  // 只有状态是等待，才执行状态修改
	  if (this.status === PENDING) {
	    // 状态修改为成功
	    this.status = FULFILLED;
	    // 保存成功之后的值
	    this.value = value;
	    // ==== 新增 ====
	    // 判断成功回调是否存在，如果存在就调用
	    this.onFulfilledCallback && this.onFulfilledCallback(value);
	  }
	}


	// MyPromise.js
	// 更改失败后的状态
	reject = (reason) => {
	  // 只有状态是等待，才执行状态修改
	  if (this.status === PENDING) {
	    // 状态成功为失败
	    this.status = REJECTED;
	    // 保存失败后的原因
	    this.reason = reason;
	    // ==== 新增 ====
	    // 判断失败回调是否存在，如果存在就调用
	    this.onRejectedCallback && this.onRejectedCallback(reason)
	  }
	}

- 目前完整代码：
	
	// 先定义三个常量表示状态
	const PENDING = 'pending';
	const FULFILLED = 'fulfilled';
	const REJECTED = 'rejected';
	
	// 新建 MyPromise 类
	class MyPromise {
	
	  constructor(executor){
	
	    // 判断参数否为function
	    if(typeof executor !== 'function'){
	      throw new Error('MyPromise must accept a function as a parameter')
	    }
	      
	    // 储存状态的变量，初始值是 pending
	       this.status = PENDING;
	
	    // 成功之后的值
	       this.value = null;
	      
	    // 失败之后的原因
	       this.reason = null;
	
	    // 存储成功回调函数
	       this.onFulfilledCallback = null
	
	    //存储失败回调
	
	       this.onRejectedCallback = null
	
	    // executor 是一个函数(执行器)，进入会立即执行
	    // 并传入resolve和reject方法
	
	       executor(this.resolve,this.reject) 
	 }
	
	
	  // resolve和reject为什么要用箭头函数？
	  // 如果直接调用的话，普通函数this指向的是window或者undefined
	  // 用箭头函数就可以让this指向当前实例对象
	  // 更改成功后的状态
	  resolve = (value) => {
	    // 只有状态是等待，才执行状态修改
	    if (this.status === PENDING) {
	      // 状态修改为成功
	      this.status = FULFILLED;
	      // 保存成功之后的值
	      this.value = value;
	      // 判断成功回调是否存在，如果存在就调用
	      this.onFulfilledCallback  && this.onFulfilledCallback(value)
	    }
	  }
	
	  // 更改失败后的状态
	  reject = (reason) => {
	    // 只有状态是等待，才执行状态修改
	    if (this.status === PENDING) {
	      // 状态修改为失败
	      this.status = REJECTED;
	      // 保存失败后的原因
	      this.reason = reason;
	    // 判断失败回调是否存在，如果存在就调用
	      this.onRejectedCallback && this.onRejectedCallback(reason)
	    }
	  }
	
	  then(onFulfilled, onRejected) {
	    // 判断状态
	    if (this.status === FULFILLED) {
	      // 调用成功回调，并且把值返回
	      onFulfilled(this.value);
	    } else if (this.status === REJECTED) {
	      // 调用失败回调，并且把原因返回
	      onRejected(this.reason);
	    }else if(this.status === PENDING) {
	        // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
		    // 等到执行成功失败函数的时候再传递
	        this.onFulfilledCallback = onFulfilled
	        this.onRejectedCallback = onRejected
	    }
	  }
	}
	
	module.exports = MyPromise

- 我们再执行一下上面的例子：

	// test.js
	
	const MyPromise = require('./MyPromise')
	const promise = new MyPromise((resolve, reject) => {
	  setTimeout(() => {
	    resolve('success')
	  }, 2000); 
	})
	
	promise.then(value => {
	  console.log('resolve', value)
	}, reason => {
	  console.log('reject', reason)
	})
	
	// 等待 2s 输出 resolve success

#### 五、实现then方法多次调用添加多个处理函数 ####

- Promise 的 then 方法是可以被多次调用的。这里如果有三个 then 的调用，如果是同步回调，那么直接返回当前的值就行；如果是异步回调，那么保存的成功失败的回调，需要用不同的值保存，因为都互不相同。之前的代码需要改进。

- 同样的先看一个例子：

	// test.js
	
	const MyPromise = require('./MyPromise')
	const promise = new MyPromise((resolve, reject) => {
	  setTimeout(() => {
	    resolve('success')
	  }, 2000); 
	})
	
	promise.then(value => {
	  console.log(1)
	  console.log('resolve', value)
	})
	 
	promise.then(value => {
	  console.log(2)
	  console.log('resolve', value)
	})
	
	promise.then(value => {
	  console.log(3)
	  console.log('resolve', value)
	})
	
	// 3
	// resolve success

- 目前的代码只能输出：3 resolve success，怎么可以把 1、2 弄丢呢！

- 我们应该一视同仁，保证所有 then 中的回调函数都可以执行，继续改造

**1.MyPromise 类中新增两个数组**

		// MyPromise.js
		
		// 存储成功回调函数
		// onFulfilledCallback = null;
		onFulfilledCallbacks = [];

		// 存储失败回调函数
		// onRejectedCallback = null;
		onRejectedCallbacks = [];

**2.回调函数存入数组中**

    // MyPromise.js
	
	then(onFulfilled, onRejected) {
	  // 判断状态
	  if (this.status === FULFILLED) {
	    // 调用成功回调，并且把值返回
	    onFulfilled(this.value);
	  } else if (this.status === REJECTED) {
	    // 调用失败回调，并且把原因返回
	    onRejected(this.reason);
	  } else if (this.status === PENDING) {
	    // ==== 新增 ====
	    // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
	    // 等到执行成功失败函数的时候再传递
	    this.onFulfilledCallbacks.push(onFulfilled)
	    this.onFulfilledCallbacks.push(onRejected)
	  }
	}

**3.循环调用成功和失败回调**

     // MyPromise.js
	
	// 更改成功后的状态
	resolve = (value) => {
	  // 只有状态是等待，才执行状态修改
	  if (this.status === PENDING) {
	    // 状态修改为成功
	    this.status = FULFILLED;
	    // 保存成功之后的值
	    this.value = value;
	    // ==== 新增 ====
	    // 判断成功回调是否存在，如果存在就调用
        while(this.onFulfilledCallbacks){
           this.onFulfilledCallbacks.shift()(value)
        }
	  }
	}


	// MyPromise.js
	// 更改失败后的状态
	reject = (reason) => {
	  // 只有状态是等待，才执行状态修改
	  if (this.status === PENDING) {
	    // 状态成功为失败
	    this.status = REJECTED;
	    // 保存失败后的原因
	    this.reason = reason;
	    // ==== 新增 ====
	    // 判断失败回调是否存在，如果存在就调用
	    while(this.onRejectedCallbacks){
           this.onRejectedCallbacks.shift()(reason)
        }
	  }
	}


- 目前完整代码：

	// 先定义三个常量表示状态
	const PENDING = 'pending';
	const FULFILLED = 'fulfilled';
	const REJECTED = 'rejected';
	
	// 新建 MyPromise 类
	class MyPromise {
	
	  constructor(executor){
	
	    // 判断参数否为function
	    if(typeof executor !== 'function'){
	      throw new Error('MyPromise must accept a function as a parameter')
	    }
	      
	    // 储存状态的变量，初始值是 pending
	       this.status = PENDING;
	
	    // 成功之后的值
	       this.value = null;
	      
	    // 失败之后的原因
	       this.reason = null;
	
	    // 存储成功回调函数
	    //    this.onFulfilledCallback = null
	
	       this.onFulfilledCallbacks = []
	
	    //存储失败回调
	
	    //    this.onRejectedCallback = null
	       this.onRejectedCallbacks = []
	
	    // executor 是一个函数(执行器)，进入会立即执行
	    // 并传入resolve和reject方法
	
	       executor(this.resolve,this.reject) 
	 }
	
	
	  // resolve和reject为什么要用箭头函数？
	  // 如果直接调用的话，普通函数this指向的是window或者undefined
	  // 用箭头函数就可以让this指向当前实例对象
	  // 更改成功后的状态
	  resolve = (value) => {
	    // 只有状态是等待，才执行状态修改
	    if (this.status === PENDING) {
	      // 状态修改为成功
	      this.status = FULFILLED;
	      // 保存成功之后的值
	      this.value = value;
	      // 判断成功回调是否存在，如果存在就调用
	      while(this.onFulfilledCallbacks.length){
	        this.onFulfilledCallbacks.shift()(value)
	      }
	    }
	  }
	
	  // 更改失败后的状态
	  reject = (reason) => {
	    // 只有状态是等待，才执行状态修改
	    if (this.status === PENDING) {
	      // 状态修改为失败
	      this.status = REJECTED;
	      // 保存失败后的原因
	      this.reason = reason;
	    // 判断失败回调是否存在，如果存在就调用
	      while(this.onRejectedCallbacks.length){
	        this.onRejectedCallbacks.shift()(reason)
	      }
	    }
	  }
	
	  then(onFulfilled, onRejected) {
	    // 判断状态
	    if (this.status === FULFILLED) {
	      // 调用成功回调，并且把值返回
	      onFulfilled(this.value);
	    } else if (this.status === REJECTED) {
	      // 调用失败回调，并且把原因返回
	      onRejected(this.reason);
	    }else if(this.status === PENDING) {
	        // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
		    // 等到执行成功失败函数的时候再传递
	        this.onFulfilledCallbacks.push(onFulfilled)
	        this.onRejectedCallbacks.push(onRejected)
	    }
	  }
	}
	
	module.exports = MyPromise
 
- 再来运行一下，看看结果:

	1
	resolve success
	2
	resolve success
	3
	resolve success

#### 六、实现then方法的链式调用 ####
 
1.then 方法要链式调用那么就需要返回一个 Promise 对象

2.then 方法里面 return 一个返回值作为下一个 then 方法的参数，如果是 return 一个 Promise 对象，那么就需要判断它的状态

- 举个例子：
	
	// test.js
	
	const MyPromise = require('./MyPromise')
	const promise = new MyPromise((resolve, reject) => {
	  // 目前这里只处理同步的问题
	  resolve('success')
	})
	
	function other () {
	  return new MyPromise((resolve, reject) =>{
	    resolve('other')
	  })
	}
	promise.then(value => {
	  console.log(1)
	  console.log('resolve', value)
	  return other()
	}).then(value => {
	  console.log(2)
	  console.log('resolve', value)
	})

- 用目前的手写代码运行的时候会报错，无法链式调用

- 接着改：

	  then(onFulfilled, onRejected) {
 
         return new MyPromise((resolve,reject) => {
             // 判断状态
		     if (this.status === FULFILLED) {

		         // 获取成功回调函数的执行结果
                const resolveRes = onFulfilled(this.value);

                // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调

	            if(resolveRes instanceof MyPromise){

	              resolveRes.then(resolve, reject)//先通过then获取到当前的resolveRes这个promise的状态，然后继续执行myPromise的then的逻辑

	            }else {

	             //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数

	             resolve(resolveRes) // 将上一个then的返回值通过执行resolve(resolveRes)传递给下一个then，因为调用完resolve(resolveRes)就直接进入then了（如果后面有then的话）
	           }
		     } else if (this.status === REJECTED) {

		      // 调用失败回调，并且把原因返回
		       let rejectRes = onRejected(this.reason);
 
                // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                if (rejectRes instanceof MyPromise) {        
			      rejectRes.then(resolve, reject)    
                 } else {
			    //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
				  resolve(rejectRes)
			    }

		     }else if(this.status === PENDING) {
		        // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
			    // 等到执行成功失败函数的时候再传递
		        this.onFulfilledCallbacks.push(onFulfilled)
		        this.onRejectedCallbacks.push(onRejected)
		    }
         })
   
	  }

- 目前完整代码：

	// 先定义三个常量表示状态
	const PENDING = 'pending';
	const FULFILLED = 'fulfilled';
	const REJECTED = 'rejected';
	
	// 新建 MyPromise 类
	class MyPromise {
	
	  constructor(executor){
	
	    // 判断参数否为function
	    if(typeof executor !== 'function'){
	      throw new Error('MyPromise must accept a function as a parameter')
	    }
	      
	    // 储存状态的变量，初始值是 pending
	       this.status = PENDING;
	
	    // 成功之后的值
	       this.value = null;
	      
	    // 失败之后的原因
	       this.reason = null;
	
	    // 存储成功回调函数
	    //    this.onFulfilledCallback = null
	
	       this.onFulfilledCallbacks = []
	
	    //存储失败回调
	
	    //    this.onRejectedCallback = null
	       this.onRejectedCallbacks = []
	
	    // executor 是一个函数(执行器)，进入会立即执行
	    // 并传入resolve和reject方法
	
	       executor(this.resolve,this.reject) 
	 }
	
	
	  // resolve和reject为什么要用箭头函数？
	  // 如果直接调用的话，普通函数this指向的是window或者undefined
	  // 用箭头函数就可以让this指向当前实例对象
	  // 更改成功后的状态
	  resolve = (value) => {
	    // 只有状态是等待，才执行状态修改
	    if (this.status === PENDING) {
	      // 状态修改为成功
	      this.status = FULFILLED;
	      // 保存成功之后的值
	      this.value = value;
	      // 判断成功回调是否存在，如果存在就调用
	      while(this.onFulfilledCallbacks.length){
	        this.onFulfilledCallbacks.shift()(value)
	      }
	    }
	  }
	
	  // 更改失败后的状态
	  reject = (reason) => {
	    // 只有状态是等待，才执行状态修改
	    if (this.status === PENDING) {
	      // 状态修改为失败
	      this.status = REJECTED;
	      // 保存失败后的原因
	      this.reason = reason;
	    // 判断失败回调是否存在，如果存在就调用
	      while(this.onRejectedCallbacks.length){
	        this.onRejectedCallbacks.shift()(reason)
	      }
	    }
	  }
	
	  then(onFulfilled, onRejected) {
	 
	    return new MyPromise((resolve,reject) => {
	        // 判断状态
	        if (this.status === FULFILLED) {
	
	            // 获取成功回调函数的执行结果
	           const resolveRes = onFulfilled(this.value);
	
	           // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
	           if(resolveRes instanceof MyPromise){
	              resolveRes.then(resolve, reject)//先通过then获取到当前的resolveRes这个promise的状态，然后继续执行myPromise的then的逻辑
	           }else {
	             //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
	             resolve(resolveRes) // 将上一个then的返回值通过执行resolve(resolveRes)传递给下一个then，因为调用完resolve(resolveRes)就直接进入then了（如果后面有then的话）
	           }
	        } else if (this.status === REJECTED) {
	
	         // 调用失败回调，并且把原因返回
	          let rejectRes = onRejected(this.reason);
	
	           // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
	           if (rejectRes instanceof MyPromise) {        
	             rejectRes.then(resolve, reject)    
	            } else {
	           //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
	             resolve(rejectRes)
	           }
	
	        }else if(this.status === PENDING) {
	           // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
	           // 等到执行成功失败函数的时候再传递
	           this.onFulfilledCallbacks.push(onFulfilled)
	           this.onRejectedCallbacks.push(onRejected)
	       }
	    })
	
	 }
	}
	
	module.exports = MyPromise

- 上面例子，执行一下，结果

	1
	resolve success
	2
	resolve other


#### 七、then方法链式调用识别Promise是否返回自己 ####

- 如果 then 方法返回的是自己的 Promise 对象，则会发生循环调用，这个时候程序会报错

- 例如下面这种情况：

	// test.js
	
	const promise = new Promise((resolve, reject) => {
	  resolve(100)
	})
	const p1 = promise.then(value => {
	  console.log(value)
	  return p1
	})

- 使用原生 Promise 执行这个代码，会报类型错误

100
Uncaught (in promise) TypeError: Chaining cycle detected for promise #<Promise>

- 我们在 MyPromise 实现一下：

    then(onFulfilled, onRejected) {
 
        const promise2  = new MyPromise((resolve,reject) => {
             // 判断状态
		     if (this.status === FULFILLED) {

		         // 获取成功回调函数的执行结果
                const resolveRes = onFulfilled(this.value);
 
                // 如果相等了，说明return的是自己，抛出类型错误并返回
                if(promise2 === resolveRes){

                  return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))

                }
                // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调

	            if(resolveRes instanceof MyPromise){

	              resolveRes.then(resolve, reject)//先通过then获取到当前的resolveRes这个promise的状态，然后继续执行myPromise的then的逻辑

	            }else {

	              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数

	              resolve(resolveRes) // 将上一个then的返回值通过执行resolve(resolveRes)传递给下一个then，因为调用完resolve(resolveRes)就直接进入then了（如果后面有then的话）
	           }
		     } else if (this.status === REJECTED) {

		      // 调用失败回调，并且把原因返回
		       let rejectRes = onRejected(this.reason);
              // 如果相等了，说明return的是自己，抛出类型错误并返回
                if(promise2 === rejectRes){

                  return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))

                }
                // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                if (rejectRes instanceof MyPromise) {        
			      rejectRes.then(resolve, reject)    
                 } else {
			    //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
				  resolve(rejectRes)
			    }

		     }else if(this.status === PENDING) {
		        // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
			    // 等到执行成功失败函数的时候再传递
		        this.onFulfilledCallbacks.push(onFulfilled)
		        this.onRejectedCallbacks.push(onRejected)
		    }
         })

         return promise2
   
	  }

- 执行一下，竟然报错了

      resolvePromise(promise2, x, resolve, reject);
                       ^

      ReferenceError: Cannot access 'promise2' before initialization

- 为啥会报错呢？从错误提示可以看出，**我们必须要等 promise2 完成初始化。这个时候我们就要用上宏微任务和事件循环的知识了，这里就需要创建一个异步函数去等待 promise2 完成初始化，前面我们已经确认了创建微任务的技术方案 --> queueMicrotask**

        then(onFulfilled, onRejected) {
 
            const promise2  = new MyPromise((resolve,reject) => {
             // 判断状态
		     if (this.status === FULFILLED) {
          
                queueMicrotask(() => {
                // 获取成功回调函数的执行结果
	                const resolveRes = onFulfilled(this.value);
	 
	                // 如果相等了，说明return的是自己，抛出类型错误并返回
	                if(promise2 === resolveRes){
	
	                  return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
	
	                }
	                // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
	
		            if(resolveRes instanceof MyPromise){
	
		              resolveRes.then(resolve, reject)//先通过then获取到当前的resolveRes这个promise的状态，然后继续执行myPromise的then的逻辑
	
		            }else {
	
		              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
	
		              resolve(resolveRes) // 将上一个then的返回值通过执行resolve(resolveRes)传递给下一个then，因为调用完resolve(resolveRes)就直接进入then了（如果后面有then的话）
		           }
                })
		         
		     } else if (this.status === REJECTED) {

               queueMicrotask(() => {

	              // 调用失败回调，并且把原因返回
			       let rejectRes = onRejected(this.reason);
	              // 如果相等了，说明return的是自己，抛出类型错误并返回
	                if(promise2 === rejectRes){
	
	                  return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
	
	                }
	                // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
	                if (rejectRes instanceof MyPromise) {        
				      rejectRes.then(resolve, reject)    
	                 } else {
				    //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
					  resolve(rejectRes)
				    }
               })
		     

		     }else if(this.status === PENDING) {
		        // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
			    // 等到执行成功失败函数的时候再传递
		        this.onFulfilledCallbacks.push(onFulfilled)
		        this.onRejectedCallbacks.push(onRejected)
		    }
         })

         return promise2
   
	  } 

- 这里得到我们的结果:

	1
	resolve success
	3
	Chaining cycle detected for promise #<Promise>

#### 八、捕获错误 ####

**1.捕获执行器(传给Promise的函数)错误**

  - 捕获执行器中的代码，如果执行器中有代码错误，那么 Promise 的状态要变为失败
  
    // MyPromise.js

	constructor(executor){
	  // ==== 新增 ====
	  // executor 是一个执行器，进入会立即执行
	  // 并传入resolve和reject方法
	  try {
	    executor(this.resolve, this.reject)
	  } catch (error) {
	    // 如果有错误，就直接执行 reject
	    this.reject(error)
	  }
	}
 
  - 验证一下：

	const MyPromise = require('./MyPromise')
	const promise = new MyPromise((resolve, reject) => {
	    // resolve('success')
	    throw new Error('执行器错误')
	})
	 
	promise.then(value => {
	  console.log(1)
	  console.log('resolve', value)
	}, reason => {
	  console.log(2)
	  console.log(reason.message)
	})

  - 执行结果

	2
	执行器错误

**2.then 执行的时错误捕获**

	  then(onFulfilled, onRejected) {
 
		    const promise2  = new MyPromise((resolve,reject) => {
		     // 判断状态
		     if (this.status === FULFILLED) {
		  
		        queueMicrotask(() => {
		          try{
		            // 获取成功回调函数的执行结果
		            const resolveRes = onFulfilled(this.value);
		
		            // 如果相等了，说明return的是自己，抛出类型错误并返回
		            if(promise2 === resolveRes){
		
		                return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
		
		            }
		            // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
		
		            if(resolveRes instanceof MyPromise){
		
		                resolveRes.then(resolve, reject)//先通过then获取到当前的resolveRes这个promise的状态，然后继续执行myPromise的then的逻辑
		
		            }else {
		
		            //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
		
		                resolve(resolveRes) // 将上一个then的返回值通过执行resolve(resolveRes)传递给下一个then，因为调用完resolve(resolveRes)就直接进入then了（如果后面有then的话）
		            }resolve
		          }catch(err){
		            reject(err)
		          }
		        
		        })
		         
		     } else if (this.status === REJECTED) {
		
		       queueMicrotask(() => {
         
			        try {
			          // 调用失败回调，并且把原因返回
			           let rejectRes = onRejected(this.reason);
			          // 如果相等了，说明return的是自己，抛出类型错误并返回
			            if(promise2 === rejectRes){
			
			              return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
			
			            }
			            // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
			            if (rejectRes instanceof MyPromise) {        
			              rejectRes.then(resolve, reject)    
			             } else {
			            //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
			              resolve(rejectRes)
			            }
			         }catch(err) {
			           console.log(err)
			         }  
		       })
		     
		
		     }else if(this.status === PENDING) {
		        // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
		        // 等到执行成功失败函数的时候再传递
		        this.onFulfilledCallbacks.push(onFulfilled)
		        this.onRejectedCallbacks.push(onRejected)
		    }
		 })
		
		 return promise2
		
		}


- 验证一下：

	 // test.js
	
	const MyPromise = require('./MyPromise')
	const promise = new MyPromise((resolve, reject) => {
	    resolve('success')
	    // throw new Error('执行器错误')
	 })
	 
	// 第一个then方法中的错误要在第二个then方法中捕获到
	promise.then(value => {
	  console.log(1)
	  console.log('resolve', value)
	  throw new Error('then error')
	}, reason => {
	  console.log(2)
	  console.log(reason.message)
	}).then(value => {
	  console.log(3)
	  console.log(value);
	}, reason => {
	  console.log(4)
	  console.log(reason.message)
	})
 
- 执行结果：

	1
	resolve success
	4
	then error




#### 九、参考前面的fulfilled和rejected状态，对pending状态进行改造 ####

- 改造内容包括：

   - 增加异步状态下的链式调用

   - 增加回调函数执行结果的判断

   - 增加识别 Promise 是否返回自己

   - 增加错误捕获

	 then(onFulfilled, onRejected) {
	 
	    const thenPromise  = new MyPromise((resolve,reject) => {
	     // 判断状态
	     if (this.status === FULFILLED) {
	  
	        queueMicrotask(() => {
	          try{
	            // 获取成功回调函数的执行结果
	            const resolveRes = onFulfilled(this.value);
	            this.resolvePromise(thenPromise, resolveRes, resolve, reject)
	           
	          }catch(err){
	            reject(err)
	          }
	        
	        })
	         
	     } else if (this.status === REJECTED) {
	
	        queueMicrotask(() => {
	        try {
	          // 调用失败回调，并且把原因返回
	           let rejectRes = onRejected(this.reason);
	           this.resolvePromise(thenPromise, rejectRes, resolve, reject)
	         }catch(err) {
	           console.log(err)
	         }  
	       })
	     
	
	     }else if(this.status === PENDING) {
	        // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
	        // 等到执行成功失败函数的时候再传递
	        this.onFulfilledCallbacks.push(() => {
	            queueMicrotask(() => {
	                try{
	                  // 获取成功回调函数的执行结果
	                  const resolveRes = onFulfilled(this.value);
	                  this.resolvePromise(thenPromise, resolveRes, resolve, reject)
	                 
	                }catch(err){
	                  reject(err)
	                }
	              
	              })
	        })
	        this.onRejectedCallbacks.push(() => {
	            queueMicrotask(() => {
	                try {
	                  // 调用失败回调，并且把原因返回
	                   let rejectRes = onRejected(this.reason);
	                   this.resolvePromise(thenPromise, rejectRes, resolve, reject)
	                 }catch(err) {
	                   console.log(err)
	                 }  
	               })
	        })
	    }
	 })
	
	 return thenPromise
	
	  }
	
	  resolvePromise(thenPromise, res, resolve, reject) {
	     // 如果相等了，说明return的是自己，抛出类型错误并返回
	    if(thenPromise === res){
	
	        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
	
	    }
	    // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
	
	    if(res instanceof MyPromise){
	
	        res.then(resolve, reject)//先通过then获取到当前的resolveRes这个promise的状态，然后继续执行myPromise的then的逻辑
	
	    }else {
	
	    //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
	
	        resolve(res) // 将上一个then的返回值通过执行resolve(resolveRes)传递给下一个then，因为调用完resolve(resolveRes)就直接进入then了（如果后面有then的话）
	    }
	      
	  }

#### 十、then中的参数变为可选 ####

- 上面我们处理 then 方法的时候都是默认传入 onFulfilled、onRejected 两个回调函数，但是实际上原生 Promise 是可以选择参数的单传或者不传，都不会影响执行。

- 例如下面这种：
	
	// test.js
	
	const promise = new Promise((resolve, reject) => {
	  resolve(100)
	})
	
	promise
	  .then()
	  .then()
	  .then()
	  .then(value => console.log(value))
	
	// 输出 100

- 所以我们需要对 then 方法做一点小小的调整

	// MyPromise.js
	
	then(onFulfilled, onRejected) {
	  // 如果不传，就使用默认函数
	  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
	  onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};
	
	  // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
	  const promise2 = new MyPromise((resolve, reject) => {
	  ......
	}

- 验证一下：

   - resolve 之后

    // test.js

	const MyPromise = require('./MyPromise')
	const promise = new MyPromise((resolve, reject) => {
	  resolve('succ')
	})
	 
	promise.then().then().then(value => console.log(value))
	
	// 打印 succ


    - reject 之后

	// test.js
	
	const MyPromise = require('./MyPromise')
	const promise = new MyPromise((resolve, reject) => {
	  reject('err')
	})
	 
	promise.then().then().then(value => console.log(value), reason => console.log(reason))
	
	// 打印 err

- 写到这里，麻雀版的 Promise 基本完成了，完整代码

		// 先定义三个常量表示状态
		const PENDING = 'pending';
		const FULFILLED = 'fulfilled';
		const REJECTED = 'rejected';
		
		// 新建 MyPromise 类
		class MyPromise {
		
		  constructor(executor){
		
		    // 判断参数否为function
		    if(typeof executor !== 'function'){
		      throw new Error('MyPromise must accept a function as a parameter')
		    }
		      
		    // 储存状态的变量，初始值是 pending
		       this.status = PENDING;
		
		    // 成功之后的值
		       this.value = null;
		      
		    // 失败之后的原因
		       this.reason = null;
		
		    // 存储成功回调函数
		    //    this.onFulfilledCallback = null
		
		       this.onFulfilledCallbacks = []
		
		    //存储失败回调
		
		    //    this.onRejectedCallback = null
		       this.onRejectedCallbacks = []
		
		    // executor 是一个函数(执行器)，进入会立即执行
		    // 并传入resolve和reject方法
		     try {
			    executor(this.resolve, this.reject)
			  } catch (error) {
			    // 如果有错误，就直接执行 reject
			    this.reject(error)
			  }
		 }
		
		
		  // resolve和reject为什么要用箭头函数？
		  // 如果直接调用的话，普通函数this指向的是window或者undefined
		  // 用箭头函数就可以让this指向当前实例对象
		  // 更改成功后的状态
		  resolve = (value) => {
		    // 只有状态是等待，才执行状态修改
		    if (this.status === PENDING) {
		      // 状态修改为成功
		      this.status = FULFILLED;
		      // 保存成功之后的值
		      this.value = value;
		      // 判断成功回调是否存在，如果存在就调用
		      while(this.onFulfilledCallbacks.length){
		        this.onFulfilledCallbacks.shift()(value)
		      }
		    }
		  }
		
		  // 更改失败后的状态
		  reject = (reason) => {
		    // 只有状态是等待，才执行状态修改
		    if (this.status === PENDING) {
		      // 状态修改为失败
		      this.status = REJECTED;
		      // 保存失败后的原因
		      this.reason = reason;
		    // 判断失败回调是否存在，如果存在就调用
		      while(this.onRejectedCallbacks.length){
		        this.onRejectedCallbacks.shift()(reason)
		      }
		    }
		  }   
		
		  then(onFulfilled, onRejected) {
		 
		     // 如果不传，就使用默认函数
			onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
			onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};
		    const thenPromise  = new MyPromise((resolve,reject) => {
		     // 判断状态
		     if (this.status === FULFILLED) {
		  
		        queueMicrotask(() => {
		          try{
		            // 获取成功回调函数的执行结果
		            const resolveRes = onFulfilled(this.value);
		            this.resolvePromise(thenPromise,resolveRes, resolve, reject)
		           
		          }catch(err){
		            reject(err)
		          }
		        
		        })
		         
		     } else if (this.status === REJECTED) {
		
		        queueMicrotask(() => {
		        try {
		          // 调用失败回调，并且把原因返回
		           let rejectRes = onRejected(this.reason);
		           this.resolvePromise(thenPromise, rejectRes, resolve, reject)
		         }catch(err) {
		           console.log(err)
		         }  
		       })
		     
		
		     }else if(this.status === PENDING) {
		        // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
		        // 等到执行成功失败函数的时候再传递
		        this.onFulfilledCallbacks.push(() => {
		            queueMicrotask(() => {
		                try{
		                  // 获取成功回调函数的执行结果
		                  const resolveRes = onFulfilled(this.value);
		                  this.resolvePromise(thenPromise, resolveRes, resolve, reject)
		                 
		                }catch(err){
		                  reject(err)
		                }
		              
		              })
		        })
		        this.onRejectedCallbacks.push(() => {
		            queueMicrotask(() => {
		                try {
		                  // 调用失败回调，并且把原因返回
		                   let rejectRes = onRejected(this.reason);
		                   this.resolvePromise(thenPromise, rejectRes, resolve, reject)
		                 }catch(err) {
		                   console.log(err)
		                 }  
		               })
		        })
		    }
		 })
		
		 return thenPromise
		
		  }
		
		  resolvePromise(thenPromise, res, resolve, reject) {
		     // 如果相等了，说明return的是自己，抛出类型错误并返回
		    if(thenPromise === res){
		
		        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
		
		    }
		    // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
		
		    if(res instanceof MyPromise){
		
		        res.then(resolve, reject)//先通过then获取到当前的resolveRes这个promise的状态，然后继续执行myPromise的then的逻辑
		
		    }else {
		
		    //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
		
		       resolve(res) // 将上一个then的返回值通过执行resolve(resolveRes)传递给下一个then，因为调用完resolve(resolveRes)就直接进入then了（如果后面有then的话）
		    }
		      
		  }
		
		}
		
		module.exports = MyPromise


#### 十一、实现resolve与resolve的静态调用 ####

- 就像开头挂的那道面试题使用 return Promise.resolve 来返回一个 Promise 对象，我们用现在的手写代码尝试一下
	
	MyPromise.resolve().then(() => {
	    console.log(0);
	    return MyPromise.resolve(4);
	}).then((res) => {
	    console.log(res)
	})

- 结果它报错了

	MyPromise.resolve().then(() => {
	          ^
	
	TypeError: MyPromise.resolve is not a function

- 除了 Promise.resolve 还有 Promise.reject 的用法，我们都要去支持，接下来我们来实现一下

	// MyPromise.js
	
	MyPromise {
	  ......
	  // resolve 静态方法
	  static resolve (parameter) {
	    // 如果传入 MyPromise 就直接返回
	    if (parameter instanceof MyPromise) {
	      return parameter;
	    }
	
	    // 转成常规方式
	    return new MyPromise(resolve =>  {
	      resolve(parameter);
	    });
	  }
	
	  // reject 静态方法
	  static reject (reason) {
	    return new MyPromise((resolve, reject) => {
	      reject(reason);
	    });
	  }
	}

- 这样我们再测试上面的例子就不会有问题啦，执行结果：

	0
	4


- 完整代码：

	// 先定义三个常量表示状态
	const PENDING = 'pending';
	const FULFILLED = 'fulfilled';
	const REJECTED = 'rejected';
	
	// 新建 MyPromise 类
	class MyPromise {
	
	  constructor(executor){
	
	    // 判断参数否为function
	    if(typeof executor !== 'function'){
	      throw new Error('MyPromise must accept a function as a parameter')
	    }
	      
	    // 储存状态的变量，初始值是 pending
	       this.status = PENDING;
	
	    // 成功之后的值
	       this.value = null;
	      
	    // 失败之后的原因
	       this.reason = null;
	
	    // 存储成功回调函数
	    //    this.onFulfilledCallback = null
	
	       this.onFulfilledCallbacks = []
	
	    //存储失败回调
	
	    //    this.onRejectedCallback = null
	       this.onRejectedCallbacks = []
	
	    // executor 是一个函数(执行器)，进入会立即执行
	    // 并传入resolve和reject方法
	     try {
		    executor(this.resolve, this.reject)
		  } catch (error) {
		    // 如果有错误，就直接执行 reject
		    this.reject(error)
		  }
	 }
	
	
	  // resolve和reject为什么要用箭头函数？
	  // 如果直接调用的话，普通函数this指向的是window或者undefined
	  // 用箭头函数就可以让this指向当前实例对象
	  // 更改成功后的状态
	  resolve = (value) => {
	    // 只有状态是等待，才执行状态修改
	    if (this.status === PENDING) {
	      // 状态修改为成功
	      this.status = FULFILLED;
	      // 保存成功之后的值
	      this.value = value;
	      // 判断成功回调是否存在，如果存在就调用
	      while(this.onFulfilledCallbacks.length){
	        this.onFulfilledCallbacks.shift()(value)
	      }
	    }
	  }
	
	  // 更改失败后的状态
	  reject = (reason) => {
	    // 只有状态是等待，才执行状态修改
	    if (this.status === PENDING) {
	      // 状态修改为失败
	      this.status = REJECTED;
	      // 保存失败后的原因
	      this.reason = reason;
	    // 判断失败回调是否存在，如果存在就调用
	      while(this.onRejectedCallbacks.length){
	        this.onRejectedCallbacks.shift()(reason)
	      }
	    }
	  }
	
	  then(onFulfilled, onRejected) {
	 
	     // 如果不传，就使用默认函数
		onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
		onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};
	    const thenPromise  = new MyPromise((resolve,reject) => {
	     // 判断状态
	     if (this.status === FULFILLED) {
	  
	        queueMicrotask(() => {
	          try{
	            // 获取成功回调函数的执行结果
	            const resloveRes = onFulfilled(this.value);
	            this.resolvePromise(thenPromise, resloveRes, resolve, reject)
	           
	          }catch(err){
	            reject(err)
	          }
	        
	        })
	         
	     } else if (this.status === REJECTED) {
	
	        queueMicrotask(() => {
	        try {
	          // 调用失败回调，并且把原因返回
	           let rejectRes = onRejected(this.reason);
	           this.resolvePromise(thenPromise, rejectRes, resolve, reject)
	         }catch(err) {
	           console.log(err)
	         }  
	       })
	     
	
	     }else if(this.status === PENDING) {
	        // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
	        // 等到执行成功失败函数的时候再传递
	        this.onFulfilledCallbacks.push(() => {
	            queueMicrotask(() => {
	                try{
	                  // 获取成功回调函数的执行结果
	                  const resloveRes = onFulfilled(this.value);
	                  this.resolvePromise(thenPromise, resloveRes, resolve, reject)
	                 
	                }catch(err){
	                  reject(err)
	                }
	              
	              })
	        })
	        this.onRejectedCallbacks.push(() => {
	            queueMicrotask(() => {
	                try {
	                  // 调用失败回调，并且把原因返回
	                   let rejectRes = onRejected(this.reason);
	                   this.resolvePromise(thenPromise, rejectRes, resolve, reject)
	                 }catch(err) {
	                   console.log(err)
	                 }  
	               })
	        })
	    }
	 })
	
	 return thenPromise
	
	  }
	
	  resolvePromise(thenPromise, res, resolve, reject) {
	     // 如果相等了，说明return的是自己，抛出类型错误并返回
	    if(thenPromise === res){
	
	        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
	
	    }
	    // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
	
	    if(res instanceof MyPromise){
	
	        res.then(resolve, reject)//先通过then获取到当前的resloveRes这个promise的状态，然后继续执行myPromise的then的逻辑
	
	    }else {
	
	    //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
	
	       resolve(res) // 将上一个then的返回值通过执行reslove(resloveRes)传递给下一个then，因为调用完reslove(resloveRes)就直接进入then了（如果后面有then的话）
	    }
	      
	  }
	  // resolve 静态方法
	  static resolve (parameter) {
		// 如果传入 MyPromise 就直接返回
		if (parameter instanceof MyPromise) {
		    return parameter;
		}
		
		// 转成常规方式
		return new MyPromise(resolve =>  {
		    resolve(parameter);
		});
	  }
		
	  // reject 静态方法
	  static reject (reason) {
		return new MyPromise((resolve, reject) => {
		    reject(reason);
		});
	  }
	}
	
	module.exports = MyPromise

#### 十二、Promise A+ 测试 ####

- 上面介绍了 Promise A+ 规范，当然我们手写的版本也得符合了这个规范才有资格叫 Promise， 不然就只能是伪 Promise 了。

- 上文讲到了 promises-aplus-tests，现在我们正式开箱使用

**1.安装**

    npm install promises-aplus-tests -D

**2.手写代码中加入 deferred**

	// MyPromise.js
	
	MyPromise {
	  ......
	}
	
	MyPromise.deferred = function () {
	  var result = {};
	  result.promise = new MyPromise(function (resolve, reject) {
	    result.resolve = resolve;
	    result.reject = reject;
	  });
	
	  return result;
	}
	module.exports = MyPromise;

**3. 配置启动命令**

	{
	  "name": "promise",
	  "version": "1.0.0",
	  "description": "my promise",
	  "main": "MyPromise.js",
	  "scripts": {
	    "test": "promises-aplus-tests MyPromise"
	  },
	  "author": "ITEM",
	  "license": "ISC",
	  "devDependencies": {
	    "promises-aplus-tests": "^2.1.2"
	  }
	}

- 虽然功能上没啥问题，但是测试却失败了，有一些细节，我们都没有处理

- 按照规范改造一下 resolvePromise 方法吧

// MyPromise.js

	function resolvePromise(promise, x, resolve, reject) {
	  // 如果相等了，说明return的是自己，抛出类型错误并返回
	  if (promise === x) {
	    return reject(new TypeError('The promise and the return value are the same'));
	  }
	
	  if (typeof x === 'object' || typeof x === 'function') {
	    // x 为 null 直接返回，走后面的逻辑会报错
	    if (x === null) {
	      return resolve(x);
	    }
	
	    let then;
	    try {
	      // 把 x.then 赋值给 then 
	      then = x.then;
	    } catch (error) {
	      // 如果取 x.then 的值时抛出错误 error ，则以 error 为据因拒绝 promise
	      return reject(error);
	    }
	
	    // 如果 then 是函数
	    if (typeof then === 'function') {
	      let called = false;
	      try {
	        then.call(
	          x, // this 指向 x
	          // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
	          y => {
	            // 如果 resolvePromise 和 rejectPromise 均被调用，
	            // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
	            // 实现这条需要前面加一个变量 called
	            if (called) return;
	            called = true;
	            resolvePromise(promise, y, resolve, reject);
	          },
	          // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
	          r => {
	            if (called) return;
	            called = true;
	            reject(r);
	          });
	      } catch (error) {
	        // 如果调用 then 方法抛出了异常 error：
	        // 如果 resolvePromise 或 rejectPromise 已经被调用，直接返回
	        if (called) return;
	
	        // 否则以 error 为据因拒绝 promise
	        reject(error);
	      }
	    } else {
	      // 如果 then 不是函数，以 x 为参数执行 promise
	      resolve(x);
	    }
	  } else {
	    // 如果 x 不为对象或者函数，以 x 为参数执行 promise
	    resolve(x);
	  }
	}
