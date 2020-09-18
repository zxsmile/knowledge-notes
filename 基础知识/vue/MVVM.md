一、什么是MVVM？

  - MVVM是Module-View-ViewModule的缩写，Module层代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑；View 代表UI 组件，它负责将数据模型转化成UI展现出来，ViewModel 负责监听 Model 中数据的改变并且控制视图的更新，处理用户交互操作
  - Module和View并无直接联系，而是通过ViewModule来联系的，Module和ViewModule是双向数据绑定关系，因此当Module层的数据发生改变时会触发View层刷新，View 中由于用户交互操作而改变的数据也会在 Model 中同步
  - 这种模式实现了 Model 和 View 的数据自动同步，因此开发者只需要专注对数据的维护操作即可，而不需要自己操作 dom

二、MVVM优缺点

   优点：
  
      - 自动更新dom: 利用双向绑定,数据更新后视图自动更新,让开发者从繁琐的手动dom中解放
      - 低耦合。视图（View）可以独立于Model变化和修改，一个ViewModel可以绑定到不同的"View"上，当View变化的时候Model可以不变，当Model变化的时候View也可以不变
      - 可重用性。你可以把一些视图逻辑放在一个ViewModel里面，让很多view重用这段视图逻辑
      - 独立开发。开发人员可以专注于业务逻辑和数据的开发（ViewModel），设计人员可以专注于页面设计。
      - 可测试。界面素来是比较难于测试的，而现在测试可以针对ViewModel来写

   缺点：

     - 数据绑定使得 Bug 很难被调试。你看到界面异常了，有可能是你 View 的代码有 Bug，也可能是 Model 的代码有问题。数据绑定使得一个位置的 Bug 被快速传递到别的位置，要定位原始出问题的地方就变得不那么容易了
     - 对于过大的项目，数据绑定需要花费更多的内存

三、mvvm和mvc区别？它和其它框架（jquery）的区别是什么？哪些场景适合？

    - mvc和mvvm其实区别并不大。都是一种设计思想。主要就是mvc中Controller演变成mvvm中的viewModel。
    - mvvm主要解决了mvc中大量的DOM 操作使页面渲染性能降低，加载速度变慢，影响用户体验。

    - 区别：vue数据驱动，通过数据来显示视图层而不是节点操作
    - 数据操作比较多的场景，更加便捷

