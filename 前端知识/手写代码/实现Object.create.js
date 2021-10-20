Object.prototype.MyCreate = function(proto,properties){
    if(! (proto instanceof Object) && typeof proto !== 'object'){
       throw 'error'
    }
    
    function F(){}
    F.prototype = proto
    let obj = new F()
    if(properties){
       Object.defineProperty(obj,properties)
    }
    if(proto === null){
       obj.__proto__ = null
    }
    return obj
}

console.log(Object.MyCreate({555:666}).__proto__)