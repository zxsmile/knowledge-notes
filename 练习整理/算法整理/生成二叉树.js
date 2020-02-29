function Node(element,left,right){
      
      this.element = element
      this.left = left
      this.right = right

}

function BST(){

    this.root = null
    this.insert = function(element){

        let node = new Node(element,null,null)
        if(this.root === null){
            this.root = node
        }else{
            
        }
    }
}