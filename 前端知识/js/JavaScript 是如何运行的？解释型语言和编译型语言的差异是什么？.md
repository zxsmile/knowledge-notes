## 一、前言 ##

- 我们编写的源代码是人类语言，我们自己能够轻松理解；但是对于计算机硬件（CPU），源代码就是天书，根本无法执行，**计算机只能识别某些特定的二进制指令，在程序真正运行之前必须将源代码转换成二进制指令。所谓的二进制指令，也就是机器码，是 CPU 能够识别的硬件层面的“代码”**，然而，究竟在什么时候将源代码转换成二进制指令呢？不同的编程语言有不同的规定：

     - 有的编程语言要求必须提前将所有源代码一次性转换成二进制指令，也就是生成一个可执行程序（Windows 下的 .exe），比如C语言、C++、Golang、Pascal（Delphi）、汇编等，这种编程语言称为编译型语言，使用的转换工具称为编译器。
     - 有的编程语言可以一边执行一边转换，需要哪些源代码就转换哪些源代码，不会生成可执行程序，比如 Python、JavaScript、PHP、Shell、MATLAB 等，这种编程语言称为解释型语言，使用的转换工具称为解释器。

- Java 和 C# 是一种比较奇葩的存在，它们是半编译半解释型的语言，源代码需要先转换成一种中间文件（字节码文件），然后再将中间文件拿到虚拟机中执行。Java 引领了这种风潮，它的初衷是在跨平台的同时兼顾执行效率；C# 是后来的跟随者，但是 C# 一直止步于 Windows 平台，在其它平台鲜有作为。

## 二、编程语言  ##

- 编程语言可以分为机器语言、汇编语言、高级语言。

     - 机器语言：由 0 和 1 组成的二进制码，对于人类来说是很难记忆的，还要考虑不同 CPU 平台的兼容性。
     - 汇编语言：用更容易记忆的英文缩写标识符代替二进制指令，但还是需要开发人员有足够的硬件知识。
     - 高级语言：更简单抽象且不需要考虑硬件，但是需要更复杂、耗时更久的翻译过程才能被执行。

- **高级语言一定要转化为机器语言才能被计算机执行，而且越高级的语言转化的时间越久。高级语言又可以分为解释型语言、编译型语言。**


## 三、编译型语言 ##

- **对于编译型语言，开发完成以后需要将所有的源代码都转换成可执行程序**，比如 Windows 下的.exe文件，可执行程序里面包含的就是机器码。只要我们拥有可执行程序，就可以随时运行，不用再重新编译了，也就是**“一次编译，无限次运行”。**

     - **在运行的时候，我们只需要编译生成的可执行程序，不再需要源代码和编译器了，所以说编译型语言可以脱离开发环境运行。**

     - **编译型语言一般是不能跨平台的，也就是不能在不同的操作系统之间随意切换。**

     - 编译型语言不能跨平台表现在两个方面：

          **1.可执行程序不能跨平台**

          - 可执行程序不能跨平台很容易理解，因为不同操作系统对可执行文件的内部结构有着截然不同的要求，彼此之间也不能兼容。比如，不能将 Windows 下的可执行程序拿到 Linux 下使用，也不能将 Linux 下的可执行程序拿到 Mac OS 下使用（虽然它们都是类 Unix 系统）。另外，相同操作系统的不同版本之间也不一定兼容，比如不能将 x64 程序（Windows 64 位程序）拿到 x86 平台（Windows 32 位平台）下运行。但是反之一般可行，因为 64 位 Windows 对 32 位程序作了很好的兼容性处理。

         **2.源代码不能跨平台**

         - 不同平台支持的函数、类型、变量等都可能不同，基于某个平台编写的源代码一般不能拿到另一个平台下编译。我们以C语言为例来说明。
- 在C语言中要想让程序暂停可以使用“睡眠”函数，在 Windows 平台下该函数是 Sleep()，在 Linux 平台下该函数是 sleep()，首字母大小写不同。其次，Sleep() 的参数是毫秒，sleep() 的参数是秒，单位也不一样。
         - 以上两个原因导致使用暂停功能的C语言程序不能跨平台，除非在**代码层面做出兼容性处理**，非常麻烦。

## 四、解释型语言 ##

