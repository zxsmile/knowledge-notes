class MyPromise{
   constructor(handle) {
       this.promiseState = 'pending'
       this.promiseResult = null
       this.onFulfilledCallbacks = []
       this.onRejectedCallbacks = []
       try{
          this.handle(this.resolve.bind(this),this.reject.bind(this))
       }catch(e){
          this.reject(e)
       }
       
   }

   resolve(value) {
      if(value instanceof MyPromise){
         return value.then(this.resolve,this.reject)
      }

      setTimeout(() => {
         if(this.promiseState !== 'pending'){
            return
         }
         this.promiseState = 'fulfilled'
         this.promiseResult = value
         while(this.onFulfilledCallbacks.length){
            this.onFulfilledCallbacks.shift(this.promiseResult)
         }
      })
   }

   reject(reason) {
      setTimeout(() => {
         if(this.promiseState !== 'pending'){
            return
         }
         this.promiseState = 'rejected'
         this.promiseResult = reason
         while(this.onRejectedCallbacks.length){
            this.onRejectedCallbacks.shift(this.promiseResult)
         }
      })
   }

   then(onFulfilled,onRejected){
      onFullfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
      onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}
      return new MyPromise((onFulfilledNext,onRejectedNext) => {
         let resultPromise =  lastThen => {
            try{
              let x = lastThen(this.promiseResult)
              if(x instanceof MyPromise){
                 x.then(onFulfilledNext,onRejectedNext)
              }else{
               onFulfilledNext(x)
              }
            }catch(e){
               onRejectedNext(e)
            }
         }

         if(this.promiseState === 'fulfilled'){
            resultPromise(onFulfilled)
         }else if(this.promiseState === 'rejected'){
            resultPromise(onRejected)
         }else if(this.promiseState === 'pending'){
            this.onFulfilledCallbacks.push(resultPromise.bind(this,onFulfilled))
            this.onRejectedCallbacks.push(resultPromise.bind(this,onRejected))
         }
      })
   }
}