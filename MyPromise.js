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

// module.exports = MyPromise