- **对于解释型语言，每次执行程序都需要一边转换一边执行，用到哪些源代码就将哪些源代码转换成机器码，用不到的不进行任何处理。每次执行程序时可能使用不同的功能，这个时候需要转换的源代码也不一样。**
- 因为每次执行程序都需要重新转换源代码，所以解释型语言的执行效率天生就低于编译型语言，甚至存在数量级的差距。计算机的一些底层功能，或者关键算法，一般都使用 C/C++ 实现，只有在应用层面（比如网站开发、批处理、小工具等）才会使用解释型语言。
- **在运行解释型语言的时候，我们始终都需要源代码和解释器，所以说它无法脱离开发环境。**
- 当我们说“下载一个程序（软件）”时，不同类型的语言有不同的含义：

   - 对于编译型语言，我们下载到的是可执行文件，源代码被作者保留，所以编译型语言的程序一般是闭源的。
   - 对于解释型语言，我们下载到的是所有的源代码，因为作者不给源代码就没法运行，所以解释型语言的程序一般是开源的。

- 相比于编译型语言，解释型语言几乎都能跨平台，“**一次编写，到处运行**”是真是存在的，而且比比皆是。那么，为什么解释型语言就能跨平台呢？

  - 这一切都要归功于解释器！**我们所说的跨平台，是指源代码跨平台，而不是解释器跨平台。解释器用来将源代码转换成机器码，它就是一个可执行程序，是绝对不能跨平台的。官方需要针对不同的平台开发不同的解释器，这些解释器必须要能够遵守同样的语法，识别同样的函数，完成同样的功能，只有这样，同样的代码在不同平台的执行结果才是相同的。**    
  - 你看，**解释型语言之所以能够跨平台，是因为有了解释器这个中间层。在不同的平台下，解释器会将相同的源代码转换成不同的机器码，解释器帮助我们屏蔽了不同平台之间的差异。**


## 五、解释型语言和编译型语言对比 ##

- 解释器是一条一条的解释执行源语言(边解释边运行)。比如php，postscritp，javascript就是典型的解释性语言。 运行效率低，所以通常会进行一些预编译的优化。
- 编译器是把源代码整个编译成目标代码，执行时不在需要编译器，直接在支持目标代码的平台上运行，这样执行效率比解释执行快很多。比如C语言代码被编译成二进制代码（exe程序），在windows平台上执行。
- 他们最大的区别是程序运行时需要解释器边解释边执行，而编译器则在运行时是完全不需要的。
- 解释器的优点是比较容易让用户实现自己跨平台的代码，比如java，php等，同一套代码可以在几乎所有的操作系统上执行，而无需根据操作系统做修改；
- 编译器的目的就是生成目标代码再由连接器生成可执行的机器码，这样的话需要根据不同的操作系统编制代码，虽然有像Qt这样的源代码级跨平台的编程工具库，但在不同的平台上仍然需要重新编译连接成可执行文件，但其执行效率要远远高于解释运行的程序。


## 六、js是怎样运行起来的 ##

