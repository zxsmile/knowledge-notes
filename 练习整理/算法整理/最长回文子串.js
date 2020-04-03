/*
1. 暴力法

var longestPalindrome = function(s) {

    var len = s.length

    var res = len?s[0]:''

    var temp=''


    for(var i=len;i>0;i--){

       for(var j=0;j<=i-2;j++){

           temp = s.slice(j,i)
            var p=0
            var q = temp.length-1
            
           while(p!=q&&p<q){
             
               if(temp[p]===temp[q]){

                   p++
                   q--

               }else{

                  break;
               }

            }

            if(p==q||p>q){
                //console.log(res)
                res=res.length>temp.length?res:temp
                
            }

       }
    
    
    }

    return res
};

*/

/* 2.动态规划

维护一个二维数组 dp，其中 dp[i][j] 表示字符串区间 [i, j] 是否为回文串
 *  当 i = j 时，只有一个字符，肯定是回文串，如果 i = j + 1，说明是相邻字符，此时需要判断 s[i] 是否等
 *  于 s[j]，如果i和j不相邻，即 i - j >= 2 时，除了判断 s[i] 和 s[j] 相等之外，dp[i + 1][j - 1]
 *  若为真，就是回文串
*/


var longestPalindrome = function(s){

    var len = s.length
    var dp = new Array(len).fill(new Array(len))
    var res=''

    for(var i = 0;i<len;i++){

        for(var j=0;j<=i;j++){

           if(i==j){
               dp[j][i]=true
           }
           if(i-j==1){
               dp[j][i]=(s[i]===s[j])
           }
            if(i-j>=2){
              dp[j][i]= (s[j]===s[i] && (dp[j+1][i-1]))
           }
            
          
           if(dp[j][i]){
              res=i-j+1>res.length?s.slice(j,i+1):res 
           
           }
        }
    }
    
    return res
}

console.log(longestPalindrome("abcda"))

