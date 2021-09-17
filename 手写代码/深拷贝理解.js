/*
    1.原始类型和函数

       - 对于原始类型的值直接返回
       - 函数如果打印出来是function fn(){[native code]}直接返回
       - 函数打印出来不是function fn(){[native code]}，则利用fn.toString和eval()重新拼接一个函数返回

    2.对于引用类型

       - 初始化新对象({}或[])（newObj）的时候，使用newObj = Object.create(obj.constructor.prototype)这种方法有一个好处，
       它可以保留对象原型上的数据，如果直接使用普通的{}，那么原型必然是丢失了的。
       - 对于[Number, String, Boolean, RegExp, Date, Set, Map]使用newObj = new obj.constructor(obj)
       - 对于Set,Map,Array,简单对象是可以遍历深拷贝的，所以要分别处理
       - 由于可能会发生循环引用，所以要用map结构来缓存存过的值
*/

let deepClone = function(obj,map=new Map()){
   if(typeof obj!=='object' || obj===null){
      if(typeof obj ==='function'){
         let fn
         let fnStr = obj.toString()
         if(fnStr!==`function ${obj.name}(){[native code]}`){
            eval(`fn=${fnStr}`)
            return fn
         }
      }
      return obj
   }
   if(map.has(obj)){
      return map.get(obj)
   }
   let newObj = Object.create(obj.constructor.prototype)
   let types = [Number,String,Boolean,Date,RegExp,Map,Set]
   if(types.includes(obj.constructor)){
      newObj = new obj.constructor()
   }

   map.set(obj,newObj)
   
   if(obj.constructor===Set){
      obj.forEach( value => newObj.add(deepCopy(value,map)) )

   }else if( obj.constructor===Map ){
      // 如果对应的key是对象，也要考虑复制的话，可以对key也使用deepClone()
      obj.forEach( (key,value)=>newObj.set(key,deepCopy(value,map)) )

   }else if(obj.constructor===Array){
      obj.forEach((item,index)=>newObj[index]=deepCopy(item,map))

   }else{
      Object.keys(obj).forEach(key=>newObj[key]=deepCopy(obj[key],map))
   }

   return newObj
}

let obj={
   a:undefined,
   b:null,
   c:2,
   d:{foo:3},
   f:new Set([4,2]),
   e:new Date()
   }
   obj.g = obj
   
   console.log(deepClone(obj))
   
   