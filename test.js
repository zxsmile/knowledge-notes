
function flatter(arr){
   let res = []
  for(var i=0;i<arr.length;i++){
     if(Array.isArray(arr[i])){
        res = res.concat(flatter(arr[i]))
     }else{
        res.push(arr[i])
     }
  }
  return res
}



let arr = [1,[2,3],[5,[6]]]
console.log(flatter(arr))