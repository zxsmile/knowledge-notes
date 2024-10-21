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

 （4）Promise中使用resolve和reject**两个函数**来更改状态，resolve和reject是我们的内置函数，用户在调用的时候会传入参数

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
 
1.Promise 可以 then 多次，Promise 的 then 方法返回一个新的 Promise。

2.如果 then 返回的是一个正常值，那么就会把这个结果（value）作为参数，传递给下一个 then 的成功的回调（onFulfilled）

3.如果 then 中抛出了异常，那么就会把这个异常（reason）作为参数，传递给下一个 then 的失败的回调(onRejected)

4.如果 then 返回的是一个 promise 或者其他 thenable 对象，那么需要等这个 promise 执行完撑，promise 如果成功，就走下一个 then 的成功回调；如果失败，就走下一个 then 的失败回调。

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

- 在then中返回一个新的promise因为promise自带then，因此就可以实现链式调用！

- **思路理解：**

   1.promise在new的时候会在执行构造方法时，执行传入func。

   2.resolve和reject会被作为参数传入到func中。

   3.因为resolve和reject可以更新promise的状态和结果，所以func执行完之后promise的状态和结果就决定了。

   4.所以在new promise实例这个过程中，无论同步或异步，这个过程完成之后都会确定当前promise的状态和结果。

   5.链式调用需要返回一个promise，所以会在then函数中new promise。

   6.实例化promise的时候需要传入一个func，并执行，如（3）所示，那这个func怎么获得呢？

   7.所以我们会通过前一个promise的状态和结果以及then方法的两个入参（**使用者传递的成功回调和失败回调**）去为新的promise构造一个func。

   8.在then中实例化一个promise，并执行（7）中构造的func，当func执行完之后，我们新实例化的promise状态也确定了，最后返回的就是一个状态和结果确定的promise实例。

   9.如果针对上一个实例继续执行.then，相当于继续从（5）到（8）的操作

   - 基于前一个promise的状态，结果以及then的两个参数（**使用者传递的成功回调和失败回调**）去为新的promise创建func，创建新的promise实例。

   - 执行完之后，得到一个状态确定结果确定promise实例，并return出去就行。继续then就继续循环即可。

- 在正式开始之前先看看es6内置的promise在链式调用的时候是什么样子的。

	let promise = new Promise((resolve,reject) => {
	  reject('结果')
	})
	
	promise.then(res => {
	  console.log('第一个then成功',res)
	  return res + 1
	},rej=>{
	  console.log('第一个then失败',rej)
	  return rej + 1
	}).then(res => {
	  console.log('第二个then成功',res)
	  return res + 1
	},rej=>{
	  console.log('第二个then失败',rej)
	  return rej + 1
	}).then(res => {
	  console.log('第三个then成功',res)
	  return res + 1
	},rej=>{
	  console.log('第三个then失败',rej)
	  return rej + 1
	})

	//第一个then失败 结果
	//第二个then成功 结果1
	//第三个then成功 结果11

- **可以看到第一个then是接收第一个promise的失败结果，而后续的then返回的promise都是成功的状态。**

- **因此我们知道then中promise都会用resolve去接收执行结果。**

- **说明无论第一个promise状态是成功或失败，后续的promise都会用resolve去接收成功回调或失败回调中函数的执行结果。**

- **有朋友可能会疑惑？**

- **那reject来干嘛，其实reject更多的是处理函数的异常情况。**

    let promise = new Promise((resolve,reject) => {
	  reject('结果')
	})
	
	promise.then(res => {
	  console.log('第一个then成功',res)
	  return res + 1
	},rej=>{
	  console.log('第一个then失败',rej)
	  return rej + 1
	}).then(res => {
	  console.log('第二个then成功',res)
	  return res + 1 + a
	},rej=>{
	  console.log('第二个then失败',rej)
	  return rej + 1
	}).then(res => {
	  console.log('第三个then成功',res)
	  return res + 1
	},rej=>{
	  console.log('第三个then失败',rej)
	  return rej + 1
	})

	//第一个then失败 结果
	//第二个then成功 结果1
	//第三个then失败 ReferenceError: a is not defined

