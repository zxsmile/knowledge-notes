Array.prototype.MyReduce = function(callback){
    if(typeof callback !== 'function'){
       throw new Error(`${callback} is not a function`)
    }
 
    let len =  this.length
    let start = arguments.length > 1 ? arguments[1] : this[0]
    let index = arguments.length > 1 ? 0 : 1
 
       for(var i=index;i<len;i++){
          let res = callback(start,this[i],i)
          start = res
       }
       return start
 }
 
 let arr = [1,2,3,4,5,6]
 
 let s = arr.MyReduce((pre,cur,index) => {
    return pre+cur
 })
 console.log(s)
 
 //console.log(s)