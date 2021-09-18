//后序是左=》右=》自己，则自己=》右=》左就是后序的反转

let p = root
let res = []
let s = []

while(p || s.length>0){
    while(p){
        res.push(p.val)
        s.push(p)
        p = p.right
    }
    p = s.pop()
    p = p.left
}

return res.reverse()

//递归（后序：左=》右=》自己）
var postorderTraversal = function(root) {
    let res = []
    if(!root){
        return []
    }
    deep(root,res)
    return res
    function deep(root,res){
        if(!root){
            return 
        }
        deep(root.left,res)
        deep(root.right,res)
        res.push(root.val)
    }
 };