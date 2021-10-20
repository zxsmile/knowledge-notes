Array.prototype.MyEvery = function(callback){
    if(typeof callback !== 'function'){
       throw new Error(`${callback} is not a function`)
    }
 
    let len =  this.length
    for(var i=0;i<len;i++){
       let res = callback(this[i],i,this)
       if(!res){
          return false
       }
    }
 
    return true
      
 }
 
 let arr = [1,2,3,4,5,6]
 
 let s = arr.MyEvery(item => {
    return item > 0
 })
 console.log(s)
 
 //console.log(s)