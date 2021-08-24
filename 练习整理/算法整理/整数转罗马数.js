/*思路:罗马数表示有一个规律就是尽量使用大数表示，比如20是用两个十表示为'XX'
 
      1.对任意一个正数，先遍历找出可以表示它的最大的一个罗马数
      2.让该整数除以该罗马数，商是几，就需要几个该罗马数表示
      3.然后取其余数继续上面步骤，直到余数为零
*/

var intToRoman = function(num) {
    let obj ={
        '1':'I',
        '5':'V',
        '10':'X',
        '50':'L',
        '100':'C',
        '500':'D',
        '1000':'M',
        '4':'IV',
        '9':'IX',
        '40':'XL',
        '90':'XC',
        '400':'CD',
        '900':'CM'
    }
 
    let nums = [1,4,5,9,10,40,50,90,100,400,500,900,1000].sort((a,b)=>{
        return b-a
    })
    let res = ''
    let s = 0
    while(num>0){
        nums.filter((item)=>{
         if(num>=item){
            s = Math.floor(num/item)
            num = num%item
            while(s){
             res=res+obj[item]
             s--
         }
            return
         }
       })
    }
     return res
   
 };