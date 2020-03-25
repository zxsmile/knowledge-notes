/* 大数相乘
     
    例如：124 * 32
  
       这两个数的乘积的长度一定不会超过m+n（m，n分别是字符串的长度。）
       我们开一个m+n长度的数组val[m+n]。
        第一轮： 2*4 = 8,val[m+n-1] += 8,val[m+n-1] = 8

                2*2 = 4,val[m+n-2] += 4,val[m+n-2] = 4
                2*1 = 2,val[m+n-3] += 2,val[m+n-3] = 2

        第二轮： 3*4 = 12,val[m+n-2] += 12,val[m+n-2] = 16

                3*2 = 6,val[m+n-3] += 6,val[m+n-3] = 8 
                3*1 = 3,val[m+n-4] += 3,val[m+n-4] = 3

        至此,该数组变为
        val[0,3,8,16,8]

        然后再从尾部处理进位。
        比如最后一位8是没有进位的，往前处理，到了16，16 >= 10。
        把该位变成16%10 = 6,并且获得进位16/10 = 1,再继续向前处理
        8要加上进位变成9，然后再往前处理3不动。
        最后数组变成val[0,3,9,6,8]
        到此，绝大部分工作已经完成，只需要从左扫描数组找到第一个不为0的数，然后把后面的加入字符串即可。
*/ 



var multiply = function(num1, num2) {
  
     var l1 = num1.length
     var l2 = num2.length
     var mul = new Array(l1+l2-1).fill(0)

     if(num1==0||num2==0){
         return 0
     }

     for(var i=l1-1;i>-1;i--){
         for(var j=l2-1;j>-1;j--){
             mul[i+j] += +num1[i]* +num2[j]
         }
     }
     
     var l3 = mul.length-1
     var result =[]
     var t =0
     var s=0
     
     for(var k=l3;k>-1;k--){
          s = mul[k]%10
          var sum = s+t
          t =Math.floor(mul[k]/10)
          while(sum>9){
              sum=sum-10
              t=t+1
          }
          result.unshift(sum)
     }

     if(t>0){
         result.unshift(t)
     }

     return result.join('')
};

multiply('999','999')
