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
        -若Object.assign方法只有一个参数，则会直接返回该参数。如果该参数不是对象，会先转换为对象然后再返回，由于null和undefined
        不能转换成对象，所以用作第一个参数会报错
            
            let obj = {a:1}
            Object.assign(obj)===obj  //true

            typeof Object.assign(2)  //'object'

            Object.assign(null)  // 报错
            Object.assign(undefined) // 报错

        -如果非对象参数出现在源对象位置，则处理方式有所不同，会先转化为对象，如果不能转化为对象，则会跳过，这意味着，如果undefined
        和null不在首参数，就不会报错。
        -其它类型的值(即数值，字符串，布尔值)，不在首参数，也不会报错，但是除了字符串会以数组的形式拷贝到目标对象，其他值都不会产生
        效果(因为只有字符串的的包装对象会产生可枚举属性)

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

      -实现getOwnPropertyDescriptors方法：

            function getOwnPropertyDescriptors(obj){

                 let result ={}
                for(let key of Reflect.ownKeys(obj)){
                    result[key] = Object.getOwnPropertyDescriptor(obj,key)
                }

                return result
                
            }

            // Reflect.ownKeys() 返回对象的所有属性

      -该方法的引入主要是为了解决Object.assign方法无法正确拷贝set属性和get属性，实现如下（Object.getOwnPropertyDescriptors方法配合Object.defineProperties方法）：

             Object.defineProperties(obj,proto)

                  -该方法用于在一个对象上定义一个或多个新的属性或者修改新的属性，并返回该对象
                  -obj:将要被添加属性或修改属性的对象
                  -proto:该对象的一个或多个键值对定义了将要为对象添加或修改的属性的具体配置
                  -如 Object.defineProperties(obj,{
                      name: {
                        value: '张三',
                        configurable: false,
                        writable: true,
                        enumerable: true
                      },
                      age: {
                          value: 18,
                          configurable: true
                      }
                  })

                  function clone(target,source){

                      target = Object.defineProperties(target,Object.getOwnPropertyDescriptors(source))
                      return target
                  }
      
               
      -该方法可与Object.create方法配合将一个方法属性克隆到一个新对象，属于浅拷贝

                let shallowClone = (obj)=>{
                     
                     let result={}
                    Object.create(Object.getPrototypeOf(obj),Object.getOwnPropertyDescriptors(obj))
                    return result
                }
                
                let b =shallowClone(obj)

                Object.create(obj,[propertiesObject]) 
                
                    -该方法用于获取obj的实例对象
                    -obj：表示新建对象的原型对象
                    -propertiesObject：可选， 添加到新创建对象的可枚举属性

                Object.getPrototypeOf(obj) 
                
                    -获取对象的原型对象
      -Object.getOwnPropertyDescriptors方法可实现一个对象继承另一个对象
      
                以前可用以下方法实现：

                     let obj = Object.create(pront)
                     obj.foo = 123

                     或者

                     let obj = Object.creat(pront,{
                         foo:123
                     })

                使用Object.getOwnPropertyDescriptors实现：

                     let obj = Object.create(
                        prot,
                        Object.getOwnPropertyDescriptors({
                            foo: 123,
                        })
                        );

*/

/* 4. __proto__

调用__proto__实际上是调用的Object.prototype.__proto__,具体实现是如下：

       Object.defineProperty=(Object.prototype,'__proto__',{

        get() {
            let thisObj=Object(this)
            return Object.getPrototypeOf(thisObj) //获取调用__proto__对象的原型对象
        },

        set(proto) {

            if(this===undefined||this===null){
                throw new TypeError()
            }

            if(!isObject(this)){
                return undefind
            }

            if(!isObject(proto)){
                return undefined
            }

            let status = Reflect.setPrototypeOf(this,proto)

            if(!status){
                throw new TypeError()
            }
        }

       })

       function isObject(value){
       
              return Object(value)===value
       }
*/

/* 5.Object.setPrototypeOf

       -该方法用来设置一个对象的prototype对象
       
              Object.setProtorypeOf(obj,prototype) //将prototype对象设置为obj的原型对象

       -如果第一个参数不是对象，会自动转换为对象
       -由于undefined和null无法转换为对象，所以第一个参数为undefined或null会报错
*/

/* 6.Object.getPrototypeOf

       -该方法用于读取一个对象的原型对象
       
            Object.getPrototypeOf(obj)

       -如果第一个参数不是对象，则会自动转化为对象
       -如果为undefined或null会报错

*/

/* 6.Object.keys(),Object.values(),Object.entries()

      (1)Object.keys()

          -返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名

      (2)Object.values()

          -返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值
          -Object.values会过滤属性名为 Symbol 值的属性
          -如果Object.values方法的参数是一个字符串，会返回各个字符组成的一个数组
          -如果参数不是对象，Object.values会先将其转为对象。由于数值和布尔值的包装对象，都不会为实例添加非继承的属性。所以，Object.values会返回空数组。

      (3)Object.entries()

          -返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组
          -如果原对象的属性名是一个 Symbol 值，该属性会被忽略
          -Object.entries方法的另一个用处是，将对象转为真正的Map结构

                const obj = { foo: 'bar', baz: 42 };
                const map = new Map(Object.entries(obj));
                map // Map { foo: "bar", baz: 42 }

          -自己实现Object.entries方法

               //非Generator方法

                function entries(obj){
                    let arr =[]
                    for(let key of Object.keys(obj)){
                        arr.push([key,obj[key]])
                    }
                       return arr
                }

              //Generator方法

              function* entries(obj) {
                for (let key of Object.keys(obj)) {
                    yield [key,obj[key]];
                }
                }


*/

/* 7.Object.fromEntries()

         -Object.fromEntries()方法是Object.entries()的逆操作，用于将一个键值对数组转为对象

              Object.fromEntries([['foo','bar'],['baz',123]])  // {foo:'bar',baz:123}

        -该方法的主要目的，是将键值对的数据结构还原为对象，因此特别适合将 Map 结构转为对象

              let entries = new Map([['foo','bar'],['baz',123]])
              Object.fromEntries(entries)

        -该方法的一个用处是配合URLSearchParams对象，将查询字符串转为对象

              Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'))
*/

