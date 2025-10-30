对于 `runtime` 来说，只需要保证组件存在 `render` 函数即可，而有了预编译之后，只需要保证构建过程中生成 `render` 函数就可以。在 `webpack` 中，使用`vue-loader`编译`.vue`文件，内部依赖的`vue-template-compiler`模块，在 `webpack`  构建过程中，将`template`预编译成 `render` 函数。与 `react` 类似，在添加了`jsx`的语法糖解析器`babel-plugin-transform-vue-jsx`之后，就可以直接手写`render` 函数。



所以，`template`和`jsx`的都是`render`的一种表现形式，不同的是：`JSX`相对于`template`而言，具有更高的灵活性，在复杂的组件中，更具有优势，而 `template` 虽然显得有些呆滞。但是 `template` 在代码结构上更符合视图与逻辑分离的习惯，更简单、更直观、更好维护。

