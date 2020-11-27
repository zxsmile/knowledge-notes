首先JavaScript函数存在"定义时上下文"和"运行时上下文"，"上下文是可以改变的"这样的概念

一、call()和apply()

* call() 和 apply()都是为了改变某个函数运行时的上下文（context）而存在的，换句话说，就是为了改变函数体内部 this 的指向

* call()方法接受的是一个参数列表，而apply()方法接受的是一个包含多个参数的数组（或类数组对象）

* call()和apply()在调用函数之后会立即执行

* fun.apply(thisArg, argsArray)

参数：
  
    * thisArg
    
         在 fun 函数运行时指定的 this 值。需要注意的是，指定的 this 值并不一定是该函数执行时真正的 this 值，如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动指向全局对象（浏览器中就是window对象)，同时值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的自动包装对象。
    
    * argsArray
    
            一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 fun 函数。如果该参数的值为null 或 undefined，则表示不需要传入任何参数。从ECMAScript 5 开始可以使用类数组对象。

* fun.call(thisArg, arg1[, arg2[, ...]])
   
参数:
        
    * thisArg
    
            在fun函数运行时指定的this值。需要注意的是，指定的this值并不一定是该函数执行时真正的this值，如果这个函数处于非严格模式下，则指定为null和undefined的this值会自动指向全局对象(浏览器中就是window对象)，同时值为原始值(数字，字符串，布尔值)的this会指向该原始值的自动包装对象。
            
    * arg1, arg2, ...
    
            指定的参数列表


		如：function a(xx, yy) {    
		    alert(xx, yy);    
		    alert(this);    
		    alert(arguments);
		}
		
		a.apply(null, [5, 55]);
		a.call(null, 5, 55);
            

二、bind()

* 改变函数运行时的上下文

* bind()方法调用并改变函数运行时的上下文的之后，返回一个新的函数，在我们需要调用的地方去调用他

* bind()方法会创建一个新函数，当这个新函数被调用时，它的this值是传递给bind()的第一个参数, 它的参数是bind()的其他参数和其原本的参数

* fun.bind(thisArg, arg1[, arg2[, ...]])

参数:
    
    * thisArg
   
        当绑定函数被调用时，该参数会作为原函数运行时的 this 指向。当使用new 操作符调用绑定函数时，该参数无效

    * arg1, arg2, ...
    
        当绑定函数被调用时，这些参数加上绑定函数本身的参数会按照顺序作为原函数运行时的参数
            
 
	如：let obj = {
	    name:'tiger'
		}
		
		function fn(name,age){
		    this.say = '汪汪~';
		    console.log(this);
            console.log(arguments)
		    console.log(this.name+'养了一只'+name+','+age+'岁了 ');
		}
		
		/** 第一次传参 */
        let bindFn = fn.bind(obj,'milk'，20);

		/** 第二次传参 */
		bindFn('10');

        // {name:'tiger',say:'汪汪~'}
 
        // [Arguments] { '0': 'milk', '1': 20, '2': '10' }

        //  tiger养了一只milk，20岁了

* 一旦使用bind方法为一个函数内的this操作符进行了绑定，就不能再覆盖它：

	如：let obj = {
	    name:'tiger'
		}
		
		function fn(name,age){
		    this.say = '汪汪~';
		    console.log(this);
            console.log(arguments)
		    console.log(this.name+'养了一只'+name+','+age+'岁了 ');
		}
		
	
        let bindFn = fn.bind(obj,'milk'，20);

		bindFn.call(null,'join')

        // {name:'tiger',say:'汪汪~'}
 
        // [Arguments] { '0': 'milk', '1': 20, '2': 'join' }

        //  tiger养了一只milk，20岁了

     上例中，先使用bind将bindFn的this指向obj,使用call改变bindFn的this指向，并没有用,this还是指向obj

