# 一、v-model

## 1、v-model是什么？

`v-model` 是Vue框架的一种内置的API指令，本质是一种**语法糖**写法。它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。

## 2、为什么使用v-model？

**`v-model`指令可以在表单 `input、textarea`以及`select`元素上创建双向数据绑定**它会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇，但`v-model`本质上不过是语法糖，它负责监听用户的输入事件来更新数据，并在某种极端场景下进行一些特殊处理。

## 3、什么场景下会使用`v-model`？

表单提交是开发中非常常见的功能，也是和用户交互的重要手段：比如用户在登录、注册时需要提交账号密码；比如用户在检索、创建、更新信息时，需要提交一些数据； 这些都要求我们可以在代码逻辑中获取到用户提交的数据，我们通常会使用`v-model`指令来完成。

## 4、`v-model`的原理

官方有说到，`v-model`的原理其实是背后有两个操作：

- **`v-bind`绑定`value`属性的值；**
- **`v-on`绑定`input`事件监听到函数中，函数会获取最新的值，赋值给绑定的属性中；**

`v-model` 实际上就是 `$emit('input')` 以及 `props:value` 的组合语法糖，只要组件中满足这两个条件，就可以在组件中使用 `v-model`。

**虽然在有些交互组件中有些许不同**，例如：

`checkbox` 和 `radio` 使用 `props:checked` 属性和 `$emit('change')` 事件。

`select` 使用 `props:value` 属性和 `$emit('change')` 事件。

但是，除了上面列举的这些，别的都是 `$emit('input')` 以及 `props:value` 。

## 5、实现v-model

```
<template>
  <div>
    <button @click="increase(-1)">-1</button>
    <input type="number" :value="currentValue" @input="changeValue" />
    <button @click="increase(1)">+1</button>
  </div>
</template>

<script>
  export default {
    name: "NumberInput",
    props:{
      value:{
        type: Number,
        default: 0,
        require: true
      }
    },
    data(){
      return{
        currentValue: this.value
      }
    },
    watch: {
      value(newVal){
        this.currentValue = newVal;
      }
    },
    methods:{
      changeValue(e){
        this.currentValue = parseInt(e.target.value);
        this.$emit('input', this.currentValue);
      },
      increase(value){
        this.currentValue+= value;
        this.$emit('input', this.currentValue);
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>

```

#### 使用

```
<NumberInput v-model="number"></NumberInput>

import NumberInput from "./NumberInput";

export default {
  components:{NumberInput},
  data(){
    return{
      number: 10
    }
  }
}

```

无论是任何组件，都可以实现 `v-model`。

而实现 `v-model` 的要点，主要就是以下几点：

#### `props:value`

用来控制 `v-model` 所绑定的值。

#### `currentValue`

由于 `单向数据流` 的原因，需要使用 `currentValue` 避免子组件对于 `props` 的直接操作。

#### `$emit('input')`

用来控制 `v-model` 值的修改操作,所有对于 `props` 值的修改，都要通知父组件。

#### `watch` 监听

当组件初始化时从 `value` 获取一次值，并且当父组件直接修改 `v-model` 绑定值的时候，对于 `value` 的及时监听。

# 二、`.sync` 修饰符

Vue 提供一个 `.sync` 的修饰符，效果跟 `v-model` 一样，也是便于子组件数据更改后自动更新父组件相关数据。实现 `.sync` 的方式与实现 `v-model` 异曲同工，区别就是抛出的事件名需要是 `update:myPropName` 的结构。

## 1、 .sync修饰符作用

相比较与`v-model`来说,`sync`修饰符就简单很多了:

**.sync修饰符可以实现子组件与父组件的双向绑定，并且可以实现子组件同步修改父组件的值。**

## 2、 .sync修饰符本质

```js
// 正常父传子： 
<son :a="num" :b="num2"></son>

// 加上sync之后父传子： 
<son :a.sync="num" .b.sync="num2"></son> 

// 它等价于
<son
  :a="num" @update:a="val=>num=val"
  :b="num2" @update:b="val=>num2=val"></son> 

// 相当于多了一个事件监听，事件名是update:a，回调函数中，会把接收到的值赋值给属性绑定的数据项中。
```

这里面的传值与接收与正常的父向子传值没有区别,唯一的区别在于往回传值的时候`$emit`所调用的事件名必须是`update:属性名` ,事件名写错不会报错,但是也不会有任何的改变,这点需要多注意。



## 3、总结

##### .sync与v-model区别是

**相同点**：都是语法糖，都可以实现父子组件中的数据的双向通信。

**区别点**：格式不同：

```
 v-model=“num”, :num.sync=“num”

v-model： @input + value
 :num.sync: @update:num
```

**另外需要特别注意的是:**  **`v-model`一个标签只能用一次；`.sync`可以有多个，比如上例中的a，b。**

# 三、Vue3 中的 v-model

## 修改默认 prop 名和事件名

当用在自定义组件上时，`v-model` 默认绑定的 prop 名从 `value` 变为 `modelValue`，而事件名也从默认的`input` 改为 `update:modelValue` 。在 Vue3 中编写上面那个 `MyInput` 组件时，就需要这样：

