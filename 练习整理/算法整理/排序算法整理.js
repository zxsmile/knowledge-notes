/*1.冒泡排序（稳定 O(n^2)）

把第一个元素与第二个元素比较，如果第一个比第二个大，则交换他们的位置。接着继续比较第二个与第三个元素，如果第二个比第三个大，
则交换他们的位置，我们对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样一趟比较交换下来之后，排在最右的元素就会是
最大的数。除去最右的元素，我们对剩余的元素做同样的工作，如此重复下去，直到排序完成

function sort(arr){
    for(var i=0;i<arr.length;i++){
        let flag = true
        for(j=0;j< arr.length -i-1;j++){
            if(arr[j]>arr[j+1]){
                flag = false
                [arr[j],arr[j+1]] = [arr[j+1],arr[j]]
            }
        }

        if(flag){
            break;
        }
    }
    return arr
}
 */

 /*2.选择排序 （不稳定 O(n^2)）

  将当前元素和剩下的元素比较，如果有比当前元素小的，就交换，这样循环n次

  function sort(arr){
     for(var i=0;i<arr.length;i++){
         for(var j=i+1;j<arr.length;j++){
             if(arr[i]>arr[j]){
                [arr[i],arr[j]] = [arr[j],arr[i]]
             }
         }
     }
  }

*/

/* 3.插入排序（稳定（O(n^2)））

   从数组的第二个元素开始，与左边的已经排好序的元素进行比较，寻找插入点，找到插入点之后，将左边数组依次向后移，将元素插入进去

    function sort(arr){
       for(var i=0;i<arr.length;i++){
           let temp = arr[i]
           let k = i-1
           while(k>=0 && arr[k]>temp){
               k--
           }
           for(var j=i;j>k+1;j--){
               arr[j] = arr[j-1]
           }
           arr[k+1]=temp
       }
    }

*/

/*4. 归并（稳定 O(nlogn)）

通过递归的方式将大的数组一直分割，直到数组的大小为 1，此时只有一个元素，那么该数组就是有序的了，
之后再把两个数组大小为1的合并成一个大小为2的，再把两个大小为2的合并成4的 ….. 直到全部小的数组合并起来。

  function sort(arr){
      if(arr.length<2){
          return arr
      }
      let mid = Math.floor(arr.length/2)
      let left = arr.slice(0,mid)
      let right = arr.slice(mid)
      return merge(sort(left),sort(right))
  }

  function merge(left,right){
      let res = []

      while(left.length && right.length){
          if(left[0]<right[0]){
             res.push(left.shift())
          }else{
              res.push(right.shift())
          }
      }

      return res.concat(left,right)
  }

  */

  /*5.快排（不稳定 O(nlogn)）

     function sort(arr){

        if(arr.length<=1){
            return arr
        }
         let mid = Math.floor(arr.lenght/2)
         let temp = arr.splice(mid,1)[0]
         let left=[]
         let right = []
         for(var i=0;i<arr.length;i++){
             if(arr[i]<temp){
                left.push(arr[i])
             }else{
                 right.push(arr[i])
             }
         }

         return sort(left).concat(temp,sort(right))
     }
*/















  
  