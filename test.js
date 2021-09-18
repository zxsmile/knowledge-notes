let set =new WeakSet()
set.add({foo:5})
set.delete({foo:5})
console.log(set)