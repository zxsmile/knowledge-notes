var mergeTwoLists = function(l1, l2) {

    function ListNode(val) {
           this.val = val;
           this.next = null;
         }

    if(l1&&l2){
        var node 
        if(l1.val<l2.val){
            node = new ListNode(l1.val)
            node.next=mergeTwoLists(l1.next,l2)
        }else{
            node = new ListNode(l2.val)
            node.next=mergeTwoLists(l1,l2.next)
        }
  
        return node
    }
  
    return l1||l2
  };

  var l1 = {
    val:1,
    next:{
        val:3,
        next:{
            val:5,
            next:null
        }
    }
}

var l2 ={
    val:2,
    next:{
        val:4,
        next:{
            val:6,
            next:null
        }
    }
}
console.log(mergeTwoLists(l1,l2))