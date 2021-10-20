function myInstanceof(A,B){
    
    if(typeof B !== 'function'){
        throw '参数有误'
    }
   if(typeof A !== 'object' || A ===null){
       return false
   }
   while(A.__proto__){
       if(A.__proto__ === B.prototype){
           return true
       }
       A = A.__proto__
   }

   return false
}
















