```
function myResolve(val){
   if(val instanceof Promise){
       return val
   }
   return new Promise((resolve,reject)=>{
       return resolve(val)
   })
}

 let promise1 = 1
 let promise2 = new Promise((res,rej)=>{res(2)})
 let promise3 = new Promise((res,rej)=>{rej(2)})

 console.log(myResolve(promise2))
```