- 上面例子中，定义了一个未存在的变量 a 所以执行成功回调时报错了返回的promise就是reject状态的。

- 接着改：

      then(onFulfilled, onRejected) {
         let thenPromise = new MyPromise((resolve,reject) => {
             // 判断状态
		     if (this.status === FULFILLED) {

		         // 获取成功回调函数的执行结果
                const resolveRes = onFulfilled(this.value);

                // 传入resolvePromise集中处理
                resolvePromise(x,resolve,reject)

		     } else if (this.status === REJECTED) {

		      // 调用失败回调，并且把原因返回
		       let rejectRes = onRejected(this.reason);
 
              // 传入resolvePromise集中处理
                resolvePromise(x,resolve,reject)

		     }else if(this.status === PENDING) {

		        // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
			    // 等到执行成功失败函数的时候再传递
		        this.onFulfilledCallbacks.push(onFulfilled)
		        this.onRejectedCallbacks.push(onRejected)
		    }
         })

        return thenPromise
	  }


- **重点理解resolvePromise**

    function resolvePromise(thenPromise, x, resolve, reject) {

	  if (x === thenPromise) {

	    // 因为x是回调的结果值，如果x指向thenPromise即自己，那么会重新解析自己，导致循环调用
	    throw new TypeError("禁止循环调用");
	  }
	  
	  // 如果x是一个Promise，我们必须等它完成（失败或成功）后得到一个普通值时，才能继续执行。

	  // 那我们把要执行的任务放在x.then（）的成功回调和失败回调里面即可

	  // 这就表示x完成后就会调用我们的代码。
	  


	  // 但是对于成功的情况,我们还需要再考虑下,x.then成功回调函数的参数,我们称为y

	  // 那y也可能是一个thenable对象或者promise

	  // 所以如果成功时，执行resolvePromise(promise2, y, resolve, reject)

	  // 并且传入resolve, reject，当解析到普通值时就resolve出去，反之继续解析

	  // 这样子用于保证最后resolve的结果一定是一个非promise类型的参数

	  if (x instanceof myPromise) {
	    x.then((y) => {
	      resolvePromise(thenPromise, y, resolve, reject);
	    },  r => reject(r));
	  } 

	  // (x instanceof myPromise) 处理了promise的情况，但是很多时候交互的promise可能不是原生的

	  // 就像我们现在写的一个myPromise一样，这种有then方法的对象或函数我们称为thenable。

	  // 因此我们需要处理thenable。

	  else if ((typeof x === "object" || typeof x === "function") && x !== null ) {

	    try {

	      // 暂存x这个对象或函数的then，x也可能没有then，那then就会得到一个undefined
	      var then = x.then;

	    } catch (e) {

	      // 如果读取then的过程中出现异常则reject异常出去
	      return reject(e);

	    }

	    // 判断then是否函数且存在，如果函数且存在那这个就是合理的thenable，我们要尝试去解析

	    if (typeof then === "function") {

	      // 状态只能更新一次使用一个called防止反复调用
	      // 因为成功和失败的回调只能执行其中之一

	      let called = false;
	      try {
	        then.call(
	          x,
	          (y) => {

	            // called就是用于防止成功和失败被同时执行，因为这个是thenable，不是promise

	            // 需要做限制如果thenPromise已经成功或失败了，则不会再处理了
	            if (called) return;
	            called = true;
	            resolvePromise(thenPromise, y, resolve, reject);
	          },
	          (r) => {

	            // called就是用于防止成功和失败被同时执行，因为这个是thenable，不是promise

	            // 需要做限制如果thenPromise已经成功或失败了，则不会再处理了
	            if (called) return;
	            called = true;
	            reject(r);
	          }
	        );
	        // 上面那一步等价于，即这里把thenable当作类似于promise的对象去执行then操作

	        // x.then(
	        //   (y) => {
	        //     if (called) return;
	        //     called = true;
	        //     resolvePromise(thenPromise, y, resolve, reject);
	        //   },
	        //   (r) => {
	        //     if (called) return;
	        //     called = true;
	        //     reject(r);
	        //   }
	        // )

	      } catch (e) {

	        // called就是用于防止成功和失败被同时执行，因为这个是thenable，不是promise

	        // 需要做限制如果thenPromise已经成功或失败了，则不会再处理了

	        if (called) return;
	        called = true;
	        reject(e);
	      }
	    } else {

	      // 如果是对象或函数但不是thenable（即没有正确的then属性）
	      // 当成普通值则直接resolve出去
	      resolve(x);
	    }
	  } 

	  // 如果既不是promise，也不是非null的对象或函数，当成普通值则直接resolve出去

	  else {

	    return resolve(x);

	  }
	}


