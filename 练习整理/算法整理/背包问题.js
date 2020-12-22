/* 
  https://segmentfault.com/a/1190000012829866
  1.问题描述
 
    - 有n件物品和一个重量为w的背包，每种物品只有一件，第i件物品的重量为weights[i]，价值为values[i]，求解哪些物品装入背包
    可以使背包中的总价值达到最大

  2.问题分析

    - 假设数据：物品的个数n = 5，物品的重量为weights = [2,2,6,5,4]，物品的价值为values = [6,3,5,4,6]，背包总重量W = 10
    - 我们使用一个二维矩阵f来记录结果，f[i][j]表示可选物品为i，背包容量为j时，背包中所放物品总和的最大价值

         - 我们先看第一行，物品0（w0）的重量为2，价值为6，当背包容量为0时，什么也放不下，所以f[0][0]=0；当j为1时（背包容量为1），
         依然放不下w0，所以f[0][1]=0；当j为2时，能放下w0，所以f[0][2] = v0 = 6；当j为2时，依然能放下w0，但我们的物品只有一个w0,
         所以f[0][3] = v0 = 6,于是，一直到j=10，它的值都是6。所以我们可以得到一个方程，当背包容量小于物品重量时，总价值为0，否则
         为物品的价值

         - 然后我们看第二行，确定f[1][0...10]这11个元素的值。当j=0时，依然什么都放不下，f[1][0]=0；当j为1时，依然放不下，所以
         f[1][1]=0；当j为2时，可以选择放入w1或者不放，这个时候就要判断怎样才能使背包中的总价值最大

              - 如果选择不放w1，背包里有w0，最大价值为6
              - 如果选择放入w1，在背包容量大于等于w1时，我们要计算出背包放入w1后剩余了多少容量，根据这个容量找到对应的价值
              再加上w1的价值，然后与对应背包容量的原来背包总价值做比较，取最大值。得到以下方程：

              f[1][j] = max(f[0][j],f[0][j-w1]+v1)
        
        所以j=2时，装入w1后，背包剩余容量为0，f[0][j-w1]=f[0][0]=0,f[1][2] = max(f[0][2],f[0][0]+3)=max(6,3)=6

        - j=3时，装入w1后，背包剩余容量为1，f[0][j-w1]=f[0][1]=0,f[1][3] = max(f[0][3],f[0][1]+3)=max(6,3)=6
        - j=4时，装入w1后，背包剩余容量为2，f[0][j-w1]=f[0][2]=6,f[1][4] = max(f[0][4],f[0][2]+3)=max(6,9)=9

    - 依次类推，我们得到背包问题的状态转移方程：

          - 当j<wi时，f[i][j] = f[i-1][j]
          - 当j>wi时，f[i][j] = max(f[i-1][j],f[i-1][j-wi]+vi)

  3.算法

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
                f[i][j] = Math.max(f[i-1][j],f[i-1][j-weights[i]]+values[i])
            }
           } 
       
    }
    return f[n-1][W]
}
console.log(knapsack([2,2,6,5,4],[6,3,5,4,6],10))

/*
  4.上面是求出了最大价值，现在来看一下到底选择了哪些物品，只要当前行不等于上一行的总价值，就能挑出第i件物品，
  然后减去该物品的重量，直到最后为0
*/
  function knapsack(weights,values,W){
    let n = weights.length
    let f = new Array(n).fill(0)
    f[-1] = new Array(W+1).fill(0)
    for(var i=0;i<n;i++){
      f[i] = new Array(W).fill(0)
      for(var j=0;j<=W;j++){
        if(j<weights[i]){
          f[i][j] = f[i-1][j]
        }else{
          f[i][j] = Math.max(f[i-1][j],f[i-1][j-weights[i]]+values[i])
        }
      }
    }

    var w = 0,j=W,select = []
    for(var i=n-1;i>=0;i--){
      if(f[i][j]>f[i-1][j]){
        select.push(i)
        console.log('物品i:',i,'重量为:',weights[i],'价值为:',values[i])
        j=j-weights[i]
        w +=weights[i]
      }
    }
    console.log('背包总重量为:',W,'现在重量为:',w,'总价值为:',f[n-1][W])
  }
