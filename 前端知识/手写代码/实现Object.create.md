```
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






Object.prototype.MyCreate = function(proto,properties){
   //if(! (proto instanceof Object) && typeof proto !== 'object'){
     // throw 'error'
      // 类型校验
        throw new TypeError("proto必须为对象或者函数");
   //}

   if (typeof proto !== "object" && typeof proto !== "function") {
    // 类型校验
    throw new TypeError("proto必须为对象或者函数");
   }
   if ( defineProperties === null ) {
     throw new TypeError('Cannot convert undefined or null to object')
   }

   function F(){}
   F.prototype = proto  //也可以使用 Object.setPrototypeOf(result, proto);// 将该对象的原型设置为proto

   let obj = new F()
   if(properties){
      Object.defineProperties(obj,properties)
   }
   if(proto === null){
      obj.__proto__ = null
   }
   return obj
}
console.log(Object.MyCreate({555:666}).__proto__)
```

