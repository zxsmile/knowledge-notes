var arr1=[1,2,3,4,5,6]
var arr2 = [6,48,5,36,2]
var arr3 = [5,9,4,8,12,36,6]

var res = arr1

obj={
  'arr2':arr2,
  'arr3':arr3
}

for(var x in obj){
  var p=[]
  for(var i=0;i<res.length;i++){
    if(obj[x].includes(res[i])){
       p.push(res[i]) 
    }
  }
  res=p
}

console.log(res)