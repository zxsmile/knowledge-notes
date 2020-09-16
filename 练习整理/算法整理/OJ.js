
// // //     var readline = require('readline')
// // //     const rl = readline.createInterface({
// // //       input: process.stdin,
// // //       output: process.stdout
// // //     })
// // //     rl.on('line', function(line) {
// // //       var tokens = line.split(' ')
// // //       if(parseInt(tokens[0])){
// // //            var arr = tokens.splice(1)
// // //            var sum = arr.reduce((pre,cur)=>{
// // //                return parseInt(pre) +parseInt(cur)
// // //            })
// // //            console.log(sum)
// // //          }
        
      
      
// // //     })


// // //     var readline = require('readline')
// // // const rl = readline.createInterface({
// // //   input: process.stdin,
// // //   output: process.stdout
// // // })

// // // let len =0
// // // rl.on('line', function(line) {
// // //     if(len===0){
// // //         len = line.trim()
// // //     }else{
// // //       var tokens = line.split(' ')
// // //   if(parseInt(tokens[0])){
// // //        var arr = tokens.splice(1)
// // //        var sum = arr.reduce((pre,cur)=>{
// // //            return parseInt(pre) +parseInt(cur)
// // //        })
// // //        console.log(sum)
// // //      }  
// // //     }
  
    
  
  
// // // })

// // // var bookArr = ['2123','1123','23']
// // // var per = '123'
// // // let res =[]
// // // let personArr = [3,per]
// // // bookArr.forEach((item)=>{
// // //     if(item.length<parseInt(personArr[0])){
// // //         return
// // //     }else{
// // //         let personStr = String(personArr[1])
// // //         let BookStr = item.substr(-parseInt(personArr[0]))
// // //         if(personStr===BookStr){
// // //            res.push([item.length,item])
// // //         }
// // //     }
// // // })

// // // if(res.length===0){
// // //   console.log(-1)
// // // }else{
// // //  let min= res[0]
// // //  for(var i=1;i<res.length;i++){
// // //    if(res[i][0]<min[0]){
// // //       min = res[i]
// // //    }else if(res[i][0]===min[0]){

// // //     let arr=[res[i][1],min[1]]
// // //     arr.sort(function(a,b){
// // //         return a-b
// // //     })
// // //     console.log(arr)
// // //     min=[arr[0].length,arr[0]]
// // // }
// // // }
// // // console.log(min[1])     
// // // }  

// // // function curryNum(num){
// // // let poy = num
// // // return ()=>{
// // //   let args = Array.prototype.splice.apply(arguments)
// // //   return args.reduce(function(total,cur){
// // //       return total+Math.pow(cur,poy)
// // //   },0)
// // // }
// // // }
// // // var p =curryNum(2)
// // // console.log(p(1,2))


// // // var readline = require('readline')
// // // const rl = readline.createInterface({
// // //     input: process.stdin,
// // //     output: process.stdout
// // // })
// // // var inputs = [];
// // // rl.on('line', function(input) {
// // //     inputs.push(input.trim());
// // //     if(inputs[0].split(' ')[1] == inputs.length-1)
// // //     {
// // //         //每找到一个父节点，就让并可发次数加上本身一次
// // //         //计算每行除了父节点的总个数，也就是求除了第一行的inputs的首个元素-1的总和-1
// // //         //然后用总数减去每次找到后的并发数，共计减几次即为几小时
// // //         var pNodeSum = inputs.length-2;
// // //         var nodeSum = 0;
// // //         var hour = inputs[0].split(' ')[0]-0;//-0是快速转化为数字
// // //         var count = 0;
// // //         for(let i = 1;i<inputs.length-1;i++)
// // //             nodeSum+=inputs[i].split(' ')[0]-1;
// // //         for(let j = pNodeSum;j>0;j--)
// // //         {
// // //             nodeSum -= hour;
// // //             hour += hour;
// // //             count++;
// // //         }
// // //         if(nodeSum>0)
// // //             count+=Math.ceil(nodeSum/hour);
// // //         console.log(count);
// // //     }
// // // })

