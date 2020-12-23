/* 
  https://segmentfault.com/a/1190000012829866
  1.问题描述
 
    - 有n件物品和一个重量为w的背包，每种物品件数没有上限，第i件物品的重量为weights[i]，价值为values[i]，求解哪些物品装入背包
    可以使背包中的总价值达到最大

   2.问题分析

    - 改变一下f二维数组的思路，让f[i][j]表示在前i种物品中选取若干件物品放入容量为j的背包所得的最大价值
    - 对于第i件物品有放和不放两种情况，而放的情况又分为放1件，2件，...，j/wi

         - 如果不放，f[i][j] = f[i-1][j]
         - 如果放，那么当前背包中至少应该出现一件第i种物品，即f[i][j] = f[i][j-wi]+vi，为什么是f[i][j-wi]呢？因为我们要把
         物品i放入背包内，物品i是无限使用的，所以要用f[i][j-wi]，f[i-1][j-wi]的意思是说，我们只有一件当前的物品i，所以我们
         在放入物品i时要考虑前i-1件物品的总价值；现在我们有无线多个i物品，我们就只需要考虑当前背包容量是否还可以再装一个i物品
*/

function knapsack(weights,values,W){
    let n = weights.length
    let f = new Array(n)
    f[-1]=new Array(W+1).fill(0)

    for(var i=0;i<n;i++){
        f[i] = new Array(W+1).fill(0)
        for(var j=0;j<=W;j++){
            if(weights[i]>j){
               f[i][j] = f[i-1][j]
            }else{
                f[i][j] = Math.max(f[i-1][j],f[i][j-weights[i]]+values[i])
            }
           } 
       
    }
    return f[n-1][W]
}
console.log(knapsack([3,2,2],[5,10,20],5))