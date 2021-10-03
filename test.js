 
Function.prototype.bindFn = function(thisArg){

  if(typeof this !== 'function'){
      throw 'this必须是函数'
  }

  var self = this
  var args = Array.from(arguments).slice(1)
  var bound = function(){
      var newArges = args.concat(Array.from(arguments))
        //也可以用this instanceof bound判断
        if(this instanceof bound){
             //bound函数用作构造函数,绑定的this会失效，函数中的this指向实例对象
             var result = self.apply(this,newArges)
             var isObject = typeof result==='object'&&result!==null
             var isFunction = typeof result === 'function'
             if(isObject||isFunction){
                 return result
             }
             return this
           
        }else{

           return self.apply(thisArg,newArges)
        }
  }

   if(self.prototype){
        
       //生成的实例拥有构造函数上的属性和方法        

        function Empty(){}
       Empty.prototype = self.prototype;
       bound.prototype = new Empty();
 }

  return bound
}

var obj = {
 name:'join'
}

function fn(name,age){
 this.name = name
 this.m = 3
}

var fnBind = fn.bindFn(obj,'milk',18)
var ch = new fnBind(12)
console.log(ch.name)
// console.log(ch.m)