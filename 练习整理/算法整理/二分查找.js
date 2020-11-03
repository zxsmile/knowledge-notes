function fn(strs,str){
    if (str === null || strs.length===0) {
        return -1;
    }
    let start = 0;
    let end = strs.length - 1;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        let m = mid;
        let res = -1;
        while (m >= start) {
            if (strs[m] !== null) {
                if (strs[m] === str) {
                    res = m;
                    m--;
                } else if (strs[m] > str) {
                    end = m - 1;
                    break;
                } else {
                    if (res !== -1) {
                    return res;
                   }
                    start = mid + 1;
                    break;
                }
            } else {
               m--;
            }
        }
        if (m === start-1) {
            if (res !== -1) {
               return res;
            }else{
                start = mid+1
            }
        }
    }
       return -1 
}

let arr =[null,null,'a','b',"a","a",null,"ac"]
let str = "a"

console.log(fn(arr,str))

