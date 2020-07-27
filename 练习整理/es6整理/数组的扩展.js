/* 1.扩展运算符(...)

      （1）扩展运算符可以将数组转为将逗号隔开的参数序列
      （2）任意定义了iterator（遍历器）接口的对象都可是使用扩展运算符转为真正的数组

        var str = 'hello'
        var array = [...str]
        console.log(array) // ['h','e','l','l','o']

*/
     
 
/* 2.Array.from()

     (1)Array.from方法用于将两类对象转为真正的数组：
      
           ## 类似数组的对象即具有length属性的对象
           ## 可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）

              var obj = {
                  '0':'a',
                  '1':'b',
                  '2':'c',
                  length:3
              }

            
              var arrayObj = Array.from(obj)

              console.log(arrayObj) //['a','b','c']

     (2)Array.from方法还可以接收第二个参数，用来对每个参数进行处理，将处理后的值放入返回的数组

            var newArray = Array.from([1,2,3],(x)=>x*x)
            console.log(newArray) // [1,4,9]


*/


/* 3.Array.of()

     (1)Array.of方法用于将一组值，转换为数组，这个方法的主要目的是弥补构造函数Array()的不足

       Array.of(1,2,3) // [1,2,3]
       Array.of(3) // [3]

       Array(1,2,3) // [1,2,3]
       Array(3) //[ , , ,]
*/

/* 4.copyWithin()

   (1)数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置，（会覆盖原数组成员），然后返回当前数组

   (2)copyWithin(target,start,end)

        - target(必须):从该位置开始替换数据。如果为负数，表示倒数
        - start(可选)：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算
        - end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算
    
        这三个值都为数值，如果不是则会自动转为数值

         var array=[1,2,3,4,5,6]
         var newArray = array.copyWithin(0,3) 
         console.log(newArray) // [4,5,6,4,5,6]
         console.log(array)  // [4,5,6,4,5,6]

*/

/* 5.find()和findIndex()

     (1)数组实例的find方法用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。
     (2)回调函数接收三个参数，依次为当前的值、当前的位置和原数组。
     
        [1,2,3].find(function(value,index,arr){
            return value>0
        }) // 1
      
    (3) 数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1

        [1, 5, 10, 15].findIndex(function(value, index, arr) {
            return value > 9;
        }) // 2

    (4)这两个方法都可以接受第二个参数，用来绑定回调函数的this对象。

        function f(v){
        return v > this.age;
        }
        let person = {name: 'John', age: 20};
        [10, 12, 26, 15].find(f, person);    // 26

    (5)另外，这两个方法都可以发现NaN，弥补了数组的indexOf方法的不足。

        [NaN].indexOf(NaN)
        // -1

        [NaN].findIndex(y => Object.is(NaN, y))
        // 0

    上面代码中，indexOf方法无法识别数组的NaN成员，但是findIndex方法可以借助Object.is方法做到。

*/

/* 6.fill()
      
       (1)fill方法使用给定值，填充一个数组，若数组中本来有值则会被覆盖

             [1,2,3].fill(7) //[7,7,7]
        
       (2)fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。

             [1,2,3].fill(7,1,2)  //[1,7,3]

       (3)如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象

             var arr = new Array(3).fill({name:'milk'})
             console.log(arr) // [ { name: 'milk' }, { name: 'milk' }, { name: 'milk' } ]
             arr[0].name = 'ben'
             console.log(arr) // [ { name: 'ben' }, { name: 'ben' }, { name: 'ben' } ]

*/

/* 7. entries()，keys() 和 values() 
     
       (1)用于遍历数组。它们都返回一个遍历器对象,可以用for...of循环进行遍历
       (2)keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。

          var arr = ['a','b','c']
          var newArr = arr.keys()
          for(var key of newArr ){
              console.log(key)
          }
*/

/* 8.includes()
 
        (1)返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。
        (2)该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。
        (3)之前是使用的indexOf方法(返回当前值在数组中的位置)检查是否包含某个值，它有两个缺点：

                 [1,2,3].indexOf(3) // 2

               - 不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，不够直观
               
                      // 检查是否包含某个值
         
                        if(arr.indexOf(x)!=-1){

                        }
                     
               - 它内部使用严格相等运算符（===）进行判断，这会导致对NaN的误判
          
                     [NaN].indexOf(NaN) // -1
               
                includes使用的是不同的判断方法，就没有问题

                     [NaN].includes(NaN) //true
              
        (4)Map和Set数据结构有一个has方法，需要与includes方法区别
         
                - Map 结构的has方法，是用来查找键名的，比如Map.prototype.has(key)、WeakMap.prototype.has(key)、Reflect.has(target, propertyKey)。
                - Set 结构的has方法，是用来查找值的，比如Set.prototype.has(value)、WeakSet.prototype.has(value)。

*/

