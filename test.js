class MyClass{

  constructor(handle){
      if(typeof handle !== 'function'){
          throw new Error('error')
      }
      this.status = 'pending'
      this.value = null
      this.reason = null
      this.onFulfilledCallback = []
      this.onRejectedCallback = []
      try{
        handle(this.resolve,this.reject)
      }catch(e){
        this.reject(e)
      }
  
  }

  resolve = (value) => {
    if(this.status === 'pending'){
        this.status = 'fulfilled'
        this.value = value
        while(this.onFulfilledCallback.length){
            this.onFulfilledCallback.shift()(this.value)
        }
    }
  }

  reject = (reason) => {
    if(this.status === 'pending'){
        this.status = 'rejected'
        this.reason = reason
        while(this.onRejectedCallback.length){
            this.onRejectedCallback.shift()(this.reason)
        }
    }
  }

  then(onFulfilled,onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}
    let thenPromise = new MyPromise((resolve,reject)=> {
         if(this.status === 'fulfilled'){
             queueMicrotask(() => {
                 try{
                   let res = onFulfilled(this.value)
                   this.resolvePromise(thenPromise,res,resolve,reject)
                 }catch(e){
                     reject(e)
                 }
             })
         }else if(this.status === 'rejected'){
            queueMicrotask(() => {
                try{
                  let res = onRejected(this.reason)
                  this.resolvePromise(thenPromise,res,resolve,reject)
                }catch(e){
                    reject(e)
                }
            })
        }else if(this.status === 'pending'){
            this.onFulfilledCallback.push( 
                () => {
                  queueMicrotask(() => {
                    try{
                      let res = onFulfilled(this.value)
                      this.resolvePromise(thenPromise,res,resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                  })  
                }
                
            )

            this.onRejectedCallback.push( 
                () => {
                 queueMicrotask(() => {
                    try{
                    let res = onRejected(this.reason)
                    this.resolvePromise(thenPromise,res,resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                 }) 
                }
            )

           
        }
    })
    return thenPromise
  }

  resolvePromise(thenPromise,x,resolve,reject) {
      if(thenPromise === x){
          throw error('error')
      }
      
      if(x instanceof MyPromise){
        x.then((y)=> {
            this.resolvePromise(thenPromise,y,resolve,reject)
        },e=>{
            reject(e)
        })
      }

      if((typeof x === 'object' || typeof x === 'function') && x !== null){
         
          try{

           var then = x.then

          }catch(e){

              reject(e)

          }

          if(typeof then === 'function'){
            let called = false
            try{
                then.call(x,y=>{
                    if(called){
                        return
                    }
                    called = true
                    this.resolvePromise(thenPromise,y,resolve,reject)
                 },e=>{
                     if(called){
                         return
                     }
                     called = true
                     reject(e)
                 })
            }catch(e){
                if(called){
                    return
                }
                called = true
                reject(e)
            }
           
          }else{
              resolve
          }

      }else{
          resolve(x)
      }   

  }

  static resolve(value) {
    if(value instanceof MyPromise){
        return value
    }

    return new MyPromise((reslove,reject)=>{
        reslove(value)
    })
  }

  static reject(reason) {
    return new MyPromise((reslove,reject)=>{
        reject(reason)
    })
  }

  static all(list) {
      return new MyPromise((resolve,reject) => {
          if(!Array.isArray(list)){
              throw new TypeError('参数必须是数组')
          }

          let resArr = []
          let count = 0
          for(let i =0;i<list.length;i++){
              let item = list[i]
              this.resolve(item).then((val) => {
                resArr[i] = val
                count++
                if(count === list.length){
                    resolve(resArr)
                }
              },e=>{
                reject(e)
              })
          }
      })
  }

  static race(list) {
    return MyPromise((resolve,reject) => {
        if(!Array.isArray(list)){
            throw new TypeError('参数必须是数组')
        }
        for(let i=0;i<list.length;i++){
            let item = list[i]
            this.resolve(item).then(val=>{
                resolve(val)
            },e=>{
                reject(e)
            })
        }
    })
  }

  static allSettled(list) {
      if(!Array.isArray(list)){
          throw new TypeError('参数必须是数组')
      }

      return new MyPromise((resolve,reject) => {
          let resArr = []
          let count = 0
          for(let i=0;i<list.length;i++){
              let item = list[i]
              this.reslove(item).then(value => {
                  resArr[i] = {status:'fulfilled',value:value}
                  count++
                  if(count === list.length){
                    resolve(resArr)
                  }
              },e => {
                  resArr[i] = {status:'rejected',value:e}
                  if(count === list.length){
                    resolve(resArr)
                  }
              })
             
          }
      })
  }

  static any(list) {
      if(!Array.isArray(list)){
          throw new TypeError('参数必须是数组')
      }

      return new MyPromise((resolve,reject) => {
          let resArr = []
          let count = 0
          for(let i=0;i<list.length;i++){
              let item = list[i]
              this.resolve(item).then(val => {
                  resolve(val)
              },err=>{
                  resArr[count] = err
                  count++
                  if(count === list.length){
                    reject(new AggregateError('No Promise in Promise.any was resolved'))
                  }
              })
          }

      })
  }
}