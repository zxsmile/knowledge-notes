## 一、实现new

    function newOperator(ctor){
        if(! (ctor instanceof Function)){
            throw 'newOperator function the first param must be a function'
        }
    
        //如果是使用new调用构造函数，那么new.target属性指向构造函数，否则返回undefined
        // new.target是ES6引入的一个属性，用于确认当前函数调用是在哪个构造函数上。如果函数是通过new命令调用的构造函数，       
        // new.target会返回当前构造函数；否则，它会返回undefined。
        // new.target可以用于判断一个函数是否作为构造函数被调用。如果new.target有定义，表示函数是通过new关键字调用的构造     // 函数；如果没有定义，表示函数是以普通函数形式被调用。
        newOperator.target = ctor
    
        // 1.创建一个全新的对象，
        // 2.并且执行[[Prototype]]链接
        // 4.通过new创建的每个对象将最终被[[Prototype]]链接到这个函数的`prototype`对象上
        var newObj = Object.create(ctor.prototype)
    
        // ES5 arguments转成数组 当然也可以用ES6 [...arguments], Aarry.from(arguments);
        // 除去ctor构造函数的其余参数
        var argsArr = Array.prototype.slice.call(arguments, 1);
        //var argsArr = Array.from(arguments).slice(1)
    
        // 3.生成的新对象会绑定到函数调用的`this`。
        // 获取到ctor函数返回结果
    
        var ctorReturnResult = ctor.apply(newObj, argsArr);
    
        //判断return值的类型，确定最后返回值
        var isObject = typeof ctorReturnResult === 'object' && ctorReturnResult !== null;
        var isFunction = typeof ctorReturnResult === 'function';
        if(isObject || isFunction){
            return ctorReturnResult;
        }
    
        return newObj;
    }
## 二、使用

```
function Student(name){
    console.log(newOperator.target)
    this.name = name;
}


var student=newOperator(Student,'milk')
console.log(student.name)
```

