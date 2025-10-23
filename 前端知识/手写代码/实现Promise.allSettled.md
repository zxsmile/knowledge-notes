```
/*
Promise.allSettled 的特点：
    入参是个由Promise实例组成的数组,如果数组里面不是promise，会调用Promise.reslove()将其转为promise
    入参为空数组返回一个已完成（resolved）状态的 promise，其终值是一个空数组,和Promise.all一样
    返回值是个promise，因为可以使用.then
    返回一个数组，顺序同 promise 输入顺序
      resolved 状态时为 {status:'fulfilled', value:resolve的值}
      rejected 状态时为 {status:'rejected', reason:reject的值}。


 */

function myPromiseAllSettled(promiseArr) {
    return new Promise((resolve,reject)=>{
        if(!Array.isArray(promiseArr)){
            return 
        }
        if(promiseArr.length===0){
            resolve([])
        }
        let result = []
        let count = 0
        promiseArr.forEach((promise,index)=>{
            if(!(promise instanceof Promise)){
                promise = Promise.resolve(promise)
            }
            promise.then(res=>{
                   result[index] = { status: 'fulfilled', value: res }
                   count++
                   if(count===promiseArr.length){
                    resolve(result)
                   }
            },err=>{
                count++
                result[index] = { status: 'rejected', reason: err }
                if(count===promiseArr.length){
                    resolve(result)
                }
            })
        })
    })
 }

 let promise1 = 1
 let promise2 = new Promise((res,rej)=>{res(2)})
 let promise3 = new Promise((res,rej)=>{rej(2)})

 myPromiseAllSettled([promise1,promise2,promise3]).then(res=>{
     console.log(res)
 })


```

