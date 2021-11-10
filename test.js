//实现promise以及并发功能

let myPromise  =  function (promiseArr,limit){
    return new Promise((resolve,reject) => {
            let result = []
            let count = 0
            let len = promiseArr.length
            let limitArr = promiseArr.splice(0)
            limitArr.forEach((promise,index) =>{
                promise = Promise.resolve(promise)
                if(index>limit){
                    
                }else{
                    promise.then(res =>{
                        result[index] = res
                        count++
                        limitArr.splice(index,1)
                        limitArr.push(promiseArr.unshift())
                      //   console.log(count)
                        console.log(limitArr.length)
                      //   console.log(index)
                        if(count === len){
                            resolve(result)
                        }
                    },err=>{
                        reject(err)
                    })
                }
               
            })
    })
}
 let promise1 = 1
 let promise2 = new Promise(res=>{res(2)})
 let promise3 = new Promise(res=>{res(3)})
 let promise4 = 4
 let promise5 = new Promise(res=>{res(5)})
 let promise6 = new Promise(res=>{res(6)})
let arr = [promise1,promise2,promise3,promise4,promise5,promise6]
console.log(myPromise(arr,3))

