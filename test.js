var a = 1

function bar(){
  console.log(a)
}

function fn(){
  var a = 2
  bar()
}

fn()