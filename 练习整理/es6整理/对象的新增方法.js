/* 1.Object.is()
  
      -这个方法用来判断两个值是否相等
      -在es5中判断两个值是否相等，只有两个运算符：相等运算符(=)和严格相等运算符(===)，它们都有缺点：
      
           -相等运算符是会转换数据类型，严格相等运算符的NaN不等于自身且+0和-0相等
      -Object.is方法和严格相等运算符行为基本一致，并且改正了严格相等运算符的缺点

       Object.is(NaN,NaN) // true
       Object.is(+0,-0)   // false
    
*/

/* 2. Object.assign()

      (1)基本用法
    
        -该方法用于对象的合并，将源对象的所有可枚举属性，复制到目标对象，该方法的第一个参数是目标对象，后边的参数全是源对象

                let target = {}
                let source1 = {a:1},source2={b:2},source3={c:3}
                Object.assign(target,source1,source2,source3)
                console.log(target) // {a:1,b:2,c:3}

        -若目标对象与源对象，或者多个源对象有同名的属性，则后面的属性会覆盖前面的属性
        -若Object.assign方法只有一个参数，则会直接返回该参数。如果该参数不是对象，会先转换为对象然后再返回，由于null和undefined不能转换成对象，所以用作第一个参数会报错
            
            let obj = {a:1}
            Object.assign(obj)===obj  //true

            typeof Object.assign(2)  //'object'

            Object.assign(null)  // 报错
            Object.assign(undefined) // 报错

        -如果非对象参数出现在源对象位置，则处理方式有所不同，会先转化为对象，如果不能转化为对象，则会跳过，这意味着，如果undefined和null不在首参数，就不会报错。
        -其它类型的值(即数值，字符串，布尔值)，不在首参数，也不会报错，但是除了字符串会以数组的形式拷贝到目标对象，其他值都不会产生效果(因为只有字符串的的包装对象会产生可枚举属性)

            let obj = {}
            Object.assign(obj,2,{a:1},true,undefined)
            console.log(obj) // {a:1}

        -Objcet.assign方法只拷贝源对象自身的属性，不拷贝继承属性，也不拷贝不可枚举的属性（enumerable:false）

            let obj = {a:1}
            let source = {}
            Object.defineProperty(source,'foo',{
                value:'hello',
                enumerable:false
            })
            Object.assign(obj,source)
            console.log(obj) //{a:1}

        - 属性名为Symbol值的属性，也会被Object.assign拷贝
    
            let obj = {a:1}
            let source = {[Symbol('c')]:'d'}
            Object.assign(obj,source)
            console.log(obj) // {a:1,[Symbol(c)];'d'}

      (2)注意点

          -该方法是浅拷贝，而不是深拷贝
          -该方法可以用来处理数组，只不过会把数组当作对象处理
            
                Object.assign([1,2,3],[4,5]) //[4,5,3]
        
          -该方法只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后的再复制

                 const source = {
                     get foo() {return 1}
                 }

                 Object.assign({},source)  // {foo:1}

      (3)用途

          -为对象添加属性

                class Point {
                    constructor(x, y) {
                        Object.assign(this, {x, y});
                    }
                }
            
           -为对象添加方法

                Object.assign(SomeClass.prototype, {
                someMethod(arg1, arg2) {
                    ···
                },
                anotherMethod() {
                    ···
                }
                });

                // 等同于下面的写法
                SomeClass.prototype.someMethod = function (arg1, arg2) {
                ···
                };
                SomeClass.prototype.anotherMethod = function () {
                ···
                };

           -克隆对象

                function(obj){
                    Object.assign({},obj)
                }
                这样只能克隆该对象自身的属性，要想保持继承链，可用以下代码

                function clone(origin){

                    let originProto = Object.getPrototypeOf(origin) //获取origin的原型对象
                    Object.assign(Object.creat(originProto),origin) //Object.creat(originProto)生成originProto的实例对象，则就继承了origin原型上的对象
                } 

            -合并多个对象
            
                let merge =(target,...source)=>{
                    Object.assign(target,...source)
                }

            -为属性指定默认值

                const DEFAULTS = {
                logLevel: 0,
                outputFormat: 'html'
                };

                function processContent(options) {
                options = Object.assign({}, DEFAULTS, options);
                console.log(options);
                // ...
                }

                上面代码中，DEFAULTS对象是默认值，options对象是用户提供的参数。Object.assign方法将DEFAULTS和options合并成一个新对象，如果两者有同名属性，则options的属性值会覆盖DEFAULTS的属性值。


*/

/* 3.Object.getOwnPropertyDescriptors()

      -ES5 的Object.getOwnPropertyDescriptor()方法会返回某个对象属性的描述对象（descriptor）
      -ES2017 引入了Object.getOwnPropertyDescriptors()方法，返回指定对象所有自身属性（非继承属性）的描述对象

         let obj={
             foo:'123',
             get bar() {
                 return 'abc'
             }
         }

         Object.getOwnPropertyDescriptors(obj)  
         
         // { foo:
                { value: '123',
                    writable: true,
                    enumerable: true,
                    configurable: true 
                },
                bar:
                { get: [Function: get bar],
                    set: undefined,
                    enumerable: true,
                    configurable: true
                } 
            }
    上面代码中，Object.getOwnPropertyDescriptors()方法返回一个对象，所有原对象的属性名都是该对象的属性名，对应的属性值就是该属性的描述对象。


*/


let obj={
    foo:'123',
    get bar() {
        return 'abc'
    }
}

console.log(Object.getOwnPropertyDescriptors(obj))
