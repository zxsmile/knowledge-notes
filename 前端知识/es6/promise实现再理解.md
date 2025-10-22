#### 一、实现resolve和reject ####

		let p1 = new Promise((resolve, reject) => {
		    resolve('成功')
		    reject('失败')
		})
		console.log('p1', p1) //p1 Promise { <fulfilled> '成功' }
		
		let p2 = new Promise((resolve, reject) => {
		    reject('失败')
		    resolve('成功')
		})
		console.log('p2', p2) //p2 Promise { <rejected> '失败' }
		
		let p3 = new Promise((resolve, reject) => {
		    throw('报错')
		})
		console.log('p3', p3) //p3 Promise { <rejected> '报错' }


- 这里暴露出了四个知识点：

  1. 执行了resolve，Promise状态会变成fulfilled
  2. 执行了reject，Promise状态会变成rejected
  3. Promise只以第一次为准，第一次成功就永久为fulfilled，第一次失败就永远状态为rejected
  4. Promise中有throw的话，就相当于执行了reject

- 实现resolve和reject
- 大家要注意：Promise的初始状态是pending,这里很重要的一步是resolve和reject的绑定this，为什么要绑定this呢？这是为了resolve和reject的this指向永远指向当前的MyPromise实例，防止随着函数执行环境的改变而改变

			class myPromise{
			
			   constructor(handle){
			
			      //初始化状态
			      this.promiseState = 'pending'
			
			      //终值
			      this.promiseValue = null
			
			      // 初始化this
			      this.resolve = this.resolve.bind(this)
			      this.reject = this.reject.bind(this)
			
			      try{
			
			         // 执行传进来的函数
			         handle(this.resolve,this.reject)
			      }catch(e){
			         
			         // 捕捉到错误直接执行reject
			         this.reject(e)
			      }
			   }
			
			   resolve(value) {
			
			      // state是不可变的
			      if(this.promiseState !== 'pending'){
			         return
			      }
			
			      // 如果执行resolve，状态变为fulfilled
			      this.promiseState = 'fulfilled'
			
			      // 终值为传进来的值
			      this.promiseValue = value
			   }
			
			   reject(reason){
			
			      // state是不可变的
			      if(this.promiseState !== 'pending'){
			         return
			      }
			
			      // 如果执行reject，状态变为rejected
			      this.promiseState = 'rejected'
			
			      // 终值为传进来的reason
			      this.promiseValue = reason
			   }
			}


#### 二、then ####

- 咱们平时使用then方法是这么用的：

		// 马上输出 ”成功“
		const p1 = new Promise((resolve, reject) => {
		    resolve('成功')
		}).then(res => console.log(res), err => console.log(err))
		
		// 1秒后输出 ”失败“
		const p2 = new Promise((resolve, reject) => {
		    setTimeout(() => {
		        reject('失败')
		    }, 1000)
		}).then(res => console.log(res), err => console.log(err))
		
		// 链式调用 输出 200
		const p3 = new Promise((resolve, reject) => {
		    resolve(100)
		}).then(res => 2 * res, err => console.log(err))
		  .then(res => console.log(res), err => console.log(err))

- 可以总结出这几个知识点：

   - then接收两个回调，一个是成功回调，一个是失败回调
   - 当Promise状态为fulfilled执行成功回调，为rejected执行失败回调
   - 如resolve或reject在定时器里，则定时器结束后再执行then
   - then支持链式调用，下一次then执行受上一次then返回值的影响

- （1）实现then

		then(onFulfilled,onRejected) {
		     // 接收两个回调 onFulfilled, onRejected
		
		     // 参数校验，确保一定是函数
		    onFulfilled = typeof onFulfilled === 'function'?onFulfilled : val => val
		    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}
		    
		    if(this.promiseState === 'fulfilled'){
		        // 如果当前为成功状态，执行第一个回调
		       onFulfilled(this.promiseResult)
		    }
		
		    if(this.promiseState === 'rejected'){
		       // 如果当前为失败状态，执行第二个回调
		       onRejected(this.promiseResult)
		    }
		
		}


