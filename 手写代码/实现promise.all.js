/*
 *promise.all 的特点：
    入参是个由Promise实例组成的数组,如果数组里面不是promise，会调用Promise.reslove()将其转为promise
    入参为空数组则返回一个空数组
    返回值是个promise，因为可以使用.then
    如果全部成功，状态变为resolved, 并且返回值组成一个数组传给回调
    但凡有一个失败，状态变为rejected, 并将error返回给回调
     
 */

function myPromiseAll(promiseArr) {
    return new Promise((reslove,reject)=>{
        if(!Array.isArray(promiseArr)){
            return 
        }
        let reslut = []
        let count = 0
        if(promiseArr.length===0){
            reslove(result)
        }
        promiseArr.forEach((promise,index)=>{
            if(!(promise instanceof Promise)){
                promise = Promise.resolve(promise)
            }
            promise.then(res=>{
                reslut[index]=res
                count++
                if(count===promiseArr.length){
                   reslove(reslut)
                }
            },err=>{
                reject(err)
            })
        })
    })
 }

 let promise1 = 1
 let promise2 = new Promise(res=>{res(2)})
 let promise3 = new Promise(res=>{res(3)})

 myPromiseAll([promise1,promise2,promise3]).then(res=>{
     console.log(res)
 })