- 在理解resolvePromise的时候可以这样子去思考：

     - **promise需要resolve或reject出去一个普通值。（前提）**

     - **但是我们在获取成功回调结果或失败回调结果时。**

     - **可能拿到的结果是promise或者thenable，因此 resolvePromise 就针对结果去解析promise，thenable，使其最后也返回一个普通值的过程。**

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
	    let thenPromise = new MyPromise((resolve,reject) => {
	        // 判断状态
	        if (this.status === FULFILLED) {
	
	          // 获取成功回调函数的执行结果
	          const x = onFulfilled(this.value);
	
	          // 传入resolvePromise集中处理
	          this.resolvePromise(thenPromise,x,resolve,reject)
	
	        } else if (this.status === REJECTED) {
	
	          // 调用失败回调，并且把原因返回
	          let x = onRejected(this.reason);
	
	          // 传入resolvePromise集中处理
	          this.resolvePromise(thenPromise,x,resolve,reject)
	
	        }else if(this.status === PENDING) {
	
	          // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
	          // 等到执行成功失败函数的时候再传递
	          this.onFulfilledCallbacks.push(onFulfilled)
	          this.onRejectedCallbacks.push(onRejected)
	  
	        }
	    })
	
	    return thenPromise
	  }
	
	    
	  resolvePromise(thenPromise, x, resolve, reject) {
	
	    if (x === thenPromise) {
	
	      // 因为x是回调的结果值，如果x指向thenPromise即自己，那么会重新解析自己，导致循环调用
	      throw new TypeError("禁止循环调用");
	    }
	    
	    // 如果x是一个Promise，我们必须等它完成（失败或成功）后得到一个普通值时，才能继续执行。
	
	    // 那我们把要执行的任务放在x.then（）的成功回调和失败回调里面即可
	
	    // 这就表示x完成后就会调用我们的代码。
	  
	
	
	    // 但是对于成功的情况,我们还需要再考虑下,x.then成功回调函数的参数,我们称为y
	
	    // 那y也可能是一个thenable对象或者promise
	
	    // 所以如果成功时，执行resolvePromise(promise2, y, resolve, reject)
	
	    // 并且传入resolve, reject，当解析到普通值时就resolve出去，反之继续解析
	
	    // 这样子用于保证最后resolve的结果一定是一个非promise类型的参数
	
	    if (x instanceof MyPromise) {
	      x.then((y) => {
	        this.resolvePromise(thenPromise, y, resolve, reject);
	      },  r => reject(r));
	    } 
	
	    // (x instanceof MyPromise) 处理了promise的情况，但是很多时候交互的promise可能不是原生的
	
	    // 就像我们现在写的一个MyPromise一样，这种有then方法的对象或函数我们称为thenable。
	
	    // 因此我们需要处理thenable。
	
	  else if ((typeof x === "object" || typeof x === "function") && x !== null ) {
	
	    try {
	
	      // 暂存x这个对象或函数的then，x也可能没有then，那then就会得到一个undefined
	      var then = x.then;
	
	    } catch (e) {
	
	      // 如果读取then的过程中出现异常则reject异常出去
	      return reject(e);
	
	    }
	
	    // 判断then是否函数且存在，如果函数且存在那这个就是合理的thenable，我们要尝试去解析
	
	    if (typeof then === "function") {
	
	      // 状态只能更新一次使用一个called防止反复调用
	      // 因为成功和失败的回调只能执行其中之一
	
	      let called = false;
	      try {
	        then.call(
	          x,
	          (y) => {
	
	            // called就是用于防止成功和失败被同时执行，因为这个是thenable，不是promise
	
	            // 需要做限制如果thenPromise已经成功或失败了，则不会再处理了
	            if (called) return;
	            called = true;
	            this.resolvePromise(thenPromise, y, resolve, reject);
	          },
	          (r) => {
	
	            // called就是用于防止成功和失败被同时执行，因为这个是thenable，不是promise
	
	            // 需要做限制如果thenPromise已经成功或失败了，则不会再处理了
	            if (called) return;
	            called = true;
	            reject(r);
	          }
	        );
	        // 上面那一步等价于，即这里把thenable当作类似于promise的对象去执行then操作
	
	        // x.then(
	        //   (y) => {
	        //     if (called) return;
	        //     called = true;
	        //     resolvePromise(thenPromise, y, resolve, reject);
	        //   },
	        //   (r) => {
	        //     if (called) return;
	        //     called = true;
	        //     reject(r);
	        //   }
	        // )
	
	      } catch (e) {
	
	        // called就是用于防止成功和失败被同时执行，因为这个是thenable，不是promise
	
	        // 需要做限制如果thenPromise已经成功或失败了，则不会再处理了
	
	        if (called) return;
	        called = true;
	        reject(e);
	      }
	    } else {
	
	      // 如果是对象或函数但不是thenable（即没有正确的then属性）
	      // 当成普通值则直接resolve出去
	      resolve(x);
	    }
	  } 
	
	  // 如果既不是promise，也不是非null的对象或函数，当成普通值则直接resolve出去
	  else {
	
	    return resolve(x);
	
	   }
	  }
	}

	module.exports = MyPromise