- js是由js引擎运行的，Js 引擎有很多种，比如 Chrome 使用的 V8 引擎，Webkit 使用的是 JavaScriptCore，React Native 使用的是 Hermes。

    #### V8引擎

    - V8引擎内部有许多小的模块组成。这里我们只需要了解其中最常用的**四个模块**即可。
      - Parser（解析器）

      - Ignition（解释器）

      - TurboFan（编译器）

      - Orinoco（垃圾回收）

        

    - **V8执行JavaScript的过程**

      - 初始化基础环境；
      - 解析源码生成 AST 和作用域；
      - 依据 AST 和作用域生成字节码；
      - 解释执行字节码；
      - 监听热点代码，优化热点代码为二进制的机器代码；
      - 反优化生成的二进制机器代码。

      **（1）初始化基础环境**

      - V8 执行 Js 代码是离不开宿主环境的，V8 的宿主可以是浏览器，也可以是 Node.js。当打开一个渲染进程时，就为 V8 初始化了一个运行时环境
      - 运行时环境为 V8 提供了堆空间，栈空间、全局执行上下文、消息循环系统、宿主对象及宿主 API 等。V8 的核心是实现了 ECMAScript 标准，此外还提供了垃圾回收器等内容。

      **（2）解析源码生成AST和作用域**

      - 这里有词法分析和语法分析两个过程

      - 词法分析

        - V8引擎会扫描所有源代码，将一行行的源码拆解成一个个 token。所谓词法单元 token，指的是语法上不可能再分的、最小的单个字符或字符串。固定 type 表述类型/属性，value 表示对应的值

        - 比如：var a = 2;这句代码经过词法分析会被分成以下token

          ```
              [{
                  "type":"Keyword",
                  "value":"var"
                },
                {
                  "type":"Identifier",
                  "value":"a"
                },
                {
                  "type":"Punctuator",
                  "value":"="
                },
                {
                  "type":"Numeric",
                   "value":"2"
                },
                {
                  "type":"Punctuator",
                   "value":";"
                }
              ]
          ```

          语法分析

          - 在V8中有两个解析器用于解析 JavaScript 代码，分别是 Parser 和 Pre-Parser 。

          - Parser解析器又称为**full parser（全量解析）** 或者 eager parser（饥饿解析）。它会解析所有立即执行的代码，包括语法检查，生成 AST，以及确定词法作用域。
                        

            - Parser 是 V8 的解析器，负责根据生成的 Tokens 进行语法分析。Parser 的主要工作包括：
            - 分析语法错误：遇到错误的语法会抛出异常；
            - 输出 AST：将词法分析输出的词法单元流（数组）转换为一个由元素逐级嵌套所组成的代表了程序语法结构的树——抽象语法树（Abstract Syntax Tree, AST）；
            - 确定词法作用域；
            - 生成执行上下文

          - Pre-Parser又称为**惰性解析**，它只解析未被立即执行的代码（如函数），不生成 AST ，只确定作用域，以此来提高性能。当预解析后的代码开始执行时，才进行 Parser 解析。

            - Pre-Parser（预解析）

              ```
              function foo () {
              	 console.log('function foo')
              	}
              	
              	function bar () {
              	  console.log('function bar')
              	}
              
              	foo()
              ```

            - 上面这段代码中，如果使用 Parser 解析后，会生成 foo 函数 和 bar 函数的 AST。然而 bar 函数并没有被调用，所以生成 bar 函数的 AST 实际上是没有任何意义且浪费时间的。那么有没有办法解决呢？此时就用到了 Pre-Parser 技术。

            - 我们还是以示例来说明：

              ```
              function foo() {
                  console.log('a');
                  function inline() {
                      console.log('b')
                  }
              }
              
              (function bar() {
                  console.log('c')
              })()；
              
              foo();
              ```

            - 当 V8 引擎遇到 foo 函数声明时，发现它未被立即执行，就会采用  Pre-Parser 对其进行解析（inline 函数同）。

            - (function bar() {console.log(c)})()时，它会知道这是一个立即执行表达式（IIFE），会立即被执行，所以会使用 Parser 对其解析。

            - 当 foo 函数被调用时，会使用 Parser 对 foo 函数进行解析，此时会对 inline 函数再进行一次预解析，也就是说 inline 函数被预解析了两次。如果嵌套层级较深，那么内层的函数会被预解析多次，所以在写代码时，尽可能避免嵌套多层函数，会影响性能。

      **（3）依据 AST 和作用域生成字节码**

      - 在解析器（Parser）将 JS 代码解析成 AST 之后，解释器（Ignition）根据 AST 来生成字节码（也称中间码）。前文提到 CPU 只能识别机器码，对字节码是识别不了的，这里就衍生出一个问题，如果 CPU 识别不了字节码，那为什么还要在中间插一步来耗费资源转字节码呢？效率不是很更低吗？
      - 在计算机学科里聊效率，都逃避不了时间和空间这两个概念，绝大部分的优化都是空间换时间和时间换空间，两者的平衡，效率如何达到最高，是一个很值得深入研究的问题。拿之前版本的 V8 引擎执行 JS 来说，是没有转字节码这一步骤的，直接从 AST 转成机器码，这个过程称为编译过程，所以每次拿到 JS 文件的时候，首先都会编译，而这个过程还是比较浪费时间的，这是一件比较头疼的事情，需要一个解决办法。
      - 缓存机器码

        - 绝大多数情况下，文件不会修改，那编译后的机器码可以考虑缓存下来，这样一来，下次再打开或者刷新页面的时候就省去编译的过程了，可以直接执行了，存储机器码被分成了两种情况，一个是浏览器未关闭时候，直接存储到浏览器本地的内存中，一个是浏览器关闭了，直接存储在磁盘上，而早期的 V8 也确实是这么做的，典型的牺牲空间换时间。
        - 但是一个很小的代码片段，转换成 AST 之后，变大了很多，文件大了导致一个问题就是需要更大的内存来存储，而 JS 文件转成机器码（即二进制文件），会比原来的 JS 文件大几百甚至几千倍，这就意味这一个几十 KB 的 JS 文件将会达到几十 MB，这就很可怕，本来 Chrome 多进程架构就已经很占用内存了，再来这一出，配置再好的电脑，也怕是无福消受 Chrome 了，毕竟使用者体验的好坏，直接决定了一个产品在市场上是否能生存下去，尽管 V8 缓存了编译后的代码，减少了编译的时间，提高了时间上的效率，但代价是内存占用太大了，所以 Chrome 团队是有必要优化这个问题的。
      - 惰性编译

        - 早期版本的 V8 为了解决占用内存和启动速度，引进了惰性编译，那么问题来了，惰性编译做了什么去提高效率的呢？
        - 惰性编译还是比较容易理解的，从作用域的角度思考，ES6 之前之只有全局作用域和函数作用域，而惰性编译的思路就是 V8 启动的时候只编译和缓存全局作用域的代码，而函数作用域中的代码，会在调用的时候去编译，同样函数内部编译后的代码一样不会被缓存下来。
        - 引入惰性编译之后，在编译速度和缓存上看来，都得到了提升，一切看起来似乎很完美了，对，是看起来，但是设计出来的东西，你永远不知道使用者会怎么使用，在 ES6 和 Vue、React 等这些没有普及之前，绝大部分开发者都使用的是 jQuery，以及 RequireJS 等类似产品，JQ 插件各种引用，各种插件或者开发者自己封装的方法，为了不污染其他使用者的变量，一般都封装成一个函数，这样问题就来了，惰性编译不会保存函数编译后的机器码和理解编译函数，如果一个插件太大那等到使用函数再去编译，编译的时间上就会变得很慢，这相当于是开发者将惰性编译给玩完了，路给封死了。
      - 引入字节码

        - 首先要理解什么是字节码，字节码其实是机器码的抽象，各种字节码的相互构成，可以实现 JS 所需的所有功能，当然首先一点，字节码比机器码占用的内存要小很多很多，基本是机器码所在内存的几十甚至几百分之一，这样一来字节码缓存下来所消耗的内存还是可以接受的。
        - 这里会有一个疑问，既然 CPU 不能识别字节码，那是不是还需要将字节码转成机器码呢？不然怎么执行，答案是肯定。解释器在将 AST 转为字节码之后，会在执行的时候将字节码转成机器码，这个执行过程肯定是比直接执行机器码要慢的，所以在执行方面，速度上会比较慢，但是 JS 源码通过解析器转 AST，然后再通过解释器转字节码，这个过程是比编译器直接将 JS 源码转机器码要快很多的，全流程看来，整个时间上是差不了多少的，但是却减小了大量的内存占用，何乐而不为。

      

       **（4）解释执行字节码**

      - 通过Ignition（解释器）将AST转为字节码之后，Ignition（解释器）会逐行解释字节码成机器码并执行（已经开始执行JavaScript代码了）

      

      **（5）监听热点代码，优化热点代码为二进制的机器代码**

      - 当 Ignition 开始执行 JavaScript 代码后，V8 会一直观察 JavaScript 代码的执行情况，并记录执行信息，如每个函数的执行次数、每次调用函数时，传递的参数类型等。如果一个函数被调用的次数超过了内设的阈值，监视器就会将当前函数标记为热点函数（Hot Function），并将该函数的字节码以及执行的相关信息发送给 TurboFan（优化编译器）。TurboFan 会根据执行信息做出一些进一步优化此代码的假设，在假设的基础上将字节码编译为优化的机器代码。如果假设成立，那么当下一次调用该函数时，就会执行优化编译后的机器代码，以提高代码的执行性能。这种字节码配合解释器和编译器的技术被称为即时编译（JIT）
      - 那如果假设不成立，将优化编译后的机器代码还原为字节码。

      

      **（6）反优化生成的二进制机器代码。**

      

      - JS 语言是动态语言，非常之灵活，对象的结构和属性在运行时是可以发生改变的，设想一个问题，如果热代码在某次执行的时候，突然其中的某个属性被修改了，那么编译成机器码的热代码还能继续执行吗？答案是肯定不能。这个时候就要使用到优化编译器的反优化了，他会将热代码退回到 AST 这一步，这个时候解释器会重新解释执行被修改的代码，如果代码再次被标记为热代码，那么会重复执行优化编译器的这个步骤。

        ```
        function sum (a, b) {
            return a + b;
        }
        ```

      - 我们都知道 JavaScript 是基于动态类型的，a 和 b 可以是任意类型数据，当执行 sum 函数时，Ignition 解释器会检查 a 和 b 的数据类型，并相应地执行加法或者连接字符串的操作。

      - 如果 sum 函数被调用多次，每次执行时都要检查参数的数据类型是很浪费时间的。此时 TurboFan 就出场了。它会分析监视器收集的信息，如果以前每次调用 sum 函数时传递的参数类型都是数字，那么 TurboFan 就预设 sum 的参数类型是数字类型，然后将其编译为机器指令。

      - 但是当某一次的调用传入的参数不再是数字时，表示 TurboFan 的假设是错误的，此时优化编译生成的机器代码就不能再使用了，于是就需要进行优化回退。

      


      




​                                   						



