/*
sum(2,3)  //5
sum(2)(3)  //5
*/

function sum(...a){
    if(arguments.length===1){
        var catche = [...a][0]
        function s(b){
            catche+=b
            return s
       }

        s.toString=function(){
            return  catche
        }

        return s
    }else{
        var s=0
        for(var i=0;i<arguments.length;i++){
             s = s+arguments[i]
        }
        return s
    }
    
}



console.log(sum(1)(2)(3)(4))
console.log(sum(1,2,3,4))


//可三种方法调用

function add() {
    // 第一次执行时，定义一个数组专门用来存储所有的参数
    var _args = Array.from(arguments);

    // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    var _adder = function() {
        _args.push(...arguments);
        return _adder;
    };

    // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
    _adder.toString = function () {
        return _args.reduce(function (a, b) {
            return a + b;
        });
    }
    return _adder;
}


alert(add(1)(2))
alert(add(1,2))
alert(add(1,2)(2))


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