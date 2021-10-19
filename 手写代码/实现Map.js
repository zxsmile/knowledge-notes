// for循环实现
Array.prototype.MyMap = function(callback){
    if(typeof callback !== 'function'){
       throw `${callback}is not a function`
    }
    let len = this.length
    let res = []
 
    for(var i=0;i<len;i++){
       let result = callback(this[i],i,this)
       res.push(result)
    }
    return res
 }

 // reduce方法实现

 Array.prototype.MyMap = function(callback){
    if(typeof callback !== 'function'){
       throw new Error(`${callback} is not a function`)
    }
 
    let len = this.length
    return this.reduce((pre,cur,index) => {
       return [...pre,callback(cur,index,this)]
    },[])
 }
 
 let arr = [1,2,3,4,5,6]
 
 let s = arr.MyMap(item => {
    return item*2
 })
 
 console.log(s)