-  （2）定时器情况

     - 我们不能确保1秒后才执行then函数，但是我们可以保证1秒后再执行then里的回调，也就是在这1秒时间内，我们可以先把then里的两个回调保存起来，然后等到1秒过后，执行了resolve或者reject，咱们再去判断状态，并且判断要去执行刚刚保存的两个回调中的哪一个回调。
     - 那么问题来了，我们怎么知道当前1秒还没走完甚至还没开始走呢？其实很好判断，只要状态是pending，那就证明定时器还没跑完，因为如果定时器跑完的话，那状态肯定就不是pending，而是fulfilled或者rejected
     - 那是用什么来保存这些回调呢？建议使用数组，因为一个promise实例可能会多次then，用数组就一个一个保存了


			class myPromise{
			   constructor(handle){
			
			        // 初始化值
			        this.PromiseResult = null // 终值
			        this.PromiseState = 'pending' // 状态
			        this.onFulfilledCallbacks = [] // 保存成功回调
			        this.onRejectedCallbacks = [] // 保存失败回调


​			
​			      this.resolve = this.resolve.bind(this)
​			      this.reject = this.reject.bind(this)
​			     
			      try{
			         handle(this.resolve,this.reject)
			      }catch(e){
			         this.reject(e)
			      }
			   }
			
			   reslove(value){
			
			      // state是不可变的
			      if(this.promiseState !== 'pending'){
			         return
			      }
			
			        // 如果执行resolve，状态变为fulfilled
			        this.PromiseState = 'fulfilled'
			
			        // 终值为传进来的值
			        this.PromiseResult = value
			
			        // 执行保存的成功回调
			        while (this.onFulfilledCallbacks.length) {
			            this.onFulfilledCallbacks.shift()(this.PromiseResult)
			       }
			   }
			
			   reject(reason){
			
			      // state是不可变的
			      if(this.promiseState !== 'pending'){
			         return
			      }
			     
			        // 如果执行reject，状态变为rejected
			        this.PromiseState = 'rejected'
			
			        // 终值为传进来的reason
			        this.PromiseResult = reason
			
			        // 执行保存的失败回调
			        while (this.onRejectedCallbacks.length) {
			            this.onRejectedCallbacks.shift()(this.PromiseResult)
			        }
			   }
			
			   then(onFulfilled,onRejected) {
			      // 接收两个回调 onFulfilled, onRejected
			 
			      // 参数校验，确保一定是函数
			     onFulfilled = typeof onFulfilled === 'function'?onFulfilled : val => val
			     onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}
			     
			     if(this.promiseState === 'fulfilled'){
			         // 如果当前为成功状态，执行第一个回调
			        onFulfilled(this.promiseResult)
			
			     }else if(this.promiseState === 'rejected'){
			        // 如果当前为失败状态，执行第二个回调
			        onRejected(this.promiseResult)
			
			     }else if(this.promiseState === 'pending'){
			        // 如果状态为待定状态，暂时保存两个回调
			        this.onFulfilledCallbacks.push(onFulfilled.bind(this))
			        this.onRejectedCallbacks.push(onRejected.bind(this))
			     }
			 
			 }
			}


