//for循环实现
Array.prototype.MyFilter = function(callback){
    if(typeof callback !== 'function'){
       throw new Error(`${callback} is not a function`)
    }
 
    let len = this.length
    let res = []
    for(var i=0;i<len;i++){
      let result = callback(this[i],i,this)
      if(result){
         res.push(this[i])
      }
    }
    return res
 }
 
 // reduce实现

 Array.prototype.MyFilter = function(callback){
    if(typeof callback !== 'function'){
       throw new Error(`${callback} is not a function`)
    }
 
    let len = this.length
    return this.reduce((pre,cur,index) => {
            let res = callback(cur,index,this)
           return res?[...pre,cur]:[...pre]
      },[])
 }
 