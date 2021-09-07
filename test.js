function myReject(val){
    return new Promise((reslove,reject)=>{
        reject(val)
    })
}
 
 

 let promise1 = 1
 let promise2 = new Promise((res,rej)=>{res(2)})
 let promise3 = new Promise((res,rej)=>{rej(2)})

 console.log(Promise.reject(promise2))