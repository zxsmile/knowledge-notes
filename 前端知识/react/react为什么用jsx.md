## 一、JSX 是什么？

- JSX的全称是 Javascript and XML，React发明了JSX，它是一种可以在JS中编写XML的语言。JSX更像一种模板，类似于Vue中的 template。

- 按照 React 官方的解释，JSX 是一个 JavaScript 的语法扩展，类似于模板语法，或者说是一个类似于 XML 的 ECMAScript 语法扩展，并且具备JavaScript的全部功能。这段解释可抽离两个关键点：

  - 「JavaScript 语法扩展」
  - 「具备JavaScript 的全部功能」

- JSX 的定位是 JavaScript 的「语法扩展」，而不是“某个版本”，这就决定了浏览器并不会像天然支持 JavaScript 一样支持 JSX 。这就引出了一个问题 “JSX 是如何在 JavaScript 中生效的？”

  

### 二、JSX 是如何在 JavaScript 中生效的？

- 如果有人问你为什么React中要使用JSX，其实本质是问你为什么不用其它的方案来实现，为什么偏偏是JSX？

- 首先，我们在前面也了解到JSX本质是JavaScript的语法扩展；其次，在React的开发中，React并不是强制要求一定要使用JSX，我们完全可以通过
  React.createElement来创建React组件，类似下面这样：

  ```
  render() {
      return React.createElement(
          "div",
          null,
          "Hello ",
          this.props.name
      );
  }
  ```

- 而我们通过JSX编写的组件，相对React.createElement来说就要简洁明了许多，同样的组件，编写起来会更为简洁，并且代码的层次也会更加的清晰，类似下面这样：

  ```
  render() {
      return <div>Hello {this.props.name}</div>;
  }
  ```

- 虽然我们是通过JSX来编写组件，但是最终React还是会通过babel将JSX编译为js可执行的代码。 JSX 更像是一种语法糖，通过类似模板语法的描述方式，描述函数对象。

- 通过对比发现，在实际功能效果一致的前提下，JSX 代码层次分明、嵌套关系清晰；而 React.createElement 代码则给人一种非常混乱的“杂糅感”，这样的代码不仅读起来不友好，写起来也费劲。

- JSX 语法糖允许我们开发人员像写 HTML 一样来写我们的 JS 代码。在降低学习成本的同时还提升了我们的研发效率和研发体验。

## 三、JSX 是如何映射为 DOM 的：起底 createElement 源码

```
export function createElement(type, config, children) { 

    // propName 变量用于储存后面需要用到的元素属性 
    let propName; // props 变量用于储存元素属性的键值对集合 const props = {}; 
    // key、ref、self、source 均为 React 元素的属性，此处不必深究 
    let key = null; let ref = null; 
    let self = null; let source = null; 
    // config 对象中存储的是元素的属性 
    if (config != null) { 
        // 进来之后做的第一件事，是依次对 ref、key、self 和 source 属性赋值 
        if (hasValidRef(config)) { 
          ref = config.ref; 
        } 
        // 此处将 key 值字符串化 
        if (hasValidKey(config)) {
           key = '' + config.key; 
        } 
        self = config.__self === undefined ? null : config.__self; 
        source = config.__source === undefined ? null : config.__source; 

        // 接着就是要把 config 里面的属性都一个一个挪到 props 这个之前声明好的对象里面 

        for (propName in config) { 
              if ( 
                // 筛选出可以提进 props 对象里的属性 
                hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName) ) { 
                props[propName] = config[propName]; 
              } 
         } 
    } 
    // childrenLength 指的是当前元素的子元素的个数，减去的 2 是 type 和 config 两个参数占用的长度 
    const childrenLength = arguments.length - 2; 

    // 如果抛去type和config，就只剩下一个参数，一般意味着文本节点出现了 

    if (childrenLength === 1) { 
        // 直接把这个参数的值赋给
        props.children props.children = children; 
        // 处理嵌套多个子元素的情况 
    } else if (childrenLength > 1) { 
        // 声明一个子元素数组 
        const childArray = Array(childrenLength); 
        // 把子元素推进数组里 
        for (let i = 0; i < childrenLength; i++) {
            childArray[i] = arguments[i + 2]; 
        } 
        // 最后把这个数组赋值给props.children props.children = childArray; 
    }

    // 处理 defaultProps 
    if (type && type.defaultProps) { 
        const defaultProps = type.defaultProps; 
        for (propName in defaultProps) { 
            if (props[propName] === undefined) { 
                props[propName] = defaultProps[propName]; 
            } 
        } 
    }
    // 最后返回一个调用ReactElement执行方法，并传入刚才处理过的参数 
    return ReactElement( type, key, ref, self, source, ReactCurrentOwner.current, props, ); 
}
```

