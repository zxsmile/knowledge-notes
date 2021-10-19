function add(...arg){
   let a = [...arg]
 
   let _add=function(...newArg){
      if(newArg.length){
         a.push(...newArg)
         return _add
      }else{
        return a.reduce((x,y)=>{
           return x+y
        })
      }
   }
 
   return _add
 }

 console.log(add(1,5)())    // 6