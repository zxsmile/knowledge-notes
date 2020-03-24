var addTwoNumbers = function(l1, l2) {
    
     let result
     let catche
     let flag = 0
     while(l1||l2){
         sum = (l1?l1.val:0)+(l2?l2.val:0)+flag
         if(sum>9){
             sum=sum-10
             flag = 1
         }else{
             flag=0
         }
         var list = new ListNode(sum)
         if(catche){
            catche.next=list
            catche = list
         }else{
           catche=result=list
         }

         l1=l1&&l1.next
         l2 = l2&&l2.next
         if (flag === 1) {
            catche.next = new ListNode(1);    //假如711+522 当循环到7+5的时候，7+5大于9，所以会存在进位，
                                                //这句的存在就是不让丢失掉那个进位，因为后边没值了，就不会循环了，
                                                //如果没有这句代码，那个进位就会丢掉
        }   
     }
                                        
     return catche
  };