- createElement 函数有 3 个入参，这 3 个入参包含了我们在创建一个 React 元素的全部信息。
  - type：用于标识节点的类型。可以是原生态的 div 、span 这样的 HTML 标签，也可以是 React 组件，还可以是 React fragment（空元素）。
  -  config：一个对象，组件所有的属性（不包含默认的一些属性）都会以键值对的形式存储在 config 对象中。 
  - children：泛指第二个参数后的所有参数，它记录的是组件标签之间嵌套的内容，也就是所谓的“子节点”“子元素”。

- 从源码角度来看，createElement 函数就是将开发时研发人员写的数据、属性、参数做一层格式化，转化为 React 好理解的参数，然后交付给 ReactElement 来实现元素创建。接下来我们来看看 ReactElement 函数

  ```
  const ReactElement = function(type, key, ref, self, source, owner, props) { 
      const element = { 
      // 用于表示是否为 ReactElement $$typeof: REACT_ELEMENT_TYPE,
      // 用于创建真实 dom 的相关信息
      type: type,
      key: key,
      ref: ref,
      props: props,
  
      _owner: owner,
  };
  
  if (**DEV**) { 
    element._store = {};
    // 开发环境下将 _store、_self、_source 设置为不可枚举，提高 element 的比较性能
     Object.defineProperty(element._store, 'validated', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false,
      });
  
      Object.defineProperty(element, '_self', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: self,
      });
  
      Object.defineProperty(element, '_source', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: source,
      });
      // 冻结 element 和 props，防止被手动修改
      if (Object.freeze) {
        Object.freeze(element.props);
        Object.freeze(element);
      }
  }
  
  	return element; 
  };
  ```

- 源码异常的简单，也就是对 createElement 函数转换的参数，在进行一次处理，包装进 element 对象中返给开发者。如果你试过将这个返回 ReactElement 进行输出(控制台打印jsx)，你会发现有没有很熟悉的感觉，没错，这就是我们老生常谈的「虚拟 DOM」，JavaScript 对象对 DOM 的描述。

## 四、为什么 React 选择使用 JSX ？”，其引申含义是 “为什么不用 A、B、C？

- 其实相关方案有很多，最直观的就是模板。Vue 和 AngularJS 都选择使用模板方案，而 React 团队认为引入模板是一种不佳的实现。
- React 团队之所以认为模板不是最佳实现，原因在于，React 团队认为模板分离了技术栈，分散了组件内的关注点。其次，模板还会引入更多的概念，类似模板语法、模板指令等。
- JSX 并不会引入太多新的概念，它仍然是 JavaScript，就连条件表达式和循环都仍然是 JavaScript 的方式，更具有可读性，更贴近 HTML。对于关注点分离，React 本身的关注基本单位是组件，在组件内部高内聚，组件之间低耦合。而模板语法做不到。

## 五、jsx 的转换

- 我们从 react 应用的入口开始对源码进行分析，创建一个简单的 hello, world 应用

  ```
  import React, { Component } from 'react';
  import ReactDOM from 'react-dom';
  export default class App extends Component {
  render() {
      return <div>hello, world</div>;
  }
  }
  
  ReactDOM.render(<App />, document.getElementById('root'));
  
  import React, { Component } from 'react'
  ```

