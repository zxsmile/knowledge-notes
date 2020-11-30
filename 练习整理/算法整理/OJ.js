
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


// const arrayProto = Array.prototype
// 	const arrayMethods = Object.create(arrayProto)
// 	;[
// 	  'push',
// 	  'pop',
// 	  'shift',
// 	  'unshift',
// 	  'splice',
// 	  'sort',
// 	  'reverse'
// 	].forEach(item=>{
// 		Object.defineProperty(arrayMethods,item,{
// 		    value:function mutator(){
// 		    	//缓存原生方法，之后调用
// 		    	const original = arrayProto[item]	
// 		    	let args = Array.from(arguments)
// 			    original.apply(this,args)
// 		    },
// 		})
// 	})
// 	function protoAugment (target,src) {
// 	  target.__proto__ = src
// 	}
// 	// 调用
// 	let obarr = []
// 	protoAugment(obarr, arrayMethods)


// let obj = {
// 	name:'milk',
// 	age:'18',
// 	child:[
// 		{
// 			name:"jone",
// 			age:'22'   
// 		},
// 		{
// 			name:'lalla',
// 			age:'18',
// 			child:[
// 				{
// 					name:'xiao',
// 					age:'12'
// 				}
// 			]
// 		}
// 	]
// }

// function merge(obj){
// 	let res = []
// 	function fn(obj){
// 		if(obj){
// 			res.push({})
// 		}
// 		for(var key in obj){
// 			if(key !== 'child'){
// 				res[res.length-1][key]=obj[key]
// 			}else{
// 				for(var i=0;i<obj[key].length;i++){
// 					fn(obj[key][i])
// 				}
// 			}
// 		}
		
// 	}
// 	fn(obj)
// 	return res
// }

// console.log(merge(obj))

// Function.prototype.myCall = function(newThis){
//     newThis = newThis?Object(newThis):window
//     newThis.fn = this
//     let result
//     let args = [...arguments].slice(1)
//     result = newThis.fn(...args)
//     delete newThis.fn
//     return result
// }
// function fn(name,age){
// 	this.name = name
// 	this.age = age
// 	console.log(this.name)
// 	//console.log(this.age)
// 	return this.name
// }
// var obj ={
// 	name:'milk'
// }

// function l(){
// 	let res = fn.myCall(obj)
// 	console.log(typeof res)
// }

// l(6,2,3)
var MAP =  {

	onclick: function () {
  
  
	},
  
	onmouseover: function (val) {
  
	  return function (z) {
  
		  return val++ + z
  
	  }
  
	}
  
  }
  
  
  var getInfo = function (val) {
  
	  return MAP[val]
  
  }
  
  var fn = getInfo('onmouseover')
  
  
  var a = fn(100)
  
  
  console.log(a(200))
  
  
  console.log(a(300))
  
  
  console.log(fn(100)(200))
  
  
  console.log(getInfo('onmouseover')(100)(300))
  
