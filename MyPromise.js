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
