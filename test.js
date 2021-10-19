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
