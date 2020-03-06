/* 1.Gerenator函数

      (1)两个特征

          - function关键字与函数名之间有一个星号
          - 函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）

      (2)基本定义

          - Generator函数会返回一个遍历器对象，可以依次遍历Gererator函数内部的每一个状态
          - Generator函数的调用方法和普通函数一样，只不过调用之后不会执行，而是返回一个指向内部状态的一个指针对象
               - 下一步调用遍历器对象的next方法，使指针移向下一个状态
                   - 也就是说，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止
                   - 换言之，Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行
                   - next方法返回的对象的value属性就是当前yield表达式的值，done属性用来表示遍历是否结束

          - yield表达式只能用在Generator函数里面
          - yield表达式用在其他表达式里面的时候，必须要带括号
          - yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号


*/

/*2. next方法的参数

      - yield表达式本身没有返回值，或者说总是返回undefined，next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值
      - 如果想要第一次调用next方法时，就能够输入值，可以在 Generator 函数外面再包一层

*/

/* 3.for...of循环

     - for...of循环可以自动遍历 Generator 函数运行时生成的Iterator对象，且此时不再需要调用next方法
          - 这里需要注意，一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象

          function* foo() {
            yield 1;
            yield 2;
            yield 3;
            yield 4;
            yield 5;
            return 6;
            }

            for (let v of foo()) {
            console.log(v);
            }
            // 1 2 3 4 5

*/

/* 3. Generator.prototype.throw()

    - Generator函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误
    - 遍历器对象的throw方法和全局的throw方法是不同的
         - 前者如果Generator函数内部部署了try...catch代码块，错误将被内部try...catch代码块捕获，否则将被外部try...catch代码块捕获，如果内外都没有部署try...catch代码块，将会报错
         - 后者不能被内部捕获，只能被外部捕获

    - throw方法可以接受一个参数，该参数会被catch语句接收
    - throw方法抛出的错误要被内部捕获，前提是必须至少执行过一次next方法

           var g = function* (){
                
                try{
                    yield;
                }catch(e){
                    console.log("内部捕获："+ e)
                }
           }

            var i = g()
            i.next()
            try{
                i.throw('a')
                throw new Error('b')
            }catch(e){
                console.log("外部捕获："+ e)
            }

            // 内部捕获：a
            // 外部捕获：Error:b
    
    - throw方法被捕获以后，会附带执行下一条yield表达式。也就是说，会附带执行一次next方法
*/

/* 4. Generator.prototype.return()

       - Generator 函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历 Generator 函数

             function* gen() {
                yield 1;
                yield 2;
                yield 3;
                }

                var g = gen();

                g.next()        // { value: 1, done: false }
                g.return('foo') // { value: "foo", done: true }
                g.next()        // { value: undefined, done: true }

        - 如果return方法调用时，不提供参数，则返回值的value属性为undefined
        - 如果 Generator 函数内部有try...finally代码块，且正在执行try代码块，那么return方法会导致立刻进入finally代码块，执行完以后，整个函数才会结束

                function* numbers () {
                    yield 1;
                    try {
                        yield 2;
                        yield 3;
                    } finally {
                        yield 4;
                        yield 5;
                    }
                    yield 6;
                    }
                    var g = numbers();
                    g.next() // { value: 1, done: false }
                    g.next() // { value: 2, done: false }
                    g.return(7) // { value: 4, done: false }
                    g.next() // { value: 5, done: false }
                    g.next() // { value: 7, done: true }

*/

/* 5.yield*表达式

     - 用来在一个 Generator 函数里面执行另一个 Generator 函数
     
           function* inner() {
            yield 'hello!';
            }

            function* outer2() {
            yield 'open'
            yield* inner()
            yield 'close'
            }

            var gen = outer2()
            gen.next().value // "open"
            gen.next().value // "hello!"
            gen.next().value // "close"

     - yield*后面的 Generator 函数（没有return语句时），等同于在 Generator 函数内部，部署一个for...of循环
     - 在有return语句时，则需要用var value = yield* iterator的形式获取return语句的值

           function* foo() {
                yield 2;
                return "foo";
                }

                function* bar() {
                yield 1;
                var v = yield* foo();
                console.log("v: " + v);
                yield 4;
                }

                var it = bar();

                it.next()
                // {value: 1, done: false}
                it.next()
                // {value: 2, done: false}
                it.next();
                // "v: foo"
                // {value: 4, done: false}
                it.next()
                // {value: undefined, done: true}
     
      - 任何数据结构只要有 Iterator 接口，就可以被yield*遍历

*/

/* 6.Generator函数的this

      - Generator 函数总是返回一个遍历器，ES6 规定这个遍历器是 Generator 函数的实例，也继承了 Generator 函数的prototype对象上的方法
      - 但把Generator 函数当作普通的构造函数，并不会生效，因为Generator 函数返回的总是遍历器对象，而不是this对象
      - Generator 函数也不能跟new命令一起用，会报错
      - 使用变通的方法，让Generator函数既可以执行next方法，又能获得正常的this

            function* F(){
                this.a = 1
                yield this.b = 2
                yield this.c = 3
            }

            var f = F.call(F.prototype)

            f.next();  // Object {value: 2, done: false}
            f.next();  // Object {value: 3, done: false}
            f.next();  // Object {value: undefined, done: true}

            f.a // 1
            f.b // 2
            f.c // 3

     - 再将F改成构造函数，就可以对它执行new命令了

       function* gen() {
        this.a = 1;
        yield this.b = 2;
        yield this.c = 3;
        }

        function F() {
        return gen.call(gen.prototype);
        }

        var f = new F();

        f.next();  // Object {value: 2, done: false}
        f.next();  // Object {value: 3, done: false}
        f.next();  // Object {value: undefined, done: true}

        f.a // 1
        f.b // 2
        f.c // 3
*/