```html
html 体验AI代码助手 代码解读复制代码<!-- MyInput 组件代码 Vue3 版 -->

<template>
  <div>
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"  // 事件名改为 update:modelValue
    />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String, // 默认 prop 从 value 改为 modelValue
  },
};
</script>
```

使用组件时：

```html
<my-input v-model="msg"></my-input>

// 等同于
<my-input :modelValue="msg" @update:modelValue="msg = $event"></my-input>
```

## 废除 model 选项和 .sync 修饰符

Vue3 中移除了 `model` 选项，这样就不可以在组件内修改默认 prop 名了。现在有一种更简单的方式，就是直接在 `v-model` 后面传递要修改的 prop 名：

```html
html 体验AI代码助手 代码解读复制代码// 要修改默认 prop 名，只需在 v-model 后面接上 :propName，例如修改为 title
<my-input v-model:title="msg"></my-input>

// 等同于
<my-input :title="msg" @update:title="msg = $event"></my-input>
```

注意组件内部也要修改 props：

```html
html 体验AI代码助手 代码解读复制代码<template>
  <div>
    <input
      type="text"
      :value="title"
      @input="$emit('update:title', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  // 此时这里不需要 model 选项来修改了
  props: {
    title: String, // 修改为 title，注意 template 中也要修改
  },
};
</script>
```

同时，`.sync` 修饰符也被移除了，如果你尝试使用它，会报这样的错误：

> '.sync' modifier on 'v-bind' directive is deprecated. Use 'v-model:propName' instead

错误提示中说明了，可以使用 `v-model:propName` 的方式来替代 `.sync`，因为本质上效果是一样的。

## 使用多个 v-model

Vue3 中支持使用多个 `v-model`，属于新增功能，我很喜欢这个功能，使得组件数据更新更灵活。例如有这样一个表单子组件，用户输入的多个数据都需要更新到父组件中显示，可以这样写：

```html
html 体验AI代码助手 代码解读复制代码<!--  表单子组件 Form -->

<template>
  <div class="form">
    
    <label for="name">姓名</label>
    <input id="name" type="text" :value="name" @input="$emit('update:name',$event.target.value)">
    
    <label for="address">地址</label>
    <input id="address" type="text" :value="address" @input="$emit('update:address',$event.target.value)">
  
  </div>
</template>

<script>
export default {
  props:{
    name: String,
    address: String
  }
}
</script>
```

父组件使用这个组件时：

```html
html 体验AI代码助手 代码解读复制代码<child-component v-model:name="name" v-model:address="address"></child-component>
    
// 将用户输入数据更新到父组件中显示
<p>{{name}}</p>
<p>{{address}}</p>
```

## 自定义 v-model 修饰符

在 Vue2 中的 `v-model` 上，我们用过 `.trim`、`.lazy` 和 `.number`这三个内置修饰符，而 Vue3 则在这个基础上增加了自定义修饰符，即开发者可以自定义修饰符，以按需处理绑定值。

当我们在 `v-model` 后面加上自定义修饰符后，会通过名为 `modelModifiers` 的 prop 传递给子组件，子组件拿到这个修饰符名后，根据条件修改绑定值。我们来看一个例子，自定义一个修饰符 `capitalize`，用于将输入字符串的首字母大写。

假设自定义组件还是叫 `MyInput`，使用 `v-model` 时加上自定义修饰符 `capitalize`：

```html
<my-input v-model.capitalize="msg"></my-input>
```

由于不是内置修饰符，所以需要我们自己在组件内部处理修饰符逻辑，编写组件：

```html
<!-- MyInput 组件 -->

<template>
  <div>
    <input type="text" :value="modelValue" @input="emitValue" />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    modelModifiers: {  // 自定义修饰符会默认传入这个 prop 中
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    // 当组件 v-model 后面加上了自定义修饰符，组件内部会在 modelModifiers 上获取到修饰符状态
    console.log(this.modelModifiers); // {capitalize: true}
  },
  methods: {
    emitValue(e) {
      let value = e.target.value;
      // 如果使用了自定义修饰符，即状态为 true，就处理值
      if (this.modelModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1);
      }
      // emit value
      this.$emit("update:modelValue", value);
    },
  },
};
</script>
```

这样就完成了一个将输入字符串首字母大写的`v-model`修饰符。

如果是 `v-model` 带上了参数，同时使用了自定义修饰符，比如这样：

```html
<my-input v-model:title.capitalize="msg"></my-input>
```

那么传入组件内部的 prop 就不再是 `modelModifiers` 了，而是 `titleModifiers`。它的格式是 `arg + 'Modifiers'`。此时这个组件应该这样写：

```html
<!-- MyInput 组件 -->

<template>
  <div>
    <input type="text" :value="title" @input="emitValue" />
  </div>
</template>

<script>
export default {
  props: {
    title: String,  // modelValue -> title
    titleModifiers: {  // modelModifiers -> titleModifiers
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    console.log(this.titleModifiers); // {capitalize: true}
  },
  methods: {
    emitValue(e) {
      let value = e.target.value;

      // 如果使用了自定义修饰符，就处理值
      if (this.titleModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1);
      }
      // emit value
      this.$emit("update:title", value);
    },
  },
};
</script>
```



