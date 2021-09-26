
let res = {}
let s=''
function dp(obj,newKey){
       for(var key in obj){
           if(Object.prototype.toString.call(obj[key]) ==='[object Object]'){
               if(newKey){
                   dp(obj[key],`${newKey}${key}.`)
               }else{
                   dp(obj[key],`${key}.`)
               }
               
           }else{
               if(newKey){
                   res[newKey+key]=obj[key]
               }else{
                   res[key]=obj[key]
               }
           }
       }
       
}

dp({name:{first:{ss:5,dd:6}},age:{hh:5}},null)
console.log(res)