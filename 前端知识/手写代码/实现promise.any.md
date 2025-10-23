```
/*
promise.any 的特点：
    入参是个由Promise实例组成的数组,如果数组里面不是promise，会调用Promise.reslove()将其转为promise
    入参为空数组则返回一个new AggregateError('No Promise in Promise.any was resolved')
       AggregateError，当多个错误需要包装在一个错误中时，该对象表示一个错误。
    返回值是个promise，因为可以使用.then
    如果全部失败，状态变为rejected, 返回new AggregateError('No Promise in Promise.any was resolved')
    但凡有一个成功，状态变为resolved, 并且返回第一个正确结果，
     
 */

function myPromiseAny(promiseArr) {
    return new Promise((reslove,reject)=>{
       let count = 0
       if(!Array.isArray(promiseArr)){
           return 
       }
       if(promiseArr.length===0){
         reject(new AggregateError('All promises was resolved'))
       }
       promiseArr.forEach((promise)=>{
         if(!(promise instanceof Promise)){
            promise = Promise.resolve(promise)
          }
          promise.then(res=>{
            reslove(res)
          },err=>{
           count++
           if(count===promiseArr.length){
            reject(new AggregateError('All promises was resolved'))
           }
          })
      })
     })
}

let promise1 = new Promise((res,rej)=>{res(2)})
let promise2 = new Promise((res,rej)=>{rej(2)})
let promise3 = new Promise((res,rej)=>{rej(2)})

myPromiseAny([promise1,promise2,promise3]).then(res=>{
 console.log(res)
},err=>{
 console.log(err)
})


```

