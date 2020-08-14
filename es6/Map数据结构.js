/* 1.Map数据结构 

        (1)基本语法

              - Map数据结构类似于对象，也是键值对的集合，但是键的范围不限于字符串，各种类型的值(包括对象)都可以当作键
              - Object提供了"字符串-值"的对应，Map提供了"值-值"的对应，如果需要"键值对"的数据结构，Map比Object合适
              - 任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构都可以当作Map构造函数的参数。这就是说，Set和Map都可以用来生成新的 Map

                     let set = new Set([
                         ['foo',1],
                         ['bar',2]
                     ])
                     let m1 = new Map(set)
                     m1.get('foo') //1

                     let m2 = new Map([['baz',3]])
                     let m3 = new Map(m2)
                     m3.get('baz') //3
                    上面代码中，我们分别使用 Set 对象和 Map 对象，当作Map构造函数的参数，结果都生成了新的 Map 对象

              - 如果对同一个键多次赋值，后面的值将覆盖前面的值
              - 如果读取一个未知的键，则返回undefined
              - 只有对同一个对象的引用，Map结构才将其视为同一个键

                     let m = new Map()
                     m.set(['a'],555)
                     m.get(['a']) //undefined
                    上面代码的set和get方法，表面是针对同一个键，但实际上这是两个不同的数组实例，内存地址是不一样的，因此get方法无法读取该键，返回undefined。

              - 同样的值的两个实例，在 Map 结构中被视为两个键

                    const map = new Map();

                    const k1 = ['a'];
                    const k2 = ['a'];

                    map
                    .set(k1, 111)
                    .set(k2, 222);

                    map.get(k1) // 111
                    map.get(k2) // 222
                    上面代码中，变量k1和k2的值是一样的，但是它们在 Map 结构中被视为两个键

              - 由上可知，Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞（clash）的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名
              - 如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，比如0和-0就是一个键，布尔值true和字符串true则是两个不同的键。另外，undefined和null也是两个不同的键。虽然NaN不严格相等于自身，但 Map 将其视为同一个键

       (2)实例的属性

              - size属性返回 Map 结构的成员总数
              - Map.prototype.set(key, value):set方法设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。
                       - set方法返回的是当前的Map对象，因此可以采用链式写法

                            let map = new Map()
                                    .set(1, 'a')
                                    .set(2, 'b')
                                    .set(3, 'c');

             - Map.prototype.get(key):get方法读取key对应的键值，如果找不到key，返回undefined
             - Map.prototype.has(key):has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中
             - Map.prototype.delete(key):delete方法删除某个键，返回true。如果删除失败，返回false
             - Map.prototype.clear():clear方法清除所有成员，没有返回值

        (3)遍历的方法

            - Map.prototype.keys()：返回键名的遍历器。
            - Map.prototype.values()：返回键值的遍历器。
            - Map.prototype.entries()：返回所有成员的遍历器。
            - Map.prototype.forEach()：遍历 Map 的所有成员。

            Map 的遍历顺序就是插入顺序
            Map 结构的默认遍历器接口（Symbol.iterator属性），就是entries方法
            结合数组的map和filter方法，可以实现map的遍历与过滤(Map结构本身没有map和filter方法)

                   let map0 = new Map()
                        .set(1,"a")
                        .set(2,"b")
                        .set(3,"c")
 
                   let map1 = new Map([...map0].map(([k,v])=>[k*2,'_'+v]))

                   // Map { 2 => '_a', 4 => '_b', 6 => '_c' }

                   let map2 = new Map([...map0].filter(([k,v])=>k<3))

                   //Map { 1 => 'a', 2 => 'b' }

            Map 还有一个forEach方法，与数组的forEach方法类似，也可以实现遍历,forEach方法还可以接受第二个参数，用来绑定this

                  const reporter = {
                    report: function(key, value) {
                        console.log("Key: %s, Value: %s", key, value);
                    }
                    };

                    map.forEach(function(value, key, map) {
                    this.report(key, value);
                    }, reporter);
                                    
                    上面代码中，forEach方法的回调函数的this，就指向reporter

       (4) 与其他数据结构相互转换

            - Map转换为数组

                Map 转为数组最方便的方法，就是使用扩展运算符

                const myMap = new Map()
                .set(true, 7)
                .set({foo: 3}, ['abc']);
                [...myMap]
                // [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]

            - 数组转换为Map

                将数组传入 Map 构造函数，就可以转为 Map

                new Map([
                    [true, 7],
                    [{foo: 3}, ['abc']]
                    ])

                    // Map {
                    //   true => 7,
                    //   Object {foo: 3} => ['abc']
                    // }

            - Map转换为对象

                - 如果所有 Map 的键都是字符串，它可以无损地转为对象
                - 如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名

                   function strMapToObj(strMap){
                       let obj = {}
                        for(let [k,v] of strMap){
                            obj[k]=v
                        }

                        return obj
                    }
  
                    
                   let m = new Map()
                        .set(1,'foo')
                        .set('baz',2)
                        strMapToObj(m) // { '1': 'foo', baz: 2 }

            - 对象转换为Map

                - 对象没有iterator接口，不能直接代入Map中
                - 可以使用Object.entries():Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组

                    let obj ={
                        'foo':1,
                        'baz':2
                    }

                    let m = new Map(Object.entries(obj))
                        
                    //Map { 'foo' => 1, 'baz' => 2 }

               - 也可以自己实现一个转换函数

                    function objToStrMap(obj){
                        let strMap = new Map()

                        for(let k of Object.keys(obj)){
                            strMap.set(k,obj[k])
                        }
                        return strMap
                    }

                    let obj ={
                        'foo':1,
                        'baz':2
                    }
                    objToStrMap(obj) //Map { 'foo' => 1, 'baz' => 2 }

            - Map转换为JSON

                - Map 转为 JSON 要区分两种情况。一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON

                     function strMapToJson(strMap) {
                        return JSON.stringify(strMapToObj(strMap));
                        }

                        let myMap = new Map().set('yes', true).set('no', false);
                        strMapToJson(myMap)
                        // '{"yes":true,"no":false}'

                - 另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON

                    function mapToArrayJson(map) {
                        return JSON.stringify([...map]);
                        }

                        let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
                        mapToArrayJson(myMap)
                        // '[[true,7],[{"foo":3},["abc"]]]'

            - JSON转换为Map

                - JSON 转为 Map，正常情况下，所有键名都是字符串。

                     function jsonToStrMap(jsonStr) {
                        return objToStrMap(JSON.parse(jsonStr));
                        }

                        jsonToStrMap('{"yes": true, "no": false}')
                        // Map {'yes' => true, 'no' => false}

                - 但是，有一种特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为 Map。这往往是 Map 转为数组 JSON 的逆操作

                    function jsonToMap(jsonStr) {
                        return new Map(JSON.parse(jsonStr));
                        }

                        jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
                        // Map {true => 7, Object {foo: 3} => ['abc']}

                    
*/

