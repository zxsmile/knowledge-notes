一、理解bind

* bind是Function原型链中Function.prototype的一个属性，每个函数都可以调用它
* bind本身是一个函数名为bind的函数，返回值也是函数，这个函数的函数名是bound，也可以传参
* 调用bind的函数中的this指向bind()函数的第一个参数
* 传给bind()的其他参数接收处理了，bind()之后返回的函数的参数也接收处理了，也就是说合并处理了
* 并且bind()后的name为bound + 空格 + 调用bind的函数名。如果是匿名函数则是bound + 空格。
* bind后的返回值函数，执行后返回值是原函数（original）的返回值。
* bind函数形参（即函数的length）是1。bind后返回的bound函数形参不定，根据绑定的函数原函数（original）形参个数确定。
* 如果bind绑定后的函数被new了，那么此时this指向就发生改变。此时的this就是当前函数的实例
* 构造函数上的属性和方法，每个实例上都有

		Function.prototype.bindFn = function(thisArg){
	    if(typeof this !== 'function'){
	        throw new TypeError(this + ' must be a function');
	    }
	
	    // 存储调用bind的函数本身
	    var self = this;
	
	    // 去除thisArg的其他参数 转成数组
	    var args = Array.prototype.slice.call(arguments, 1);
	
	    var bound = function(){
	        // bind返回的函数的参数转成数组
	
	        var boundArgs = Array.prototype.slice.call(arguments);
	        var finalArgs = args.concat(boundArgs);
	
	        // new 调用时，其实this instanceof bound判断也不是很准确。es6 new.target就是解决这一问题的
	
	        if(self instanceof bound){
	      
	            // 1.创建一个全新的对象
	            // 2.并且执行[[Prototype]]链接
	            // 4.通过`new`创建的每个对象将最终被`[[Prototype]]`链接到这个函数的`prototype`对象上。
	            // self可能是ES6的箭头函数，没有prototype，所以就没必要再指向做prototype操作。
	
	            if(self.prototype){
	        
	                function Empty(){}
	                Empty.prototype = self.prototype;
	                bound.prototype = new Empty();
	            }
	
	          
	            // 3.生成的新对象会绑定到函数调用的`this`。
	
	            var result = self.apply(this, finalArgs);
	
	            // 5.如果函数没有返回对象类型`Object`(包含`Functoin`, `Array`, `Date`, `RegExg`, `Error`)，
	            // 那么`new`表达式中的函数调用会自动返回这个新的对象。
	
	            var isObject = typeof result === 'object' && result !== null;
	            var isFunction = typeof result === 'function';
	            if(isObject || isFunction){
	                return result;
	            }
	            return this;
	        }
	        else{
	            // apply修改this指向，把两个函数的参数合并传给self函数，并执行self函数，返回执行结果
	            return self.apply(thisArg, finalArgs);
	        }
	    }
	    return bound;
	  }


使用：

	let obj = {
	    name:'tiger'
	}
	
	function fn(name,age){
	    this.say = '汪汪~';
	    console.log(this);
	    console.log(this.name+'养了一只'+name+','+age+'岁了 ');
	}
	
	/** 第一次传参 */
	let bindFn = fn.bindFn(obj,'milk');
	/** 第二次传参 */
	bindFn('10');
	
	/* 构造函数上的属性和方法，每个实例上都有 */
	let instance = new bindFn('20');
	bindFn.prototype.type = '哺乳类';
	console.log(instance.type);