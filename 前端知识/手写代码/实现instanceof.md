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

//方式二：
function instance_of(Case, Constructor) {
    // 基本数据类型返回false
    // 兼容一下函数对象
    if ((typeof(Case) != 'object' && typeof(Case) != 'function') || Case == 'null') return false;
    let CaseProto = Object.getPrototypeOf(Case);
    while (true) {
        // 查到原型链顶端，仍未查到，返回false
        if (CaseProto == null) return false;
        // 找到相同的原型
        if (CaseProto === Constructor.prototype) return true;
        CaseProto = Object.getPrototypeOf(CaseProto);
    }
}














