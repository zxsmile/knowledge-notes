一、new的过程发生了什么

* 创建一个新对象
* 这个新构造的对象被接入原型链（__proto__指向该构造函数的prototype）
* 将构造函数的作用域赋给新对象（因此this就指向了这个新对象）
* 执行构造函数中的代码（为这个新对象添加属性）
* 返回新对象

      * 如果构造函数没有return或者return的值为基本类型的值，则会返回这个新对象

			如： function Student(name){
				    this.name = name;
				    
				     return 123
				}
				
				var student = new Student();
				console.log(student); {}
         
            上例中的构造函数有返回值且返回值为基本类型的值(123),所以 console.log(student)值为新对象{}   

      * 如果构造函数return的是对象类型(object)包括(Functoin, Array, Date, RegExg, Error),则会返回return后面的对象

			如： function Student(name){
				    this.name = name;
				    
				     return [1,2,3]
				}
				
				var student = new Student();
				console.log(student); [1,2,3]
         
            上例中的构造函数有返回值且返回值为对象,所以 console.log(student)值为[1,2,3]

二、Object.create()

* Object.create方法可以创建一个对象实例，并为其指定原型对象和属性
* 为对象实例设置原型对象也就是设置实例对象的__proto__属性值
* 语法：

   Object.create(prototype, descriptors)
     
       * prototype：必须，被创建对象的原型对象
       * descriptors：可选，包含一个或多个属性描述符的 JavaScript 对象，用来规定要被添加到对象的属性，可以分为两类，数据属性和访问器属性
          
     
三、new过程模拟实现

	function newOperator(ctor){
	 
	    if(!ctor instanceof Function){
	        throw 'newOperator function the first param must be a function'
	    }
	
	    newOperator.target = ctor
	
	    // 1.创建一个全新的对象，
	    // 2.并且执行[[Prototype]]链接
	    // 4.通过`new`创建的每个对象将最终被`[[Prototype]]`链接到这个函数的`prototype`对象上
	    
        var newObj = Object.create(ctor.prototype)
	      
	    // ES5 arguments转成数组 当然也可以用ES6 [...arguments], Aarry.from(arguments);
	    // 除去ctor构造函数，获取传入的其他参数

	    var argsArr = Array.prototype.slice.call(arguments, 1);
	
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
	
