const obj = {
   a: {
          b: 1,
          c: 2,
          d: {e: 5}
      },
   b: [1, 3, {a: 2, b: 3}],
   c: 3
  }
  
  console.log(flatten(obj) )
  // {
  //  'a.b': 1,
  //  'a.c': 2,
  //  'a.d.e': 5,
  //  'b[0]': 1,
  //  'b[1]': 3,
  //  'b[2].a': 2,
  //  'b[2].b': 3
  //   c: 3
  // }
  
  function isObject(val) {
   return typeof val === "object" && val !== null;
 }
  function flatten(obj){
     if(!isObject(obj)){
        return
     }
     let res = {}
     let dfs = (obj,str) =>{
         if(isObject(obj)){
            if(Array.isArray(obj)){
               obj.forEach((item,index) => {
               dfs(item,`${str}[${index}]`)
               })
            }else{
               Object.keys(obj).forEach(key => {
                  dfs(obj[key],`${str}${str?'.':''}${key}`)
               })
            }
         }else{
            res[str] = obj
         }
     }

     dfs(obj,'')
     return res
  }