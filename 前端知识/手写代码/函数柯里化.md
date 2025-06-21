//1. 参数定长的柯里化

function curry(fn) {
    // 获取原函数的参数长度
    const argLen = fn.length;
    // 保存预置参数
    const presetArgs = [].slice.call(arguments, 1)
    // 返回一个新函数
    return function() {
      // 新函数调用时会继续传参
      const restArgs = [].slice.call(arguments)
      const allArgs = [...presetArgs, ...restArgs]
      if (allArgs.length >= argLen) {
        // 如果参数够了，就执行原函数
        return fn.apply(this, allArgs)
      } else {
        // 否则继续柯里化
        return curry.call(null, fn, ...allArgs)
      }
    }
  }
  
 
 function multiFn(a, b, c) {
    return a * b * c;
 }
 
 var multi = curry(multiFn);
 console.log(multi(2)(3,4));
 console.log(multi(2)(3)(4));

 var multi1 = curry(multiFn,2);
 console.log(multi(2)(3));
