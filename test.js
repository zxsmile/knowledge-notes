function deepCopy(obj,cache=new Map()){
    if(cache.get(obj)){
        return cache.get(obj)
    }

    if(obj instanceof Object){
       let newObj = {}
       if(obj instanceof Array){
         newObj = []

       }else if(obj instanceof Function){
         newObj = function(){
             return obj.call(this,...arguments)
         }

       }else if(obj instanceof RegExp){
         newObj = new RegExp(obj.source,obj.flags)

       }else if(obj instanceof Date){
           newObj = new Date(obj)

       }else{
           newObj = {}
       }
       cache.set(obj,newObj)
       console.log(cache)
       for(var key in obj){
           if(obj.hasOwnProperty(key)){
               newObj[key]=deepCopy(obj[key],cache)
           }
       }

       return newObj
    }else{
        return obj
    }
}

let obj = {
    a:1,
    b:{s:2}
}
deepCopy(obj)
// const a = {
//     i: {obj:{k:5}},
//     s: "",
//     bool: false,
//     n: null,
//     u: undefined,
//     sym: Symbol(),
//     obj: {
//       i: 6,
//       s: "",
//       bool: false,
//       n: null,
//       u: undefined,
//       sym: Symbol(),
//     },
//     array: [
//       {
//         nan: NaN,
//         i: Infinity,
//         s: "",
//         bool: false,
//         n: null,
//         u: undefined,
//         sym: Symbol(),
//       },
//       123,
//     ],
//     fn: function () {
//       return "fn";
//     },
//     date: new Date(),
//     re: /hi\d/gi,
//   };
//   let a2 = deepCopy(a);

  //console.log(a2)