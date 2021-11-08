function fn(str){
    let arr = str.split('')
    for(var i=0;i<arr.length;i++){
        if(i>0){
            if(arr[i]===arr[i-1]){
                for(var j=i+1;j<arr.length;j++){
                    if(arr[j] !== arr[i]){
                       arr.splice(i-1,j-i+1)
                       i = i-2
                       break;
                    }
                }
               
            }
          
        }
    }

    let res = arr.join('')
    return res
}

console.log(fn('abbbabcca'))  //'abbbabcca' => 'aabcca' => 'bcca'=> 'ba'