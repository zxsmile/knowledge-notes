function permutations(arr){
  let res = []
  let item = []
  function sort(arr){
     for(var i=0;i<arr.length;i++){
         item.push(arr[i])
         let copy = arr.slice()
         copy.splice(i,1)
         if(copy.length===0){
             res.push(parseInt(item.join('')))
         }else{
             sort(copy)
         }
         item.pop()
     }
  }
  sort(arr)
  return res
}

let arr = [1,2,1]
console.log(permutations(arr))