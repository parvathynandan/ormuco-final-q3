const { GeoDistLru } = require('./index');

// First Argument - Expiry
// Second Argument - Max size of the cache
const obj = new GeoDistLru(5000, 3);
obj.addKeyValue('item 4', 100);
obj.addKeyValue('item 2', 200);
obj.addKeyValue('item 3', 120);
obj.readKeyValue('item 4', 220);
obj.addKeyValue('item 5', 210);

setTimeout(() => {
    obj.deleteNodesExpired()
    console.log('deleting..........',obj.pairsCached);
}, 7000)
console.log(obj);