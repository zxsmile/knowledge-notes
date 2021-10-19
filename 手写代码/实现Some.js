Array.prototype.MySome = function(callback){
    if(typeof callback !== 'function'){
       throw new Error(`${callback} is not a function`)
    }
 
    let len =  this.length
    for(var i=0;i<len;i++){
       let res = callback(this[i],i,this)
       if(res){
          return true
       }
    }
 
    return false
      
 }
 
 let arr = [1,2,3,4,5,6]
 
 let s = arr.MySome(item => {
    return item > 6
 })
 console.log(s)
 
 //console.log(s)