// // // function getHouses( t ,  xa ) {
// // //   if(t===0 || xa.length===0){
// // //       return 0
// // //   }
// // //   let res=[]
// // //   let i=0
// // //   var lenArr = []
// // //  while(i<xa.length){
// // //      var x = xa[i]
// // //      var width = xa[i+1]
// // //      var max = x+width/2
// // //      var min = x-width/2
// // //      if(res[0]){
       
// // //          let len = min-res[res.length-1][1]
       
// // //            lenArr.push(len)
// // //          res.push([min,max])
         
         
// // //      }else{
// // //         res.push([min,max])
// // //      }
// // //      i=i+2
// // //  }

// // //   let r=0
// // //   let sum = 0
// // //  for(var j=0;j<lenArr.length;j++){
// // //      if(lenArr[j]>=t){
// // //         r = Math.floor(lenArr[j]%t+1)
        
// // //         sum = sum+r
// // //      }
// // //  }
// // //   return sum+2
// // // }

// // // console.log(getHouses(2,[-1,4,3,2,]))

// // // function Ftime (timespan) {
// // //   var dateTime = new Date(timespan * 1000);
// // //   var year = dateTime.getFullYear();
// // //   var month = dateTime.getMonth() + 1;
// // //   var day = dateTime.getDate();
// // //   var hour = dateTime.getHours();
// // //   var minute = dateTime.getMinutes();
// // //   //当前时间
// // //   var now = Date.parse(new Date()); //typescript转换写法
// // //   var milliseconds = 0;
// // //   var timeSpanStr;
// // //   //计算时间差
// // //   milliseconds = (now / 1000) - timespan;
 
// // //   //一分钟以内
// // //   if (milliseconds <= 60) {
// // //     timeSpanStr = '刚刚';
// // //   }
// // //   //大于一分钟小于一小时
// // //   else if (60 < milliseconds && milliseconds <= 60 * 60) {
// // //     timeSpanStr = Math.ceil((milliseconds / (60))) + '分钟前';
// // //   }
// // //   //大于一小时小于等于一天
// // //   else if (60 * 60 < milliseconds && milliseconds <= 60 * 60 * 24) {
// // //     timeSpanStr = Math.ceil(milliseconds / (60 * 60)) + '小时前';
// // //   }
// // //   //大于一天小于等于15天
// // //   else if (60 * 60 * 24 < milliseconds && milliseconds <= 60 * 60 * 24 * 30) {
// // //     timeSpanStr = Math.ceil(milliseconds / (60 * 60 * 24)) + '天前';
// // //   }
// // //   //大于一个月小于一年
// // //   else if (60 * 60 * 24 * 30 < milliseconds && milliseconds <= 60 * 60 * 24 * 30 * 12){
// // //     timeSpanStr = Math.ceil(milliseconds / (60 * 60 * 24 * 30)) + '个月前';
// // //   }
// // //   //超过一年显示
// // //   else {
// // //     timeSpanStr = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute;  
// // //   }
// // //   return timeSpanStr;
// // // }

// // // //冒泡

// // // function fn(arr){
// // //   for(var i=0;i<arr.length-1;i++){
// // //     for(var j=0;j<arr.length-i-1;j++){
// // //       if(arr[j]<arr[j+1]){
// // //         var temp = arr[j]
// // //         arr[j] = arr[j+1]
// // //         arr[j+1] = temp
// // //       }
// // //     }
// // //   }
// // // }

// // // var arr = [5,2,8,6,4,7,10,8]

// // // fn(arr)
// // // console.log(arr)
// // // let line1 = '6 2 3'.split(' ')
// // // let s = line1[0]
// // // let n = line1[1]
// // // let m = line1[2]

