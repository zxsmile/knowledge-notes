```
// call 函数的实现步骤：

// 判断调用对象是否为函数，即使是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
// 判断传入上下文对象是否存在，如果不存在，则设置为 window 。
// 处理传入的参数，截取第一个参数后的所有参数。
// 将函数作为上下文对象的一个属性。
// 使用上下文对象来调用这个方法，并保存返回结果。
// 删除刚才新增的属性。
// 返回结果。

//轻盈版

//1.接收一个参数列表，参数值为任意类型都可以

Function.prototype.myCall = function(newThis){
    //this指的是调用call的函数，比如下面的bar函数
    if(typeof this !== 'function'){
        throw new TypeError(this + ' is not a function');
    }
    //如果传入的newThis不为对象，则用Object转为对象，所以统一执行      	//Object(newThis)，当newThis为null/undefined时，视为window
    
    newThis = newThis?Object(newThis):window
    
    //将this也就是下面的bar函数设置为newThis的属性，则该函数里面的this就指	 //向的是newThis
    //newThis.fn = this
    //fn 同名覆盖问题，thisArg对象上有fn，那就被覆盖了然后被删除了。
    //用ES6 Sybmol() 独一无二的或者可以做个缓存

    //1. 使用ES6 Sybmol()
    let fn = Symbol()
    newThis[fn] = this
    let args = [...arguments].slice(1)
    let result = newThis[fn](...args)
    delete newThis[fn]
    return result
  }
```

```
// call 函数的实现步骤：

// 判断调用对象是否为函数，即使是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
// 判断传入上下文对象是否存在，如果不存在，则设置为 window 。
// 处理传入的参数，截取第一个参数后的所有参数。
// 将函数作为上下文对象的一个属性。
// 使用上下文对象来调用这个方法，并保存返回结果。
// 删除刚才新增的属性。
// 返回结果。


//1.接收一个参数列表，参数值为任意类型都可以

Function.prototype.myCall = function(newThis){
    //this指的是调用call的函数，比如下面的bar函数
    if(typeof this !== 'function'){
        throw new TypeError(this + ' is not a function');
    }
    //如果传入的newThis不为对象，则用Object转为对象，所以统一执行      	//Object(newThis)，当newThis为null/undefined时，视为window
    
    newThis = newThis?Object(newThis):window
    
    //将this也就是下面的bar函数设置为newThis的属性，则该函数里面的this就指向的是newThis
    //newThis.fn = this
    //fn 同名覆盖问题，thisArg对象上有fn，那就被覆盖了然后被删除了。
    //用ES6 Sybmol() 独一无二的或者可以做个缓存

    //1. 使用ES6 Sybmol()
    let fn = Symbol()
    newThis[fn] = this
    let result
    let args = [...arguments].slice(1)
    result = newThis[fn](...args)
    delete newThis[fn]
    return result
    
    //2. 做个缓存
    let originalVal = newThis.fn;
    let hasOriginalVal = newThis.hasOwnProperty(fn);
    newThis.fn = this
    let result
    let args = [...arguments].slice(1)
    result = newThis[fn](...args)
    delete newThis[fn]
    if(hasOriginalVal){
        newThis.fn = originalVal
    }
    return result

  }
```

```
  let obj = {
    name:'milk',
    fn:5
  }

  function bar(){
    console.log(this.name)
  }

  bar.call(obj)
  console.log(obj.fn)
```

