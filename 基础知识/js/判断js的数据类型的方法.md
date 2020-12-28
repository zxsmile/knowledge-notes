一、typeof

  - typeof对于基本类型的值可以判断出其类型（对于null返回object），对于引用类型的值，除了function都会返回object

二、instanceof

  - instanceof运算符是用来判断一个构造函数的prototype属性所指向的对象是否存在在另一个要检测的对象的原型链上，表达式为A instanceof B，instanceof 只能用来判断两个对象是否属于实例关系， 而不能判断一个对象实例具体属于哪种类型。
  - instanceof 操作符的问题在于，它假定只有一个全局执行环境。如果网页中包含多个框架，那实际上就存在两个以上不同的全局执行环境，从而存在两个以上不同版本的构造函数。如果你从一个框架向另一个框架传入一个数组，那么传入的数组与在第二个框架中原生创建的数组分别具有各自不同的构造函数。

三、toString

  - toString() 是 Object 的原型方法，调用该方法，默认返回当前对象的 [[Class]] 。这是一个内部属性，其格式为 [object Xxx] ，其中 Xxx 就是对象的类型。

  - 对于 Object 对象，直接调用 toString()  就能返回 [object Object] 。而对于其他对象，则需要通过 call / apply 来调用才能返回正确的类型信息。


	Object.prototype.toString.call('') ;   // [object String]
	Object.prototype.toString.call(1) ;    // [object Number]
	Object.prototype.toString.call(true) ; // [object Boolean]
	Object.prototype.toString.call(Symbol()); //[object Symbol]
	Object.prototype.toString.call(undefined) ; // [object Undefined]
	Object.prototype.toString.call(null) ; // [object Null]
	Object.prototype.toString.call(newFunction()) ; // [object Function]
	Object.prototype.toString.call(newDate()) ; // [object Date]
	Object.prototype.toString.call([]) ; // [object Array]
	Object.prototype.toString.call(newRegExp()) ; // [object RegExp]
	Object.prototype.toString.call(newError()) ; // [object Error]
	Object.prototype.toString.call(document) ; // [object HTMLDocument]
	Object.prototype.toString.call(window) ; //[object global] window 是全局对象 global 的引用