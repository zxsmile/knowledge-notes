/*

   1.任何数据结构只要部署了iterator接口，就可以完成遍历操作
   2.ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性

        (1)Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器
        (2)一个数据结构只要具有Symbol.iterator属性，就可以认为是可遍历

   3.原生具备 Iterator 接口的数据结构有：

        (1)Array
        (2)String
        (3)Map
        (4)Set
        (5)函数的arguments对象
        (6)NodeList对象
        (7)TypedArray

   4.每一次调用next方法，都会返回一个包含value和done两个属性的对象
       
         - value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束

*/





