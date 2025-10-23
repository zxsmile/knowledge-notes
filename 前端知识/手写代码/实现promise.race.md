```
/*
promise.race 的特点：
    入参是个由Promise实例组成的数组,如果数组里面不是promise，会调用Promise.reslove()将其转为promise
    入参为空数组,返回的Promise会一直保持在pending状态
    返回值是个promise，因为可以使用.then
    状态是和最快得到状态的promise保持一致
 */

function myPromiseRace(promiseArr) {
    return new Promise((reslove,reject)=>{
        if(!Array.isArray(promiseArr)){
            return 
        }
        promiseArr.forEach((promise,index)=>{
            if(!(promise instanceof Promise)){
                promise = Promise.resolve(promise)
            }
            promise.then(res=>{
                   reslove(res) // 某一promise完成后直接返回其值
            },err=>{
                reject(err)
            })
        })
    })
 }

 let promise1 = 1
 let promise2 = new Promise(res=>{res(2)})
 let promise3 = new Promise(res=>{res(3)})

 myPromiseRace([promise1,promise2,promise3]).then(res=>{
     console.log(res)
 })
```


