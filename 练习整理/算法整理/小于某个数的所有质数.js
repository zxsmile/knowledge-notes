/*质数：质数是指在大于1的自然数中，除了1和它本身以外不再有其他因数的自然数*/

function fn (num){

    if(num<2){

        return
    }else{
          var arr=[2]
          for(var i =3;i<num;){
             arr.push(i)
             i=i+2
             /*数组里放小于num的全部奇数 */
           }
    }
    arr.forEach((value,index)=>{
        
          for(var j=2;j<value;j++){
               if(value%j===0){
                   arr.splice(index,1)
               }
          }
    })

    return arr
}

console.log(fn(20))