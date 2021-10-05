- try...catch...能捕捉到的异常，必须是线程执行已经进入 try catch 但 try catch 未执行完的时候抛出来的,这个时候才能被捕捉到。

1. 之前

- 代码报错的时候，线程执行未进入 try catch，那么无法捕捉异常。
  
   - 比如语法异常（syntaxError），因为语法异常是在语法检查阶段就报错了，线程执行尚未进入 try catch 代码块，自然就无法捕获到异常。

			try{
			    
			        a.
			  
			}catch(e){
			    console.log('捕获到错误了')
			}

        //报错

2. 之中

- 代码报错的时候，线程执行处于 try catch 之中，则能捕捉到异常。

          try{
			   a
			}catch(e){
			    console.log('捕获的错误了')
			}

         //捕获到错误了

3. 之后

- 代码报错的时候，线程已经执行完 try catch，这种不能捕捉到异常。

		try{
		    setTimeout(res=>{
		        a
		    },1000)
		}catch(e){
		    console.log('捕获到错误了')
		}        

       //报错

- setTimeout 里面报错，实际上是 1s 之后执行的代码报错，此时代码块 try catch 已经执行完成，故无法捕捉异常。

		try{
		    function fn(){
		        a
		    }
		}catch(e){
		    console.log('捕获到错误了')
		}
		
		fn()      

       //报错

- 方法定义在 try catch 代码块里面，但是执行方法在 try catch 外，在执行 fn 方法的时候报错，此时 try catch 已经执行完成，故而无法捕捉异常。
- 所以try...catch...捕获不到异步任务
- 解决方案：
    1. 可以将try...catch...写到异步里面

        setTimeout(res=>{
		  try{
		      a
		  }catch(e){
		      console.log('捕获到错误了')
		  }
		},1000)

    



4. promise

		try{
		    new Promise((reslove,reject)=>{
		        a
               console.log(666)
		    })
               console.log(333)
		}catch(e){
		    console.log('发生错误了')
		}

        //Uncaught (in promise) ReferenceError: a is not defined
        // 333

- 这里线程在执行 a的时候，事实上属于同步执行，try catch 并未执行完成，按理应该能捕捉到异常，这里为啥无法捕捉呢？
  - 这是因为，promise在执行
  
		  	(reslove,reject)=>{
				        a
		     }
   - 这个回调的时候被包裹在了try...catch...里面，其中所有的异常都被内部捕获到了，并未往上抛异常。try...catch...是不能冒泡的，内部捕获了，外部就捕获不到了。
   - 所以还能输出333
   - Promise 的异常都是由 reject 和 Promise.prototype.catch 来捕获，不管是同步还是异步。

			class MyPromise {
			    constructor (handle) {
			      if (!isFunction(handle)) {
			        throw new Error('MyPromise must accept a function as a parameter')
			      }

			      // 添加状态
			      this._status = PENDING

			      // 添加状态
			      this._value = undefined

			      // 添加成功回调函数队列
			      this._fulfilledQueues = []

			      // 添加失败回调函数队列
			      this._rejectedQueues = []

			      // 执行handle
			      try {
			        handle(this._resolve.bind(this), this._reject.bind(this)) 
			      } catch (err) {
			        this._reject(err)
			      }
			   }
			}

     
5. async/await

- 将try...catch写在async函数最外层并不能捕获async...await的异常，而是会走到Promise的异常抛出。

		async function fn(){
		    await a
		    
		}
		
		try{
		    fn()
		}catch(e){
		    console.log('捕获到错误了')
		}

        //报错

- 因为async返回了一个promise，所以执行它相当于在执行promise

- async...await捕获异常，需要将await函数写在try...catch中

		async function fn(){
		    try{
		        await a
		    }catch(e){
		        console.log('捕获到错误了')
		    }
		    
		}
		fn()

       // 捕获到错误了

