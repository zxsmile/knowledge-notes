/* Symbol的内置方法

         1. Symbol.hasInstance

              -对象的Symbol.hasInstance属性指向一个内置的方法，当其他对象调用instanceof运算符判断是否为该对象的实例时，会调用这个方法

                      比如foo instance Foo在语言的内部实际上调用的是Foo[Symbol.hasInstance](foo)

                         class MyClass{
                             
                            [Symbol.hasInstance](foo) {
                                  return foo instanceof Array
                            }
                         }

                         [1,2,3] instanceof new MyClass()  // MyClass是一个类，new MyClass()会返回一个实例。该实例的Symbol.hasInstance方法，会在进行instanceof运算时自动调用，判断左侧的运算子是否为Array的实例


         2.Symbol.isConcatSpreadable

              -对象的Symbol.isConcatSpreadable属性等于一个布尔值，表示该对象用于Array.prototype.concat()时，是否可以展开,默认值为undefined表示可展开

                        let arr1 = ['c', 'd'];
                        ['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
                        arr1[Symbol.isConcatSpreadable] // undefined

                        let arr2 = ['c', 'd'];
                        arr2[Symbol.isConcatSpreadable] = false;
                        ['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']

              -类似数组的对象正好相反，默认不展开。它的Symbol.isConcatSpreadable属性设为true，才可以展开

                        let obj = {length: 2, 0: 'c', 1: 'd'};
                        ['a', 'b'].concat(obj, 'e') // ['a', 'b', obj, 'e']

                        obj[Symbol.isConcatSpreadable] = true;
                        ['a', 'b'].concat(obj, 'e') // ['a', 'b', 'c', 'd', 'e']

              -Symbol.isConcatSpreadable属性也可以定义在类里面

                        class A1 extends Array {
                        constructor(args) {
                            super(args);
                            this[Symbol.isConcatSpreadable] = true;
                        }
                        }
                        class A2 extends Array {
                        constructor(args) {
                            super(args);
                        }
                        get [Symbol.isConcatSpreadable] () {
                            return false;
                        }
                        }
                        let a1 = new A1();
                        a1[0] = 3;
                        a1[1] = 4;
                        let a2 = new A2();
                        a2[0] = 5;
                        a2[1] = 6;
                        [1, 2].concat(a1).concat(a2)
                        // [1, 2, 3, 4, [5, 6]]

                        上面代码中，类A1是可展开的，类A2是不可展开的，所以使用concat时有不一样的结果。

                        注意，Symbol.isConcatSpreadable的位置差异，A1是定义在实例上，A2是定义在类本身，效果相同
                 
*/

