function TreeNode(val) {
         this.val = val;
         this.left = this.right = null;
     }


     var generateTrees = function (n) {
        if (n < 1) {
            return [];
        }
    
        const arr = [];
    
        for (let i = 1; i <= n; i++) {
            arr.push(i);
        }
    
        const helper = (arr) => {
            if (!arr.length) {
                return [null];
            }
    
            const res = [];
    
            for (let i = 0; i < arr.length; i++) {
                let lArr = helper(arr.slice(0, i));
                let rArr = helper(arr.slice(i + 1));
    
                for (let j = 0; j < lArr.length; j++) {
                    for (let k = 0; k < rArr.length; k++) {
                        const node = new TreeNode(arr[i]);
                        node.left = lArr[j];
                        node.right = rArr[k];
    
                        res.push(node);
                    }
                }
            }
    
            return res;
        }
    
        return helper(arr);
    };
console.log(generateTrees(3))