-  这段代码中，React 似乎在代码中没有任何地方被用到，为什么要引入呢？

- 1、16.x 版本及之前

  - 我们在 react16.8 版本的代码中，尝试将 React 的引用去掉：

    ```
    // import React, { Component } from 'react';
    import { Component } from 'react'; // 去掉 React 的引用
    import ReactDOM from 'react-dom';
    
    export default class App extends Component {
    render() {
        return <div>hello, world</div>;
    }
    }
    
    ReactDOM.render(<App />, document.getElementById('root'));
    ```

  - 运行应用程序，发现会提示 'React' must be in scope when using JSX 的 error：

  - 这是因为上述的类组件 render 中返回了 <div>hello, world</div> 的 jsx 语法，在React16版本及之前，应用程序通过 @babel/preset-react 将 jsx 语法转换为 React.createElement 的 js 代码，因此需要显式将 React 引入，才能正常调用 createElement。我们可以在 Babel REPL 中看到 jsx 被 @babel/preset-react 编译后的结果

- 2、17.x 版本及之后

  - React17版本之后，官方与 babel 进行了合作，直接通过将 react/jsx-runtime 对 jsx 语法进行了新的转换而不依赖 React.createElement，转换的结果便是可直接供 ReactDOM.render 使用的 ReactElement 对象。因此如果在React17版本后只是用 jsx 语法不使用其他的 react 提供的api，可以不引入 React，应用程序依然能够正常运行。

- 3、新的转换有何不同？

  - 当你使用 JSX 时，编译器会将其转换为浏览器可以理解的 React 函数调用。旧的 JSX 转换会把 JSX 转换为 React.createElement(...) 调用。

  - 例如，假设源代码如下：

    ```
    import React from 'react';
    
    function App() {
    return <h1>Hello World</h1>;
    }
    ```

  - 旧的 JSX 转换会将上述代码变成普通的 JavaScript 代码：

    ```
    import React from 'react';
    
    function App() {
      return React.createElement('h1', null, 'Hello world');
    }
    ```

  - 然而，这并不完美：

  - 如果使用 JSX，则需在 React 的环境下，因为 JSX 将被编译成 React.createElement。

  - 有一些 React.createElement 无法做到的性能优化和简化。

  - 为了解决这些问题，React 17 在 React 的 package 中引入了两个新入口，这些入口只会被 Babel 和 TypeScript 等编译器使用。新的 JSX 转换不会将 JSX 转换为 React.createElement，而是自动从 React 的 package 中引入新的入口函数并调用。

  - 假设你的源代码如下：

    ```
    function App() {
      return <h1>Hello World</h1>;
    }
    ```

  - 下方是新 JSX 被转换编译后的结果：

    ```
    // 由编译器引入（禁止自己引入！）
    import {jsx as _jsx} from 'react/jsx-runtime';
    
    function App() {
    return _jsx('h1', { children: 'Hello world' });
    }
    ```

  - 注意，此时源代码无需引入 React 即可使用 JSX 了！（但仍需引入 React，以便使用 React 提供的 Hook 或其他导出。）

  - 此变化与所有现有 JSX 代码兼容，所以你无需修改组件。



## 六、新的JSX transform的变化点

- 属性key从props对象中剥离

- 在如下的代码中

  ```
  let randomObj = {key: 'foo'};
  let element = <div {...randomObj} />;
  element.key; // 'foo'
  ```

- 这种方式的缺点是，无法直接知道props对象中是否传入了一个key属性，而是得动态检查props中是否存在key属性。

- React17中的jsx()函数，把key属性从props对象中剥离出来。现在该怎么写呢？

  ```
  let {key, ...props} = obj;
  <div key={key} {...props} />
  ```

- 在jsx()函数中，key从props对象中剥离出来是这样体现的：

  ```
  jsx('div', props, key)
  ```

