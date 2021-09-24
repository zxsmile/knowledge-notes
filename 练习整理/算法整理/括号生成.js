/*数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

有效括号组合需满足：左括号必须以正确的顺序闭合。

示例 1：

输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]
示例 2：

输入：n = 1
输出：["()"]

*/

/*
深度优先遍历：
1、初始时定义序列的左括号数量lc 和右括号数量rc都为0。
2、如果 lc < n，左括号的个数小于n，则在当前序列str后拼接左括号。
3、如果 rc < n && lc > rc , 右括号的个数小于左括号的个数，则在当前序列str后拼接右括号。
4、当lc == n && rc == n 时，将当前合法序列str加入答案数组res中。

*/
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