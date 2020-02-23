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

    2.Proxy实例的拦截方法(13种)    
    
         (1)get(target, propKey, receiver)：拦截对象属性的读取
        
                -target:目标对象
                -propKey:属性名
                -receiver:proxy实例本身（严格地说，是操作行为所针对的对象）

            - get方法可继承

         (2)set(target, propKey, value, receiver)：拦截对象属性的设置，
         (3)has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。
         (4)deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
         (5)ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
         (6)getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
         (7)defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
         (8)preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
         (9)getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
         (10)isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
         (11)setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
         (12)apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
         (13)construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。

*/