// // // let res = []
// // // let aArr = '1 2'.split(' ')
// // // let bArr = '3 4 5'.split(' ')
// // //  for(var i=0;i<n;i++){
// // //   if(bArr.includes(aArr[i])){
// // //     let p = aArr.splice(i,1)
// // //     n--
// // //     i=i-1
// // //      res.push(p[0])
// // //    }
// // // }
// // // if(res.length){
// // //     for(var j=0;j<m;j++){
// // //       if(res.includes(bArr[j])){
// // //         bArr.splice(0,1)
// // //         m--
// // //         j=j-1
// // //        }
// // //     }
// // // }


// // //  let r = [aArr.length,bArr.length,res.length]

// // // console.log(r.join(' '))

// // // let str = 'sspSSS'
// // // let strArr=[]
// // // for(var i = 0;i<str.length;i++){
// // //     strArr.push(str[i])
// // // }
// // // let bRes = []
// // // let sRes = []
// // // let min

// // // strArr.forEach((item)=>{
// // //     if(item.charCodeAt()>=65 && item.charCodeAt()<=90){
// // //         bRes.push(item)
// // //     }else if(item.charCodeAt()>=97 && item.charCodeAt()<=122){
// // //         sRes.push(item)
// // //     }
// // // })
// // // if(bRes.length===sRes.length){
// // //    min = 0
// // // }else if(bRes.length > sRes.length){
// // //    min = (bRes.length - sRes.length)/2
// // // }else if(bRes.length < sRes.length){
// // //    min = (sRes.length - bRes.length)/2
// // // }

// // //     console.log(min)


// // // var str1='aaaabbbcccdddss'
// // // var str2 = 'abc'
// // // let resF = []
// // // let resC = []
// // // let res = []
// // // for(var i=0;i<str1.length;i++){
// // //    resF.push(str1[i])
// // // }

// // // for(var j=0;j<str2.length;j++){
// // //   resC.push(str2[j])
// // // }

// // // resC.forEach((item)=>{
// // //   if(resF.includes(item)){
// // //       res.push(true)
// // //   }
// // // })

// // // if(res.length===resC.length){
// // //   console.log(1)
// // // }else if(res.length===0){
// // //   console.log(0)
// // // 
// // let json={'1':123,'2':234,'8':565}
// // // let res = []
// // // let count = 0
// // // let p = 0

// // // for(var i in json){
// // //   count = parseInt(i)
// // //   p = parseInt(i)
// // //   break;
// // // }

// // // for(var i in json){
// // //     if(parseInt(i)===count){
// // //         res[parseInt(i)]=json[i]
// // //     }else{
// // //         let s = parseInt(i)-count
// // //         for(var j=0;j<s;j++){
// // //             res.push(0)
// // //         }
// // //         res[parseInt(i)]=json[i]
// // //     }
// // //     count++
// // // }

// // // let newArr = res.splice(p)
// // //console.log(newArr)
// // // n=parseInt('20')
// // // str = '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20'
// // // arr=str.split(' ')
// // // let p = Math.floor(n/2)
// // // let q = Math.floor(n/2)-1
// // // let max = arr[p]
// // // let min = arr[q]
// // // let i= 1
// // // let x = n/2 
// // // while(n){
// // //   if(i<=x){
// // //     console.log(max)
// // //   }else{
// // //     console.log(min)
// // //   }
// // //   i++
// // //   n--
// // // }
// // // JSON.stringify
// // // let p = Math.floor((n-1)/2)
// // // for(var i=0;i<arr.length;i++){
// // //   let newArr = [].concat(arr)
// // //   let res = newArr.splice(i,1)
// // //   console.log(newArr[p])
 
// // //   //console.log(res[p])
  



