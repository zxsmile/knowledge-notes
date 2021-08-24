let map = new Map()
map.set('123',true)
if(!map.get('123')){
    map.set('123',6)
}
console.log([...map.keys()])