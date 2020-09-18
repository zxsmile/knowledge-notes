https://segmentfault.com/a/1190000016828714

语法糖：指计算机语言中添加的某种语法，这种语法对语言的功能没什么影响，但是更方便程序员使用。通常来说，使用语法糖会使程序更加简洁明了，增加程序的可读性

以class Animal{}为例  被Babel编码后其实使用class声明的Animal被编译为了一个函数

1.子类的属性 

  - 判断完类是不是通过new调用的
      - 如果是则this是被实例化的Animal对象，直接通过this.name=name调用
      - 如果不是则this被实例化成全局变量，会报错

2.子类的方法

  - 将所有方法写进一个数组里，数组的每一项是一个对象，对象包含key和value两个键，key的值为函数名，value的值为这个函数。
  - 然后依次遍历数组的每一项，设置以key为属性的这个属性的描述
  - 使用Object.definePrototype方法为Animal.prototype添加一个属性名为函数名，属性值为函数的属性

3.继承（extends）

  （1）继承主要是使用了寄生组合继承

       function _inherits(subClass, superClass) {

		    if(typeof superClass !== 'function' && super !== null){
              throw new TypeError(
                'Super expression must either be null or a function,not' + typeof superClass
              )
            }

		    subClass.prototype = Object.create(superClass && superClass.prototype, {
		        constructor: {
		            value: subClass,
		            enumerable: false,
		            writable: true,
		            configurable: true
		        }
		    });

		    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
		}

       上面就是实现继承的那个函数

   （2） 第一个问题为什么不直接 
   
          subClass.prototype = superClass && superClass.prototype
          subClass.prototype.constructor=subClass
   
   而是要使用Object.create()呢？

          - 因为subClass.prototype直接等于了superClass.prototype，为了避免任何对subClass.prototype的修改影响到superClass.prototype
          - 使用Object.create()出来的对象，其实是将subClass.prototype.__proto__=superClass.prototype,这样subClass就继承了superClass

  （3） 最后这一句代码是干啥的？

      - Object.setPrototypeOf(obj, prototype)设置指定对象的原型

          - obj:要设置其原型的对象
          - prototype：该对象的新原型

      - 所以最后一行代码的意思就是将subClass.__proto__设置为superClass。目的是让它继承superClass的静态方法和属性

  （4）总结一下

      - 在使用了extends关键字后，实际上背后发生的事情是：

            - 子类prototype上的__proto__被正确设置，指向父类的prototype
            - 子类prototype上的constructor被正确初始化了，指向子类自己，这样instanceof关系能得到正确的值
            - 子类的__proto__被指向父类，这样父类上的静态方法和属性都能被子类继承

   