// // // function getInter( array ,  start ) {
// // //   let n = array[array.length-1]
// // //   let res = []
// // //   let s = []
// // //   for(var i =1 ;i<=n;i++ ){
// // //       res.push(i)
// // //   }
// // //   for(var i=0;i<res.length;i++){
// // //       if(!array.includes(res[i])){
// // //           s.push(res[i])
// // //       }
// // //   }
// // // console.log(s)
// // //     let f = s[start-1]
// // //     return f
  
  
// // // }
// // let array = [1,2] 
// // let start=2
// // // console.log(getInter( array ,  start ))
// // function buildArray( target ,  n ) {
// //   let res = []
// //   let s = target[0]
// //       res.push('push')
// //   for(let i=1;i<target.length;i++){
// //       if(target[i]>n){
// //         return res
// //       }
// //       if(target[i]-s===1){
// //            res.push('push')
// //            s=target[i]
// //       }else{
// //           let m = target[i]-s-1
// //           while(m){
// //               res.push('Push')
// //               res.push('Pop')
// //               m--
// //           }
// //           res.push("Push")
// //           s=target[i]
// //       }
// //   }
// //     return res
// // }
// // console.log(buildArray( array ,  start ))

// // let pass='aA_1234'

// //   if(pass.length<8){
// //       console.log('Irregular password')
// //       return 
// //   }
// //   let res=[]
// //   if(pass.match(/([a-z])+/)){
// //       res.push(true)
// //   }
  
// //   if(pass.match(/([0-9])+/)){
// //       res.push(true)
// //   }
// //   if(pass.match(/([A-Z])+/)){
// //       res.push(true)
// //   }
// //   if(pass.match(/([^a-zA-Z0-9])+/)){
// //       res.push(true)
// //   }
  
// //   if(res.length===4){
// //       console.log('ok')
// //   }else{
// //       console.log('Irregular password')
// //   }

// // let str = `if so, you already 
// // have`
// //   let res=[]
// //   let arr = str.split(/[\s\n]/)
// //   console.log(arr)
// //   for(let i=0;i<arr.length;i++){
   
// //       if(arr[i][0].charCodeAt()>=97 &&arr[i][0].charCodeAt()<=122){
// //        let s=arr[i][0].toUpperCase()
// //        let n = s+arr[i].slice(1)
// //        res.push(n)
// //       }
// //   }

// //   console.log(res.join(/[\s\n]/))

// // var str = 'assssjdssskssalsssdkjsssdss';

// // var arr = str.split(''); //把字符串转换为数组
// // str = arr.sort().join(''); //首先进行排序，这样结果会把相同的字符放在一起，然后再转换为字符串
// // //alert(str);  // aaddjjkklsssssssssssssssss

// //  var value = '';
// //  var index = 0; 
// // var re = /(\w)\1+/g;  //匹配字符，且重复这个字符，重复次数至少一次。
// // str.replace(re,function($0,$1){ 
// //    //alert($0);   代表每次匹配成功的结果 : aa dd jj kk l sssssssssssssssss
// //      //alert($1);  代表每次匹配成功的第一个子项，也就是\w:  a d j k l S 
// // 　　
// //     if(index<$0.length){  //如果index保存的值小于$0的长度就进行下面的操作
// //           index = $0.length;  // 这样index一直保存的就在最大的长度
// //            value = $1;  //value保存的是出现最多的这个字符
// //     }

// // }); 

// // console.log('最多的字符:'+value+',重复的次数:'+index);  // s   17

// // var par = /n/g
// // var str = 'onxxxn'
// // var res = str.search(par)
// // //console.log(res)

// // var re = /[^\?&]=/g;
// // var str = "http://localhost:8080?name=milk&age=18";
// // let obj={}
// // var newstr = str.replace(/([^&=\?]+)=([^&=]*)/gi,function(rs,$1,$2){
// //               obj[$1] = $2;
// // });
// // console.log(obj);
// // //输出"Mike,Json";  















// // if (!s || s.length === 0) return "";
// // let res = s[0];

// // const dp = [];

// // // 倒着遍历简化操作， 这么做的原因是dp[i][..]依赖于dp[i + 1][..]
// // for (let i = s.length - 1; i >= 0; i--) {
// //   dp[i] = [];
// //   for (let j = i; j < s.length; j++) {
// //     if (j - i === 0) dp[i][j] = true;
// //     // specail case 1
// //     else if (j - i === 1 && s[i] === s[j]) dp[i][j] = true;
// //     // specail case 2
// //     else if (s[i] === s[j] && dp[i + 1][j - 1]) {
// //       // state transition
// //       dp[i][j] = true;
// //     }

