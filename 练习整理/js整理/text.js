function fn(L,N){
	var len = 0;  
	var s=''
    for (var i = 0; i < L.length; i++) {  
        if (L.charCodeAt(i) > 128) {  
            len += 2;  
        } else {  
            len++;  
        }  
		s=s+L[i]

        if(N>3){
          if(len+3===N && i<L.length-1){
			  return `${s}...`
		  }else if(len+3===N && i>=L.length-1){
			  return s
		  }
		}else if(N===3){
         if(len<=N&& i>=L.length-1 ){
            return s
		 }else if(len<=N&& i<L.length-1 ){
			 return `...`
		 }
		}else if(N<3){
			return '...'
		}
		
    }  
        
}
console.log(fn('1234',2))