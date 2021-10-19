#### 一、字面量和new Object()创造对象 ####

		let obj = {'foo':5}
		console.log(obj) //{'foo':5}
		console.log(obj.__proto__) // Object.prototype
		
		let obj = new Object({'foo':5})
		console.log(obj) //{'foo':5}
		console.log(obj.__proto__) // Object.prototype

        let obj ={}
         console.log(obj.__proto__)// Object.prototype

- 由上面例子可以看出，这两种方法创建对象，其实差不多，就是使用一个Object构造函数生成了一个实例，实例的__proto__属性指向构造函数的prototype，也就是Object.prototype

#### 二、Object.create ####

- bject.create()方法是ECMAScript5中新增的，用来规范化原型式继承的。

     object.create(proto, propertiesObject)

- object.create() 是使用指定的原型proto对象及其属性propertiesObject去创建一个新的对象。这个方法接收两个参数，一个是用作新对象原型的对象，另一个是新对象定义额外属性的（可选）对象。
- proto 是必填参数，就是新创建出来的对象的原型 （新对象的 __proto__属性指向的对象），值得注意的是当proto为null的时候创建的新对象完全是一个空对象，没有原型，也就是没有继承Object.prototype上的方法。（如hasOwnProperty() toString() 等）
- propertiesObject是可选参数，作用就是给新对象添加新属性以及描述器(图1)，需要注意的是新添加的属性是新对象自身具有的属性也就是通过hasOwnProperty() 方法可以获取到的属性，而不是添加在原型对象里。

		let obj = Object.create({'foo':5})
		console.log(obj) //{}
		console.log(obj.__proto__) // {'foo':5}

        let obj =Object.create(null)
        console.log(obj.__proto__)

- 由上面例子可以看出，Object.create创建的是一个新对象，这个新对象的__proto__属性指向传入的第一个参数
- 当传入的第一个参数为null时，创建的新对象完全是一个空对象，没有原型，也就是没有继承，而上面两种方法是会继承原型的

#### 三、实现Object.create ####

		Object.prototype.MyCreate = function(proto,properties){
		    if(! (proto instanceof Object) && typeof proto !== 'object'){
		       throw 'error'
		    }
		    
		    function F(){}
		    F.prototype = proto
		    let obj = new F()
		    if(properties){
		       Object.defineProperty(obj,properties)
		    }
		    if(proto === null){
		       obj.__proto__ = null
		    }
		    return obj
		}