/*
sum(2,3)  //5
sum(2)(3)  //5
*/

function sum(...a){
    if(arguments.length===1){
        var catche = [...a][0]
        function s(b){
            catche+=b
            return s
       }

        s.toString=function(){
            return  catche
        }

        return s
    }else{
        console.log(typeof [...a][0])
        var s=0
        for(var i=0;i<arguments.length;i++){
             s = s+arguments[i]
        }
        return s
    }
    
}

console.log(sum(1)(2)(3)(4))
console.log(sum(1,2,3,4))

