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

- Object.create()方法是ECMAScript5中新增的，用来规范化原型式继承的。

     object.create(proto, propertiesObject)

- object.create() 是使用指定的原型proto对象及其属性propertiesObject去创建一个新的对象。**这个方法接收两个参数，一个是用作新对象原型的对象，另一个是新对象定义额外属性的（可选）对象。**

- **proto 是必填参数，就是新创建出来的对象的原型 （新对象的 __proto__属性指向的对象），值得注意的是当proto为null的时候创建的新对象完全是一个空对象，没有原型，也就是没有继承Object.prototype上的方法。（如hasOwnProperty() toString() 等）**

- propertiesObject是可选参数，作用就是给新对象添加新属性以及描述器(图1)，需要注意的是**新添加的属性是新对象自身具有的属性也就是通过hasOwnProperty() 方法可以获取到的属性，而不是添加在原型对象里。该参数与Object.defineProperties()方法的第二个参数格式相同：每个属性都是通过自己的描述符定义的。**

		let obj = Object.create({'foo':5},{
		    name: {
		        value: "wy",
		        writable: true,
		        configurable: true,    
		        enumerable: true
		    },
		    age: {
		        value: 12,
		        writable: true,
		        configurable: true,
		        enumerable: true
		    },
		}

		console.log(obj) //{name: 'wy', age: 12}
		console.log(obj.__proto__) // {'foo':5}

        let obj =Object.create(null)
        console.log(obj.__proto__) //undefined

- **由上面例子可以看出，Object.create创建的是一个新对象，这个新对象的__proto__属性指向传入的第一个参数**

- **当传入的第一个参数为null时，创建的新对象完全是一个空对象，没有原型，也就是没有继承，**而上面两种方法是会继承原型的


#### 三、{} VS Object.create(null) ####

- **通过字面量 {} 创建的对象，会继承Object原型链上的方法**，如hasOwnProperty、isPrototypeOf、toString、valueof等；

- **通过Object.create(null)创建的新对象不会继承Object中的任何属性。**

那使用Object.create方法如何创建一个与 {} 等价的新对象呢？

  Object.create(Object.prototype)

- **Object.create这样创建的对象就和使用{}创建的对象一模一样了**

#### 四、实现Object.create ####

		Object.prototype.MyCreate = function(proto,properties){
		    //if(! (proto instanceof Object) && typeof proto !== 'object'){
		      // throw 'error'
             // 类型校验
               throw new TypeError("proto必须为对象或者函数");
		    //}
		    
          if (typeof proto !== "object" && typeof proto !== "function") {
           // 类型校验
           throw new TypeError("proto必须为对象或者函数");
          }
          if ( defineProperties === null ) {
		      throw new TypeError('Cannot convert undefined or null to object')
		    }

		    function F(){}
		    F.prototype = proto  //也可以使用 Object.setPrototypeOf(result, proto);// 将该对象的原型设置为proto
   
		    let obj = new F()
		    if(properties){
		       Object.defineProperties(obj,properties)
		    }
		    if(proto === null){
		       obj.__proto__ = null
		    }
		    return obj
		}


#### 五、setPrototypeOf 与 Object.create区别 ####

- 设置原型的目的是进行对象间的委托，可以让一个对象获得另一个对象的一些属性或者方法。

- **关于设置一个对象的原型，JS提供了俩种方式。一种是通过setPrototypeOf，另一种是Object.create，通过了解二者的区别可以让我们能够根据情况去选择适合的方式。**

    function Animal (name,sound) {
        this.name = name
        this.sound = sound
    }
    
    Animal.prototype.shout = function () {
        console.log(this.name + this.sound)
    }
    
    let dog = new Animal('pipi','wang!wang!')
    
    // 定义Plants
    function Plants (name) {
        this.name = name
        this.sound = null
    }
    
    // 函数接收参数用于区分
    Plants.prototype.shout = function (xssss) {
        console.log(this.name + this.sound +'plants tag')
    }
    
    Plants.prototype.genO2 = function () {
        console.log(this.name + '生成氧气。')
    }

  - 使用create

    Animal.prototype = Object.create(Plants.prototype) //修改了Animal的原型对象

    console.log(Animal.prototype)
    /*
    Plants {}
        __proto__:
            shout: ƒ (xssss)
            genO2: ƒ ()
            constructor: ƒ Plants()
            __proto__: Object
    */

    console.log(Animal.prototype.constructor) //Plants //修改了Animal的原型对象

    let cat = new Animal('mimi','miao~miao~')
    
    dog.shout() // pipi wang!wang!
    cat.shout() // mimi miao~miao~ plants tag //使用的是Plants.prototyped的方法而不是Animal.prototype 原型上的

    cat.genO2() // mimi 生成氧气。

- 使用setPrototypeOf

    Object.setPrototypeOf(Animal.prototype,Plants.prototype)//没有修改Animal的原型对象
    console.log(Animal.prototype)
    /*
    Plants {shout: ƒ, constructor: ƒ}
        shout: ƒ (xssss)
        constructor: ƒ Animal(name,sound)
        __proto__:
        shout: ƒ ()
        genO2: ƒ ()
        constructor: ƒ Plants()
        __proto__: Object
    */
    console.log(Animal.prototype.constructor) //Animal //没有修改Animal的原型对象
    let cat = new Animal('mimi','miao~miao~')
    dog.shout() // pipi wang!wang!
    cat.shout() // mimi miao~miao~ //使用的是Animal.prototyped的方法而不是Plants.prototype 原型上的

    cat.genO2() // mimi 生成氧气。


**总结**

**1.使用Object.create** 

     - **Animal.prototype将会指向一个空对象，空对象的原型属性指向Plants的prototytpe。所以我们不能再访问Animal的原有prototypoe中的属性。Object.create的使用方式也凸显了直接重新赋值。**

     - **改变了constructor的指向，切断了和自己原型对象的联系**

**2.使用Object.setPrototypeOf**

     - **使用Object.setPrototypeOf则会将Animal.prototype将会指向Animal原有的prototype，然后这个prototype的prototype再指向Plants的prototytpe。所以我们优先访问的Animal，然后再是plants**

     - **其实是将Plants.prototytpe加入到自己的原型链中了，不改变constructor指向**