/* 9.flat()，flatMap() 
 
        (1)flat
        
            - flat方法是将嵌套的数组拉平，返回一个新数组，对原来的数组没有影响
            - falt默认参数是1，表示只会拉平一层，如果要拉平多少层 就直接将参数带为几就可以了
            - 如果不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数
            - 如果原数组有空位，flat()方法会跳过空位。

             [1,[2,[3,4],5],6].flat()

        (2)flatMap

            - flatMap()方法对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组。
            - flatMap()方法的参数是一个遍历函数，该函数可以接受三个参数，分别是当前数组成员、当前数组成员的位置（从零开始）、原数组
            - flatMap()方法还可以有第二个参数，用来绑定遍历函数里面的this
            - flatMap()只能展开一层数组。

                        相当于 [[2, 4], [3, 6], [4, 8]].flat()
                        [2, 3, 4].flatMap((x) => [x, x * 2])
                        // [2, 4, 3, 6, 4, 8]

                        // 相当于 [[[2]], [[4]], [[6]], [[8]]].flat()
                        [1, 2, 3, 4].flatMap(x => [[x * 2]])
                        // [[2], [4], [6], [8]]



*/

/* 10. 数组的空位

     (1)数组的空位和undefined不同，一个位置的值为undefined依然是有值的，而空位是没有任何值，用in运算符可以验证

       0 in [undefined, undefined, undefined] // true
       0 in [, , ,] // false
    上面代码表明，第一个数组的0号位是有值的，第二个数组没有

    (2)es5对空位的处理不一致，大多数会忽略

         - forEach(), filter(), reduce(), every() 和some()都会跳过空位
         - map()会跳过空位，但会保留这个值
         - join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。

            forEach方法
            [,'a'].forEach((x,i) => console.log(i)); // 1

            // filter方法
            ['a',,'b'].filter(x => true) // ['a','b']

            // every方法
            [,'a'].every(x => x==='a') // true

            // reduce方法
            [1,,2].reduce((x,y) => x+y) // 3

            // some方法
            [,'a'].some(x => x !== 'a') // false

            // map方法
            [,'a'].map(x => 1) // [,1]

            // join方法
            [,'a',undefined,null].join('#') // "#a##"

            // toString方法
            [,'a',undefined,null].toString() // ",a,,"

    (3)es6则是明确将空位转成undefined

        Array.from方法会将数组的空位，转为undefined，也就是说，这个方法不会忽略空位。

        Array.from(['a',,'b'])
        // [ "a", undefined, "b" ]

        扩展运算符（...）也会将空位转为undefined。

        [...['a',,'b']]
        // [ "a", undefined, "b" ]

        copyWithin()会连空位一起拷贝。

        [,'a','b',,].copyWithin(2,0) // [,"a",,"a"]

        fill()会将空位视为正常的数组位置。

        new Array(3).fill('a') // ["a","a","a"]

        for...of循环也会遍历空位。

        let arr = [, ,];
        for (let i of arr) {
        console.log(1);
        }
        // 1
        // 1

        上面代码中，数组arr有两个空位，for...of并没有忽略它们。如果改成map方法遍历，空位是会跳过的。

        entries()、keys()、values()、find()和findIndex()会将空位处理成undefined。

        // entries()
        [...[,'a'].entries()] // [[0,undefined], [1,"a"]]

        // keys()
        [...[,'a'].keys()] // [0,1]

        // values()
        [...[,'a'].values()] // [undefined,"a"]

        // find()
        [,'a'].find(x => true) // undefined

        // findIndex()
        [,'a'].findIndex(x => true) // 0

        由于空位的处理规则非常不统一，所以建议避免出现空位。

*/
var array=[1,2,3,4,5,6]
         var newArray = array.copyWithin(0,3) // [4,5,6,4,5,6]
         console.log(array)
