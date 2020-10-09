
// let m = 3
// let p = 10
// let v = [3,3,10,12,12]
// let w= [2,2,5,4,4]



// let n = v.length
// let c =[]
// let use = []
// for(var i=0;i<=n;i++){
//    c[i]=[]
//    use[i]=0
//    for(var j=0;j<=p;j++){
//      if(i===0||j===0){
//        c[i][j]=0
//      }
//    }
// }

// v.unshift(0)
// w.unshift(0)

// for(var i=1;i<=n;i++){
//   for(var j=1;j<=p;j++){
//     if(j<w[i]){
//       c[i][j]=c[i-1][j]
//     }else{
//       c[i][j]=Math.max(c[i-1][j],c[i-1][j-w[i]]+v[i])
//     }
//   }
// }

// var j=p
// for(var i=n;i>0;i--){
//   if(c[i][j]>c[i-1][j]){
//     use[i]=1
//     j=j-w[i]
//   }
// }


// console.log(c[n][p]) 


let obarr = []
const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto)	
Object.defineProperty(arrayMethods,'push',{
    value:function mutator(){
    	console.log('obarr.push会走这里')
    }
})
obarr.__proto__ = arrayMethods

obarr.push(1)