- 上面例子，执行一下，结果

	1
	resolve success

	Uncaught (in promise) TypeError: Chaining cycle detected for promise #<Promise>

- 执行一下，竟然报错了

#### 七、创建微任务 ####

- 上面代码为啥会报错呢？从错误提示可以看出，**我们必须要等 promise2 完成初始化。这个时候我们就要用上宏微任务和事件循环的知识了，这里就需要创建一个异步函数去等待 promise2 完成初始化，前面我们已经确认了创建微任务的技术方案 --> queueMicrotask**

	 then(onFulfilled, onRejected) {
	    let thenPromise = new MyPromise((resolve,reject) => {
	        // 判断状态
	        if (this.status === FULFILLED) {
	       
	          queueMicrotask(() => {
	
	            // 获取成功回调函数的执行结果
	            const x = onFulfilled(this.value);
	
	            // 传入resolvePromise集中处理
	            this.resolvePromise(thenPromise,x,resolve,reject)
	
	          })
	         
	
	        } else if (this.status === REJECTED) {
	 
	        queueMicrotask(() => {
	
	          // 调用失败回调，并且把原因返回
	          let x = onRejected(this.reason);
	
	          // 传入resolvePromise集中处理
	          this.resolvePromise(thenPromise,x,resolve,reject)
	        })
	        
	        }else if(this.status === PENDING) {
	
	          // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
	          // 等到执行成功失败函数的时候再传递
	          this.onFulfilledCallbacks.push(onFulfilled)
	          this.onRejectedCallbacks.push(onRejected)
	  
	        }
	    })
	
	    return thenPromise
	  }

