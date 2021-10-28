//1.给你一个仅由大写英文字母组成的字符串，你可以将任意位置上的字符替换成另外的字符，总共可最多替换 k 次。在执行上述操作后，
//找到包含重复字母的最长子串的长度。
//示例 1：

// 输入：s = "ABAB", k = 2
// 输出：4
// 解释：用两个'A'替换为两个'B',反之亦然。

// 示例 2：

// 输入：s = "AABABBA", k = 1
// 输出：4
// 解释：
// 将中间的一个'A'替换为'B',字符串变为 "AABBBBA"。
// 子串 "BBBB" 有最长重复字母, 答案为 4。

//解决：滑动窗口

// 如: s = "AABABBA", k = 1

// max 记录窗口内相同字符最多的次数

// 遍历字符串, 窗口往右扩张
// 一旦 窗口大小 大于 max + k, 则窗口左边收缩 (因为窗口内最多可替换 k个其他字符 为 出现最多的字符)

// 窗口扩张: left: 0, right: 0, 窗口: [ A ]ABABBA
// 窗口扩张: left: 0, right: 1, 窗口: [ AA ]BABBA
// 窗口扩张: left: 0, right: 2, 窗口: [ AAB ]ABBA
// 窗口扩张: left: 0, right: 3, 窗口: [ AABA ]BBA
// 移动左边: left: 1, right: 4, 窗口: A[ ABAB ]BA
// 移动左边: left: 2, right: 5, 窗口: AA[ BABB ]A
// 移动左边: left: 3, right: 6, 窗口: AAB[ ABBA ] 
// 遍历完后, 只要看窗口大小即可

var characterReplacement = function(s, k) {
    let arr = new Array(26).fill(0)//根据ascii存储字母出现的次数
    let len = s.length
    let left = right = 0
    let max = 0
    let res = 0 
    for(;right<len;right++){
        let index = s[right].charCodeAt()-65
        arr[index]++
        max = Math.max(max,arr[index])
        if(right-left+1 > max+k){
            arr[s[left].charCodeAt()-65]--
            left++
        }
        res = Math.max(res,right-left+1)
    }
    
    return res
 };
