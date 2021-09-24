var generateParenthesis = function(n) {
    let res = []
    let left = 0
    let right = 0
    let str = ''
    dfs(n,left,right,str)
 
    function dfs(n,left,right,str){
        if(left==n && right==n){
           res.push(str)
           console.log(res)
           return
        }
        if(left<n){
            dfs(n,left+1,right,str+'(')
        }
        if(right<n&&right<left){
            dfs(n,left,right+1,str+')')
        }
    }
 
    return res
 
 };

 generateParenthesis(3)