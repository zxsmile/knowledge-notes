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
                       deleteProperty() {
                           invariant(key,'delete')
                           delete target[key]
                           return ture
                       }
                   }

                   function invariant(key,action){
                       if(key[0]==='_'){
                           throw new Error(`Invalid attempt to ${action} private "${key}" property`);
                       }
                   }

                   var target ={_prop:'foo}
                   var proxy = new Proxy(target,handler)
                   delete proxy._prop

         (5)ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
         (6)getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
         (7)defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
         (8)preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
         (9)getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
         (10)isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
         (11)setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
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