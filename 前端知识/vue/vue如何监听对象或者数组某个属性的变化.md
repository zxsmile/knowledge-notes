当在项目中直接设置数组的某一项的值，或者直接设置对象的某个属性值，这个时候，你会发现页面并没有更新。这是因为`Object.defineProperty()`限制，监听不到变化。

#### 解决方式：

- `this.$set`(你要改变的数组/对象，你要改变的位置/`key`，你要改成什么`value`)

```javascript
this.$set(this.arr, 0, "OBKoro1"); // 改变数组
this.$set(this.obj, "c", "OBKoro1"); // 改变对象
```

- 调用以下几个数组的方法

```javascript
splice()、 push()、pop()、shift()、unshift()、sort()、reverse()
```

`vue`源码里缓存了`array`的原型链，然后重写了这几个方法，触发这几个方法的时候会`observer`数据，意思是使用这些方法不用再进行额外的操作，视图自动进行更新。 推荐使用`splice`方法会比较好自定义,因为`splice`可以在数组的任何位置进行删除/添加操作





#### `vm.$set` 的实现原理是：

- 如果目标是数组，直接使用数组的 `splice` 方法触发相应式；
- 如果目标是对象，会先判读属性是否存在、对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用 `defineReactive` 方法进行响应式处理（ `defineReactive` 方法就是 `Vue` 在初始化对象时，给对象属性采用 `Object.defineProperty` 动态添加 `getter` 和 `setter` 的功能所调用的方法）