/* 1.Set数据结构

       (1)Set基本语法

            -Set本身是一个构造函数，用来生成Set数据结构,它类似于数组，但是成员的值都是唯一的，没有重复的
                
                    let s = new Set()

            -Set函数可以接受一个数组或者具有Iterable接口的其他数据结构作为参数，来初始化

                    let s = new Set([1,2,3])
                    let s = new Set(document.querySelectorAll('div'))

            -可以用Set来去除数组的重复成员

                    [...new Set(array)]

            -也可以用于去除字符串里面的重复字符

                    [...new Set('aabdhsjss')].join('')
                
            -向Set加入值的时候，不会发生类型转换，所以5和'5'是两个不同的值
            -Set内部判断两个值是否相等，使用的算法是，类似于严格相等运算符(===)，不同的是Set加入成员时认为NaN是等于自身的
            -两个对象总是不相等的

                    let s = new Set()
                    s.add({})
                    s.size //1
                    s.add({})
                    s.size //2

            -Array.from方法可以将Set结构转化为数组

                   let s = new Set([1,2,3])
                   let news = Array.from(s)
                   console.log(news) //[1,2,3]
            
            -使用Array.from和Set结构数组去重

                   Array.from(new Set(Array))

       (2)Set实例的属性

            - Set.prototype.constructor:构造函数，默认就是Set函数
            - Set.prototype.size:返回Set实例的成员总数

       (3)Set实例的方法

            -操作方法：用于操作数据

                 - Set.prototype.add(value):添加某个值，返回Set结构本身
                 - Set.protorype.delete(value):删除某个值，返回一个布尔值，表示是否删除成功
                 - Set.prototype.has(value):返回一个布尔值，表示该值是否时Set的成员
                 - Set.prototype.clear:清除所有成员，没有返回值

            -遍历方法：用于遍历成员

                 - Set.prototype.keys()：返回键名的遍历器
                 - Set.prototype.values()：返回键值的遍历器
                 - Set.prototype.entries()：返回键值对的遍历器
                 - Set.prototype.forEach()：使用回调函数遍历每个成员

               Set的遍历顺序就是插入顺序,这个特性特别有用，比如使用Set保存一个回调函数列表，调用时就能保证按照添加顺序调用

                    -keys(),values(),entries()

                          -这三个方法返回的都是遍历器对象，由于Set结构没有键名只有键值(或者说键名和键值是同一个值)，所以keys和values方法的行为完全一致

                                let color = new Set(['red','green','yellow'])

                                 for(let key of color.keys()){
                                     console.log(key) 
                                 }

                                   //red
                                   //green
                                   //yellow

                                 for(let key of color.values()){
                                     console.log(key)
                                 }

                                    //red
                                    //green
                                    //yellow

                                 for(let key of color.entries()){
                                     console.log(key)
                                 }


                                    //[ 'red', 'red' ]
                                    //[ 'green', 'green' ]
                                    //[ 'yellow', 'yellow' ]

                          -Set结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法,这意味着可以省略values方法，直接用for...of...循环遍历Set

                                 Set.prototype[Symbol.iterator] === Set.prototype.values  //true

                    -forEach()

                         - Set结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，没有返回值
                         - forEach方法的参数是一个函数，该函数的参数依次是键值，键名，集合本身
                         - forEach方法还可以有第二个参数，表示绑定处理函数内部的this对象

                                 let set = new Set([1,2,3])
                                 set.forEach((value,key)=>{
                                     console.log(key+':'+value)
                                 })

                                   // 1:1
                                   // 2:2
                                   // 3:3
                    
                    -遍历的应用

                         - 任何遍历了iterator接口的数据结构都可以使用扩展运算符
                         - 扩展运算符和Set相结合可以数组去重

                           [...new Set(array)]

                         - 数组的map和filter方法也可以间接用于Set

                           let set = new Set([1,2,3])
                           set = new Set([...set].map(x=>x*2))
                             //Set {2,4,6}  

                           let set = new Set([1,2,3])
                           set = new Set([...set].filter(x=>(x%2)==0))
                            //Set {2}  

                         -使用Set实现并集，交集，差集

                           let a = new Set([1,2,3])
                           let b = new Set([3,4,5])

                           //并集

                           let union = new Set([...a,...b])
                             // Set {1,2,3,4,5}

                           //交集

                           let intersect = new Set([...a].filter(x => b.has(x)));
                             //Set {3}  

                            //差集

                            let difference = new Set([...a].filter(x => !b.has(x)));
                              //Set {1,2}

                         -如果想在遍历操作中，同步改变原来的 Set 结构，目前没有直接的方法，但有两种变通方法。一种是利用原 Set 结构映射出一个新的结构，然后赋值给原来的 Set 结构；另一种是利用Array.from方法

                             // 方法一
                            let set = new Set([1, 2, 3]);
                            set = new Set([...set].map(val => val * 2));
                            // set的值是2, 4, 6

                            // 方法二
                            let set = new Set([1, 2, 3]);
                            set = new Set(Array.from(set, val => val * 2));
                            // set的值是2, 4, 6

*/

/* 2.WeakSet

        - WeakSet与Set类似，也是不重复值的集合，但是它与Set有两个区别：

              - WeakSet的成员只能是对象，而不能是其他类型的值
              - WeakSet中的对象都是弱引用，即垃圾回收机制不会考虑WeakSet对该对象的引用，也就是说如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于WeakSet之中
              - WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。
              - 由于上面这个特点，WeakSet 的成员是不适合引用的，因为它会随时消失。另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakSet 不可遍历

        - 语法

              - WeakSet是一个构造函数，可以使用new命令创建WeakSet数据结构
                 
                     let ws= new WeakSet()
                
              - 作为构造函数，WeakSet 可以接受一个数组或类似数组的对象作为参数。（实际上，任何具有 Iterable 接口的对象，都可以作为 WeakSet 的参数。）该数组的所有成员，都会自动成为 WeakSet 实例对象的成员
              
                       const a = [[1, 2], [3, 4]];
                       const ws = new WeakSet(a);
                        // WeakSet {[1, 2], [3, 4]}

                    注意，是a数组的成员成为 WeakSet 的成员，而不是a数组本身。这意味着，数组的成员只能是对象 
                    
        - WeakSet结构的方法

              - WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
              - WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
              - WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 

        - WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏
*/
