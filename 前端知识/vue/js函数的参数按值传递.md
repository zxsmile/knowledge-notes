#### 一、概念 ####

- ECMAScript中所有函数的参数都是按值传递的。
- 按值传递：也就是说，把函数外部的值复制给函数内部的参数，就和把值从一个变量复制到另一个变量一样。
- 按引用传递：就是传递对象的引用，函数内部对参数的任何改变都会影响该对象的值，因为两者引用的是同一个对象。


   - 基本类型值

			var value = 1;
			function foo(v) {
			    v = 2;
			    console.log(v); //2
			}
			foo(value);
			console.log(value) // 1

            很好理解，当传递 value 到函数 foo 中，相当于拷贝了一份 value，假设拷贝的这份叫 _value，
            函数中修改的都是 _value 的值，而不会影响原来的 value 值。


   - 复杂类型

           var obj = {
			    value: 1
			};
			function foo(o) {
			    o.value = 2;
			    console.log(o.value); //2
			}
			foo(obj);
			console.log(obj.value) // 2


- 哎，不对啊，连我们的红宝书都说了 ECMAScript 中所有函数的参数都是按值传递的，这怎么能按"引用传递"成功呢？而这究竟是不是引用传递呢？

			var obj = {
			    value: 1
			};
			function foo(o) {
			    o = 2;
			    console.log(o); //2
			}
			foo(obj);
			console.log(obj.value) // 1

- 上面例子，如果 JavaScript 采用的是引用传递，就是obj和o两个是绑定在一块的，o指向了新的值，obj必定也指向新的值
- 所以对于引用类型拷贝的是指向堆内存的指针，所以也是值的传递


			