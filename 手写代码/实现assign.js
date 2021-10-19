//Object.assign()用于将对象自身所有的可枚举属性从一个或者多个源对象上复制到目标对象 
//assign(target,...src)
// target不能为undefined和null,为基本类型的值时，会包装成对象，这里使用Object(..)就可以了
//src为基本类型不会被复制，为函数，空数组，日期，正则这些都不会被复制，只有为[object Object]这样的非空对象或者非空数组才会被复制
//[object Object]这样的引用类型的键值为undefined或null或symbol()都会被复制

Object.prototype.MyAssign = function(target,...src){
    if(target === null || target === undefined){
       throw 'error'
    }
    
     // Object.assign()目标对象是原始类型时，会包装成对象，这里使用Object(..)就可以了
     target = Object(target)
     for(var i=0;i<src.length;i++){
           for(key in src[i]){
              if(src[i].hasOwnProperty(key)){
                  target[key] = src[i][key]
              }
           }
     }
     return target
}

console.log(Object.MyAssign({},{1:6}))

  