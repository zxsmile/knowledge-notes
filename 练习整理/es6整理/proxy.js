/* 1.基本定义

        - Proxy译为代理，在目标对象之前架设一层拦截
        - Es6原生提供了Proxy构造函数来生成Proxy实例

            var proxy = new Proxy(target,handler)

               target参数表示所要拦截的目标对象
               handler参数也是一个对象，用来定制拦截行为,如果handler没有设置任何拦截，那就等同于直接通向原对象

                    var target = {};
                    var handler = {};
                    var proxy = new Proxy(target, handler);
                    proxy.a = 'b';
                    target.a // "b"

                    上面代码中，handler是一个空对象，没有任何拦截效果，访问proxy就等同于访问target
        
        -  Proxy 实例也可以作为其他对象的原型对象。

                var proxy = new Proxy({}, {
                get: function(target, propKey) {
                    return 35;
                }
                });

                let obj = Object.create(proxy);
                obj.time // 35

                上面代码中，proxy对象是obj对象的原型，obj对象本身并没有time属性，所以根据原型链，会在proxy对象上读取该属性，导致被拦截

*/

/* 2.Proxy实例的拦截方法(13种)    
    
         (1)get(target, propKey, receiver)：拦截对象属性的读取
        
                -target:目标对象
                -propKey:属性名
                -receiver:proxy实例本身（严格地说，是操作行为所针对的对象）

            - get方法可继承
            - 如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错

         (2)set(target, propKey, value, receiver)：拦截对象属性的设置

                -target:目标对象
                -propKey:属性名
                -value:属性值
                -receiver:proxy实例本身（严格地说，是操作行为所针对的对象）

            - 如果目标对象自身的某个属性，不可写且不可配置，那么set方法将不起作用
            - 严格模式下，set代理如果没有返回true，就会报错
                
         (3)has(target, propKey)：拦截propKey in proxy的操作，即判断对象是否具有某个属性，返回一个布尔值

                -target:目标对象
                -propKey:需查询的属性名

            - 如果原对象不可配置或者禁止扩展，这时has拦截会报错
            - has方法拦截的是HasProperty操作，而不是HasOwnProperty操作，即has方法不判断一个属性是对象自身的属性，还是继承的属性
            - 虽然for...in循环也用到了in运算符，但是has拦截对for...in循环不生效

                 let stu1 = {name:"张三",score:59}
                 let stu2 = {name:"李四",score:99}

                 let handler={
                     has(target,prop) {
                         if(prop==='score'&&target[score]<60){
                             console.log(`${target[name]}不及格`)
                             return false
                         }

                         return prop in target
                     }
                 }

                 let proxy1 = new Proxy(stu1,handler)
                 let proxy2 = new Proxy(stu2,handler)

                 score in proxy1
                 //张三不及格
                 //false

                 score in proxy2
                 //true

                 for (let key in proxy1){
                    console.log(proxy1[key])
                }

                // 张三
                // 59

                for(let key in proxy2){
                    console.log(proxy2[key])
                }

                // 李四
                // 99

                上面代码中，has拦截只对in运算符生效，对for...in循环不生效，导致不符合要求的属性没有被for...in循环所排除


         (4)deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值

                  -target:目标对象
                  -propKey:删除的属性

            - 如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除

                   var handler = {
                        deleteProperty (target, key) {
                        invariant(key, 'delete');
                        delete target[key];
                        return true;
                        }
                    };
                    function invariant (key, action) {
                        if (key[0] === '_') {
                        throw new Error(`Invalid attempt to ${action} private "${key}" property`);
                        }
                    }
                    
                    var target = { _prop: 'foo' };
                    var proxy = new Proxy(target, handler);
                    delete proxy._prop
                    // Error: Invalid attempt to delete private "_prop" property

            - 目标对象自身的不可配置（configurable）的属性，不能被deleteProperty方法删除，否则报错

         (5)ownKeys(target)：ownKeys方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作

                    Object.getOwnPropertyNames()
                    Object.getOwnPropertySymbols()
                    Object.keys()
                    for...in循环
                            
                   let target = {
                        a: 1,
                        b: 2,
                        c: 3
                        };

                        let handler = {
                        ownKeys(target) {
                            return ['a'];
                        }
                        };

                        let proxy = new Proxy(target, handler);

                        Object.keys(proxy)
                        // [ 'a' ]

            - 使用Object.keys方法时，有三类属性会被ownKeys方法自动过滤，不会返回。

                    - 目标对象上不存在的属性
                    - 属性名为 Symbol 值
                    - 不可遍历（enumerable）的属性

                    let target = {
                        a: 1,
                        b: 2,
                        c: 3,
                        [Symbol.for('secret')]: '4',
                        };

                        Object.defineProperty(target, 'key', {
                        enumerable: false,
                        configurable: true,
                        writable: true,
                        value: 'static'
                        });

                        let handler = {
                        ownKeys(target) {
                            return ['a', 'd', Symbol.for('secret'), 'key'];
                        }
                        };

                        let proxy = new Proxy(target, handler);

                        Object.keys(proxy)
                        // ['a']

            - ownKeys方法返回的数组成员，只能是字符串或 Symbol 值。如果有其他类型的值，或者返回的根本不是数组，就会报错

                        var obj = {};

                        var p = new Proxy(obj, {
                        ownKeys: function(target) {
                            return [123, true, undefined, null, {}, []];
                        }
                        });

                        Object.getOwnPropertyNames(p)
                        // Uncaught TypeError: 123 is not a valid property name
                        上面代码中，ownKeys方法虽然返回一个数组，但是每一个数组成员都不是字符串或 Symbol 值，因此就报错了

            - 如果目标对象自身包含不可配置的属性，则该属性必须被ownKeys方法返回，否则报错。

                        var obj = {};
                        Object.defineProperty(obj, 'a', {
                        configurable: false,
                        enumerable: true,
                        value: 10 }
                        );

                        var p = new Proxy(obj, {
                        ownKeys: function(target) {
                            return ['b'];
                        }
                        });

                        Object.getOwnPropertyNames(p)
                        // Uncaught TypeError: 'ownKeys' on proxy: trap result did not include 'a'
                     上面代码中，obj对象的a属性是不可配置的，这时ownKeys方法返回的数组之中，必须包含a，否则会报错

            - 如果目标对象是不可扩展的（non-extensible），这时ownKeys方法返回的数组之中，必须包含原对象的所有属性，且不能包含多余的属性，否则报错


         (6)getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回一个属性描述对象或者undefined

                    - target:目标对象
                    - propKey:属性值

                     var handler = {
                            getOwnPropertyDescriptor (target, key) {
                                if (key[0] === '_') {
                                return;
                                }
                                return Object.getOwnPropertyDescriptor(target, key);
                            }
                            };
                            var target = { _foo: 'bar', baz: 'tar' };
                            var proxy = new Proxy(target, handler);
                            Object.getOwnPropertyDescriptor(proxy, 'wat')
                            // undefined
                            Object.getOwnPropertyDescriptor(proxy, '_foo')
                            // undefined
                            Object.getOwnPropertyDescriptor(proxy, 'baz')
                            // { value: 'tar', writable: true, enumerable: true, configurable: true }

         (7)defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值

                    target:目标对象
                    propKey:属性值
                    propDesc:

            - defineProperty方法返回false，导致添加新属性总是无效

                    var handler = {
                        defineProperty (target, key, descriptor) {
                            return false;
                        }
                        };
                        var target = {};
                        var proxy = new Proxy(target, handler);
                        proxy.foo = 'bar' // 不会生效
            - 如果目标对象不可扩展（non-extensible），则defineProperty不能增加目标对象上不存在的属性，否则会报错。另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），则defineProperty方法不得改变这两个设置


         (8)preventExtensions(target)：拦截Object.preventExtensions(proxy)，该方法必须返回一个布尔值，否则会被自动转为布尔值

            - 这个方法有一个限制，只有目标对象不可扩展时（即Object.isExtensible(proxy)为false），proxy.preventExtensions才能返回true，否则会报错

            - 为了防止出现这个问题，通常要在proxy.preventExtensions方法里面，调用一次Object.preventExtensions

                      var proxy = new Proxy({}, {
                        preventExtensions: function(target) {
                            console.log('called');
                            Object.preventExtensions(target);
                            return true;
                        }
                        });

                        Object.preventExtensions(proxy)
                        // "called"
                        // Proxy {}
           

         (9)getPrototypeOf(target)：getPrototypeOf方法主要用来拦截获取对象原型，返回一个对象。具体来说，拦截下面这些操作。

                    Object.prototype.__proto__
                    Object.prototype.isPrototypeOf()
                    Object.getPrototypeOf()
                    Reflect.getPrototypeOf()
                    instanceof，

                    var proto = {};
                    var p = new Proxy({}, {
                    getPrototypeOf(target) {
                        return proto;
                    }
                    });
                    Object.getPrototypeOf(p) === proto // true

            - getPrototypeOf方法的返回值必须是对象或者null，否则报错
            - 如果目标对象不可扩展（non-extensible）， getPrototypeOf方法必须返回目标对象的原型对象

                        
         (10)isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值

                    var p = new Proxy({}, {
                        isExtensible: function(target) {
                            console.log("called");
                            return true;
                        }
                        });

                        Object.isExtensible(p)
                        // "called"
                        // true

            - 该方法只能返回布尔值，否则返回值会被自动转为布尔值
            - 这个方法有一个强限制，它的返回值必须与目标对象的isExtensible属性保持一致，否则就会抛出错误

         (11)setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截

            - 该方法只能返回布尔值，否则会被自动转为布尔值。另外，如果目标对象不可扩展（non-extensible），setPrototypeOf方法不得改变目标对象的原型
           
         (12)apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作以及call和apply操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)

                 -target:目标对象
                 -object:目标对象的上下文对象（this）
                 -args:目标对象的参数数组

            -直接调用Reflect.apply方法，也会被拦截

                 var twice = {
                     apply(target,object,args) {
                         return Reflect.apply(...arguments)*2
                     }
                 }

                 function sum(left,right){
                     return left+right
                 }

                 var proxy = new Proxy(sum,twice)
                 proxy(1,2) //6
                 proxy.apply(null,5,6) //22
                 proxy.call(null,[7,8]) //30
         
         (13)construct(target, args,newTarget)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)

                target:目标对象
                args:构造函数的参数数组
                newTarget：创造实例对象时，new命令作用的构造函数（下面例子的p）

                var p = new Proxy(function(){},{
                    construct(target,args,newTarget) {
                           console.log("called:" + args.join(','))
                           return {value:args[0]*10}
                    }
                })

                (new p(1)).value

                // called:1
                // 10

            - construct方法返回的必须是一个对象，否则会报错    
*/


/* 3.Proxy.revocable() 

      - Proxy.revocable方法返回一个可取消的 Proxy 实例
      - Proxy.revocable方法返回一个对象，该对象的proxy属性是Proxy实例，revoke属性是一个函数，可以取消Proxy实例。

            let target = {};
            let handler = {};

            let {proxy, revoke} = Proxy.revocable(target, handler);

            proxy.foo = 123;
            proxy.foo // 123

            revoke();
            proxy.foo // TypeError: Revoked

     - Proxy.revocable的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问

*/
