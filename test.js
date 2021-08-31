function Foo(){}
var bar = new Foo()

for(var i=0;i<10;i++){
    bar[i]='bar'+bar[i]
    console.log(bar[i])
}