- （3）链式调用

    - then 方法必须返回一个新的 promise 对象，因此 promise 支持链式调用
    - 这里涉及到 Promise 的执行规则，包括“值的传递”和“错误捕获”机制：

      - 如果 onFulfilled 或者 onRejected 返回一个值 x

         - 若 x 不为 Promise ，则使 x 直接作为新返回的 Promise 对象的值， 即新的onFulfilled 或者 onRejected 函数的参数.
         - 若 x 为 Promise ，这时后一个回调函数，就会等待该 Promise 对象(即 x )的状态发生变化，才会被调用，并且新的 Promise 状态和 x 的状态相同。
         - 如果 onFulfilled 或者onRejected 抛出一个异常 e ，则 promise2 必须变为失败（Rejected），并返回失败的值 e

				let promise1 = new Promise((resolve, reject) => {
				    setTimeout(() => {
				      resolve('success')
				    }, 1000)
				  })
				  promise2 = promise1.then(res => {
				    throw new Error('这里抛出一个异常e')
				  })
				  promise2.then(res => {
				    console.log(res)
				  }, err => {
				    console.log(err) //1秒后打印出：这里抛出一个异常e
				  })
    
    - 实现：

			then(onFulfilled,onRejected) {
			
			   onFulfilled = typeof onFulfilled === 'function'?onFulfilled:val => val
			   onRejected = typeof onRejected === 'function'? onRejected : reason => {throw reason}
			
			   return new MyPromise((onFulfilledNext,onRejectedNext) => {
			      let resultPromise = lastThen =>{
			         try{
			
			            let x = lastThen(this.promiseResult)
			            if(x instanceof MyPromise){
			               //如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
			               x.then(onFulfilledNext,onRejectedNext)
			            }else{
			               //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
			               onFulfilledNext(x)
			            }
			         }catch(e){
			           // 如果函数执行出错，新的Promise对象的状态为失败
			           onRejectedNext(e)
			         }
			      }
			
			      if(this.promiseState === 'fulfilled'){
			         // 如果当前为成功状态，执行第一个回调
			         resultPromise(onFulfilled)
			      }else if(this.promiseState === 'rejected'){
			         // 如果当前为成功状态，执行第一个回调
			         resultPromise(onRejected)
			      }else if(promiseState === 'pending'){
			         // 如果状态为待定状态，暂时保存两个回调
			         // 如果状态为待定状态，暂时保存两个回调
			         this.onFulfilledCallbacks.push(resultPromise.bind(this,onFulfilled))
			         this.onRejectedCallbacks.push(resultPromise.bind(this,onRejected))
			      }
			   })
			
			}
		
		
      	​	

  -（4）要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。并且如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态

             reslove(value){
      
                  if(value instanceof MyPromise){
                     
	                   return value.then(this.resolve,this.reject)
                  }
        	
                  setTimeout(() => {
	    
	                     // state是不可变的
	    		      if(this.promiseState !== 'pending'){
	    		         return
	    		      }
	    		
	    		        // 如果执行resolve，状态变为fulfilled
	    		        this.PromiseState = 'fulfilled'
	    		
	    		        // 终值为传进来的值
	    		        this.PromiseResult = value
	    		
	    		        // 执行保存的成功回调
	    		        while (this.onFulfilledCallbacks.length) {
    		            this.onFulfilledCallbacks.shift()(this.PromiseResult)
      		       }
	    
	                })
	    	   }
	    	
      	   reject(reason){
      	
                  setTimeout(() => {
	                  
	                     // state是不可变的
	    		      if(this.promiseState !== 'pending'){
	    		         return
	    		      }
	    		     
	    		        // 如果执行reject，状态变为rejected
	    		        this.PromiseState = 'rejected'
	    		
	    		        // 终值为传进来的reason
	    		        this.PromiseResult = reason
	    		
	    		        // 执行保存的失败回调
	    		        while (this.onRejectedCallbacks.length) {
	    		            this.onRejectedCallbacks.shift()(this.PromiseResult)
      		        }
	     
	                })
	    	   
      	   }
  
    
  
  

 #### 三、全部代码 ####

	class MyPromise{
	   constructor(handle) {
	       this.promiseState = 'pending'
	       this.promiseResult = null
	       this.onFulfilledCallbacks = []
	       this.onRejectedCallbacks = []
	       try{
	          this.handle(this.resolve.bind(this),this.reject.bind(this))
	       }catch(e){
	          this.reject(e)
	       }
	
	   }
	
	   resolve(value) {
	      if(value instanceof MyPromise){
	         return value.then(this.resolve,this.reject)
	      }
	
	      setTimeout(() => {
	         if(this.promiseState !== 'pending'){
	            return
	         }
	         this.promiseState = 'fulfilled'
	         this.promiseResult = value
	         while(this.onFulfilledCallbacks.length){
	            this.onFulfilledCallbacks.shift()(this.promiseResult)
	         }
	      })
	   }
	
	   reject(reason) {
	      setTimeout(() => {
	         if(this.promiseState !== 'pending'){
	            return
	         }
	         this.promiseState = 'rejected'
	         this.promiseResult = reason
	         while(this.onRejectedCallbacks.length){
	            this.onRejectedCallbacks.shift()(this.promiseResult)
	         }
	      })
	   }
	
	   then(onFulfilled,onRejected){
	      onFullfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
	      onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}
	      return new MyPromise((onFulfilledNext,onRejectedNext) => {
	         let resultPromise =  lastThen => {
	            try{
	              let x = lastThen(this.promiseResult)
	              if(x instanceof MyPromise){
	                 x.then(onFulfilledNext,onRejectedNext)
	              }else{
	               onFulfilledNext(x)
	              }
	            }catch(e){
	               onRejectedNext(e)
	            }
	         }
	
	         if(this.promiseState === 'fulfilled'){
	            resultPromise(onFulfilled)
	         }else if(this.promiseState === 'rejected'){
	            resultPromise(onRejected)
	         }else if(this.promiseState === 'pending'){
	            this.onFulfilledCallbacks.push(resultPromise.bind(this,onFulfilled))
	            this.onRejectedCallbacks.push(resultPromise.bind(this,onRejected))
	         }
	      })
	   }
	}





 :

其实是这样的
当then 返回promise 的时候，需将返回promise 丢进微队列，并且当它完成，才能让包裹他的promise 变fufilled 状态，才能将输出res 的promise 丢进微任务。
微队列目前已经有了[0,1]加他就是 【0,1，promise.resolve(4).then(()=>完成p0】
然后输出0，但0所在的promsie 改不了状态，所以继续输出1，并将2丢进微队列，此时微队列是【promise.resolve(4).then(()=>完成p0)，2】
然后执行微队列[0]，微队列就成了[2，()=>完成p0]，
继续输出2，将输出3加入微队列。微队列就成了[()=>完成p0，3]
下来就执行()=>完成p0 那么p0 就是fufilled ，那么就将输出res 的promise 加入微任务。
微队列就成了[3，输出res] 剩下的就没事了









感觉链式调用那里讲的不是很清楚，resolvePromise这个方法应该解决的是链式调用的“值穿透”问题吧。
①当then中返回的是普通值的时候，要调用一次promise2的resolve方法，从而将promise2的value设置为then中返回的普通值，传给后面的链式结构。
②当then中返回的是一个新的promise时，就调用它本身的then方法，根据返回的新的promise的状态来设置promise2的value或者reason的值，如果返回的新的promise状态为fulfilled，也就是说在返回的新的promise中已经调用了resolve方法，那么此时调用promise2中的resolve方法，将返回的新的promise中的value赋值给promise2的value。
从而实现值穿透，个人理解，不知道对不对。


