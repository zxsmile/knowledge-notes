/* 1.push和pop方法

      - push方法可以接受任意数量的参数，将它们逐个添加到数组的末尾，返回修改后数组的长度
      - pop方法从数组末尾移除最后一项，返回移除的项
      - 这两个方法会改变原数组

             var arr = ['red']
             var push=arr.push('green','blue')
             console.log(push) //3
             console.log(arr) // ['red','green','blue']

             var pop = arr.pop()
             console.log(pop) // 'blue'
             console.log(arr) // ['red','green']

   2. unshift和shift方法

      - unshift方法可以接受任意数量的参数，将它们添加到数组的前端，返回修改后数组的长度
      - shift方法从数组前端移除移向，返回移除的项
      - 这两个方法会改变数组原数组

             var arr = ['red']
             var unshift=arr.unshift('green','blue')
             console.log(unshift) //3
             console.log(arr) // ['green','blue','red']

             var shift = arr.shift()
             console.log(shift) // 'green'
             console.log(arr) // ['blue','red']

    3. sort方法

         - sort方法比较数组大小，返回一个比较完大小的数组
         - sort方法可以接受一个比较函数作为参数
         - sort方法若没有传入比较函数，sort是以字符串方式比较数组成员的
         - 会改变原数组

             var arr = [1,12,10,5,6,8,9]
             function compare(value1,value2){
                return value1-value2
             }
             var sortArr = arr.sort(compare)
             console.log(sortArr) //[ 1, 5, 6, 8, 9, 10, 12 ]
             console.log(arr) //[ 1, 5, 6, 8, 9, 10, 12 ]

    4. reverse方法

         - 反转数组
         - 改变原数组

            var arr = [1,5,6,3,4,8]
            var reverseArr = arr.reverse()
            console.log(reverseArr) //[8, 4, 3, 6, 5, 1 ]

    5. concat方法

         - concat方法会先创建一个当前数组的副本，然后将所接收到的参数添加到该副本的末尾
         - 该方法不改变原数组

             var arr = ['red','green','blue']
             var concatArr = arr.concat('orange')
             console.log(concatArr) //['red','green','blue','orange']
             console.log(arr) //['red','green','blue']

    6.slice方法

        - 能够基于当前数组的一项或者多项创建一个新数组
        - slice方法接受两个参数，即要返回项的起始和结束位置
        - 若slice方法有两个参数，则返回从起始位置到结束位置之间的项不包括结束位置的项
        - 若slice方法只有一个参数，则返回从该参数位置到当前数组结尾的全部项
        - 若参数中有一个为负数，则用数组长度加上该负数来确定相应位置,如果结束位置小于起始位置，则返回空数组
        - 该方法不会改变原数组

              var arr =['red','green','blue']
              var sliceArr1 = arr.slice(1,2)
              console.log(sliceArr1) //[ 'green' ]
              var sliceArr2 = arr.slice(1)
              console.log(sliceArr2) //[ 'green', 'blue' ]
              var sliceArr3 = arr.slice(-1,-2)
              console.log(sliceArr3) //[]

    7.splice方法
      
        - 该方法可以删除，插入，替换
        - 参数说明：第一个参数表示开始位置，第二个参数表示删除的项数，后面可以有任意多项表示插入或者替换的项
        - 该方法始终返回一个数组，该数组由删除的项组成，如果没有删除的项，则返回一个空数组
        - 第一项参数为负值，则用数组长度加上该负数来确定相应位置，第二项参数为负数，则表示删除项数为零
        - 该方法会改变原数组
        
              var arr =['red','green','blue','white']
              var deleteArr = arr.splice(1,2)
              console.log(deleteArr) //['green','blue']
              console.log(arr) //['red','white']
              var insertArr = arr.splice(1,0,'orange')
              console.log(insertArr) //[]
              console.log(arr) //['red','orange', 'white']
              var replaceArr = arr.splice(1,1,'blue','yellow')
              console.log(replaceArr) //['orange']
              console.log(arr) //['red', 'blue', 'yellow', 'white']

    8. indexOf和lastindexOf

        - 这两个方法都接受两个参数，要查找的项和开始查找的位置(可选)，返回要查找的项在数组中的位置，如果没找到返回-1
        - 这两个方法比较的时候使用的是全等操作符
        - 这两个方法不改变原数组

              var arr = ['red','green','blue','yellow','blue']
              var indexOf = arr.indexOf('blue')
              var lastIndexOf = arr.lastIndexOf('blue')
              console.log(indexOf) // 2
              console.log(lastIndexOf) // 4

    9.迭代方法

        - every():对数组的每一项运行给定的函数，如果该函数的每一项都返回true，则该函数返回true
        - filter():对数组的每一项运行给定的函数，返回该函数会返回true的项组成的数组
        - forEach():对数组的每一项运行给定的函数，无返回值
        - map():对数组的每一项运行给定的函数，返回函数每次调用结果组成的数组
        - some():对数组的每一项运行给定的函数，如果该函数中任意一项返回true，则返回true

            - 传入这些方法的函数会接受三个参数，数组项的值，该项在数组中的位置，数组对象本身

    10.reduce和reduceRight方法

        - 这两个方法会迭代数组中的每一项，然后构建一个最终返回的值
        - 接受两个参数：一个在每一项上调用的函数，一个初始值(可选)
        - 传给这两个方法的函数可接受四个参数：前一个值，当前值，项的索引，数组对象
        - 这个函数返回的任何值都会做为第一个参数自动传给下一项

            var arr = [1,2,3,4,5]
            var sum = arr.reduce(function(prv,cur,index,arr){

                        return prv + cur
                        
            })
            
            console.log(sum) // 15

            // 第一次prv=1,cur = 2
            // 第二次prv=3,cur = 3
            // 第三次prv=6,cur = 4
            // 第四次prv=10,cur = 5
            // 最后sum=15

           // 有初始值
            var arr = [1,2,3,4,5]
            var sum = arr.reduce(function(prv,cur,index,arr){

                        return prv + cur
                        
            },3)
            
            console.log(sum) // 18

            // 第一次prv=3,cur = 1
            // 第二次prv=4,cur = 2
            // 第三次prv=6,cur = 3
            // 第四次prv=9,cur = 4
            // 第五次prv=13,cur=5
            // 最后sum=18


*/

   