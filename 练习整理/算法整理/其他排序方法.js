/* 1. 冒泡排序*/

// 依次比较两个相邻的元素，如果他们的顺序（如从大到小、首字母从A到Z）错误就把他们交换过来

   function bubbleSort(arr){

      for(var i=0;i<arr.length;i++){
          for(var j=i+1;j<arr.length;j++){
              if(arr[i]>arr[j]){
                  var temp = arr[i]
                  arr[i] = arr[j]
                  arr[j] = temp
              }
          }
      }

       return arr
   }


var arr = [1,6,5,8,2,3,8,9,12]
//console.log(bubbleSort(arr))

/* 2.选择排序*/

 // (1)首先从原始数组中选择最小的1个数据，将其和位于第1个位置的数据交换。
// （2）接着从剩下的n-1个数据中选择次小的1个元素，将其和第2个位置的数据交换
// （3）然后，这样不断重复，直到最后两个数据完成交换

function selectionSort(arr){

    for(var i=0;i<arr.length;i++){
        var min = arr[i]
        for(var j=i+1;j<arr.length;j++){
             if(arr[j]<min){
                 var temp = arr[j]
                 arr[j] = min
                 min = temp
             }
        }
    }

    return arr
}

var arr = [1,6,5,8,2,3,8,9,12]
//console.log(bubbleSort(arr))

/* 3.插入排序*/

//每一步将一个待排序的数据插入到前面已经排好序的有序序列中，直到插完所有元素为止

 function insertSort(arr){

    for(var i=0;i<arr.length;i++){
        var key = arr[i]
        var j = i-1
        while(j>=0&&key<arr[j]){
            arr[j+1] = arr[j]
        }
        
        for(var j=i;j>k+1;j--){
            arr[j] = arr[j-1]
        }
        arr[k+1] = key
    }

    return arr

 }

 var arr = [1,6,5,8,2,3,8,9,12]
console.log(bubbleSort(arr))




