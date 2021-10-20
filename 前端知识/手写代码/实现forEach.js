// for循环实现
		Array.prototype.MyForEach = function(callback){
            if(typeof callback !== 'function'){
               throw `${callback}is not a function`
            }
            let len = this.length
            for(var i=0;i<len;i++){
               callback(this[i],i,this)
            }
         }
         
         
         //forEach无法跳出循环，可以使用try...catch...
         
         let arr = [1,2,3,4,5,6]
         
         try{
             arr.forEach(item => {
         
                  if(item === 3){
                    throw 'error'
                  }
                  console.log(item)
             })
         }catch(e){
            console.log(e)
         }
          //1,2,error
         
          // 实现可以使用return中断的forEach
         
          Array.prototype.MyForEach = function(callback){
            if(typeof callback !== 'function'){
               throw `${callback}is not a function`
            }
            let len = this.length
            for(var i=0;i<len;i++){
               let res = callback(this[i],i,this)
               if(typeof res !=='undefined' && (res === null || res ===false)){
                  break;
               }
            }
         }

//reduce实现

Array.prototype.MyForEach = function(callback){
    if(typeof callback !== 'function'){
       throw new Error(`${callback} is not a function`)
    }
 
    let len = this.length
    this.reduce((pre,cur,index) => {
              callback(cur,index,this)
              //return cur
    },this[0])
 }
 