function fn(A,B){
   for(var i=0;i<A.length;i++){
      for(var j=0;j<B.length;j++){
         if(A[i]>B[j]){
           A = A.concat(B,A)
           break;
         }else if(A[i]<B[j]){
            
         }
      }
   }
}