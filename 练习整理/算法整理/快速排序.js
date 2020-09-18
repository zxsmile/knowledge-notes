/* 
    1.从数组中选择一个元素作为基准点
    2.排序数组，所有比基准值小的元素摆放在左边，而大于基准值的摆放在右边。每次分割结束以后基准值会插入到中间去。
    3.最后利用递归，将摆放在左边的数组和右边的数组在进行一次上述的1和2操作。

 */

// 法一：

var quickSort = function(arr) {
    if (arr.length <=1) {
      return arr;
    }
    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];
    var left = [];
    var right = [];
  
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return quickSort(left).concat(pivot, quickSort(right));
  };

  var arr =[6,5,9,7,8,12,4,5,56,14,45]
 console.log(quickSort(arr))



/* 法二*/

// function quick_sort(arr,from,to){
// 	var i = from; //哨兵i
// 	var j = to; //哨兵j
// 	var key = arr[from]; //标准值
// 	if(from >= to){ //如果数组只有一个元素
// 	   return;
// 	}
// 	while(i < j){
// 		while(arr[j] > key && i < j){ //从右边向左找第一个比key小的数，找到或者两个哨兵相碰，跳出循环
// 			j--;
// 		}
// 		while(arr[i] <= key && i < j){  //从左边向右找第一个比key大的数，找到或者两个哨兵相碰，跳出循环,这里的=号保证在本轮循环结束前，key的位置不变，否则的话跳出循环，交换i和from的位置的时候，from位置的上元素有可能不是key
// 			i++;
// 		}
// 		/**
// 		  代码执行道这里，1、两个哨兵到找到了目标值。2、j哨兵找到了目标值。3、两个哨兵都没找到(key是当前数组最小值)
// 		**/
// 		if(i < j){ //交换两个元素的位置
// 			var temp = arr[i];
// 			arr[i] = arr[j];
// 			arr[j] = temp;

//     }
// 	}
// 	arr[from] = arr[i] //
//   arr[i] = key;
//   quick_sort(arr,from,i-1);
// 	quick_sort(arr,i+1,to);
// }

// var arr = [3,9,-5,6,0,2,-1,-1,1,8];
// quick_sort(arr,0,arr.length-1);
// console.log(arr);