- 这里得到我们的结果:

	1
    resolve success
    2
    resolve other

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
	    let thenPromise = new MyPromise((resolve,reject) => {
	        // 判断状态
	        if (this.status === FULFILLED) {
	       
	          queueMicrotask(() => {
	
	            try{
	
	              // 获取成功回调函数的执行结果
	              const x = onFulfilled(this.value);
	
	              // 传入resolvePromise集中处理
	              this.resolvePromise(thenPromise,x,resolve,reject)
	
	            }catch(error){
	     
	              reject(error)
	               
	            }
	            
	
	          })
	         
	
	        } else if (this.status === REJECTED) {
	 
	        queueMicrotask(() => {
	
	          try{
	
	            // 调用失败回调，并且把原因返回
	            let x = onRejected(this.reason);
	
	            // 传入resolvePromise集中处理
	            this.resolvePromise(thenPromise,x,resolve,reject)
	
	          }catch(error){
	
	            reject(error)
	            
	          }
	
	        })
	
	        }else if(this.status === PENDING) {
	
	          // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
	          // 等到执行成功失败函数的时候再传递
	          this.onFulfilledCallbacks.push(onFulfilled)
	          this.onRejectedCallbacks.push(onRejected)
	  
	        }
	    })
	
	    return thenPromise
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

	    let thenPromise = new MyPromise((resolve,reject) => {
	        // 判断状态
	        if (this.status === FULFILLED) {
	       
	          queueMicrotask(() => {
	
	            try{
	
	              // 获取成功回调函数的执行结果
	              const x = onFulfilled(this.value);
	
	              // 传入resolvePromise集中处理
	              this.resolvePromise(thenPromise,x,resolve,reject)
	
	            }catch(error){
	     
	              reject(error)
	               
	            }
	            
	
	          })
	         
	
	        } else if (this.status === REJECTED) {
	 
	        queueMicrotask(() => {
	
	          try{
	
	            // 调用失败回调，并且把原因返回
	            let x = onRejected(this.reason);
	
	            // 传入resolvePromise集中处理
	            this.resolvePromise(thenPromise,x,resolve,reject)
	
	          }catch(error){
	
	            reject(error)
	
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
	  const thenPromise = new MyPromise((resolve, reject) => {
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
	    
	    let thenPromise = new MyPromise((resolve,reject) => {
	        // 判断状态
	        if (this.status === FULFILLED) {
	       
	          queueMicrotask(() => {
	
	            try{
	
	              // 获取成功回调函数的执行结果
	              const x = onFulfilled(this.value);
	
	              // 传入resolvePromise集中处理
	              this.resolvePromise(thenPromise,x,resolve,reject)
	
	            }catch(error){
	     
	              reject(error)
	               
	            }
	            
	
	          })
	         
	
	        } else if (this.status === REJECTED) {
	 
	        queueMicrotask(() => {
	
	          try{
	
	            // 调用失败回调，并且把原因返回
	            let x = onRejected(this.reason);
	
	            // 传入resolvePromise集中处理
	            this.resolvePromise(thenPromise,x,resolve,reject)
	
	          }catch(error){
	
	            reject(error)
	
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
	
	    
	  resolvePromise(thenPromise, x, resolve, reject) {
	
	    if (x === thenPromise) {
	
	      // 因为x是回调的结果值，如果x指向thenPromise即自己，那么会重新解析自己，导致循环调用
	      throw new TypeError("禁止循环调用");
	    }
	    
	    // 如果x是一个Promise，我们必须等它完成（失败或成功）后得到一个普通值时，才能继续执行。
	
	    // 那我们把要执行的任务放在x.then（）的成功回调和失败回调里面即可
	
	    // 这就表示x完成后就会调用我们的代码。
	  
	
	
	    // 但是对于成功的情况,我们还需要再考虑下,x.then成功回调函数的参数,我们称为y
	
	    // 那y也可能是一个thenable对象或者promise
	
	    // 所以如果成功时，执行resolvePromise(promise2, y, resolve, reject)
	
	    // 并且传入resolve, reject，当解析到普通值时就resolve出去，反之继续解析
	
	    // 这样子用于保证最后resolve的结果一定是一个非promise类型的参数
	
	    if (x instanceof MyPromise) {
	      x.then((y) => {
	        this.resolvePromise(thenPromise, y, resolve, reject);
	      },  r => reject(r));
	    } 
	
	    // (x instanceof MyPromise) 处理了promise的情况，但是很多时候交互的promise可能不是原生的
	
	    // 就像我们现在写的一个MyPromise一样，这种有then方法的对象或函数我们称为thenable。
	
	    // 因此我们需要处理thenable。
	
	  else if ((typeof x === "object" || typeof x === "function") && x !== null ) {
	
	    try {
	
	      // 暂存x这个对象或函数的then，x也可能没有then，那then就会得到一个undefined
	      var then = x.then;
	
	    } catch (e) {
	
	      // 如果读取then的过程中出现异常则reject异常出去
	      return reject(e);
	
	    }
	
	    // 判断then是否函数且存在，如果函数且存在那这个就是合理的thenable，我们要尝试去解析
	
	    if (typeof then === "function") {
	
	      // 状态只能更新一次使用一个called防止反复调用
	      // 因为成功和失败的回调只能执行其中之一
	
	      let called = false;
	      try {
	        then.call(
	          x,
	          (y) => {
	
	            // called就是用于防止成功和失败被同时执行，因为这个是thenable，不是promise
	
	            // 需要做限制如果thenPromise已经成功或失败了，则不会再处理了
	            if (called) return;
	            called = true;
	            this.resolvePromise(thenPromise, y, resolve, reject);
	          },
	          (r) => {
	
	            // called就是用于防止成功和失败被同时执行，因为这个是thenable，不是promise
	
	            // 需要做限制如果thenPromise已经成功或失败了，则不会再处理了
	            if (called) return;
	            called = true;
	            reject(r);
	          }
	        );
	        // 上面那一步等价于，即这里把thenable当作类似于promise的对象去执行then操作
	
	        // x.then(
	        //   (y) => {
	        //     if (called) return;
	        //     called = true;
	        //     resolvePromise(thenPromise, y, resolve, reject);
	        //   },
	        //   (r) => {
	        //     if (called) return;
	        //     called = true;
	        //     reject(r);
	        //   }
	        // )
	
	      } catch (e) {
	
	        // called就是用于防止成功和失败被同时执行，因为这个是thenable，不是promise
	
	        // 需要做限制如果thenPromise已经成功或失败了，则不会再处理了
	
	        if (called) return;
	        called = true;
	        reject(e);
	      }
	    } else {
	
	      // 如果是对象或函数但不是thenable（即没有正确的then属性）
	      // 当成普通值则直接resolve出去
	      resolve(x);
	    }
	  } 
	
	  // 如果既不是promise，也不是非null的对象或函数，当成普通值则直接resolve出去
	  else {
	
	    return resolve(x);
	
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
	    
	    let thenPromise = new MyPromise((resolve,reject) => {
	        // 判断状态
	        if (this.status === FULFILLED) {
	       
	          queueMicrotask(() => {
	
	            try{
	
	              // 获取成功回调函数的执行结果
	              const x = onFulfilled(this.value);
	
	              // 传入resolvePromise集中处理
	              this.resolvePromise(thenPromise,x,resolve,reject)
	
	            }catch(error){
	     
	              reject(error)
	               
	            }
	            
	
	          })
	         
	
	        } else if (this.status === REJECTED) {
	 
	        queueMicrotask(() => {
	
	          try{
	
	            // 调用失败回调，并且把原因返回
	            let x = onRejected(this.reason);
	
	            // 传入resolvePromise集中处理
	            this.resolvePromise(thenPromise,x,resolve,reject)
	
	          }catch(error){
	
	            reject(error)
	
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
	
	    
	  resolvePromise(thenPromise, x, resolve, reject) {
	
	    if (x === thenPromise) {
	
	      // 因为x是回调的结果值，如果x指向thenPromise即自己，那么会重新解析自己，导致循环调用
	      throw new TypeError("禁止循环调用");
	    }
	    
	    // 如果x是一个Promise，我们必须等它完成（失败或成功）后得到一个普通值时，才能继续执行。
	
	    // 那我们把要执行的任务放在x.then（）的成功回调和失败回调里面即可
	
	    // 这就表示x完成后就会调用我们的代码。
	  
	
	
	    // 但是对于成功的情况,我们还需要再考虑下,x.then成功回调函数的参数,我们称为y
	
	    // 那y也可能是一个thenable对象或者promise
	
	    // 所以如果成功时，执行resolvePromise(promise2, y, resolve, reject)
	
	    // 并且传入resolve, reject，当解析到普通值时就resolve出去，反之继续解析
	
	    // 这样子用于保证最后resolve的结果一定是一个非promise类型的参数
	
	    if (x instanceof MyPromise) {
	      x.then((y) => {
	        this.resolvePromise(thenPromise, y, resolve, reject);
	      },  r => reject(r));
	    } 
	
	    // (x instanceof MyPromise) 处理了promise的情况，但是很多时候交互的promise可能不是原生的
	
	    // 就像我们现在写的一个MyPromise一样，这种有then方法的对象或函数我们称为thenable。
	
	    // 因此我们需要处理thenable。
	
	  else if ((typeof x === "object" || typeof x === "function") && x !== null ) {
	
	    try {
	
	      // 暂存x这个对象或函数的then，x也可能没有then，那then就会得到一个undefined
	      var then = x.then;
	
	    } catch (e) {
	
	      // 如果读取then的过程中出现异常则reject异常出去
	      return reject(e);
	
	    }
	
	    // 判断then是否函数且存在，如果函数且存在那这个就是合理的thenable，我们要尝试去解析
	
	    if (typeof then === "function") {
	
	      // 状态只能更新一次使用一个called防止反复调用
	      // 因为成功和失败的回调只能执行其中之一
	
	      let called = false;
	      try {
	        then.call(
	          x,
	          (y) => {
	
	            // called就是用于防止成功和失败被同时执行，因为这个是thenable，不是promise
	
	            // 需要做限制如果thenPromise已经成功或失败了，则不会再处理了
	            if (called) return;
	            called = true;
	            this.resolvePromise(thenPromise, y, resolve, reject);
	          },
	          (r) => {
	
	            // called就是用于防止成功和失败被同时执行，因为这个是thenable，不是promise
	
	            // 需要做限制如果thenPromise已经成功或失败了，则不会再处理了
	            if (called) return;
	            called = true;
	            reject(r);
	          }
	        );
	        // 上面那一步等价于，即这里把thenable当作类似于promise的对象去执行then操作
	
	        // x.then(
	        //   (y) => {
	        //     if (called) return;
	        //     called = true;
	        //     resolvePromise(thenPromise, y, resolve, reject);
	        //   },
	        //   (r) => {
	        //     if (called) return;
	        //     called = true;
	        //     reject(r);
	        //   }
	        // )
	
	      } catch (e) {
	
	        // called就是用于防止成功和失败被同时执行，因为这个是thenable，不是promise
	
	        // 需要做限制如果thenPromise已经成功或失败了，则不会再处理了
	
	        if (called) return;
	        called = true;
	        reject(e);
	      }
	    } else {
	
	      // 如果是对象或函数但不是thenable（即没有正确的then属性）
	      // 当成普通值则直接resolve出去
	      resolve(x);
	    }
	  } 
	
	  // 如果既不是promise，也不是非null的对象或函数，当成普通值则直接resolve出去
	  else {
	
	    return resolve(x);
	
	   }
	  }
	
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

#### 十二、 ####