// //     if (dp[i][j] && j - i + 1 > res.length) {
// //       // update res
// //       res = s.slice(i, j + 1);
// //     }
// //   }
// // }

// // return res;

// // s=2

// //   let arr = [3,3,400]
// //   let n = parseInt(arr[0])
// //   let m = parseInt(arr[1])
// //   let k = parseInt(arr[2])
// //   let res = []
// //   let sum = 0
// //   let j=1
// //   res=[[1,2,200],[1,3,300],[2,3,500]]
// //   for(var i=0;i<res.length;i++){
// //       let item = res[i]
      
// //       if(parseInt(item[0])===j){
      
// //           if(parseInt(item[0])===1 &&parseInt(item[1])===n){
// //               if(parseInt(item[2])<=k){
// //                   console.log('Yes')
// //                   res.splice(i,1)
// //                   return
// //               }
// //           }else{
// //               sum = sum+parseInt(item[2])
// //               j=parseInt(item[1])
// //               if(j===n){
// //                   if(sum<=k){
// //                   console.log('Yes')
// //                   return
// //                 }
// //               }else{
// //                 if(item[0]===1){
// //                   res.splice(i,1)
// //                 }
                
// //                 console.log(res)
// //                 i=0
// //               }
// //           }
// //       }
// //   }
// //   console.log('No')
// var num = parseInt(read_line().split(' ')[0]);
// var tree = []  ;
// var line;
// while(line=read_line()) {
//      var lines = line.split(' ');                       
//      tree[lines[1]] = lines[0];                      
// }
// var deep = 1;
// for(var i =1;i<num;i++){
//      var count = 1;
//      var temp = tree[i];
//      while(temp){
//             count++;
//             deep = count>deep?count:deep;
//             temp = tree[temp];
//      }
// }
// print(deep); 


// var n=readInt()
// while(n--) print(calc(gets(10000).trim()))
// function calc(s){
//   var rec={},r=Array(10).fill(0),dict=[["X",8,"SIX"],["S",9,"SEVEN"],["V",7,"FIVE"],["W",4,"TWO"],["F",6,"FOUR"],["Z",2,"ZERO"],["O",3,"ONE"],["R",5,"THREE"],["T",0,"EIGHT"],["I",1,"NINE"]]
//   for(var c of s) rec[c]=rec[c]+1||1
//   for(var [c,n,m] of dict) {
//     r[n]=rec[c]||0
//     for(var x of m) rec[x]-=r[n]
//   }
//   return r.map((x,i)=>(""+i).repeat(x)).join``
// }


// var isBalanced = function(root) {
 
//   let obj={flag:true}
//   depth(root,obj)
//   return obj.flag
// };

// function depth(root,obj){
//   if(!root){
//       return 0
//   }

//   let left = depth(root.left,obj)+1
//   let right = depth(root.right,obj)+1
//   if(Math.abs(left-right)>1){
//       obj.flag=false
//       return
//   }

//   return Math.max(left,right)
  
// }



function Solution(S) {
  let len = S.length
  let vis = []
  let ans= ''
ans=S
  for(var i=0;i<len;i++){
    vis[i]=0
  }

  for(var i=0;i<len;i++){
    for(var j=0;j<len;j++){
      if(ans[j]=='R'&& ans[j+1]==='.'&&j<len-1){
        vis[j+1] +=1
      }
      if(ans[j]=='L'&& ans[j-1]==='.'&&j>=1){
        vis[j-1] -=1
      }
    }
  
    let flag = 0
    for(var j=0;j<len;j++){
      if(S[j]==='.' && vis[j] !==0){
        if(vis[j]===1){
          ans[j]='R'
        }else{
          ans[j]='L'
          
        }
        flag =1
      }
    }
    for(var i=0;i<len;i++){
      vis[i]=0
      if(flag===0){
        break;
      }
    }
    return ans
  }
  
}

let input ='.L.R...LR..L..'

console.log(Solution(input))