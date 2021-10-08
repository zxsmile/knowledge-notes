
Array.prototype.getReader = function () {
    let arr = this
    return function(){
      let arg = arguments[0]
      if(!arg){
          return arr.splice(0,1)
      }
      let res = arr.splice(0,arg)
      return res
    }
  }
  
  let arr = [1,2,3,4,5,6]
  
  let reader  = arr.getReader()
  console.log(reader()) //[1]
  console.log(reader(1)) //[2]
  console.log(reader(2)) //[3,4]
  console.log(reader(3)) //[5,6]
  console.log(reader()) //[]
  