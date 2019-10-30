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
			
			        if(this instanceof bound){
			
				            var result = self.apply(this, finalArgs);
				
				            // 如果函数没有返回对象类型`Object`(包含`Functoin`, `Array`, `Date`, `RegExg`, `Error`)，
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
	
	        // self可能是ES6的箭头函数，没有prototype，所以就没必要再指向做prototype操作。
		 
		  * if(self.prototype){
	         
	      *   //生成的实例拥有构造函数上的属性和方法        
	
		  *    function Empty(){}
		  *    Empty.prototype = self.prototype;
		  *    bound.prototype = new Empty();
		  * }
		
		    return bound;
	  }

说明：本来星号标注部分是写在bound函数内部的，测试时发现，将所给构造函数用bind绑定后，然后用new调用该构造函数发现，所创建的实例不是该构造函数的实例而是bindFn返回的bound的实例

		如：let obj = {
			    name:'tiger'
			}
			
			function fn(name,age){
			    this.say = '汪汪~';
			    console.log(this);
			    console.log(this.name+'养了一只'+name+','+age+'岁了 ');
			}
		
		  /* 构造函数上的属性和方法，每个实例上都有 */
			let instance = new bindFn('20')
			console.log(instance.__proto__)  // bound{}
            console.log(instance.prototype)  // fn{}

这样的结果是因为，当星号标注部分是写在bound函数内部时，第一步使用bind的时候返回bound函数，这时bound函数还不在fn的原型链中，然后生成实例instance时，instance.__proto__指向bound的原型对象bound{}，执行生成实例那一句会执行bound函数，然后执行星号部分的时候改变了bound.prototype但实例是在改变之前生成的，所以instance.__proto__还是指向原来的bound.prototype，所以导致instance不是fn的实例，所以星号部分要在执行bind那一句就执行

* 使用：

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