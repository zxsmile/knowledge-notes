Function.prototype.mybind = function(newThis){
  
   let arg = Array.from(arguments).slice(1)
   let self = this
   let bount = function(){
      let newArg = arg.concat(Array.from(arguments))
      if(this instanceof bount){
         let res = self.apply(this,newArg)

      }else{
        return self.apply(newThis,newArg)
      }
   }

   if(self.prototype){
     
   }
}