/* 2.WeakMap

       (1)基本语法

             - WeakMap结构与Map结构类似，也是用于生成键值对的集合
             - WeakMap与Map的区别有两点

                     - WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名
                     - WeakMap的键名所指向的对象，不计入垃圾回收机制
                     - WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用

                            const wm = new WeakMap();
                            let key = {};
                            let obj = {foo: 1};

                            wm.set(key, obj);
                            obj = null;
                            wm.get(key)
                            // Object {foo: 1}

                            上面代码中，键值obj是正常引用。所以，即使在 WeakMap 外部消除了obj的引用，WeakMap 内部的引用依然存在

       (2)方法

           - WeakMap 与 Map 在 API 上的区别主要是两个

                - 一是没有遍历操作（即没有keys()、values()和entries()方法），也没有size属性
                - 二是无法清空，即不支持clear方法
            
          - 因此，WeakMap只有四个方法可用：get()、set()、has()、delete() 

       (3)用途

          - DOM 节点作为键名

             let myWeakmap = new WeakMap();

                myWeakmap.set(
                document.getElementById('logo'),
                {timesClicked: 0})
                ;

                document.getElementById('logo').addEventListener('click', function() {
                let logoData = myWeakmap.get(document.getElementById('logo'));
                logoData.timesClicked++;
                }, false);

          - 部署私有属性

             const _counter = new WeakMap();
            const _action = new WeakMap();

            class Countdown {
            constructor(counter, action) {
                _counter.set(this, counter);
                _action.set(this, action);
            }
            dec() {
                let counter = _counter.get(this);
                if (counter < 1) return;
                counter--;
                _counter.set(this, counter);
                if (counter === 0) {
                _action.get(this)();
                }
            }
            }

            const c = new Countdown(2, () => console.log('DONE'));

            c.dec()
            c.dec()
            // DONE

*/
