var removeNthFromEnd = function(head, n) {

    var arr=[head]
    var p = head.next
    while(p){
        arr.push(p)
        p=p.next
    }
    var i = arr.length-n
    if(arr.length<n){
        return null
    }else{
        if(i>0){
        arr[i-1].next=arr[i].next
        return arr[0]
        }else{
          return arr[0].next
        }
    }
};


var node = {
    val:1,
    next:{
        val:2,
        next:{
            val:3,
            next:null
        }
    }
}
console.log(removeNthFromEnd(node,2))