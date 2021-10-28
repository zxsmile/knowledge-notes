let arr = []
function fn(arr){
    let result = []
  for(var i=0;i<arr.length;i++){
     let newArr = arr.slice(i+1)
     let max = newArr.sort((a,b)=>{
        return b-a
     })[0]
      result.push(max-arr[i])
  }

  result.sort((a,b) => {
     return b-a
  })

  return result[0]
}