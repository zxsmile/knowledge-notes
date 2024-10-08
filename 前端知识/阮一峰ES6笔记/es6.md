https://es6.ruanyifeng.com/#docs

#### 一、字符串的新增方法 ####

「**1.实例方法：includes()、startsWith()、endsWith()**」

   - **includes():返回布尔值，表示是否找到了参数字符串。**
   
   - **startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。**
   
   - **endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。**

     let s = 'Hello word!';
     s.startsWith()('Hello') // true
     s.startsWith()('e') // false
     s.endsWith()('!') // true
     s.endsWith()('d') // false
     s.includes('o') //true

   - **这三个方法都支持第二个参数，表示开始搜索的位置。**

	 let s = 'Hello world!';
	
	 s.startsWith('world', 6) // true
     s.startsWith('world', 7) // false
	 s.endsWith('Hello', 5) // true
     s.endsWith('Hello', 4) // false 
	 s.includes('Hello', 6) // false

   - 上面代码表示，**使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。**

「**2.实例方法：repeat()**」

   - ** repeat方法返回一个新字符串，表示将原字符串重复n次 **

		'x'.repeat(3) // "xxx"
		'hello'.repeat(2) // "hellohello"
		'na'.repeat(0) // ""

   - ** 参数如果是小数，会被取整(向下取整) **

        'na'.repeat(2.9) // "nana"

   - ** 如果repeat的参数是负数(取整完还是负数)或者Infinity，会报错**

		'na'.repeat(Infinity)
		// RangeError

		'na'.repeat(-1)
		// RangeError

    - ** 但是，如果参数是 0 到-1 之间的小数，则等同于 0，这是因为会先进行取整运算。0 到-1 之间的小数，取整以后等于-0，repeat视同为 0 **

		'na'.repeat(-0.9) // ""
		
    - ** 参数NaN等同于 0 **

         'na'.repeat(NaN) // ""

    - **如果repeat的参数是字符串，则会先转换成数字。**
		
		 'na'.repeat('na') // ""
		 'na'.repeat('3') // "nanana" 

「**3.实例方法：padStart()，padEnd()**」

   - ** ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全 **

   - ** padStart()和padEnd()一共接受两个参数，第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串 **
		
		'x'.padStart(5, 'ab') // 'ababx'
		'x'.padStart(4, 'ab') // 'abax'
		
		'x'.padEnd(5, 'ab') // 'xabab'
		'x'.padEnd(4, 'ab') // 'xaba'

   - ** 如果原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串**

		'xxx'.padStart(2, 'ab') // 'xxx'
		'xxx'.padEnd(2, 'ab') // 'xxx'

   - ** 如果用来补全的字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串 **

		'abc'.padStart(10, '0123456789')
		// '0123456abc'

  - ** 如果省略第二个参数，默认使用空格补全长度 **

		'x'.padStart(4) // '   x'
		'x'.padEnd(4) // 'x   '

  - ** padStart()的常见用途是为数值补全指定位数。下面代码生成 10 位的数值字符串 **

		'1'.padStart(10, '0') // "0000000001"
		'12'.padStart(10, '0') // "0000000012"
		'123456'.padStart(10, '0') // "0000123456"

  - ** 另一个用途是提示字符串格式**
		
		'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
		'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"

「**4.实例方法：trimStart()，trimEnd()**」

  - ES2019 对字符串实例新增了trimStart()和trimEnd()这两个方法。**它们的行为与trim()一致，trimStart()消除字符串头部的空格，trimEnd()消除尾部的空格。它们返回的都是新字符串，不会修改原始字符串。**

		const s = '  abc  ';
		
		s.trim() // "abc"
		s.trimStart() // "abc  "
		s.trimEnd() // "  abc"

  - **除了空格键，这两个方法对字符串头部（或尾部）的 tab 键、换行符等不可见的空白符号也有效**

  - **浏览器还部署了额外的两个方法，trimLeft()是trimStart()的别名，trimRight()是trimEnd()的别名。**

        const s = '  abc  ';
		
	    s.trim() // "abc"
	    s.trimLeft() // "abc  "
	    s.trimRight() // "  abc"

「**5.实例方法：matchAll()**」
 
   - matchAll()方法返回一个正则表达式在当前字符串的所有匹配

「**6.实例方法：replaceAll()**」

   - **历史上，字符串的实例方法replace()只能替换第一个匹配。**

		'aabbcc'.replace('b', '_')
		// 'aa_bcc'

       - 上面例子中，replace()只将第一个b替换成了下划线。

   - 如果要替换所有的匹配，不得不使用正则表达式的g修饰符。

		'aabbcc'.replace(/b/g, '_')
		// 'aa__cc'

   - 正则表达式毕竟不是那么方便和直观，ES2021 引入了replaceAll()方法，可以一次性替换所有匹配。

		'aabbcc'.replaceAll('b', '_')
		// 'aa__cc'

   - **它的用法与replace()相同，返回一个新字符串，不会改变原字符串。**

       String.prototype.replaceAll(searchValue, replacement)

       - 上面代码中，searchValue是搜索模式，可以是一个字符串，也可以是一个全局的正则表达式（带有g修饰符）。

   - **如果searchValue是一个不带有g修饰符的正则表达式，replaceAll()会报错。这一点跟replace()不同。**

		// 不报错
		'aabbcc'.replace(/b/, '_')
		
		// 报错 
		'aabbcc'.replaceAll(/b/, '_')

        'aabbcc'.replaceAll(/b/g, '_') // 'aa__cc'

   - **replaceAll()的第二个参数replacement是一个字符串，表示替换的文本，其中可以使用一些特殊字符串。**

   （1）$&：匹配的字符串。

   （2）$` ：匹配结果前面的文本。

   （3）$'：匹配结果后面的文本。

   （4）$n：匹配成功的第n组内容，n是从1开始的自然数。这个参数生效的前提是，第一个参数必须是正则表达式。

   （5）$$：指代美元符号$。

		// $& 表示匹配的字符串，即`b`本身
		// 所以返回结果与原字符串一致
		'abbc'.replaceAll('b', '$&')
		// 'abbc'
		
		// $` 表示匹配结果之前的字符串
		// 对于第一个`b`，$` 指代`a`
		// 对于第二个`b`，$` 指代`ab`
		'abbc'.replaceAll('b', '$`')
		// 'aaabc'
		
		// $' 表示匹配结果之后的字符串
		// 对于第一个`b`，$' 指代`bc`
		// 对于第二个`b`，$' 指代`c`
		'abbc'.replaceAll('b', `$'`)
		// 'abccc'
		
		// $1 表示正则表达式的第一个组匹配，指代`ab`
		// $2 表示正则表达式的第二个组匹配，指代`bc`
		'abbc'.replaceAll(/(ab)(bc)/g, '$2$1')
		// 'bcab'
		
		// $$ 指代 $
		'abc'.replaceAll('b', '$$')
        // 'a$c'

   - **replaceAll()的第二个参数replacement除了为字符串，也可以是一个函数，该函数的返回值将替换掉第一个参数searchValue匹配的文本。**

		'aabbcc'.replaceAll('b', () => '_')
		// 'aa__cc'

   - 上面例子中，replaceAll()的第二个参数是一个函数，该函数的返回值会替换掉所有b的匹配。

  - **这个替换函数可以接受多个参数。第一个参数是捕捉到的匹配内容(也就是通过正则匹配的内容)，第二个参数捕捉到是组匹配（有多少个组匹配，就有多少个对应的参数）。此外，最后还可以添加两个参数，倒数第二个参数是捕捉到的内容在整个字符串中的位置，最后一个参数是原字符串。**

		const str = '123abc456';
		const regex = /(\d+)([a-z]+)(\d+)/g;
		
		function replacer(match, p1, p2, p3, offset, string) {
          console.log(match,offset) //123abc456 0
		  return [p1, p2, p3].join(' - ');
		}
		
		str.replaceAll(regex, replacer)
		// 123 - abc - 456


  - 上面例子中，正则表达式有三个组匹配，所以replacer()函数的第一个参数match是捕捉到的匹配内容（即字符串123abc456），后面三个参数p1、p2、p3则依次为三个组匹配。

「**7.实例方法：at()**」

  - ** at()方法接受一个整数作为参数，返回参数指定位置的字符，支持负索引（即倒数的位置）**

		const str = 'hello';
		str.at(1) // "e"
		str.at(-1) // "o"
        str.at(12) // undefined
        str.at(-12) //undefined

 - ** 如果参数位置超出了字符串范围，at()返回undefined **

 - 该方法来自数组添加的at()方法，目前还是一个第三阶段的提案，可以参考《数组》一章的介绍。 

#### 二、正则的扩展 ####

「** 1.字符串的正则方法 **」

   - ES6 出现之前，字符串对象共有 4 个方法，可以使用正则表达式：match()、replace()、search()和split()。
   
   - ES6 将这 4 个方法，在语言内部全部调用RegExp的实例方法，从而做到所有与正则相关的方法，全都定义在RegExp对象上。

	String.prototype.match 调用 RegExp.prototype[Symbol.match]
	String.prototype.replace 调用 RegExp.prototype[Symbol.replace]
	String.prototype.search 调用 RegExp.prototype[Symbol.search]
	String.prototype.split 调用 RegExp.prototype[Symbol.split]

#### 三、数值的扩展 ####

「** 1.Number.isFinite()、Number.isNaN() **」

   - ES6 在Number对象上，新提供了Number.isFinite()和Number.isNaN()两个方法。

 （1）**Number.isFinite()**

   - **Number.isFinite()用来检查一个数值是否为有限的（finite），即不是Infinity。**
   
   - **注意，如果参数类型不是数值，Number.isFinite一律返回false。**
    
		Number.isFinite(15); // true
		Number.isFinite(0.8); // true
		Number.isFinite(NaN); // false
		Number.isFinite(Infinity); // false
		Number.isFinite(-Infinity); // false
		Number.isFinite('foo'); // false
		Number.isFinite('15'); // false
		Number.isFinite(true); // false

 （2）**Number.isNaN()**

    - **Number.isNaN()用来检查一个值是否为NaN。**

    - **如果参数类型不是NaN，Number.isNaN一律返回false。**

		Number.isNaN(NaN) // true
		Number.isNaN(15) // false
		Number.isNaN('15') // false
		Number.isNaN(true) // false
		Number.isNaN(9/NaN) // true
		Number.isNaN('true' / 0) // true
		Number.isNaN('true' / 'true') // true

- **它们与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，Number.isFinite()对于非数值一律返回false, Number.isNaN()只有对于NaN才返回true，非NaN一律返回false。**

		isFinite(25) // true
		isFinite("25") // true
		Number.isFinite(25) // true
		Number.isFinite("25") // false
		
		isNaN(NaN) // true
		isNaN("NaN") // true
		Number.isNaN(NaN) // true
		Number.isNaN("NaN") // false
		Number.isNaN(1) // false

「**2.Number.parseInt()、Number.parseFloat()**」

- ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。

		// ES5的写法
		parseInt('12.34') // 12
		parseFloat('123.45#') // 123.45
		
		// ES6的写法
		Number.parseInt('12.34') // 12
		Number.parseFloat('123.45#') // 123.45

- **这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。**

		Number.parseInt === parseInt // true
		Number.parseFloat === parseFloat // true

「**3.Number.isInteger()**」

   - Number.isInteger()用来判断一个数值是否为整数。

		Number.isInteger(25) // true
		Number.isInteger(25.1) // false

   - **JavaScript 内部，整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值。**

       Number.isInteger(25) // true
       Number.isInteger(25.0) // true

   - **如果参数不是数值，Number.isInteger返回false。**

		Number.isInteger() // false
		Number.isInteger(null) // false
		Number.isInteger('15') // false
		Number.isInteger(true) // false

  - **注意，由于 JavaScript 采用 IEEE 754 标准，数值存储为64位双精度格式，数值精度最多可以达到 53 个二进制位（1 个隐藏位与 52 个有效位）。如果数值的精度超过这个限度，第54位及后面的位就会被丢弃，这种情况下，Number.isInteger可能会误判。**

       Number.isInteger(3.0000000000000002) // true

  - **上面代码中，Number.isInteger的参数明明不是整数，但是会返回true。原因就是这个小数的精度达到了小数点后16个十进制位，转成二进制位超过了53个二进制位，导致最后的那个2被丢弃了。**

  - **类似的情况还有，如果一个数值的绝对值小于Number.MIN_VALUE（5E-324），即小于 JavaScript 能够分辨的最小值，会被自动转为 0。这时，Number.isInteger也会误判。**

		Number.isInteger(5E-324) // false
		Number.isInteger(5E-325) // true

  - 上面代码中，5E-325由于值太小，会被自动转为0，因此返回true。

  - 总之，如果对数据精度的要求较高，不建议使用Number.isInteger()判断一个数值是否为整数。

「**4.安全整数和Number.isSafeInteger()**」

- **JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。**

		Math.pow(2, 53) // 9007199254740992
		
		9007199254740992  // 9007199254740992
		9007199254740993  // 9007199254740992
		
		Math.pow(2, 53) === Math.pow(2, 53) + 1
		// true

   - 上面代码中，超出 2 的 53 次方之后，一个数就不精确了。

- **ES6 引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。**

		Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
		// true
		Number.MAX_SAFE_INTEGER === 9007199254740991
		// true
		
		Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER
		// true
		Number.MIN_SAFE_INTEGER === -9007199254740991
		// true

- 上面代码中，可以看到 JavaScript 能够精确表示的极限。

- **Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。**
		
		Number.isSafeInteger('a') // false
		Number.isSafeInteger(null) // false
		Number.isSafeInteger(NaN) // false
		Number.isSafeInteger(Infinity) // false
		Number.isSafeInteger(-Infinity) // false
		
		Number.isSafeInteger(3) // true
		Number.isSafeInteger(1.2) // false
		Number.isSafeInteger(9007199254740990) // true
		Number.isSafeInteger(9007199254740992) // false
		
		Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
		Number.isSafeInteger(Number.MIN_SAFE_INTEGER) // true
		Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
		Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false

- **这个函数的实现很简单，就是跟安全整数的两个边界值比较一下。**

		Number.isSafeInteger = function (n) {
		  return (typeof n === 'number' &&
		    Math.round(n) === n &&
		    Number.MIN_SAFE_INTEGER <= n &&
		    n <= Number.MAX_SAFE_INTEGER);
		}

- **实际使用这个函数时，需要注意。验证运算结果是否落在安全整数的范围内，不要只验证运算结果，而要同时验证参与运算的每个值。**

		Number.isSafeInteger(9007199254740993)
		// false
		Number.isSafeInteger(990)
		// true
		Number.isSafeInteger(9007199254740993 - 990)
		// true
		9007199254740993 - 990
		// 返回结果 9007199254740002
		// 正确答案应该是 9007199254740003

- 上面代码中，9007199254740993不是一个安全整数，但是Number.isSafeInteger会返回结果，显示计算结果是安全的。这是因为，这个数超出了精度范围，导致在计算机内部，以9007199254740992的形式储存。

		9007199254740993 === 9007199254740992
		// true

- 所以，如果只验证运算结果是否为安全整数，很可能得到错误结果。下面的函数可以同时验证两个运算数和运算结果。

	function trusty (left, right, result) {
	  if (
	    Number.isSafeInteger(left) &&
	    Number.isSafeInteger(right) &&
	    Number.isSafeInteger(result)
	  ) {
	    return result;
	  }
	  throw new RangeError('Operation cannot be trusted!');
	}
	
	trusty(9007199254740993, 990, 9007199254740993 - 990)
	// RangeError: Operation cannot be trusted!
	
	trusty(1, 2, 3)
	// 3
	

「**5.Math 对象的扩展**」

- ES6 在 Math 对象上新增了 17 个与数学相关的方法。所有这些方法都是静态方法，只能在 Math 对象上调用。

**（1）Math.trunc() **

    - **Math.trunc方法用于去除一个数的小数部分，返回整数部分**

		Math.trunc(4.1) // 4
		Math.trunc(4.9) // 4
		Math.trunc(-4.1) // -4
		Math.trunc(-4.9) // -4
		Math.trunc(-0.1234) // -0
   
    - **对于非数值，Math.trunc内部使用Number方法将其先转为数值**
		
		Math.trunc('123.456') // 123
		Math.trunc(true) //1
		Math.trunc(false) // 0
		Math.trunc(null) // 0

    - **对于空值和无法截取整数的值，返回NaN。**
		
		Math.trunc(NaN);      // NaN
		Math.trunc('foo');    // NaN
		Math.trunc();         // NaN
		Math.trunc(undefined) // NaN

   - **对于没有部署这个方法的环境，可以用下面的代码模拟。**

		Math.trunc = Math.trunc || function(x) {
		  return x < 0 ? Math.ceil(x) : Math.floor(x);
		};

**（2）Math.sign() **

   - **Math.sign方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值**

   - **它会返回五种值**

  	    - 参数为正数，返回+1；
		
        - 参数为负数，返回-1；
		
        - 参数为 0，返回0；
		
        - 参数为-0，返回-0;
		
        - 其他值，返回NaN。

		Math.sign(-5) // -1
		Math.sign(5) // +1
		Math.sign(0) // +0
		Math.sign(-0) // -0
		Math.sign(NaN) // NaN

   - **如果参数是非数值，会自动转为数值。对于那些无法转为数值的值，会返回NaN。**

		Math.sign('')  // 0
		Math.sign(true)  // +1
		Math.sign(false)  // 0
		Math.sign(null)  // 0
		Math.sign('9')  // +1
		Math.sign('foo')  // NaN
		Math.sign()  // NaN
		Math.sign(undefined)  // NaN

   - 对于没有部署这个方法的环境，可以用下面的代码模拟。

		Math.sign = Math.sign || function(x) {
		  x = +x; // convert to a number
		  if (x === 0 || isNaN(x)) {
		    return x;
		  }
		  return x > 0 ? 1 : -1;
		};


「**6.BigInt 数据类型**」

- **JavaScript 所有数字都保存成 64 位浮点数，这给数值的表示带来了两大限制。一是数值的精度只能到 53  （相当于 16 个十进制位），大于这个范围的整数，JavaScript 是无法精确表示，这使得 JavaScript 不适合进行科学和金融方面的精确计算。二是大于或等于2的1024次方的数值，JavaScript 无法表示，会返回Infinity。**

		// 超过 53 个二进制位的数值，无法保持精度
		Math.pow(2, 53) === Math.pow(2, 53) + 1 // true
		
		// 超过 2 的 1024 次方的数值，无法表示
		Math.pow(2, 1024) // Infinity

- ES2020 引入了一种新的数据类型 BigInt（大整数），来解决这个问题，这是 **ECMAScript 的第八种数据类型。BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。**

		const a = 2172141653n;
		const b = 15346349309n;
		
		// BigInt 可以保持精度
		a * b // 33334444555566667777n
		
		// 普通整数无法保持精度
		Number(a) * Number(b) // 33334444555566670000

- **为了与 Number 类型区别，BigInt 类型的数据必须添加后缀n。**

		1234 // 普通整数
		1234n // BigInt
		
		// BigInt 的运算
		1n + 2n // 3n

- **BigInt 同样可以使用各种进制表示，都要加上后缀n。**
		
		0b1101n // 二进制
		0o777n // 八进制
		0xFFn // 十六进制

- **BigInt 与普通整数是两种值，它们之间并不相等。**

		42n === 42 // false

- **typeof运算符对于 BigInt 类型的数据返回bigint。**

		typeof 123n // 'bigint'

- **BigInt 可以使用负号（-），但是不能使用正号（+），因为会与 asm.js 冲突。**
		
		-42n // 正确
		+42n // 报错

JavaScript 以前不能计算70的阶乘（即70!），因为超出了可以表示的精度。

		let p = 1;
		for (let i = 1; i <= 70; i++) {
		  p *= i;
		}
		console.log(p); // 1.197857166996989e+100

现在支持大整数了，就可以算了，浏览器的开发者工具运行下面代码，就 OK。

		let p = 1n;
		for (let i = 1n; i <= 70n; i++) {
		  p *= i;
		}
		console.log(p); // 11978571...00000000n

「**7.BigInt 函数**」

- JavaScript 原生提供BigInt函数，**可以用它生成 BigInt 类型的数值。转换规则基本与Number()一致，将其他类型的值转为 BigInt。**

		BigInt(123) // 123n
		BigInt('123') // 123n
		BigInt(false) // 0n
		BigInt(true) // 1n

- **BigInt()函数必须有参数，而且参数必须可以正常转为数值，下面的用法都会报错。**

		new BigInt() // TypeError
		BigInt(undefined) //TypeError
		BigInt(null) // TypeError
		BigInt('123n') // SyntaxError
		BigInt('abc') // SyntaxError

   - 上面代码中，尤其值得注意字符串123n无法解析成 Number 类型，所以会报错。

- **参数如果是小数，也会报错。**

		BigInt(1.5) // RangeError
		BigInt('1.5') // SyntaxError

- **BigInt 继承了 Object 对象的两个实例方法。**

   - BigInt.prototype.toString()
   - BigInt.prototype.valueOf()

- **它还继承了 Number 对象的一个实例方法。**

   - BigInt.prototype.toLocaleString()

- 此外，还提供了三个静态方法。

   - BigInt.asUintN(width, BigInt)： 给定的 BigInt 转为 0 到 2的width次方 - 1 之间对应的值。

   - BigInt.asIntN(width, BigInt)：给定的 BigInt 转为 -2的width次方 - 1 到 2的（width - 1）次方 - 1 之间对应的值。

   - BigInt.parseInt(string[, radix])：近似于Number.parseInt()，将一个字符串转换成指定进制的 BigInt。

		const max = 2n ** (64n - 1n) - 1n;
		
		BigInt.asIntN(64, max)
		// 9223372036854775807n
		BigInt.asIntN(64, max + 1n)
		// -9223372036854775808n
		BigInt.asUintN(64, max + 1n)
		// 9223372036854775808n

   - 上面代码中，max是64位带符号的 BigInt 所能表示的最大值。如果对这个值加1n，BigInt.asIntN()将会返回一个负值，因为这时新增的一位将被解释为符号位。而BigInt.asUintN()方法由于不存在符号位，所以可以正确返回结果。

- 如果BigInt.asIntN()和BigInt.asUintN()指定的位数，小于数值本身的位数，那么头部的位将被舍弃。

		const max = 2n ** (64n - 1n) - 1n;
		
		BigInt.asIntN(32, max) // -1n
		BigInt.asUintN(32, max) // 4294967295n

  - 上面代码中，max是一个64位的 BigInt，如果转为32位，前面的32位都会被舍弃。

- 下面是BigInt.parseInt()的例子。

		// Number.parseInt() 与 BigInt.parseInt() 的对比
		Number.parseInt('9007199254740993', 10)
		// 9007199254740992
		BigInt.parseInt('9007199254740993', 10)
		// 9007199254740993n

- 上面代码中，由于有效数字超出了最大限度，Number.parseInt方法返回的结果是不精确的，而BigInt.parseInt方法正确返回了对应的 BigInt。

- 对于二进制数组，BigInt 新增了两个类型BigUint64Array和BigInt64Array，这两种数据类型返回的都是64位 BigInt。DataView对象的实例方法DataView.prototype.getBigInt64()和DataView.prototype.getBigUint64()，返回的也是 BigInt。

「**8.转换规则**」

- **可以使用Boolean()、Number()和String()这三个方法，将 BigInt 可以转为布尔值、数值和字符串类型。**

		Boolean(0n) // false
		Boolean(1n) // true
		Number(1n)  // 1
		String(1n)  // "1"

- 上面代码中，注意最后一个例子，转为字符串时后缀n会消失。

- **另外，取反运算符（!）也可以将 BigInt 转为布尔值。**

		!0n // true
		!1n // false

「**9.数学运算**」

- 数学运算方面，BigInt 类型的+、-、* 和 **这四个二元运算符，与 Number 类型的行为一致。除法运算/会舍去小数部分，返回一个整数。

		9n / 5n
		// 1n

- 几乎所有的数值运算符都可以用在 BigInt，但是有两个例外。
	
	- 不带符号的右移位运算符>>>
	- 一元的求正运算符+

- 上面两个运算符用在 BigInt 会报错。前者是因为>>>运算符是不带符号的，但是 BigInt 总是带有符号的，导致该运算无意义，完全等同于右移运算符>>。后者是因为一元运算符+在 asm.js 里面总是返回 Number 类型，为了不破坏 asm.js 就规定+1n会报错。

- **BigInt 不能与普通数值进行混合运算**

		1n + 1.3 // 报错

- 上面代码报错是因为无论返回的是 BigInt 或 Number，都会导致丢失精度信息。比如(2n**53n + 1n) + 0.5这个表达式，如果返回 BigInt 类型，0.5这个小数部分会丢失；如果返回 Number 类型，有效精度只能保持 53 位，导致精度下降。

-** 同样的原因，如果一个标准库函数的参数预期是 Number 类型，但是得到的是一个 BigInt，就会报错。**

		// 错误的写法
		Math.sqrt(4n) // 报错
		
		// 正确的写法
		Math.sqrt(Number(4n)) // 2

- 上面代码中，Math.sqrt的参数预期是 Number 类型，如果是 BigInt 就会报错，必须先用Number方法转一下类型，才能进行计算。

asm.js 里面，|0跟在一个数值的后面会返回一个32位整数。根据不能与 Number 类型混合运算的规则，BigInt 如果与|0进行运算会报错。

		1n | 0 // 报错

「**10.其他运算**」

- **BigInt 对应的布尔值，与 Number 类型一致，即0n会转为false，其他值转为true**

		if (0n) {
		  console.log('if');
		} else {
		  console.log('else');
		}
		// else

- 上面代码中，0n对应false，所以会进入else子句。

- **比较运算符（比如>）和相等运算符（==）允许 BigInt 与其他类型的值混合计算，因为这样做不会损失精度。**

		0n < 1 // true
		0n < true // true
		0n == 0 // true
		0n == false // true
		0n === 0 // false

- **BigInt 与字符串混合运算时，会先转为字符串，再进行运算。**

		'' + 123n // "123"


#### 四、函数的扩展 ####

** 1.函数的length属性 **

- **返回没有指定默认值的参数个数**

	(function () {}).length // 0
	(function (a) {}).length // 1
	(function (a = 5) {}).length // 0
	(function (a, b, c = 5) {}).length // 2

- **rest参数也不会计入length属性**

	(function(...args) {}).length // 0

- ** 如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了。 **

    (function (a = 0, b, c) {}).length // 0
    (function (a, b = 1, c) {}).length // 1

** 2.作用域 **

- ** 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。**

	 var x = 1;
	
	 function f(x, y = x) {
	   console.log(y);
	 }
	
	 f(2) // 2

- 上面代码中，参数y的默认值等于变量x。调用函数f时，参数形成一个单独的作用域。在这个作用域里面，默认值变量x指向第一个参数x，而不是全局变量x，所以输出是2。

		let x = 1;
		
		function f(y = x) {
		  let x = 2;
		  console.log(y);
		}
		
		f() // 1

- 上面代码中，函数f调用时，参数y = x形成一个单独的作用域。这个作用域里面，变量x本身没有定义，所以指向外层的全局变量x。函数调用时，函数体内部的局部变量x影响不到默认值变量x。

- 如果此时，全局变量x不存在，就会报错。

		function f(y = x) {
		  let x = 2;
		  console.log(y);
		}
		
		f() // ReferenceError: x is not defined

- 下面这样写，也会报错。

		var x = 1;
		
		function foo(x = x) {
		  // ...
		}
		
		foo() // ReferenceError: Cannot access 'x' before initialization

- 上面代码中，参数x = x形成一个单独作用域。实际执行的是let x = x，由于暂时性死区的原因，这行代码会报错。

- 如果参数的默认值是一个函数，该函数的作用域也遵守这个规则。请看下面的例子。

		let foo = 'outer';
		
		function bar(func = () => foo) {
		  let foo = 'inner';
		  console.log(func());
		}
		
		bar(); // outer

- 上面代码中，函数bar的参数func的默认值是一个匿名函数，返回值为变量foo。函数参数形成的单独作用域里面，并没有定义变量foo，所以foo指向外层的全局变量foo，因此输出outer。

	    var x = 1;
		function foo(x, y = function() { x = 2; }) {
		  var x = 3;
		  y();
		  console.log(x);
		}
		
		foo() // 3
		x // 1

- 上面代码中，函数foo的参数形成一个单独作用域。这个作用域里面，首先声明了变量x，然后声明了变量y，y的默认值是一个匿名函数。这个匿名函数内部的变量x，指向同一个作用域的第一个参数x。函数foo内部又声明了一个内部变量x，该变量与第一个参数x由于不是同一个作用域，所以不是同一个变量，因此执行y后，内部变量x和外部全局变量x的值都没变。

- 如果将var x = 3的var去除，函数foo的内部变量x就指向第一个参数x，与匿名函数内部的x是一致的，所以最后输出的就是2，而外层的全局变量x依然不受影响。

		var x = 1;
		function foo(x, y = function() { x = 2; }) {
		  x = 3;
		  y();
		  console.log(x);
		}
		
		foo() // 2
		x // 1

** 3.rest参数 **

- **ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。**

- ** rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中 **

		function add(...values) {
		  let sum = 0;
		
		  for (var val of values) {
		    sum += val;
		  }
		
		  return sum;
		}
		
		add(2, 5, 3) // 10

- ** arguments对象不是数组，而是一个类似数组的对象。所以为了使用数组的方法，必须使用Array.from先将其转为数组。rest 参数就不存在这个问题，它就是一个真正的数组，数组特有的方法都可以使用 **

- **注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错**
		
		// 报错
		function f(a, ...b, c) {
		  // ...
		}

- ** 函数的length属性，不包括 rest 参数 **

		(function(a) {}).length  // 1
		(function(...a) {}).length  // 0
		(function(a, ...b) {}).length  // 1

** 4.严格模式 **

- 从 ES5 开始，函数内部可以设定为严格模式。

	function doSomething(a, b) {
	  'use strict';
	  // code
	}

- ES2016 做了一点修改，规定**只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。**

		// 报错
		function doSomething(a, b = a) {
		  'use strict';
		  // code
		}
		
		// 报错
		const doSomething = function ({a, b}) {
		  'use strict';
		  // code
		};
		
		// 报错
		const doSomething = (...a) => {
		  'use strict';
		  // code
		};
		
		const obj = {
		  // 报错
		  doSomething({a, b}) {
		    'use strict';
		    // code
		  }
		};

- **这样规定的原因是，函数内部的严格模式，同时适用于函数体和函数参数。但是，函数执行的时候，先执行函数参数，然后再执行函数体。这样就有一个不合理的地方，只有从函数体之中，才能知道参数是否应该以严格模式执行，但是参数却应该先于函数体执行。**

		// 报错
		function doSomething(value = 070) {
		  'use strict';
		  return value;
		}

- 上面代码中，参数value的默认值是八进制数070，但是严格模式下不能用前缀0表示八进制，所以应该报错。但是实际上，JavaScript 引擎会先成功执行value = 070，然后进入函数体内部，发现需要用严格模式执行，这时才会报错。

- **虽然可以先解析函数体代码，再执行参数代码，但是这样无疑就增加了复杂性。因此，标准索性禁止了这种用法，只要参数使用了默认值、解构赋值、或者扩展运算符，就不能显式指定严格模式。**

- 两种方法可以规避这种限制。第一种是设定全局性的严格模式，这是合法的
		
		'use strict';
		
		function doSomething(a, b = a) {
		  // code
		}

- 第二种是把函数包在一个无参数的立即执行函数里面。

		const doSomething = (function () {
		  'use strict';
		  return function(value = 42) {
		    return value;
		  };
		}());


** 5.name属性 **

- 函数的name属性，返回该函数的函数名。

		function foo() {}
		foo.name // "foo"

- 这个属性早就被浏览器广泛支持，但是直到 ES6，才将其写入了标准。

（1） 需要注意的是，ES6 对这个属性的行为做出了一些修改。**如果将一个匿名函数赋值给一个变量，ES5 的name属性，会返回空字符串，而 ES6 的name属性会返回实际的函数名。**

		var f = function () {};
		
		// ES5
		f.name // ""
		
		// ES6
		f.name // "f"

- 上面代码中，变量f等于一个匿名函数，ES5 和 ES6 的name属性返回的值不一样。

（2）**如果将一个具名函数赋值给一个变量，则 ES5 和 ES6 的name属性都返回这个具名函数原本的名字。**

		const bar = function baz() {};
		
		// ES5
		bar.name // "baz"
		
		// ES6
		bar.name // "baz"

（3）**Function构造函数返回的函数实例，name属性的值为anonymous。**

		(new Function).name // "anonymous"

（4）**bind返回的函数，name属性值会加上bound前缀**

		function foo() {};
		foo.bind({}).name // "bound foo"
		
		(function(){}).bind({}).name // "bound "

** 6.箭头函数 **

（1）**箭头函数没有自己的this对象。**

（2）**不可以当作构造函数，也就是说，不可以对箭头函数使用new命令，否则会抛出一个错误。**

（3）**不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。**

（4）**不可以使用yield命令，因此箭头函数不能用作 Generator 函数。**

- 上面四点中，最重要的是第一点。**对于普通函数来说，内部的this指向函数运行时所在的对象，但是这一点对箭头函数不成立。它没有自己的this对象，内部的this就是定义时上层作用域中的this。也就是说，箭头函数内部的this指向是固定的，相比之下，普通函数的this指向是可变的。**

		function foo() {
		  setTimeout(() => {
		    console.log('id:', this.id);
		  }, 100);
		}
		
		var id = 21;
		
		foo.call({ id: 42 });
		// id: 42

- 上面代码中，setTimeout()的参数是一个箭头函数，这个箭头函数的定义生效是在foo函数生成时，而它的真正执行要等到 100 毫秒后。如果是普通函数，执行时this应该指向全局对象window，这时应该输出21。**但是，箭头函数导致this总是指向函数定义生效时所在的对象（本例是{id: 42}），所以打印出来的是42。** 

- 下面例子是回调函数分别为箭头函数和普通函数，对比它们内部的this指向。
		
		function Timer() {
		  this.s1 = 0;
		  this.s2 = 0;
		  // 箭头函数
		  setInterval(() => this.s1++, 1000);
		  // 普通函数
		  setInterval(function () {
		    this.s2++;
		  }, 1000);
		}
		
		var timer = new Timer();
		
		setTimeout(() => console.log('s1: ', timer.s1), 3100);
		setTimeout(() => console.log('s2: ', timer.s2), 3100);
		// s1: 3
		// s2: 0

- 上面代码中，Timer函数内部设置了两个定时器，分别使用了箭头函数和普通函数。前者的this绑定定义时所在的作用域（即Timer函数），后者的this指向运行时所在的作用域（即全局对象）。所以，3100 毫秒之后，timer.s1被更新了 3 次，而timer.s2一次都没更新。

- 请问下面的代码之中，this的指向有几个？

		function foo() {
		  return () => {
		    return () => {
		      return () => {
		        console.log('id:', this.id);
		      };
		    };
		  };
		}
		
		var f = foo.call({id: 1});
		
		var t1 = f.call({id: 2})()(); // id: 1
		var t2 = f().call({id: 3})(); // id: 1
		var t3 = f()().call({id: 4}); // id: 1

- 答案是this的指向只有一个，就是函数foo的this，这是因为**所有的内层函数都是箭头函数，都没有自己的this，它们的this其实都是最外层foo函数的this。所以不管怎么嵌套，t1、t2、t3都输出同样的结果。如果这个例子的所有内层函数都写成普通函数，那么每个函数的this都指向运行时所在的不同对象。**

（5）**除了this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target。**
		
		function foo() {
		  setTimeout(() => {
		    console.log('args:', arguments);
		  }, 100);
		}
		
		foo(2, 4, 6, 8)
		// args: [2, 4, 6, 8]

- 上面代码中，箭头函数内部的变量arguments，其实是函数foo的arguments变量。

（6）**由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。**

		(function() {
		  return [
		    (() => this.x).bind({ x: 'inner' })()
		  ];
		}).call({ x: 'outer' });
		// ['outer']

- 上面代码中，箭头函数没有自己的this，所以bind方法无效，内部的this指向外部的this。

（7）不适用场合 

   - **第一个场合是定义对象的方法，且该方法内部包括this。**

		const cat = {
		  lives: 9,
		  jumps: () => {
		    this.lives--;
		  }
		}

上面代码中，cat.jumps()方法是一个箭头函数，这是错误的。调用cat.jumps()时，如果是普通函数，该方法内部的this指向cat；**如果写成上面那样的箭头函数，使得this指向全局对象，因此不会得到预期结果。这是因为对象不构成单独的作用域，导致jumps箭头函数定义时的作用域就是全局作用域**

- **第二个场合是需要动态this的时候，也不应使用箭头函数。**

		var button = document.getElementById('press');
		button.addEventListener('click', () => {
		  this.classList.toggle('on');
		});

- 上面代码运行时，点击按钮会报错，因为button的监听函数是一个箭头函数，导致里面的this就是全局对象。如果改成普通函数，this就会动态指向被点击的按钮对象。

** 7.尾调用 **

（1）什么是尾调用？

     - 指某个函数的最后一步是调用另一个函数。

		function f(x){
		  return g(x);
		}

     - 上面代码中，函数f的最后一步是调用函数g，这就叫尾调用。

     - 以下三种情况，都不属于尾调用。

		// 情况一
		function f(x){
		  let y = g(x);
		  return y;
		}
		
		// 情况二
		function f(x){
		  return g(x) + 1;
		}
		
		// 情况三
		function f(x){
		  g(x);
		}

    - 上面代码中，**情况一是调用函数g之后，还有赋值操作，所以不属于尾调用，即使语义完全一样。情况二也属于调用后还有操作，即使写在一行内。情况三等同于下面的代码。**

		function f(x){
		  g(x);
		  return undefined;
		}

   - **尾调用不一定出现在函数尾部，只要是最后一步操作即可。**

		function f(x) {
		  if (x > 0) {
		    return m(x)
		  }
		  return n(x);
		}

   - 上面代码中，函数m和n都属于尾调用，因为它们都是函数f的最后一步操作。

#### 五、数组的扩展 ####

** 1.扩展运算符(...) **
   
  （1）扩展运算符可以将数组转为将**逗号隔开的参数序列**
   
  （2）任意定义了**iterator（遍历器）**接口的对象都可是使用扩展运算符转为真正的数组

		        var str = 'hello'
		        var array = [...str]
		        console.log(array) // ['h','e','l','l','o']
   
  （3）**如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错**

				const [...butLast, last] = [1, 2, 3, 4, 5];
				// 报错
				
				const [first, ...middle, last] = [1, 2, 3, 4, 5];
				// 报错

** 2.Array.from() **

  （1）Array.from方法用于将两类对象转为真正的数组：
     
        - **类似数组的对象即具有length属性的对象**
        
        - **可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）**

	            var obj = {
	                '0':'a',
	                '1':'b',
	                '2':'c',
	                length:3
	            }
	
	            // ES5 的写法
                var arr1 = [].slice.call(obj); // ['a', 'b', 'c']

                // ES6 的写法
                let arr2 = Array.from(obj); // ['a', 'b', 'c']

   （2）如果参数是一个真正的数组，Array.from()会返回一个一模一样的新数组。

			Array.from([1, 2, 3])
			// [1, 2, 3]

   （3）值得提醒的是，扩展运算符（...）也可以将某些数据结构转为数组。
	     
		  // arguments对象
		  function foo() {
		   const args = [...arguments];
		  }
		
		 // NodeList对象
		 [...document.querySelectorAll('div')]

   - **扩展运算符背后调用的是遍历器接口（Symbol.iterator），如果一个对象没有部署这个接口，就无法转换。Array.from()方法还支持类似数组的对象。所谓类似数组的对象，本质特征只有一点，即必须有length属性。因此，任何有length属性的对象，都可以通过Array.from()方法转为数组，而此时扩展运算符就无法转换。**

		Array.from({ length: 3 });
		// [ undefined, undefined, undefined ]

   - 上面代码中，Array.from()返回了一个具有三个成员的数组，每个位置的值都是undefined。扩展运算符转换不了这个对象。

  (4)**Array.from方法还可以接收第二个参数，用来对每个参数进行处理，将处理后的值放入返回的数组**

	   var newArray = Array.from([1,2,3],(x)=>x*x)
	   console.log(newArray) // [1,4,9]

** 3.Array.of() **

- Array.of() 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。
   
- 这个方法的主要目的是弥补构造函数Array()的不足。**Array.of(3)创建一个具有单个元素 3 的数组，而 Array(3) 创建一个长度为3的空数组（注意： 这是指一个有 3 个空位(empty)的数组，而不是由3个undefined组成的数组，打印出单独项的值是undefined）。**

       Array.of('s','ss','s') // ['s','ss','s']
	   Array.of(3) // [3]
		
	   Array('s','ss','s') // ['s','ss','s']
	   Array(3) //[empty × 3]

- **Array.of()总是返回参数值组成的数组。如果没有参数，就返回一个空数组。**

- **Array.of()方法可以用下面的代码模拟实现。**

		function ArrayOf(){
		  return [].slice.call(arguments);
		}


** 4.copyWithin() **

 (1)数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置，（会覆盖原数组成员），然后返回当前数组，数组总长度不变。

 (2)copyWithin(target,start,end)

      - target(必须):**从该位置开始替换数据。如果为负数，表示倒数（-1表示最后一个元素的位置），负值大于数组长度，重置为0，正值大于数组长度，不操作数组**
     
      - start(可选)：**从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算（-1表示最后一个元素的位置），负值大于数组长度，重置为0，正值大于数组长度，不操作数组**
      - 
      - end（可选）：**到该位置前停止读取数据（数值-1），默认等于数组长度。如果为负值，表示从末尾开始计算（-1表示最后一个元素的位置。负值大于数组长度，重置为0，正值大于数组长度，默认等于数组长度。**
        
      - 这三个值都为数值，如果不是则会自动转为数值

		    var array=[1,2,3,4,5,6]
		    var newArray = array.copyWithin(0,3) 
		    console.log(newArray) // [4,5,6,4,5,6]
		    console.log(array)  // [4,5,6,4,5,6]

 (3)**使用这个方法，会修改当前数组。**

** 5.find()和findIndex() **

   (1)数组实例的find方法用于找出**第一个符合条件的数组成员**。**它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。**
   
   (2)回调函数接收三个参数，依次为当前的值、当前的位置和原数组。
     
		        [1,2,3].find(function(value,index,arr){
		            return value>0
		        }) // 1
		      
   (3) **数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1**

		        [1, 5, 10, 15].findIndex(function(value, index, arr) {
		            return value > 9;
		        }) // 2

   (4)**这两个方法都可以接受第二个参数，用来绑定回调函数的this对象。**

		        function f(v){
		        return v > this.age;
		        }
		        let person = {name: 'John', age: 20};
		        [10, 12, 26, 15].find(f, person);    // 26

   (5)**另外，这两个方法都可以发现NaN，弥补了数组的indexOf方法的不足。**

		        [NaN].indexOf(NaN)
		        // -1
		
		        [NaN].findIndex(y => Object.is(NaN, y))
		        // 0

    - 上面代码中，indexOf方法无法识别数组的NaN成员，但是findIndex方法可以借助Object.is方法做到。

   (6)find()和findIndex()都是从数组的0号位，依次向后检查。ES2022 新增了两个方法**findLast()和findLastIndex()，从数组的最后一个成员开始，依次向前检查，其他都保持不变。**

			const array = [
			  { value: 1 },
			  { value: 2 },
			  { value: 3 },
			  { value: 4 }
			];
			
			array.findLast(n => n.value % 2 === 1); // { value: 3 }
			array.findLastIndex(n => n.value % 2 === 1); // 2
 
  - 上面示例中，findLast()和findLastIndex()从数组结尾开始，寻找第一个value属性为奇数的成员。结果，该成员是{ value: 3 }，位置是2号位。

** 6.fill() **
      
   (1)**fill方法使用给定值，填充一个数组，若数组中本来有值则会被覆盖**

             [1,2,3].fill(7) //[7,7,7]
        
   (2)**fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。**

             [1,2,3].fill(7,1,2)  //[1,7,3]

   (3)**如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象**

             var arr = new Array(3).fill({name:'milk'})
             console.log(arr) // [ { name: 'milk' }, { name: 'milk' }, { name: 'milk' } ]
             arr[0].name = 'ben'
             console.log(arr) // [ { name: 'ben' }, { name: 'ben' }, { name: 'ben' } ]

** 7.entries()，keys() 和 values() **

 (1)用于遍历数组。它们都返回一个遍历器对象,可以用for...of循环进行遍历
 
 (2)keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。

	        for (let index of ['a', 'b'].keys()) {
			  console.log(index);
			}
			// 0
			// 1
			
			for (let elem of ['a', 'b'].values()) {
			  console.log(elem);
			}
			// 'a'
			// 'b'
			
			for (let [index, elem] of ['a', 'b'].entries()) {
			  console.log(index, elem);
			}
			// 0 "a"
			// 1 "b"

(3)如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。

			let letter = ['a', 'b', 'c'];
			let entries = letter.entries();
			console.log(entries.next().value); // [0, 'a']
			console.log(entries.next().value); // [1, 'b']
			console.log(entries.next().value); // [2, 'c']


** 7.实例方法：includes() **

 （1）**Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似**

		[1, 2, 3].includes(2)     // true
		[1, 2, 3].includes(4)     // false
		[1, 2, NaN].includes(NaN) // true

 （2）**该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置(-1是最后一个元素)，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。**

		[1, 2, 3].includes(3, 3);  // false
		[1, 2, 3].includes(3, -1); // true

 （3）没有该方法之前，我们通常使用数组的indexOf方法，检查是否包含某个值。
 
  - indexOf方法有两个缺点：

     - **一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达起来不够直观。**
     
     - **二是，它内部使用严格相等运算符（===）进行判断，这会导致对NaN的误判。**

			if (arr.indexOf(el) !== -1) {
			  // ...
			}

			[NaN].indexOf(NaN)
			// -1

     - **includes使用的是不一样的判断算法，就没有这个问题。**
			
			[NaN].includes(NaN)
			// true

   (4)Map和Set数据结构有一个has方法，需要与includes方法区别
         
      - **Map 结构的has方法，是用来查找键名的**，比如Map.prototype.has(key)、WeakMap.prototype.has(key)、Reflect.has(target, propertyKey)。
                
      - **Set 结构的has方法，是用来查找值的**，比如Set.prototype.has(value)、WeakSet.prototype.has(value)。

** 8.实例方法：flat()，flatMap()  **
  
  (1)flat
        
      - flat方法是将嵌套的数组拉平，**返回一个新数组，对原来的数组没有影响**
      
      - **falt默认参数是1，表示只会拉平一层，如果要拉平多少层 就直接将参数带为几就可以了**
      
      - **如果不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数**
      
      - **如果原数组有空位，flat()方法会跳过空位。**

             [1,,[2,[3,4],5],6].flat() //[1, 2, [3,4], 5, 6]
             [1,,[2,[3,4],5],6].flat(Infinity) //[1, 2, 3, 4, 5, 6]

   (2)flatMap

       - **flatMap()方法对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组。**
       
       - flatMap()方法的**参数是一个遍历函数**，该函数可以接受三个参数，分别是**当前数组成员、当前数组成员的位置（从零开始）、原数组**
       
       - **flatMap()方法还可以有第二个参数，用来绑定遍历函数里面的this**
       
       - **flatMap()只能展开一层数组。**

       相当于 [[2, 4], [3, 6], [4, 8]].flat()
       [2, 3, 4].flatMap((x) => [x, x * 2])
       // [2, 4, 3, 6, 4, 8]

       // 相当于 [[[2]], [[4]], [[6]], [[8]]].flat()
       [1, 2, 3, 4].flatMap(x => [[x * 2]])
       // [[2], [4], [6], [8]]

** 8.实例方法：at() **

- 长久以来，JavaScript 不支持数组的负索引，如果要引用数组的最后一个成员，不能写成arr[-1]，只能使用arr[arr.length - 1]。

- 这是因为方括号运算符[]在 JavaScript 语言里面，不仅用于数组，还用于对象。对于对象来说，方括号里面就是键名，比如obj[1]引用的是键名为字符串1的键，同理obj[-1]引用的是键名为字符串-1的键。由于 JavaScript 的数组是特殊的对象，所以方括号里面的负数无法再有其他语义了，也就是说，不可能添加新语法来支持负索引。

- 为了解决这个问题，ES2022 为数组实例增加了at()方法，**接受一个整数作为参数，返回对应位置的成员，并支持负索引(负数从后往回数，-1表示最后一位)。这个方法不仅可用于数组，也可用于字符串和类型数组（TypedArray）。**

	const arr = [5, 12, 8, 130, 44];
	arr.at(2) // 8
	arr.at(-2) // 130

- **如果参数位置超出了数组范围，at()返回undefined。**

	const sentence = 'This is a sample sentence';
	
	sentence.at(0); // 'T'
	sentence.at(-1); // 'e'
    sentence.at(-2); // 'c'
	
	sentence.at(-100) // undefined
	sentence.at(100) // undefined

** 9.实例方法：toReversed()，toSorted()，toSpliced()，with() **

- 很多数组的传统方法会改变原数组，比如push()、pop()、shift()、unshift()等等。数组只要调用了这些方法，它的值就变了。ES2023引入了四个新方法，对数组进行操作时，不改变原数组，而返回一个原数组的拷贝。

	Array.prototype.toReversed() -> Array
	Array.prototype.toSorted(compareFn) -> Array
	Array.prototype.toSpliced(start, deleteCount, ...items) -> Array
	Array.prototype.with(index, value) -> Array

- 它们分别对应数组的原有方法。

   - **toReversed()对应reverse()，用来颠倒数组成员的位置。**

   - **toSorted()对应sort()，用来对数组成员排序。**

   - **toSpliced()对应splice()，用来在指定位置，删除指定数量的成员，并插入新成员**

   - **with(index, value)对应splice(index, 1, value)，用来将指定位置的成员替换为新的值。**

- 上面是这四个新方法对应的原有方法，含义和用法完全一样，唯一不同的是不会改变原数组，而是返回原数组操作后的拷贝。

		const sequence = [1, 2, 3];
		sequence.toReversed() // [3, 2, 1]
		sequence // [1, 2, 3]
		
		const outOfOrder = [3, 1, 2];
		outOfOrder.toSorted() // [1, 2, 3]
		outOfOrder // [3, 1, 2]
		
		const array = [1, 2, 3, 4];
		array.toSpliced(1, 2, 5, 6, 7) // [1, 5, 6, 7, 4]
		array // [1, 2, 3, 4]
		
		const correctionNeeded = [1, 1, 3];
		correctionNeeded.with(1, 2) // [1, 2, 3]
		correctionNeeded // [1, 1, 3]

** 10.实例方法：toReversed()，toSorted()，toSpliced()，with() **

    - **它们可以根据分组函数的运行结果，将数组成员分组。**

    - **group()的参数是一个分组函数，原数组的每个成员都会依次执行这个函数，确定自己是哪一个组。**

		const array = [1, 2, 3, 4, 5];
		
		array.group((num, index, array) => {
		  return num % 2 === 0 ? 'even': 'odd';
		});
		// { odd: [1, 3, 5], even: [2, 4] }

    - **group()的分组函数可以接受三个参数，依次是数组的当前成员、该成员的位置序号、原数组（上例是num、index和array）。分组函数的返回值应该是字符串（或者可以自动转为字符串），以作为分组后的组名。**

    - **group()的返回值是一个对象，该对象的键名就是每一组的组名，即分组函数返回的每一个字符串（上例是even和odd）；该对象的键值是一个数组，包括所有产生当前键名的原数组成员。**

		   [6.1, 4.2, 6.3].group(Math.floor)
		// { '4': [4.2], '6': [6.1, 6.3] }

    - 上面示例中，Math.floor作为分组函数，对原数组进行分组。它的返回值原本是数值，这时会自动转为字符串，作为分组的组名。原数组的成员根据分组函数的运行结果，进入对应的组。

    - **group()还可以接受一个对象，作为第二个参数。该对象会绑定分组函数（第一个参数）里面的this，不过如果分组函数是一个箭头函数，该对象无效，因为箭头函数内部的this是固化的。**

    - **groupToMap()的作用和用法与group()完全一致，唯一的区别是返回值是一个 Map 结构，而不是对象。Map 结构的键名可以是各种值，所以不管分组函数返回什么值，都会直接作为组名（Map 结构的键名），不会强制转为字符串。这对于分组函数返回值是对象的情况，尤其有用。**

		const array = [1, 2, 3, 4, 5];
		
		const odd  = { odd: true };
		const even = { even: true };
		array.groupToMap((num, index, array) => {
		  return num % 2 === 0 ? even: odd;
		});
		//  Map { {odd: true}: [1, 3, 5], {even: true}: [2, 4] }

    - 上面示例返回的是一个 Map 结构，它的键名就是分组函数返回的两个对象odd和even。

    - **总之，按照字符串分组就使用group()，按照对象分组就使用groupToMap()**

** 11.数组的空位 **

  (1)**数组的空位和undefined不同，一个位置的值为undefined依然是有值的，而空位是没有任何值，用in运算符可以验证**

            0 in [undefined, undefined, undefined] // true
            0 in [, , ,] // false
            上面代码表明，第一个数组的0号位是有值的，第二个数组没有

  (2)**es5对空位的处理不一致，大多数会忽略**

     - forEach(), filter(), reduce(), every() 和some()都会跳过空位
         
     - map()会跳过空位，但会保留这个值
         
     - join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。

		            forEach方法
		            [,'a'].forEach((x,i) => console.log(i)); // 1
		
		            // filter方法
		            ['a',,'b'].filter(x => true) // ['a','b']
		
		            // every方法
		            [,'a'].every(x => x==='a') // true
		
		            // reduce方法
		            [1,,2].reduce((x,y) => x+y) // 3
		
		            // some方法
		            [,'a'].some(x => x !== 'a') // false
		
		            // map方法
		            [,'a'].map(x => 1) // [,1]
		
		            // join方法
		            [,'a',undefined,null].join('#') // "#a##"
		
		            // toString方法
		            [,'a',undefined,null].toString() // ",a,,"

   (3)**es6则是明确将空位转成undefined**

			        Array.from方法会将数组的空位，转为undefined，也就是说，这个方法不会忽略空位。
			
			        Array.from(['a',,'b'])
			        // [ "a", undefined, "b" ]
			
			        扩展运算符（...）也会将空位转为undefined。
			
			        [...['a',,'b']]
			        // [ "a", undefined, "b" ]
			
			        copyWithin()会连空位一起拷贝。
			
			        [,'a','b',,].copyWithin(2,0) // [,"a",,"a"]
			
			        fill()会将空位视为正常的数组位置。
			
			        new Array(3).fill('a') // ["a","a","a"]
			
			        for...of循环也会遍历空位。
			
			        let arr = [, ,];
			        for (let i of arr) {
			        console.log(1);
			        }
			        // 1
			        // 1
			
			        上面代码中，数组arr有两个空位，for...of并没有忽略它们。如果改成map方法遍历，空位是会跳过的。
			
			        entries()、keys()、values()、find()和findIndex()会将空位处理成undefined。
			
			        // entries()
			        [...[,'a'].entries()] // [[0,undefined], [1,"a"]]
			
			        // keys()
			        [...[,'a'].keys()] // [0,1]
			
			        // values()
			        [...[,'a'].values()] // [undefined,"a"]
			
			        // find()
			        [,'a'].find(x => true) // undefined
			
			        // findIndex()
			        [,'a'].findIndex(x => true) // 0
			
			        由于空位的处理规则非常不统一，所以建议避免出现空位。


					 var array=[1,2,3,4,5,6]
			         var newArray = array.copyWithin(0,3) // [4,5,6,4,5,6]
			         console.log(array)

** 12.Array.prototype.sort()的排序稳定性 **

- 排序稳定性（stable sorting）是排序算法的重要属性，指的是排序关键字相同的项目，排序前后的顺序不变。

		const arr = [
		  'peach',
		  'straw',
		  'apple',
		  'spork'
		];
		
		const stableSorting = (s1, s2) => {
		  if (s1[0] < s2[0]) return -1;
		  return 1;
		};
		
		arr.sort(stableSorting)
		// ["apple", "peach", "straw", "spork"]

- 上面代码对数组arr按照首字母进行排序。排序结果中，straw在spork的前面，跟原始顺序一致，所以排序算法stableSorting是稳定排序。

		const unstableSorting = (s1, s2) => {
		  if (s1[0] <= s2[0]) return -1;
		  return 1;
		};
		
		arr.sort(unstableSorting)
		// ["apple", "peach", "spork", "straw"]

- 上面代码中，排序结果是spork在straw前面，跟原始顺序相反，所以排序算法unstableSorting是不稳定的。

- **常见的排序算法之中，插入排序、合并排序、冒泡排序等都是稳定的，堆排序、快速排序等是不稳定的。**

- **不稳定排序的主要缺点是，多重排序时可能会产 生问题。假设有一个姓和名的列表，要求按照“姓氏为主要关键字，名字为次要关键字”进行排序。开发者可能会先按名字排序，再按姓氏进行排序。如果排序算法是稳定的，这样就可以达到“先姓氏，后名字”的排序效果。如果是不稳定的，就不行。**

- **早先的 ECMAScript 没有规定，Array.prototype.sort()的默认排序算法是否稳定，留给浏览器自己决定，这导致某些实现是不稳定的。ES2019 明确规定，Array.prototype.sort()的默认排序算法必须稳定。这个规定已经做到了，现在 JavaScript 各个主要实现的默认排序算法都是稳定的。**

#### 六、对象的扩展 ####

** 1.属性的简洁表示法 **

	   let baz = {foo:foo} => let baz = {foo}
	
	   let obj = {fn: function() {
	                 return 'offer!'   => 
	               }
	             }

       let obj = {fn() {
	                 return 'offer!'  
	               }
	             }

    - ** 简写的对象方法不能用作构造函数，会报错 **

		const obj = {
		  f() {
		    this.foo = 'bar';
		  }
		};
		
		new obj.f() // 报错

    - 上面代码中，f是一个简写的对象方法，所以obj.f不能当作构造函数使用。
    

** 2.属性名表达式 ** 

   - JavaScript 定义对象的属性，有两种方法。

        // 方法一
		obj.foo = true;
		
		// 方法二
		obj['a' + 'bc'] = 123;

   - 上面代码的**方法一是直接用标识符作为属性名，方法二是用表达式作为属性名，这时要将表达式放在方括号之内。**

   - **但是，如果使用字面量方式定义对象（使用大括号），在 ES5 中只能使用方法一（标识符）定义属性。**
		
		var obj = {
		  foo: true,
		  abc: 123
		};

    - **ES6 允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。**

		let propKey = 'foo';
		
		let obj = {
		  [propKey]: true,
		  ['a' + 'bc']: 123
		};

    - **注意，属性名表达式与简洁表示法，不能同时使用，会报错。**

		// 报错
		const foo = 'bar';
		const bar = 'abc';
		const baz = { [foo] };
		
		// 正确
		const foo = 'bar';
		const baz = { [foo]: 'abc'};

   - **注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]，这一点要特别小心。**

		const keyA = {a: 1};
		const keyB = {b: 2};
		
		const myObject = {
		  [keyA]: 'valueA',
		  [keyB]: 'valueB'
		};
		
		myObject // Object {[object Object]: "valueB"}

   - 上面代码中，[keyA]和[keyB]得到的都是[object Object]，所以[keyB]会把[keyA]覆盖掉，而myObject最后只有一个[object Object]属性。

** 3.方法的name属性 ** 

   - 函数的name属性，返回函数名。对象方法也是函数，因此也有name属性。

		const person = {
		  sayName() {
		    console.log('hello!');
		  },
		};
		
		person.sayName.name   // "sayName"

  - 上面代码中，方法的name属性返回函数名（即方法名）。

  - ** 如果对象的方法使用了取值函数（getter）和存值函数（setter），则name属性不是在该方法上面，而是该方法的属性的描述对象的get和set属性上面，返回值是方法名前加上get和set **

		const obj = {
		  get foo() {},
		  set foo(x) {}
		};
		
		obj.foo.name
		// TypeError: Cannot read property 'name' of undefined
		
		const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');
		
		descriptor.get.name // "get foo"
		descriptor.set.name // "set foo"

  - 有两种特殊情况：
  
       - **bind方法创造的函数，name属性返回bound加上原函数的名字**
       
       - **Function构造函数创造的函数，name属性返回anonymous**

		(new Function()).name // "anonymous"
		
		var doSomething = function() {
		  // ...
		};
		doSomething.bind().name // "bound doSomething"

  - **如果对象的方法是一个 Symbol 值，那么name属性返回的是这个 Symbol 值的描述。**

		const key1 = Symbol('description');
		const key2 = Symbol();
		let obj = {
		  [key1]() {},
		  [key2]() {},
		};
		obj[key1].name // "[description]"
		obj[key2].name // ""

** 4.属性的可枚举性和遍历 **

 （1）** 可枚举性 ** 

   - 对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。Object.getOwnPropertyDescriptor方法(** 只获取实例自身属性 **)可以获取该属性的描述对象。

		let obj = { foo: 123 };
		Object.getOwnPropertyDescriptor(obj, 'foo')
		//  {
		//    value: 123,
		//    writable: true,
		//    enumerable: true,
		//    configurable: true
		//  }

   - 描述对象的enumerable属性，称为“可枚举性”，如果该属性为false，就表示某些操作会忽略当前属性。

   - **目前，有四个操作会忽略enumerable为false的属性。**

       - **for...in循环：只遍历对象自身的和继承的可枚举的属性。**

       - **Object.keys()：返回对象自身的所有可枚举的属性的键名。**

       - **JSON.stringify()：只串行化对象自身的可枚举的属性。**

       - **Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。**

   - 这四个操作之中，前三个是 ES5 就有的，最后一个Object.assign()是 ES6 新增的。其中，**只有for...in会返回继承的属性，其他三个方法都会忽略继承的属性，只处理对象自身的属性。**
   
   - **实际上，引入“可枚举”（enumerable）这个概念的最初目的，就是让某些属性可以规避掉for...in操作，不然所有内部属性和方法都会被遍历到。**比如，对象原型的toString方法，以及数组的length属性，就通过“可枚举性”，从而避免被for...in遍历到。

   - **另外，ES6 规定，所有 Class 的原型的方法都是不可枚举的。**

		Object.getOwnPropertyDescriptor(class {foo() {}}.prototype, 'foo').enumerable
		// false

   - 总的来说，操作中引入继承的属性会让问题复杂化，大多数时候，我们只关心对象自身的属性。所以，尽量不要用for...in循环，而用Object.keys()代替。

 （2）** 属性的遍历 **

   - ES6 一共有 5 种方法可以遍历对象的属性。

     - ** for...in **

          - for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

     - ** Object.keys(obj) **

         - Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

     - ** Object.getOwnPropertyNames(obj) **

         - Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

     - ** Object.getOwnPropertySymbols(obj) **

         - Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。
 
     - ** Reflect.ownKeys(obj) **

        - Reflect.ownKeys返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

  - 以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

     - **首先遍历所有数值键，按照数值升序排列。**
		
     - **其次遍历所有字符串键，按照加入时间升序排列。**
		
     - **最后遍历所有 Symbol 键，按照加入时间升序排列。**

** 5.super关键字 **

   - this关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字**super，指向当前对象的原型对象。**

		const proto = {
		  foo: 'hello'
		};
		
		const obj = {
		  foo: 'world',
		  find() {
		    return super.foo;
		  }
		};
		
		Object.setPrototypeOf(obj, proto);
		obj.find() // "hello"

   - 上面代码中，对象obj.find()方法之中，通过super.foo引用了原型对象proto的foo属性。

   - **注意，super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。**

		// 报错
		const obj = {
		  foo: super.foo
		}
		
		// 报错
		const obj = {
		  foo: () => super.foo
		}
		
		// 报错
		const obj = {
		  foo: function () {
		    return super.foo
		  }
		}

   - 上面三种super的用法都会报错，因为对于 JavaScript 引擎来说，这里的super都没有用在对象的方法之中。第一种写法是super用在属性里面，第二种和第三种写法是super用在一个函数里面，然后赋值给foo属性。**目前，只有对象方法的简写法可以让 JavaScript 引擎确认，定义的是对象的方法。**

- JavaScript 引擎内部，super.foo等同于Object.getPrototypeOf(this).foo（属性）或Object.getPrototypeOf(this).foo.call(this)（方法）。

		const proto = {
		  x: 'hello',
		  foo() {
		    console.log(this.x);
		  },
		};
		
		const obj = {
		  x: 'world',
		  foo() {
		    super.foo();
		  }
		}
		
		Object.setPrototypeOf(obj, proto);
		
		obj.foo() // "world"

- 上面代码中，super.foo指向原型对象proto的foo方法，但是绑定的this却还是当前对象obj，因此输出的就是world。

** 6.对象的扩展运算符 **

 （1）**解构赋值**

    - 对象的解构赋值用于从一个对象取值，相当于将目标对象** 自身的所有可遍历的**、但尚未被读取的属性，分配到指定的对象上面。** 所有的键和它们的值都会拷贝到新对象上面 **

		let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
		x // 1
		y // 2
		z // { a: 3, b: 4 }

    - 上面代码中，变量z是解构赋值所在的对象。它获取等号右边的所有尚未读取的键（a和b），将它们连同值一起拷贝过来。

    - **由于解构赋值要求等号右边是一个对象，所以如果等号右边是undefined或null，就会报错，因为它们无法转为对象。**

		let { ...z } = null; // 运行时错误
		let { ...z } = undefined; // 运行时错误

    - **解构赋值必须是最后一个参数，否则会报错。**
		
		let { ...x, y, z } = someObject; // 句法错误
		let { x, ...y, ...z } = someObject; // 句法错误

    - 上面代码中，解构赋值不是最后一个参数，所以会报错。

    - **注意，解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。**

		let obj = { a: { b: 1 } };
		let { ...x } = obj;
		obj.a.b = 2;
		x.a.b // 2

    - 上面代码中，x是解构赋值所在的对象，拷贝了对象obj的a属性。a属性引用了一个对象，修改这个对象的值，会影响到解构赋值对它的引用。

    - ** 扩展运算符的解构赋值，不能复制继承自原型对象的属性。(只能复制自身的属性) **

			let o1 = { a: 1 };
			let o2 = { b: 2 };
			o2.__proto__ = o1;
			let { ...o3 } = o2;
			o3 // { b: 2 }
			o3.a // undefined

     - 上面代码中，对象o3复制了o2，但是只复制了o2自身的属性，没有复制它的原型对象o1的属性。

			const o = Object.create({ x: 1, y: 2 });
			o.z = 3;
			
			let { x, ...newObj } = o;
			let { y, z } = newObj;
			x // 1
			y // undefined
			z // 3

     - 上面代码中，**变量x是单纯的解构赋值，所以可以读取对象o继承的属性；变量y和z是扩展运算符的解构赋值，只能读取对象o自身的属性，所以变量z可以赋值成功，变量y取不到值。**
     
     - ES6 规定，**变量声明语句之中，如果使用解构赋值，扩展运算符后面必须是一个变量名，而不能是一个解构赋值表达式**，所以上面代码引入了中间变量newObj，如果写成下面这样会报错。

			let { x, ...{ y, z } } = o;
			// SyntaxError: ... must be followed by an identifier in declaration contexts

      - 解构赋值的一个用处，是扩展某个函数的参数，引入其他操作。

			function baseFunction({ a, b }) {
			  // ...
			}
			function wrapperFunction({ x, y, ...restConfig }) {
			  // 使用 x 和 y 参数进行操作
			  // 其余参数传给原始函数
			  return baseFunction(restConfig);
			}

       - 上面代码中，原始函数baseFunction接受a和b作为参数，函数wrapperFunction在baseFunction的基础上进行了扩展，能够接受多余的参数，并且保留原始函数的行为。

（2）** 扩展运算符 **

    - **对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。**

			let z = { a: 3, b: 4 };
			let n = { ...z };
			n // { a: 3, b: 4 }

    - **由于数组是特殊的对象，所以对象的扩展运算符也可以用于数组。**

			let foo = { ...['a', 'b', 'c'] };
			foo
			// {0: "a", 1: "b", 2: "c"}

    - **如果扩展运算符后面是一个空对象，则没有任何效果。**

			{...{}, a: 1}
			// { a: 1 }

    - **如果扩展运算符后面不是对象，则会自动将其转为对象。**
		
		// 等同于 {...Object(1)}
		{...1} // {}
		
    - 上面代码中，扩展运算符后面是整数1，会自动转为数值的包装对象Number{1}。由于该对象没有自身属性，所以返回一个空对象。
		
		下面的例子都是类似的道理。
		
		// 等同于 {...Object(true)}
		{...true} // {}
		
		// 等同于 {...Object(undefined)}
		{...undefined} // {}
		
		// 等同于 {...Object(null)}
		{...null} // {}

     - **但是，如果扩展运算符后面是字符串，它会自动转成一个类似数组的对象，因此返回的不是空对象。**

		{...'hello'}
		// {0: "h", 1: "e", 2: "l", 3: "l", 4: "o"}

     - **对象的扩展运算符，只会返回参数对象自身的、可枚举的属性，**这一点要特别小心，尤其是用于类的实例对象时。

		class C {
		  p = 12;
		  m() {}
		}
		
		let c = new C();
		let clone = { ...c };
		
		clone.p; // ok
		clone.m(); // 报错

    - 上面示例中，c是C类的实例对象，对其进行扩展运算时，只会返回c自身的属性c.p，而不会返回c的方法c.m()，因为这个方法定义在C的原型对象上（详见 Class 的章节）。

    - 对象的扩展运算符等同于使用Object.assign()方法。

		let aClone = { ...a };
		// 等同于
		let aClone = Object.assign({}, a);

     - **上面的例子只是拷贝了对象实例的属性，如果想完整克隆一个对象，还拷贝对象原型的属性，可以采用下面的写法。**

		// 写法一
		const clone1 = {
		  __proto__: Object.getPrototypeOf(obj),
		  ...obj
		}; 

        - Object.getPrototypeOf(obj)获取obj的原型对象，将这个原型对象作为clone1的原型对象
		
		// 写法二
		const clone2 = Object.assign(
		  Object.create(Object.getPrototypeOf(obj)),
		  obj
		);
         
        - Object.getPrototypeOf(obj)获取obj的原型对象，Object.create(Object.getPrototypeOf(obj))生成一个obj原型对象的实例对象，Object.assign(Object.create(Object.getPrototypeOf(obj)),obj)将obj的所有**可枚举属性**复制到该实例对象。

        - **所以此方法，clone2是Object.getPrototypeOf(obj)的实例对象，并且合并了obj这个实例对象的属性**


		// 写法三
		const clone3 = Object.create(
		  Object.getPrototypeOf(obj),
		  Object.getOwnPropertyDescriptors(obj)
		) 

        - **Object.getOwnPropertyDescriptors()方法返回指定对象所有自身属性（非继承属性）的描述对象。**

        - Object.create()是**使用指定的原型对象及其属性(添加的新属性)去创建一个新的对象。**

        - 所以这个方法是使用obj的原型对象作为clone3的原型对象，并给clone3添加了新的属性，也就是obj的属性。** 注意这里的新属性，只是加给新生成的实例对象，不会加给原型对象 **
        
        - 上面代码中，写法一的__proto__属性在非浏览器的环境不一定部署，因此推荐使用写法二和写法三。

      - ** 扩展运算符可以用于合并两个对象 **

	        let ab = { ...a, ...b };
			// 等同于
			let ab = Object.assign({}, a, b);

      - **如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。**
     
			let aWithOverrides = { ...a, x: 1, y: 2 };

      - **与数组的扩展运算符一样，对象的扩展运算符后面可以跟表达式。**

			const obj = {
			  ...(x > 1 ? {a: 1} : {}),
			  b: 2,
			};

       - **扩展运算符的参数对象之中，如果有取值函数get，这个函数是会执行的。**

			let a = {
			  get x() {
			    throw new Error('not throw yet');
			  }
			}
			
			let aWithXGetter = { ...a }; // 报错

        - 上面例子中，取值函数get在扩展a对象时会自动执行，导致报错。


** 7.AggregateError错误对象 **

   - **AggregateError 在一个错误对象里面，封装了多个错误。如果某个单一操作，同时引发了多个错误，需要同时抛出这些错误，那么就可以抛出一个 AggregateError 错误对象，把各种错误都放在这个对象里面。**

   - **AggregateError 本身是一个构造函数，用来生成 AggregateError 实例对象。**

		AggregateError(errors[, message])

   - **AggregateError()构造函数可以接受两个参数。**

        - errors：**数组，它的每个成员都是一个错误对象。该参数是必须的。**

        - message：字符串，表示 AggregateError 抛出时的提示信息。**该参数是可选的。**

		const error = new AggregateError([
		  new Error('ERROR_11112'),
		  new TypeError('First name must be a string'),
		  new RangeError('Transaction value must be at least 1'),
		  new URIError('User profile link must be https'),
		], 'Transaction cannot be processed')

   - **AggregateError的实例对象有三个属性。**

      - **name：错误名称，默认为“AggregateError”。**

      - **message：错误的提示信息。**

      - **errors：数组，每个成员都是一个错误对象。**

		try {
		  throw new AggregateError([
		    new Error("some error"),
		  ], 'Hello');
		} catch (e) {
		  console.log(e instanceof AggregateError); // true
		  console.log(e.message);                   // "Hello"
		  console.log(e.name);                      // "AggregateError"
		  console.log(e.errors);                    // [ Error: "some error" ]
		}


** 7.Error 对象的 cause 属性 **

   - Error 对象用来表示代码运行时的异常情况，但是从这个对象拿到的上下文信息，有时很难解读，也不够充分。ES2022 为 Error 对象添加了一个cause属性，可以在生成错误时，添加报错原因的描述。

   - **它的用法是new Error()生成 Error 实例时，给出一个描述对象，该对象可以设置cause属性。**

		const actual = new Error('an error!', { cause: 'Error cause' });
		actual.cause; // 'Error cause'

   - 上面示例中，生成 Error 实例时，使用描述对象给出cause属性，写入报错的原因。然后，就可以从实例对象上读取这个属性。

   - **casue属性可以放置任意内容，不必一定是字符串。**

		try {
		  maybeWorks();
		} catch (err) {
		  throw new Error('maybeWorks failed!', { cause: err });
		}

  - 上面示例中，cause属性放置的就是一个对象。

#### 七、对象的新增方法 ####

** 1.Object.is()**
  
    -**这个方法用来判断两个值是否相等**
    
    -在es5中判断两个值是否相等，只有两个运算符：相等运算符(=)和严格相等运算符(===)，它们都有缺点：
      
      - 相等运算符是会转换数据类型，严格相等运算符的NaN不等于自身且+0和-0相等
      
      - **Object.is方法使用了Same-value equality”（同值相等）算法，和严格相等运算符行为基本一致，并且改正了严格相等运算符的缺点**

		    Object.is(NaN,NaN) // true
		    Object.is(+0,-0)   // false  

     - **ES5 可以通过下面的代码，部署Object.is**

			Object.defineProperty(Object, 'is', {
			  value: function(x, y) {
			    if (x === y) {
			      // 针对+0 不等于 -0的情况
			      return x !== 0 || 1 / x === 1 / y;
			    }
			    // 针对NaN的情况
			    return x !== x && y !== y;
			  },
			  configurable: true,
			  enumerable: false,
			  writable: true
			});

**2.Object.assign()**
   
      - 该方法用于对象的合并，将源对象的所有**可枚举属性**，**复制到目标对象，该方法的第一个参数是目标对象，后边的参数全是源对象**

                let target = {}
                let source1 = {a:1},source2={b:2},source3={c:3}
                Object.assign(target,source1,source2,source3)
                console.log(target) // {a:1,b:2,c:3}

      - **若目标对象与源对象，或者多个源对象有同名的属性，则后面的属性会覆盖前面的属性**
      
                let target = {}
                let source1 = {a:1},source2={a:'xx',b:2},source3={b:'pp',c:3}
                Object.assign(target,source1,source2,source3)
                console.log(target) // {a: 'xx', b: 'pp', c: 3}

      - **若Object.assign方法只有一个参数（目标对象），则会直接返回该参数。如果该参数不是对象，会先转换为对象然后再返回，由于null和undefined不能转换成对象，所以用作第一个参数会报错**
            
	            let obj = {a:1}
	            Object.assign(obj)===obj  //true
	
	            typeof Object.assign(2)  //'object'
	
	            Object.assign(null)  // 报错
	            Object.assign(undefined) // 报错

       - **如果非对象参数出现在源对象位置，则处理方式有所不同，会先转化为对象，如果不能转化为对象，则会跳过，这意味着，如果undefined和null不在首参数（目标对象位置），就不会报错。**
       
       - **其它类型的值(即数值，字符串，布尔值)，不在首参数（目标对象位置），也不会报错，但是除了字符串会以数组的形式拷贝到目标对象，其他值都不会产生效果(因为只有字符串的的包装对象会产生可枚举属性)**

		        let obj = {}
		        Object.assign(obj,2,{a:1},true,undefined,'string')
		        console.log(obj) // {0: 's', 1: 't', 2: 'r', 3: 'i', 4: 'n', 5: 'g', a: 1}
    
                - **这里属性顺序的问题，参考快慢属性**

       - Objcet.assign方法**只拷贝源对象自身的属性，不拷贝继承属性，也不拷贝不可枚举的属性（enumerable:false）**

		            let obj = {a:1}
		            let source = {}
		            Object.defineProperty(source,'foo',{
		                value:'hello',
		                enumerable:false
		            })
		            Object.assign(obj,source)
		            console.log(obj) //{a:1}

        - **属性名为Symbol值的属性，也会被Object.assign拷贝**
    
		            let obj = {a:1}
		            let source = {[Symbol('c')]:'d'}
		            Object.assign(obj,source)
		            console.log(obj) // {a:1,[Symbol(c)]：'d'}

   - **注意点**

      - 该方法**是浅拷贝**，而不是深拷贝
      
      - 该方法可以用来处理数组，只不过**会把数组当作对象处理**
            
                Object.assign([1,2,3],[4,5]) //[4,5,3]
        
       - 上面代码中，Object.assign()把数组视为属性名为 0、1、2 的对象，因此源数组的 0 号属性4覆盖了目标数组的 0 号属性1。
       
       - 该方法**只能进行值的复制**，如果要复制的值是一个取值函数，那么将求值后的再复制

                 const source = {
                     get foo() {return 1}
                 }

                 Object.assign({},source)  // {foo:1}

    - **用途**

       - 为对象添加属性

                class Point {
                    constructor(x, y) {
                        Object.assign(this, {x, y});
                    }
                }
            
       - 为对象添加方法

                Object.assign(SomeClass.prototype, {
                someMethod(arg1, arg2) {
                    ···
                },
                anotherMethod() {
                    ···
                }
                });

                // 等同于下面的写法
                SomeClass.prototype.someMethod = function (arg1, arg2) {
                ···
                };
                SomeClass.prototype.anotherMethod = function () {
                ···
                };

         - 克隆对象

                function(obj){
                    Object.assign({},obj)
                }
                这样只能克隆该对象自身的属性，要想保持继承链，可用以下代码

                function clone(origin){

                    let originProto = Object.getPrototypeOf(origin) //获取origin的原型对象
                    Object.assign(Object.create(originProto),origin) //Object.create(originProto)生成originProto的实例对象，则就继承了origin原型上的对象
                } 

          - 合并多个对象
            
                let merge =(target,...source)=>{
                    Object.assign(target,...source)
                }

          - 为属性指定默认值

                const DEFAULTS = {
                logLevel: 0,
                outputFormat: 'html'
                };

                function processContent(options) {
                options = Object.assign({}, DEFAULTS, options);
                console.log(options);
                // ...
                }

                上面代码中，DEFAULTS对象是默认值，options对象是用户提供的参数。Object.assign方法将DEFAULTS和options合并成一个新对象，如果两者有同名属性，则options的属性值会覆盖DEFAULTS的属性值。


**3.Object.getOwnPropertyDescriptors()**

  - **ES5 的Object.getOwnPropertyDescriptor()方法会返回某个对象属性的描述对象（descriptor）。**
  
  - **ES2017 引入了Object.getOwnPropertyDescriptors()方法，返回指定对象所有自身属性（非继承属性）的描述对象。**

		const obj = {
		  foo: 123,
		  get bar() { return 'abc' }
		};
		
		Object.getOwnPropertyDescriptors(obj)
		// { foo:
		//    { value: 123,
		//      writable: true,
		//      enumerable: true,
		//      configurable: true },
		//   bar:
		//    { get: [Function: get bar],
		//      set: undefined,
		//      enumerable: true,
		//      configurable: true } }

  - 上面代码中，Object.getOwnPropertyDescriptors()方法返回一个对象，所有原对象的属性名都是该对象的属性名，对应的属性值就是该属性的描述对象。

  - **该方法的实现非常容易。**

		function getOwnPropertyDescriptors(obj) {
		  const result = {};
		  for (let key of Reflect.ownKeys(obj)) {
		    result[key] = Object.getOwnPropertyDescriptor(obj, key);
		  }
		  return result;
		}

  - 该方法的引入目的，主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题。 

		const source = {
		  set foo(value) {
		    console.log(value);
		  }
		};
		
		const target1 = {};
		Object.assign(target1, source);
		
		Object.getOwnPropertyDescriptor(target1, 'foo')
		// { value: undefined,
		//   writable: true,
		//   enumerable: true,
		//   configurable: true }

 - 上面代码中，source对象的foo属性的值是一个赋值函数，Object.assign方法将这个属性拷贝给target1对象，结果该属性的值变成了undefined。这是因为**Object.assign方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或取值方法。**

 - 这时，**Object.getOwnPropertyDescriptors()方法配合Object.defineProperties()方法，就可以实现正确拷贝。**

		const source = {
		  set foo(value) {
		    console.log(value);
		  }
		};
		
		const target2 = {};
		Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
		Object.getOwnPropertyDescriptor(target2, 'foo')
		// { get: undefined,
		//   set: [Function: set foo],
		//   enumerable: true,
		//   configurable: true }

  - 上面代码中，**两个对象合并的逻辑可以写成一个函数。**

		const shallowMerge = (target, source) => Object.defineProperties(
		  target,
		  Object.getOwnPropertyDescriptors(source)
		);

   - **Object.getOwnPropertyDescriptors()方法的另一个用处，是配合Object.create()方法，将对象属性克隆到一个新对象。这属于浅拷贝。**

		const clone = Object.create(Object.getPrototypeOf(obj),
		  Object.getOwnPropertyDescriptors(obj));
		
		// 或者
		
		const shallowClone = (obj) => Object.create(
		  Object.getPrototypeOf(obj),
		  Object.getOwnPropertyDescriptors(obj)
		);

     - 上面代码会克隆对象obj。

   - **另外，Object.getOwnPropertyDescriptors()方法可以实现一个对象继承另一个对象。**以前，继承另一个对象，常常写成下面这样。

		const obj = {
		  __proto__: prot,
		  foo: 123,
		};

   - ES6 规定__proto__只有浏览器要部署，其他环境不用部署。如果去除__proto__，上面代码就要改成下面这样。

		const obj = Object.create(prot);
		obj.foo = 123;
		
		// 或者
		
		const obj = Object.assign(
		  Object.create(prot),
		  {
		    foo: 123,
		  }
		);

    - **有了Object.getOwnPropertyDescriptors()，我们就有了另一种写法。**

		const obj = Object.create(
		  prot,
		  Object.getOwnPropertyDescriptors({
		    foo: 123,
		  })
		);


**4.Object.setPrototypeOf()**

   - **Object.setPrototypeOf方法的作用与__proto__相同，用来设置一个对象的原型对象（prototype），返回参数对象本身。**它是 ES6 正式推荐的设置原型对象的方法。

		// 格式
		Object.setPrototypeOf(object, prototype)
		
		// 用法
		const o = Object.setPrototypeOf({}, null);

  - 该方法等同于下面的函数。

		function setPrototypeOf(obj, proto) {
		  obj.__proto__ = proto;
		  return obj;
		}

  - 下面是一个例子。
		
		let proto = {};
		let obj = { x: 10 };
		Object.setPrototypeOf(obj, proto);
		
		proto.y = 20;
		proto.z = 40;
		
		obj.x // 10
		obj.y // 20
		obj.z // 40

  - 上面代码将proto对象设为obj对象的原型，所以从obj对象可以读取proto对象的属性。

  - **如果第一个参数不是对象，会自动转为对象。但是由于返回的还是第一个参数，所以这个操作不会产生任何效果。**

		Object.setPrototypeOf(1, {}) === 1 // true
		Object.setPrototypeOf('foo', {}) === 'foo' // true
		Object.setPrototypeOf(true, {}) === true // true

   - **由于undefined和null无法转为对象，所以如果第一个参数是undefined或null，就会报错。**

		Object.setPrototypeOf(undefined, {})
		// TypeError: Object.setPrototypeOf called on null or undefined
		
		Object.setPrototypeOf(null, {})
		// TypeError: Object.setPrototypeOf called on null or undefined

**5.Object.getPrototypeOf()**

  - 该方法与Object.setPrototypeOf方法配套，用于读取一个对象的原型对象。

     Object.getPrototypeOf(obj);

  - 下面是一个例子。

	function Rectangle() {
	  // ...
	}
	
	const rec = new Rectangle();
	
	Object.getPrototypeOf(rec) === Rectangle.prototype
	// true
	
	Object.setPrototypeOf(rec, Object.prototype);
	Object.getPrototypeOf(rec) === Rectangle.prototype
	// false

  - **如果参数不是对象，会被自动转为对象。**

	// 等同于 Object.getPrototypeOf(Number(1))
	Object.getPrototypeOf(1)
	// Number {[[PrimitiveValue]]: 0}
	
	// 等同于 Object.getPrototypeOf(String('foo'))
	Object.getPrototypeOf('foo')
	// String {length: 0, [[PrimitiveValue]]: ""}
	
	// 等同于 Object.getPrototypeOf(Boolean(true))
	Object.getPrototypeOf(true)
	// Boolean {[[PrimitiveValue]]: false}
	
	Object.getPrototypeOf(1) === Number.prototype // true
	Object.getPrototypeOf('foo') === String.prototype // true
	Object.getPrototypeOf(true) === Boolean.prototype // true

  - **如果参数是undefined或null，它们无法转为对象，所以会报错。**
	
	Object.getPrototypeOf(null)
	// TypeError: Cannot convert undefined or null to object
	
	Object.getPrototypeOf(undefined)
	// TypeError: Cannot convert undefined or null to object

**6.Object.keys(),Object.values(),Object.entries()**

 (1)Object.keys()

    - **返回一个数组**，成员是参数对象自身的（**不含继承的**）所有**可遍历（enumerable）属性**的键名

 (2)Object.values()

    - **返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值**
       
    - **Object.values会过滤属性名为 Symbol 值的属性**

			Object.values({ [Symbol()]: 123, foo: 'abc' });
			// ['abc']
       
    - **如果Object.values方法的参数是一个字符串，会返回各个字符组成的一个数组**
    
			Object.values('foo')
			// ['f', 'o', 'o']

         - 上面代码中，字符串会先转成一个类似数组的对象。字符串的每个字符，就是该对象的一个属性。因此，Object.values返回每个属性的键值，就是各个字符组成的一个数组。

    - **如果参数不是对象，Object.values会先将其转为对象。由于数值和布尔值的包装对象，都不会为实例添加非继承的属性。所以，Object.values会返回空数组。**

			Object.values(42) // []
			Object.values(true) // []

 (2)Object.entries()

  - **Object.entries()方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。**

			const obj = { foo: 'bar', baz: 42 };
			Object.entries(obj)
			// [ ["foo", "bar"], ["baz", 42] ]

  - 除了返回值不一样，该方法的行为与Object.values基本一致。

  - **如果原对象的属性名是一个 Symbol 值，该属性会被忽略。**

			Object.entries({ [Symbol()]: 123, foo: 'abc' });
			// [ [ 'foo', 'abc' ] ]

  - **Object.entries的基本用途是遍历对象的属性。**

		let obj = { one: 1, two: 2 };
		for (let [k, v] of Object.entries(obj)) {
		  console.log(
		    `${JSON.stringify(k)}: ${JSON.stringify(v)}`
		  );
		}
		// "one": 1
		// "two": 2

  - **Object.entries方法的另一个用处是，将对象转为真正的Map结构。**

		const obj = { foo: 'bar', baz: 42 };
		const map = new Map(Object.entries(obj));
		map // Map { foo: "bar", baz: 42 }

  - 自己实现Object.entries方法，非常简单。
		
		// Generator函数的版本
		function* entries(obj) {
		  for (let key of Object.keys(obj)) {
		    yield [key, obj[key]];
		  }
		}
		
		// 非Generator函数的版本
		function entries(obj) {
		  let arr = [];
		  for (let key of Object.keys(obj)) {
		    arr.push([key, obj[key]]);
		  }
		  return arr;
		}

** 7.Object.formEntries() **

-  ** Object.fromEntries()方法是Object.entries()的逆操作，用于将一个键值对数组转为对象 **
	
	Object.fromEntries([
	  ['foo', 'bar'],
	  ['baz', 42]
	])
	// { foo: "bar", baz: 42 }

- **该方法的主要目的，是将键值对的数据结构还原为对象，因此特别适合将 Map 结构转为对象。**

		// 例一
		const entries = new Map([
		  ['foo', 'bar'],
		  ['baz', 42]
		]);
		
		Object.fromEntries(entries)
		// { foo: "bar", baz: 42 }
		
		// 例二
		const map = new Map().set('foo', true).set('bar', false);
		Object.fromEntries(map)
		// { foo: true, bar: false }

- 该方法的一个用处是配合URLSearchParams对象，将查询字符串转为对象。

		Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'))
		// { foo: "bar", baz: "qux" }


** 8.Object.hasOwn() **

   - JavaScript 对象的属性分成两种：自身的属性和继承的属性。**对象实例有一个hasOwnProperty()方法，可以判断某个属性是否为原生属性**。
   
   - ES2022 在Object对象上面新增了一个静态方法**Object.hasOwn()，也可以判断是否为自身的属性。**

   - **Object.hasOwn()可以接受两个参数，第一个是所要判断的对象，第二个是属性名。**

		const foo = Object.create({ a: 123 });
		foo.b = 456;
		
		Object.hasOwn(foo, 'a') // false
		Object.hasOwn(foo, 'b') // true

  - **Object.hasOwn()的一个好处是，对于不继承Object.prototype的对象不会报错，而hasOwnProperty()是会报错的。**

		const obj = Object.create(null);
		
		obj.hasOwnProperty('foo') // 报错
		Object.hasOwn(obj, 'foo') // false

#### 八、运算符的扩展 ####

** 1.链判断运算符(?.) **

  - 链判断运算符?.有三种写法。

   (1)obj?.prop // **对象属性是否存在**

   (2)obj?.[expr] // 同上

   (3)func?.(...args) // **函数或对象方法是否存在**


** 2.Null判断运算符(**) **

   - ES2020 引入了一个新的 Null 判断运算符??。它的行为类似||，但是**只有运算符左侧的值为null或undefined时，才会返回右侧的值。**

     const headerText = response.settings.headerText ?? 'Hello, world!';

   - ??本质上是逻辑运算，它与其他两个逻辑运算符&&和||有一个优先级问题，它们之间的优先级到底孰高孰低。优先级的不同，往往会导致逻辑运算的结果不同。

   - **现在的规则是，如果多个逻辑运算符一起使用，必须用括号表明优先级，否则会报错。**

		// 报错
		lhs && middle ?? rhs
		lhs ?? middle && rhs
		lhs || middle ?? rhs
		lhs ?? middle || rhs

   - 上面四个表达式都会报错，必须加入表明优先级的括号。

		(lhs && middle) ?? rhs;
		lhs && (middle ?? rhs);
		
		(lhs ?? middle) && rhs;
		lhs ?? (middle && rhs);
		
		(lhs || middle) ?? rhs;
		lhs || (middle ?? rhs);
		
		(lhs ?? middle) || rhs;
		lhs ?? (middle || rhs);


#### 九、Set数据结构 ####

**1.Set**

  - ES6 提供了新的数据结构 Set。它**类似于数组**，但是**成员的值都是唯一的，没有重复的值。**

  - Set本身是一个**构造函数**，用来生成 Set 数据结构。

  - Set()函数可以**接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数**，用来初始化。


		// 例一
		const set = new Set([1, 2, 3, 4, 4]);
		[...set]
		// [1, 2, 3, 4]
		
		// 例二
		const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
		items.size // 5
		
		// 例三
		const set = new Set(document.querySelectorAll('div'));
		set.size // 56
		
		// 类似于
		const set = new Set();
		document
		 .querySelectorAll('div')
		 .forEach(div => set.add(div));
		set.size // 56

    - **Set可以用来数组去重，也可以用于去除字符串里面的重复字符。**

       [...new Set(array)]
       [...new Set('ababbc')].join('') // "abc"

    - **向 Set 加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。**
    
    - **Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符（===），主要的区别是向 Set 加入值时认为NaN等于自身，而精确相等运算符认为NaN不等于自身。**

		let set = new Set();
		let a = NaN;
		let b = NaN;
		set.add(a);
		set.add(b);
		set // Set {NaN}

     - **Array.from()方法可以将 Set 结构转为数组**

		const items = new Set([1, 2, 3, 4, 5]);
		const array = Array.from(items);

     - **这就提供了去除数组重复成员的另一种方法。**
		
		function dedupe(array) {
		  return Array.from(new Set(array));
		}
		
		dedupe([1, 1, 2, 3]) // [1, 2, 3]

**2.Set实例的属性和方法**

（1）Set 结构的实例有以下属性。

     - **Set.prototype.constructor：构造函数，默认就是Set函数。**

     - **Set.prototype.size：返回Set实例的成员总数。**

（2）Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。

    - 操作方法：

      - **Set.prototype.add(value)：添加某个值，返回 Set 结构本身。**

      - **Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。**

      - **Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。**

      - **Set.prototype.clear()：清除所有成员，没有返回值。**

			s.add(1).add(2).add(2);
			// 注意2被加入了两次
			
			s.size // 2
			
			s.has(1) // true
			s.has(2) // true
			s.has(3) // false
			
			s.delete(2) // true
			s.has(2) // false

     - 遍历方法：
 
        - **Set.prototype.keys()：返回键名的遍历器**
			
        - **Set.prototype.values()：返回键值的遍历器**
			
        - **Set.prototype.entries()：返回键值对的遍历器**
			
        - **Set.prototype.forEach()：使用回调函数遍历每个成员**

     - **需要特别指出的是，Set的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用。**

     

     - **keys()，values()，entries()**

       - **keys方法、values方法、entries方法返回的都是遍历器对象（详见《Iterator 对象》一章）。由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。**

			let set = new Set(['red', 'green', 'blue']);
			
			for (let item of set.keys()) {
			  console.log(item);
			}
			// red
			// green
			// blue
			
			for (let item of set.values()) {
			  console.log(item);
			}
			// red
			// green
			// blue
			
			for (let item of set.entries()) {
			  console.log(item);
			}
			// ["red", "red"]
			// ["green", "green"]
			// ["blue", "blue"]

        - **Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。**

		     Set.prototype[Symbol.iterator] === Set.prototype.values //true

        - **这意味着，可以省略values方法，直接用for...of循环遍历 Set。**

				let set = new Set(['red', 'green', 'blue']);
				
				for (let x of set) {
				  console.log(x);
				}
				// red
				// green
				// blue

     - **forEach()**

       - Set 结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，没有返回值。

			let set = new Set([1, 4, 9]);
			set.forEach((value, key) => console.log(key + ' : ' + value))
			// 1 : 1
			// 4 : 4
			// 9 : 9

        - **forEach方法还可以有第二个参数，表示绑定处理函数内部的this对象。**

     - **遍历的应用**

        - **扩展运算符（...）内部使用for...of循环**，所以也可以用于 Set 结构。

			let set = new Set(['red', 'green', 'blue']);
			let arr = [...set];
			// ['red', 'green', 'blue']

        - **扩展运算符和 Set 结构相结合，就可以去除数组的重复成员。**

			let arr = [3, 5, 2, 2, 5, 5];
			let unique = [...new Set(arr)];
			// [3, 5, 2]
			
        - **而且，数组的map和filter方法也可以间接用于 Set 了。**
			
			let set = new Set([1, 2, 3]);
			set = new Set([...set].map(x => x * 2));
			// 返回Set结构：{2, 4, 6}
			
			let set = new Set([1, 2, 3, 4, 5]);
			set = new Set([...set].filter(x => (x % 2) == 0));
			// 返回Set结构：{2, 4}

         - **因此使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。**

			let a = new Set([1, 2, 3]);
			let b = new Set([4, 3, 2]);
			
			// 并集
			let union = new Set([...a, ...b]);
			// Set {1, 2, 3, 4}
			
			// 交集
			let intersect = new Set([...a].filter(x => b.has(x)));
			// set {2, 3}
			
			// （a 相对于 b 的）差集
			let difference = new Set([...a].filter(x => !b.has(x)));
			// Set {1}

         - **如果想在遍历操作中，同步改变原来的 Set 结构，目前没有直接的方法，但有两种变通方法。一种是利用原 Set 结构映射出一个新的结构，然后赋值给原来的 Set 结构；另一种是利用Array.from方法。**
			
			// 方法一
			let set = new Set([1, 2, 3]);
			set = new Set([...set].map(val => val * 2));
			// set的值是2, 4, 6
			
			// 方法二
			let set = new Set([1, 2, 3]);
			set = new Set(Array.from(set, val => val * 2));
			// set的值是2, 4, 6

** 3.weakSet **
  
（1）含义

   - WeakSet 结构与 Set 类似，也是**不重复的值的集合**。但是，它与 Set 有两个区别。

   - 首先，**WeakSet 的成员只能是对象和 Symbol 值，而不能是其他类型的值。**

		const ws = new WeakSet();
		ws.add(1) // 报错
		ws.add(Symbol()) // 不报错

   - **其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。**

   - **这是因为垃圾回收机制根据对象的可达性（reachability）来判断回收，如果对象还能被访问到，垃圾回收机制就不会释放这块内存。结束使用该值之后，有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄漏。WeakSet 里面的引用，都不计入垃圾回收机制，所以就不存在这个问题。因此，WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。**

   - **由于上面这个特点，WeakSet 的成员是不适合引用的，因为它会随时消失。另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakSet 不可遍历**

（2）语法

   - WeakSet 是一个**构造函数**，可以使用new命令，创建 WeakSet 数据结构。

		const ws = new WeakSet();

   - 作为构造函数，**WeakSet 可以接受一个数组或类似数组的对象作为参数。（实际上，任何具有 Iterable 接口的对象，都可以作为 WeakSet 的参数。）**该数组的所有成员，都会自动成为 WeakSet 实例对象的成员。

		const a = [[1, 2], [3, 4]];
		const ws = new WeakSet(a);
		// WeakSet {[1, 2], [3, 4]}

   - 上面代码中，a是一个数组，它有两个成员，也都是数组。将a作为 WeakSet 构造函数的参数，a的成员会自动成为 WeakSet 的成员。

   - **注意，是a数组的成员成为 WeakSet 的成员，而不是a数组本身。这意味着，数组的成员只能是对象。**

		const b = [3, 4];
		const ws = new WeakSet(b);
		// Uncaught TypeError: Invalid value used in weak set(…)

    - 上面代码中，数组b的成员不是对象，加入 WeakSet 就会报错。

（3）方法

    - **WeakSet.prototype.add(value)**：向 WeakSet 实例添加一个新成员，返回 WeakSet 结构本身。

    - **WeakSet.prototype.delete(value)**：清除 WeakSet 实例的指定成员，清除成功返回true，如果在 WeakSet 中找不到该成员或该成员不是对象，返回false。

    - **WeakSet.prototype.has(value)**：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。

    - **WeakSet 没有size属性，没有办法遍历它的成员。**
		
		ws.size // undefined
		ws.forEach // undefined
		
		ws.forEach(function(item){ console.log('WeakSet has ' + item)})
		// TypeError: undefined is not a function

    - **WeakSet 不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。**


#### 十、Map 数据结构 ####

**1.含义和基本用法**

  - 为了解决JavaScript对象的键名只能是字符串的问题，ES6 提供了 **Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。**

  - 也就是说，**Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。**如果你需要“键值对”的数据结构，Map 比 Object 更合适。

		const m = new Map();
		const o = {p: 'Hello World'};
		
		m.set(o, 'content')
		m.get(o) // "content"
		
		m.has(o) // true
		m.delete(o) // true
		m.has(o) // false

   - **Map构造函数可以接受一个数组作为参数或者任何具有Iterator 接口、且每个成员都是一个双元素的数组的数据结构（详见《Iterator》一章）都可以当作Map构造函数的参数。这就是说，Set和Map都可以用来生成新的 Map。**
		
		const set = new Set([
		  ['foo', 1],
		  ['bar', 2]
		]);
		const m1 = new Map(set);
		m1.get('foo') // 1
		
		const m2 = new Map([['baz', 3]]);
		const m3 = new Map(m2);
		m3.get('baz') // 3

   - **如果对同一个键多次赋值，后面的值将覆盖前面的值。**

		const map = new Map();
		
		map
		.set(1, 'aaa')
		.set(1, 'bbb');
		
		map.get(1) // "bbb"

    - **如果读取一个未知的键，则返回undefined。**

		new Map().get('asfddfsasadf')
		// undefined

    - **注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。**

		const map = new Map();
		
		map.set(['a'], 555);
		map.get(['a']) // undefined

    - 上面代码的set和get方法，表面是针对同一个键，但实际上这是两个不同的数组实例，内存地址是不一样的，因此get方法无法读取该键，返回undefined。

    - 由上可知，**Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。**这就解决了同名属性碰撞（clash）的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名。

    - **如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，比如0和-0就是一个键，布尔值true和字符串true则是两个不同的键。另外，undefined和null也是两个不同的键。虽然NaN不严格相等于自身，但 Map 将其视为同一个键。**

		let map = new Map();
		
		map.set(-0, 123);
		map.get(+0) // 123
		
		map.set(true, 1);
		map.set('true', 2);
		map.get(true) // 1
		
		map.set(undefined, 3);
		map.set(null, 4);
		map.get(undefined) // 3
		
		map.set(NaN, 123);
		map.get(NaN) // 123

   - **Map里面NaN等于自身**

**2.实例的属性和操作方法**

 （1）** size属性 **

   - **size属性返回 Map 结构的成员总数。**

		const map = new Map();
		map.set('foo', true);
		map.set('bar', false);
		
		map.size // 2 

 （2）** Map.prototype.set(key, value) **

   - set方法设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。

		const m = new Map();
		
		m.set('edition', 6)        // 键是字符串
		m.set(262, 'standard')     // 键是数值
		m.set(undefined, 'nah')    // 键是 undefined

  - **set方法返回的是当前的Map对象，因此可以采用链式写法。**

		let map = new Map()
		  .set(1, 'a')
		  .set(2, 'b')
		  .set(3, 'c');

 （3）** Map.prototype.get(key) **

   - **get方法读取key对应的键值，如果找不到key，返回undefined。**

		const m = new Map();
		
		const hello = function() {console.log('hello');};
		m.set(hello, 'Hello ES6!') // 键是函数
		
		m.get(hello)  // Hello ES6!

 （4）** Map.prototype.has(key) **

   - **has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。**

		const m = new Map();
		
		m.set('edition', 6);
		m.set(262, 'standard');
		m.set(undefined, 'nah');
		
		m.has('edition')     // true
		m.has('years')       // false
		m.has(262)           // true
		m.has(undefined)     // true


 （5）** Map.prototype.delete(key) **
   
   - **delete()方法删除某个键，返回true。如果删除失败，返回false。**
		
		const m = new Map();
		m.set(undefined, 'nah');
		m.has(undefined)     // true
		
		m.delete(undefined)
		m.has(undefined)       // false


 （6）** Map.prototype.clear() **

   - **clear()方法清除所有成员，没有返回值。**

		let map = new Map();
		map.set('foo', true);
		map.set('bar', false);
		
		map.size // 2
		map.clear()
		map.size // 0

**3.遍历方法**

  - Map.prototype.keys()：返回键名的遍历器。
  
  - Map.prototype.values()：返回键值的遍历器。

  - Map.prototype.entries()：返回所有成员的遍历器。

  - Map.prototype.forEach()：遍历 Map 的所有成员。

  - **需要特别注意的是，Map 的遍历顺序就是插入顺序。**

		const map = new Map([
		  ['F', 'no'],
		  ['T',  'yes'],
		]);
		
		for (let key of map.keys()) {
		  console.log(key);
		}
		// "F"
		// "T"
		
		for (let value of map.values()) {
		  console.log(value);
		}
		// "no"
		// "yes"
		
		for (let item of map.entries()) {
		  console.log(item[0], item[1]);
		}
		// "F" "no"
		// "T" "yes"
		
		// 或者
		for (let [key, value] of map.entries()) {
		  console.log(key, value);
		}
		// "F" "no"
		// "T" "yes"
		
		// 等同于使用map.entries()
		for (let [key, value] of map) {
		  console.log(key, value);
		}
		// "F" "no"
		// "T" "yes"

   - 上面代码最后的那个例子，表示** Map 结构的默认遍历器接口（Symbol.iterator属性），就是entries方法。**

		map[Symbol.iterator] === map.entries
		// true

   - **Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）。**
		
		const map = new Map([
		  [1, 'one'],
		  [2, 'two'],
		  [3, 'three'],
		]);
		
		[...map.keys()]
		// [1, 2, 3]
		
		[...map.values()]
		// ['one', 'two', 'three']
		
		[...map.entries()]
		// [[1,'one'], [2, 'two'], [3, 'three']]
		
		[...map]
		// [[1,'one'], [2, 'two'], [3, 'three']]

  - 结合数组的map方法、filter方法，可以实现 Map 的遍历和过滤（**Map 本身没有map和filter方法**）。

		const map0 = new Map()
		  .set(1, 'a')
		  .set(2, 'b')
		  .set(3, 'c');
		
		const map1 = new Map(
		  [...map0].filter(([k, v]) => k < 3)
		);
		// 产生 Map 结构 {1 => 'a', 2 => 'b'}
		
		const map2 = new Map(
		  [...map0].map(([k, v]) => [k * 2, '_' + v])
		    );
		// 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}

  - **Map 还有一个forEach方法，与数组的forEach方法类似，也可以实现遍历。**

		map.forEach(function(value, key, map) {
		  console.log("Key: %s, Value: %s", key, value);
		});

  - **forEach方法还可以接受第二个参数，用来绑定this。**
		
		const reporter = {
		  report: function(key, value) {
		    console.log("Key: %s, Value: %s", key, value);
		  }
		};
		
		map.forEach(function(value, key, map) {
		  this.report(key, value);
		}, reporter);

  - 上面代码中，forEach方法的回调函数的this，就指向reporter。

**4.与其他数据结构的互相转换**

 （1）**Map转为数组**

   - 前面已经提过，Map 转为数组最方便的方法，就是使用扩展运算符（...）。
		
		const myMap = new Map()
		  .set(true, 7)
		  .set({foo: 3}, ['abc']);
		[...myMap]
		// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]

 （2）**数组 转为 Map**

   - 将数组传入 Map 构造函数，就可以转为 Map。

		new Map([
		  [true, 7],
		  [{foo: 3}, ['abc']]
		])
		// Map {
		//   true => 7,
		//   Object {foo: 3} => ['abc']
		// }

 （3）**Map 转为对象**

   - 如果所有 Map 的键都是字符串，它可以无损地转为对象。

		function strMapToObj(strMap) {
		  let obj = Object.create(null);
		  for (let [k,v] of strMap) {
		    obj[k] = v;
		  }
		  return obj;
		}
		
		const myMap = new Map()
		  .set('yes', true)
		  .set('no', false);
		strMapToObj(myMap)
		// { yes: true, no: false }

   - 如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名。

 （4）**对象转为 Map**

   - 对象转为 Map 可以通过Object.entries()。

		let obj = {"a":1, "b":2};
		let map = new Map(Object.entries(obj));

   - 此外，也可以自己实现一个转换函数。

		function objToStrMap(obj) {
		  let strMap = new Map();
		  for (let k of Object.keys(obj)) {
		    strMap.set(k, obj[k]);
		  }
		  return strMap;
		}
		
		objToStrMap({yes: true, no: false})
		// Map {"yes" => true, "no" => false}

（5）**Map 转为 JSON**

  - Map 转为 JSON 要区分两种情况。一种情况是，**Map 的键名都是字符串，这时可以选择转为对象 JSON。**

		function strMapToJson(strMap) {
		  return JSON.stringify(strMapToObj(strMap));
		}
		
		let myMap = new Map().set('yes', true).set('no', false);
		strMapToJson(myMap)
		// '{"yes":true,"no":false}'

  - 另一种情况是，**Map 的键名有非字符串，这时可以选择转为数组 JSON。**

		function mapToArrayJson(map) {
		  return JSON.stringify([...map]);
		}
		
		let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
		mapToArrayJson(myMap)
		// '[[true,7],[{"foo":3},["abc"]]]'

（6）**JSON 转为 Map**

  - JSON 转为 Map，正常情况下，所有键名都是字符串。

		function jsonToStrMap(jsonStr) {
		  return objToStrMap(JSON.parse(jsonStr));
		}
		
		jsonToStrMap('{"yes": true, "no": false}')
		// Map {'yes' => true, 'no' => false}

  - 但是，有一种特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为 Map。这往往是 Map 转为数组 JSON 的逆操作。

		function jsonToMap(jsonStr) {
		  return new Map(JSON.parse(jsonStr));
		}
		
		jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
		// Map {true => 7, Object {foo: 3} => ['abc']}

**5.WeakMap**

（1）**含义**

  - WeakMap结构与Map结构类似，也是用于**生成键值对的集合**

		// WeakMap 可以使用 set 方法添加成员
		const wm1 = new WeakMap();
		const key = {foo: 1};
		wm1.set(key, 2);
		wm1.get(key) // 2
		
		// WeakMap 也可以接受一个数组，
		// 作为构造函数的参数
		const k1 = [1, 2, 3];
		const k2 = [4, 5, 6];
		const wm2 = new WeakMap([[k1, 'foo'], [k2, 'bar']]);
		wm2.get(k2) // "bar"
 
  - WeakMap与Map的区别有两点：

    - **WeakMap只接受对象（null除外）和 Symbol 值作为键名，不接受其他类型的值作为键名**

		const map = new WeakMap();
		map.set(1, 2) // 报错
		map.set(null, 2) // 报错
		map.set(Symbol(), 2) // 不报错

    - **WeakMap的键名所指向的对象，不计入垃圾回收机制**

    - **WeakMap的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用**

    - **基本上，如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap**。一个典型应用场景是，在网页的 DOM 元素上添加数据，就可以使用WeakMap结构。当该 DOM 元素被清除，其所对应的WeakMap记录就会自动被移除。

		const wm = new WeakMap();
		
		const element = document.getElementById('example');
		
		wm.set(element, 'some information');
		wm.get(element) // "some information"

   - 上面的 DOM 节点对象除了 WeakMap 的弱引用外，其他位置对该对象的引用一旦消除，该对象占用的内存就会被垃圾回收机制释放。WeakMap 保存的这个键值对，也会自动消失。

   - ** 总之，WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏。 **

   - **注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。**

		const wm = new WeakMap();
		let key = {};
		let obj = {foo: 1};
		
		wm.set(key, obj);
		obj = null;
		wm.get(key)
		// Object {foo: 1}

   - 上面代码中，键值obj是正常引用。所以，即使在 WeakMap 外部消除了obj的引用，WeakMap 内部的引用依然存在。

（2）**WeakMap语法**

      - ** 没有遍历操作（即没有keys()、values()和entries()方法），也没有size属性 **。因为没有办法列出所有键名，某个键名是否存在完全不可预测，跟垃圾回收机制是否运行相关。这一刻可以取到键名，下一刻垃圾回收机制突然运行了，这个键名就没了，为了防止出现不确定性，就统一规定不能取到键名。
      
      - **无法清空，即不支持clear方法。因此，WeakMap只有四个方法可用：get()、set()、has()、delete()。**

		const wm = new WeakMap();
		
		// size、forEach、clear 方法都不存在
		wm.size // undefined
		wm.forEach // undefined
		wm.clear // undefined


（3）**WeakMap的用途**

  - 前文说过，WeakMap 应用的典型场合就是**DOM节点作为键名**。下面是一个例子。

		let myWeakmap = new WeakMap();
		
		myWeakmap.set(
		  document.getElementById('logo'),
		  {timesClicked: 0})
		;
		
		document.getElementById('logo').addEventListener('click', function() {
		  let logoData = myWeakmap.get(document.getElementById('logo'));
		  logoData.timesClicked++;
		}, false);

  - 上面代码中，document.getElementById('logo')是一个 DOM 节点，每当发生click事件，就更新一下状态。我们将这个状态作为键值放在 WeakMap 里，对应的键名就是这个节点对象。一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。

  - **WeakMap 的另一个用处是部署私有属性。**

		const _counter = new WeakMap();
		const _action = new WeakMap();
		
		class Countdown {
		  constructor(counter, action) {
		    _counter.set(this, counter);
		    _action.set(this, action);
		  }
		  dec() {
		    let counter = _counter.get(this);
		    if (counter < 1) return;
		    counter--;
		    _counter.set(this, counter);
		    if (counter === 0) {
		      _action.get(this)();
		    }
		  }
		}
		
		const c = new Countdown(2, () => console.log('DONE'));
		
		c.dec()
		c.dec()
		// DONE

  - 上面代码中，Countdown类的两个内部属性_counter和_action，是实例的弱引用，所以如果删除实例，它们也就随之消失，不会造成内存泄漏。

**6.WeakRef** 

  - WeakSet 和 WeakMap 是**基于弱引用的数据结构**，ES2021 更进一步，提供了 **WeakRef 对象，用于直接创建对象的弱引用**。

		let target = {};
		let wr = new WeakRef(target);

   - 上面示例中，target是原始对象，构造函数WeakRef()创建了一个基于target的新对象wr。这里，wr就是一个 WeakRef 的实例，属于对target的弱引用，垃圾回收机制不会计入这个引用，也就是说，wr的引用不会妨碍原始对象target被垃圾回收机制清除。

   - **WeakRef 实例对象有一个deref()方法，如果原始对象存在，该方法返回原始对象；如果原始对象已经被垃圾回收机制清除，该方法返回undefined。**

		let target = {};
		let wr = new WeakRef(target);
		
		let obj = wr.deref();
		if (obj) { // target 未被垃圾回收机制清除
		  // ...
		}

   - 上面示例中，deref()方法可以判断原始对象是否已被清除。

   - **弱引用对象的一大用处，就是作为缓存，未被清除时可以从缓存取值，一旦清除缓存就自动失效**

		function makeWeakCached(f) {
		  const cache = new Map();
		  return key => {
		    const ref = cache.get(key);
		    if (ref) {
		      const cached = ref.deref();
		      if (cached !== undefined) return cached;
		    }
		
		    const fresh = f(key);
		    cache.set(key, new WeakRef(fresh));
		    return fresh;
		  };
		}
		
		const getImageCached = makeWeakCached(getImage);

  - 上面示例中，makeWeakCached()用于建立一个缓存，缓存里面保存对原始文件的弱引用。

- **注意，标准规定，一旦使用WeakRef()创建了原始对象的弱引用，那么在本轮事件循环（event loop），原始对象肯定不会被清除，只会在后面的事件循环才会被清除。**

**7.FinalizationRegistry** 

- ES2021 引入了清理器注册表功能 FinalizationRegistry，**用来指定目标对象被垃圾回收机制清除以后，所要执行的回调函数。**

- 首先，**新建一个注册表实例。**

	const registry = new FinalizationRegistry(heldValue => {
	  // ....
	});

- 上面代码中，**FinalizationRegistry()是系统提供的构造函数，返回一个清理器注册表实例，里面登记了所要执行的回调函数。回调函数作为FinalizationRegistry()的参数传入，它本身有一个参数heldValue。**

- 然后，**注册表实例的register()方法，用来注册所要观察的目标对象。**

    registry.register(theObject, "some value");

- 上面示例中，**theObject就是所要观察的目标对象，一旦该对象被垃圾回收机制清除，注册表就会在清除完成后，调用早前注册的回调函数，并将some value作为参数（前面的heldValue）传入回调函数。**

- **注意，注册表不对目标对象theObject构成强引用，属于弱引用。因为强引用的话，原始对象就不会被垃圾回收机制清除，这就失去使用注册表的意义了。**

- **回调函数的参数heldValue可以是任意类型的值，字符串、数值、布尔值、对象，甚至可以是undefined。**

- **最后，如果以后还想取消已经注册的回调函数，则要向register()传入第三个参数，作为标记值。这个标记值必须是对象，一般都用原始对象。接着，再使用注册表实例对象的unregister()方法取消注册。**

	registry.register(theObject, "some value", theObject);
	// ...其他操作...-
	registry.unregister(theObject);

- 上面代码中，register()方法的第三个参数就是标记值theObject。取消回调函数时，要使用unregister()方法，并将标记值作为该方法的参数。**这里register()方法对第三个参数的引用，也属于弱引用。如果没有这个参数，则回调函数无法取消。**

- **由于回调函数被调用以后，就不再存在于注册表之中了，所以执行unregister()应该是在回调函数还没被调用之前。**

- 下面使用FinalizationRegistry，对前一节的缓存函数进行增强。

		function makeWeakCached(f) {
		  const cache = new Map();
		  const cleanup = new FinalizationRegistry(key => {
		    const ref = cache.get(key);
		    if (ref && !ref.deref()) cache.delete(key);
		  });
		
		  return key => {
		    const ref = cache.get(key);
		    if (ref) {
		      const cached = ref.deref();
		      if (cached !== undefined) return cached;
		    }
		
		    const fresh = f(key);
		    cache.set(key, new WeakRef(fresh));
		    cleanup.register(fresh, key);
		    return fresh;
		  };
		}
		
		const getImageCached = makeWeakCached(getImage);

- 上面示例与前一节的例子相比，就是增加一个清理器注册表，一旦缓存的原始对象被垃圾回收机制清除，会自动执行一个回调函数。该回调函数会清除缓存里面已经失效的键。

#### 十一、Proxy ####

**1.概述**

  - **Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。**Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

  - **ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。**

	var proxy = new Proxy(target, handler);

  - Proxy 对象的所有用法，都是上面这种形式，不同的只是handler参数的写法。其中，new Proxy()表示生成一个Proxy实例，**target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。**

		var obj = new Proxy({}, {
		  get: function(target, propKey) {
		    return 35;
		  }
		});
		
		obj.time // 35
		obj.name // 35
		obj.title // 35

  - 上面代码，**其实obj就是一个{}，只是使用Proxy构造函数生成一个拦截器实例包装了一下。**

  - **注意，要使得Proxy起作用，必须针对Proxy实例（上例是obj对象）进行操作，而不是针对目标对象（上例是空对象）进行操作。**

  - **如果handler没有设置任何拦截，那就等同于直接通向原对象**

		var target = {};
		var handler = {};
		var obj = new Proxy(target, handler);
		obj.a = 'b';
		target.a // "b"

  - 上面代码中，handler是一个空对象，没有任何拦截效果，访问proxy就等同于访问target。

  - 一个技巧是将 Proxy 对象，设置到object.proxy属性，从而可以在object对象上调用。

		var object = { proxy: new Proxy(target, handler) };

  - **Proxy 实例也可以作为其他对象的原型对象**

		var proxy = new Proxy({}, {
		  get: function(target, propKey) {
		    return 35;
		  }
		});
		
		let obj = Object.create(proxy);
		obj.time // 35

  - 上面代码中，proxy对象是obj对象的原型，obj对象本身并没有time属性，所以根据原型链，会在proxy对象上读取该属性，导致被拦截。
 
  - **同一个拦截器函数，可以设置拦截多个操作。**
		
		var handler = {
		  get: function(target, name) {
		    if (name === 'prototype') {
		      return Object.prototype;
		    }
		    return 'Hello, ' + name;
		  },
		
		  apply: function(target, thisBinding, args) {
		    return args[0];
		  },
		
		  construct: function(target, args) {
		    return {value: args[1]};
		  }
		};
		
		var fproxy = new Proxy(function(x, y) {
		  return x + y;
		}, handler);
		
		fproxy(1, 2) // 1
		new fproxy(1, 2) // {value: 2}
		fproxy.prototype === Object.prototype // true
		fproxy.foo === "Hello, foo" // true
 
- 对于可以设置、但没有设置拦截的操作，则直接落在目标对象上，按照原先的方式产生结果。

** 2.Proxy 实例的方法 **

 （1）**get(target, propKey, receiver)**

      - **get(target, propKey, receiver)：拦截对象属性的读取**，比如proxy.foo和proxy['foo']。

      - **接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选。**

		var person = {
		  name: "张三"
		};
		
		var proxy = new Proxy(person, {
		  get: function(target, propKey) {
		    if (propKey in target) {
		      return target[propKey];
		    } else {
		      throw new ReferenceError("Prop name \"" + propKey + "\" does not exist.");
		    }
		  }
		});
		
		proxy.name // "张三"
		proxy.age // 抛出一个错误

   - 上面代码表示，如果访问目标对象不存在的属性，会抛出一个错误。如果没有这个拦截函数，访问不存在的属性，只会返回undefined。

   - **get方法可以继承**

		let proto = new Proxy({}, {
		  get(target, propertyKey, receiver) {
		    console.log('GET ' + propertyKey);
		    return target[propertyKey];
		  }
		});
		
		let obj = Object.create(proto);
		obj.foo // "GET foo"

    - 上面代码中，拦截操作定义在Prototype对象上面，所以如果读取obj对象继承的属性时，拦截会生效。

  - **如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错。**
		
		const target = Object.defineProperties({}, {
		  foo: {
		    value: 123,
		    writable: false,
		    configurable: false
		  },
		});
		
		const handler = {
		  get(target, propKey) {
		    return 'abc';
		  }
		};
		
		const proxy = new Proxy(target, handler);
		
		proxy.foo
		// TypeError: Invariant check failed

  - 下面是一个get方法的第三个参数的例子，它总是指向原始的读操作所在的那个对象，一般情况下就是 Proxy 实例。

		const proxy = new Proxy({}, {
		  get: function(target, key, receiver) {
		    return receiver;
		  }
		});
		proxy.getReceiver === proxy // true



 （2）**set(target, propKey, value, receiver)**

      - **set(target, propKey, value, receiver)：拦截对象属性的设置**，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。

      - **接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。 **

      - 利用set方法，还可以数据绑定，即每当对象发生变化时，会自动更新 DOM。
      
      - 有时，我们会在对象上面设置内部属性，属性名的第一个字符使用下划线开头，表示这些属性不应该被外部使用。结合get和set方法，就可以做到防止这些内部属性被外部读写。
 
		const handler = {
		  get (target, key) {
		    invariant(key, 'get');
		    return target[key];
		  },
		  set (target, key, value) {
		    invariant(key, 'set');
		    target[key] = value;
		    return true;
		  }
		};
		function invariant (key, action) {
		  if (key[0] === '_') {
		    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
		  }
		}
		const target = {};
		const proxy = new Proxy(target, handler);
		proxy._prop
		// Error: Invalid attempt to get private "_prop" property
		proxy._prop = 'c'
		// Error: Invalid attempt to set private "_prop" property

  - 上面代码中，只要读写的属性名的第一个字符是下划线，一律抛错，从而达到禁止读写内部属性的目的。

  - **注意，如果目标对象自身的某个属性不可写，那么set方法将不起作用**

		const obj = {};
		Object.defineProperty(obj, 'foo', {
		  value: 'bar',
		  writable: false
		});
		
		const handler = {
		  set: function(obj, prop, value, receiver) {
		    obj[prop] = 'baz';
		    return true;
		  }
		};
		
		const proxy = new Proxy(obj, handler);
		proxy.foo = 'baz';
		proxy.foo // "bar"

- **注意，set代理应当返回一个布尔值。严格模式下，set代理如果没有返回true，就会报错。**

		'use strict';
		const handler = {
		  set: function(obj, prop, value, receiver) {
		    obj[prop] = receiver;
		    // 无论有没有下面这一行，都会报错
		    return false;
		  }
		};
		const proxy = new Proxy({}, handler);
		proxy.foo = 'bar';
		// TypeError: 'set' on proxy: trap returned falsish for property 'foo'

 - 上面代码中，严格模式下，set代理返回false或者undefined，都会报错。

（3）**apply(target, ctx, args)**

     - **apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作**，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)

     - apply方法可以接受三个参数，**分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。**

		var twice = {
		  apply (target, ctx, args) {
		    return Reflect.apply(...arguments) * 2;
		  }
		};
		function sum (left, right) {
		  return left + right;
		};
		var proxy = new Proxy(sum, twice);
		proxy(1, 2) // 6
		proxy.call(null, 5, 6) // 22
		proxy.apply(null, [7, 8]) // 30

    - 上面代码中，每当**执行proxy函数（直接调用或call和apply调用），就会被apply方法拦截**

    - **直接调用Reflect.apply方法，也会被拦截**

		Reflect.apply(proxy, null, [9, 10]) // 38

（4）**has(target, propKey)**

     - has()方法用来拦截HasProperty操作，即**判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符。**

     - has()方法可以**接受两个参数，分别是目标对象、需查询的属性名。**

		var handler = {
		  has (target, key) {
		    if (key[0] === '_') {
		      return false;
		    }
		    return key in target;
		  }
		};
		var target = { _prop: 'foo', prop: 'foo' };
		var proxy = new Proxy(target, handler);
		'_prop' in proxy // false

    - **如果原对象不可配置或者禁止扩展，这时has()拦截会报错**

		var obj = { a: 10 };
		Object.preventExtensions(obj);
		
		var p = new Proxy(obj, {
		  has: function(target, prop) {
		    return false;
		  }
		});
		
		'a' in p // TypeError is thrown
 
   - **值得注意的是，has()方法拦截的是HasProperty操作，而不是HasOwnProperty操作，即has()方法不判断一个属性是对象自身的属性，还是继承的属性。**

   - **另外，虽然for...in循环也用到了in运算符，但是has()拦截对for...in循环不生效。**

		let stu1 = {name: '张三', score: 59};
		let stu2 = {name: '李四', score: 99};
		
		let handler = {
		  has(target, prop) {
		    if (prop === 'score' && target[prop] < 60) {
		      console.log(`${target.name} 不及格`);
		      return false;
		    }
		    return prop in target;
		  }
		}
		
		let oproxy1 = new Proxy(stu1, handler);
		let oproxy2 = new Proxy(stu2, handler);
		
		'score' in oproxy1
		// 张三 不及格
		// false
		
		'score' in oproxy2
		// true
		
		for (let a in oproxy1) {
		  console.log(oproxy1[a]);
		}
		// 张三
		// 59
		
		for (let b in oproxy2) {
		  console.log(oproxy2[b]);
		}
		// 李四
		// 99

   - 上面代码中，has()拦截只对in运算符生效，对for...in循环不生效，导致不符合要求的属性没有被for...in循环所排除。

（5）**construct(target, args)**

  - **construct()方法用于拦截new命令**，下面是拦截对象的写法。

		const handler = {
		  construct (target, args, newTarget) {
		    return new target(...args);
		  }
		};
  
  - **construct()方法可以接受三个参数。**

       - target：**目标对象。**
		
       - args：**构造函数的参数数组。**
	 
       - newTarget：**创造实例对象时，new命令作用的构造函数**（下面例子的p）。


		const p = new Proxy(function () {}, {
		  construct: function(target, args) {
		    console.log('called: ' + args.join(', '));
		    return { value: args[0] * 10 };
		  }
		});
		
		(new p(1)).value
		// "called: 1"
		// 10

  - **construct()方法返回的必须是一个对象，否则会报错**

		const p = new Proxy(function() {}, {
		  construct: function(target, argumentsList) {
		    return 1;
		  }
		});
		
		new p() // 报错
		// Uncaught TypeError: 'construct' on proxy: trap returned non-object ('1')

  - 另外，**由于construct()拦截的是构造函数，所以它的目标对象必须是函数，否则就会报错。**

		const p = new Proxy({}, {
		  construct: function(target, argumentsList) {
		    return {};
		  }
		});
		
		new p() // 报错
		// Uncaught TypeError: p is not a constructor

  - 注意，**construct()方法中的this指向的是handler，而不是实例对象。**

		const handler = {
		  construct: function(target, args) {
		    console.log(this === handler);
		    return new target(...args);
		  }
		}
		
		let p = new Proxy(function () {}, handler);
		new p() // true

（6）**deleteProperty(target, propKey)**

  - **deleteProperty方法用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除。**
		
		var handler = {
		  deleteProperty (target, key) {
		    invariant(key, 'delete');
		    delete target[key];
		    return true;
		  }
		};
		function invariant (key, action) {
		  if (key[0] === '_') {
		    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
		  }
		}
		
		var target = { _prop: 'foo' };
		var proxy = new Proxy(target, handler);
		delete proxy._prop
		// Error: Invalid attempt to delete private "_prop" property

  - 上面代码中，deleteProperty方法拦截了delete操作符，删除第一个字符为下划线的属性会报错。

  - **注意，目标对象自身的不可配置（configurable）的属性，不能被deleteProperty方法删除，否则报错。**
  

（6）**defineProperty(target, propKey, propDesc)**

  - **defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。**

		var handler = {
		  defineProperty (target, key, descriptor) {
		    return false;
		  }
		};
		var target = {};
		var proxy = new Proxy(target, handler);
		proxy.foo = 'bar' // 不会生效

  - 上面代码中，defineProperty()方法内部没有任何操作，只返回false，导致添加新属性总是无效。**注意，这里的false只是用来提示操作失败，本身并不能阻止添加新属性。**
  
  - **注意，如果目标对象不可扩展（non-extensible），则defineProperty()不能增加目标对象上不存在的属性，否则会报错。另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），则defineProperty()方法不得改变这两个设置。**

（7）**getOwnPropertyDescriptor(target, propKey)**

  - **getOwnPropertyDescriptor()方法拦截Object.getOwnPropertyDescriptor()，返回一个属性描述对象或者undefined。**

		var handler = {
		  getOwnPropertyDescriptor (target, key) {
		    if (key[0] === '_') {
		      return;
		    }
		    return Object.getOwnPropertyDescriptor(target, key);
		  }
		};
		var target = { _foo: 'bar', baz: 'tar' };
		var proxy = new Proxy(target, handler);
		Object.getOwnPropertyDescriptor(proxy, 'wat')
		// undefined
		Object.getOwnPropertyDescriptor(proxy, '_foo')
		// undefined
		Object.getOwnPropertyDescriptor(proxy, 'baz')
		// { value: 'tar', writable: true, enumerable: true, configurable: true }

  - 上面代码中，handler.getOwnPropertyDescriptor()方法对于第一个字符为下划线的属性名会返回undefined。

（7）**getPrototypeOf(target)**

  - **getPrototypeOf()方法主要用来拦截获取对象原型**。具体来说，拦截下面这些操作。
    
   - Object.prototype.__proto__

   - Object.prototype.isPrototypeOf()

   - Object.getPrototypeOf()

   - Reflect.getPrototypeOf()

   - instanceof

		var proto = {};
		var p = new Proxy({}, {
		  getPrototypeOf(target) {
		    return proto;
		  }
		});
		Object.getPrototypeOf(p) === proto // true

- 上面代码中，getPrototypeOf()方法拦截Object.getPrototypeOf()，返回proto对象。

- **注意，getPrototypeOf()方法的返回值必须是对象或者null，否则报错。另外，如果目标对象不可扩展（non-extensible）， getPrototypeOf()方法必须返回目标对象的原型对象。**


（8）**isExtensible(target)**

  - **isExtensible()方法拦截Object.isExtensible()操作**

		var p = new Proxy({}, {
		  isExtensible: function(target) {
		    console.log("called");
		    return true;
		  }
		});
		
		Object.isExtensible(p)
		// "called"
		// true

    - 上面代码设置了isExtensible()方法，在调用Object.isExtensible时会输出called。

    - **注意，该方法只能返回布尔值，否则返回值会被自动转为布尔值。**

    - **这个方法有一个强限制，它的返回值必须与目标对象的isExtensible属性保持一致，否则就会抛出错误。**

       Object.isExtensible(proxy) === Object.isExtensible(target)
  
    - 下面是一个例子

		var p = new Proxy({}, {
		  isExtensible: function(target) {
		    return false;
		  }
		});
		
		Object.isExtensible(p)
		// Uncaught TypeError: 'isExtensible' on proxy: trap result does not reflect extensibility of proxy target (which is 'true')

（9）**ownKeys(target)**

  - **ownKeys()方法用来拦截对象自身属性的读取操作**。具体来说，拦截以下操作。

	- Object.getOwnPropertyNames()
		
    - Object.getOwnPropertySymbols()
		
    - Object.keys()
		
    - for...in循环

		let target = {
		  a: 1,
		  b: 2,
		  c: 3
		};
		
		let handler = {
		  ownKeys(target) {
		    return ['a'];
		  }
		};
		
		let proxy = new Proxy(target, handler);
		
		Object.keys(proxy)
		// [ 'a' ]

   - **注意，使用Object.keys()方法时，有三类属性会被ownKeys()方法自动过滤，不会返回。**

    - 目标对象上不存在的属性

    - 属性名为 Symbol 值
  
    - 不可遍历（enumerable）的属性

		let target = {
		  a: 1,
		  b: 2,
		  c: 3,
		  [Symbol.for('secret')]: '4',
		};
		
		Object.defineProperty(target, 'key', {
		  enumerable: false,
		  configurable: true,
		  writable: true,
		  value: 'static'
		});
		
		let handler = {
		  ownKeys(target) {
		    return ['a', 'd', Symbol.for('secret'), 'key'];
		  }
		};
		
		let proxy = new Proxy(target, handler);
		
		Object.keys(proxy)
		// ['a']

  - 上面代码中，ownKeys()方法之中，显式返回不存在的属性（d）、Symbol 值（Symbol.for('secret')）、不可遍历的属性（key），结果都被自动过滤掉。

  - **ownKeys()方法还可以拦截Object.getOwnPropertyNames()。**

		var p = new Proxy({}, {
		  ownKeys: function(target) {
		    return ['a', 'b', 'c'];
		  }
		});
		
		Object.getOwnPropertyNames(p)
		// [ 'a', 'b', 'c' ]

  - **for...in循环也受到ownKeys()方法的拦截。**

		const obj = { hello: 'world' };
		const proxy = new Proxy(obj, {
		  ownKeys: function () {
		    return ['a', 'b'];
		  }
		});
		
		for (let key in proxy) {
		  console.log(key); // 没有任何输出
		}

  - 上面代码中，**ownkeys()指定只返回a和b属性，由于obj没有这两个属性，因此for...in循环不会有任何输出。**

  - **ownKeys()方法返回的数组成员，只能是字符串或 Symbol 值。如果有其他类型的值，或者返回的根本不是数组，就会报错。**

		var obj = {};
		
		var p = new Proxy(obj, {
		  ownKeys: function(target) {
		    return [123, true, undefined, null, {}, []];
		  }
		});
		
		Object.getOwnPropertyNames(p)
		// Uncaught TypeError: 123 is not a valid property name

   - 上面代码中，ownKeys()方法虽然返回一个数组，但是每一个数组成员都不是字符串或 Symbol 值，因此就报错了。

  - **如果目标对象自身包含不可配置的属性，则该属性必须被ownKeys()方法返回，否则报错。**

		var obj = {};
		Object.defineProperty(obj, 'a', {
		  configurable: false,
		  enumerable: true,
		  value: 10 }
		);
		
		var p = new Proxy(obj, {
		  ownKeys: function(target) {
		    return ['b'];
		  }
		});
		
		Object.getOwnPropertyNames(p)
		// Uncaught TypeError: 'ownKeys' on proxy: trap result did not include 'a'

  - 上面代码中，obj对象的a属性是不可配置的，这时ownKeys()方法返回的数组之中，必须包含a，否则会报错。

  - **另外，如果目标对象是不可扩展的（non-extensible），这时ownKeys()方法返回的数组之中，必须包含原对象的所有属性，且不能包含多余的属性，否则报错。**

		var obj = {
		  a: 1
		};
		
		Object.preventExtensions(obj);
		
		var p = new Proxy(obj, {
		  ownKeys: function(target) {
		    return ['a', 'b'];
		  }
		});
		
		Object.getOwnPropertyNames(p)
		// Uncaught TypeError: 'ownKeys' on proxy: trap returned extra keys but proxy target is non-extensible

 - 上面代码中，obj对象是不可扩展的，这时ownKeys()方法返回的数组之中，包含了obj对象的多余属性b，所以导致了报错。

（10）**preventExtensions(target)**

  - **preventExtensions()方法拦截Object.preventExtensions()。该方法必须返回一个布尔值，否则会被自动转为布尔值。**

  - **这个方法有一个限制，只有目标对象不可扩展时（即Object.isExtensible(proxy)为false），proxy.preventExtensions才能返回true，否则会报错。**


		var proxy = new Proxy({}, {
		  preventExtensions: function(target) {
		    return true;
		  }
		});
		
		Object.preventExtensions(proxy)
		// Uncaught TypeError: 'preventExtensions' on proxy: trap returned truish but the proxy target is extensible

  - 上面代码中，proxy.preventExtensions()方法返回true，但这时Object.isExtensible(proxy)会返回true，因此报错。

  - **为了防止出现这个问题，通常要在proxy.preventExtensions()方法里面，调用一次Object.preventExtensions()。**

		var proxy = new Proxy({}, {
		  preventExtensions: function(target) {
		    console.log('called');
		    Object.preventExtensions(target);
		    return true;
		  }
		});
		
		Object.preventExtensions(proxy)
		// "called"
		// Proxy {}


（10）**setPrototypeOf(target, proto)**

  - **拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值**

		var handler = {
		  setPrototypeOf (target, proto) {
		    throw new Error('Changing the prototype is forbidden');
		  }
		};
		var proto = {};
		var target = function () {};
		var proxy = new Proxy(target, handler);
		Object.setPrototypeOf(proxy, proto);
		// Error: Changing the prototype is forbidden

 - 上面代码中，只要修改target的原型对象，就会报错。

 - **注意，该方法只能返回布尔值，否则会被自动转为布尔值。另外，如果目标对象不可扩展（non-extensible），setPrototypeOf()方法不得改变目标对象的原型。**

**3. Proxy.revocable()**

  - **Proxy.revocable()方法返回一个可取消的 Proxy 实例。**

  - **Proxy.revocable()方法返回一个对象，该对象的proxy属性是Proxy实例，revoke属性是一个函数，可以取消Proxy实例。**
		
		let target = {};
		let handler = {};
		
		let {proxy, revoke} = Proxy.revocable(target, handler);
		
		proxy.foo = 123;
		proxy.foo // 123
		
		revoke();
		proxy.foo // TypeError: Revoked

  - 上面代码中，当执行revoke函数之后，再访问Proxy实例，就会抛出一个错误。

  - **Proxy.revocable()的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。**

** 4.this问题 **

   - 在 Proxy 代理的情况下，**目标对象内部的this**关键字**会指向 Proxy 代理**。

		const target = {
		  m: function () {
		    console.log(this === proxy);
		  }
		};
		const handler = {};
		
		const proxy = new Proxy(target, handler);
		
		target.m() // false
		proxy.m()  // true

 - 上面代码中，一旦proxy代理target，target.m()内部的this就是指向proxy，而不是target。所以，虽然proxy没有做任何拦截，target.m()和proxy.m()返回不一样的结果。

 - 有些原生对象的内部属性，只有通过正确的this才能拿到，所以 Proxy 也无法代理这些原生对象的属性。

		const target = new Date();
		const handler = {};
		const proxy = new Proxy(target, handler);
		
		proxy.getDate();
		// TypeError: this is not a Date object.

- 上面代码中，getDate()方法只能在Date对象实例上面拿到，如果this不是Date对象实例就会报错。这时，this绑定原始对象，就可以解决这个问题。

- 上面代码中，getDate()方法只能在Date对象实例上面拿到，如果this不是Date对象实例就会报错。这时，this绑定原始对象，就可以解决这个问题。

		const target = new Date('2015-01-01');
		const handler = {
		  get(target, prop) {
		    if (prop === 'getDate') {
		      return target.getDate.bind(target);
		    }
		    return Reflect.get(target, prop);
		  }
		};
		const proxy = new Proxy(target, handler);
		
		proxy.getDate() // 1

- **Proxy 拦截函数内部**的**this，指向的是handler对象**。

		const handler = {
		  get: function (target, key, receiver) {
		    console.log(this === handler);
		    return 'Hello, ' + key;
		  },
		  set: function (target, key, value) {
		    console.log(this === handler);
		    target[key] = value;
		    return true;
		  }
		};
		
		const proxy = new Proxy({}, handler);
		
		proxy.foo
		// true
		// Hello, foo
		
		proxy.foo = 1
		// true

- 上面例子中，get()和set()拦截函数内部的this，指向的都是handler对象。

#### 十二、Reflect ####

** 1.概述 **

   - Reflect对象与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API。Reflect对象的设计目的有这样几个。

   （1） **将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。**现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上。也就是说，从Reflect对象上可以拿到语言内部的方法。

   （2） **修改某些Object方法的返回结果，让其变得更合理**。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。

		// 老写法
		try {
		  Object.defineProperty(target, property, attributes);
		  // success
		} catch (e) {
		  // failure
		}
		
		// 新写法
		if (Reflect.defineProperty(target, property, attributes)) {
		  // success
		} else {
		  // failure
		}

   （3） **让Object操作都变成函数行为**。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。

		// 老写法
		'assign' in Object // true
		
		// 新写法
		Reflect.has(Object, 'assign') // true

 （4）**Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。**这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。
		
		Proxy(target, {
		  set: function(target, name, value, receiver) {
		    var success = Reflect.set(target, name, value, receiver);
		    if (success) {
		      console.log('property ' + name + ' on ' + target + ' set to ' + value);
		    }
		    return success;
		  }
		});
 
  - 上面代码中，Proxy方法拦截target对象的属性赋值行为。它采用Reflect.set方法将值赋值给对象的属性，确保完成原有的行为，然后再部署额外的功能。

  - 下面是另一个例子。

		var loggedObj = new Proxy(obj, {
		  get(target, name) {
		    console.log('get', target, name);
		    return Reflect.get(target, name);
		  },
		  deleteProperty(target, name) {
		    console.log('delete' + name);
		    return Reflect.deleteProperty(target, name);
		  },
		  has(target, name) {
		    console.log('has' + name);
		    return Reflect.has(target, name);
		  }
		});

 - 上面代码中，每一个Proxy对象的拦截操作（get、delete、has），内部都调用对应的Reflect方法，保证原生行为能够正常执行。添加的工作，就是将每一个操作输出一行日志。

 - 有了Reflect对象以后，很多操作会更易读。

		// 老写法
		Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1
		
		// 新写法
		Reflect.apply(Math.floor, undefined, [1.75]) // 1

** 2.静态方法 **

	- Reflect对象一共有 13 个静态方法。
	
		Reflect.apply(target, thisArg, args)
		Reflect.construct(target, args)
		Reflect.get(target, name, receiver)
		Reflect.set(target, name, value, receiver)
		Reflect.defineProperty(target, name, desc)
		Reflect.deleteProperty(target, name)
		Reflect.has(target, name)
		Reflect.ownKeys(target)
		Reflect.isExtensible(target)
		Reflect.preventExtensions(target)
		Reflect.getOwnPropertyDescriptor(target, name)
		Reflect.getPrototypeOf(target)
		Reflect.setPrototypeOf(target, prototype)
	
   - 上面这些方法的作用，大部分与Object对象的同名方法的作用都是相同的，而且它与Proxy对象的方法是一一对应的。下面是对它们的解释。
 
  （1）**Reflect.get(target, name, receiver)**

      - **Reflect.get方法查找并返回target对象的name属性，如果没有该属性，则返回undefined。**

		var myObject = {
		  foo: 1,
		  bar: 2,
		  get baz() {
		    return this.foo + this.bar;
		  },
		}
		
		Reflect.get(myObject, 'foo') // 1
		Reflect.get(myObject, 'bar') // 2
		Reflect.get(myObject, 'baz') // 3

    - **如果name属性部署了读取函数（getter），则读取函数的this绑定receiver**

		var myObject = {
		  foo: 1,
		  bar: 2,
		  get baz() {
		    return this.foo + this.bar;
		  },
		};
		
		var myReceiverObject = {
		  foo: 4,
		  bar: 4,
		};
		
		Reflect.get(myObject, 'baz', myReceiverObject) // 8

    - **如果第一个参数不是对象，Reflect.get方法会报错**

		Reflect.get(1, 'foo') // 报错
		Reflect.get(false, 'foo') // 报错
		 
  （2）**Reflect.set(target, name, value, receiver)**

       - **Reflect.set方法设置target对象的name属性等于value。**

			var myObject = {
			  foo: 1,
			  set bar(value) {
			    return this.foo = value;
			  },
			}
			
			myObject.foo // 1
			
			Reflect.set(myObject, 'foo', 2);
			myObject.foo // 2
			
			Reflect.set(myObject, 'bar', 3)
			myObject.foo // 3

     - **如果name属性设置了赋值函数，则赋值函数的this绑定receiver。**
			 
			var myObject = {
			  foo: 4,
			  set bar(value) {
			    return this.foo = value;
			  },
			};
			
			var myReceiverObject = {
			  foo: 0,
			};
			
			Reflect.set(myObject, 'bar', 1, myReceiverObject);
			myObject.foo // 4
			myReceiverObject.foo // 1

    - **注意，如果 Proxy对象和 Reflect对象联合使用，前者拦截赋值操作，后者完成赋值的默认行为，而且传入了receiver，那么Reflect.set会触发Proxy.defineProperty拦截。**

			let p = {
			  a: 'a'
			};
			
			let handler = {
			  set(target, key, value, receiver) {
			    console.log('set');
			    Reflect.set(target, key, value, receiver)
			  },
			  defineProperty(target, key, attribute) {
			    console.log('defineProperty');
			    Reflect.defineProperty(target, key, attribute);
			  }
			};
			
			let obj = new Proxy(p, handler);
			obj.a = 'A';
			// set
			// defineProperty

   - 上面代码中，Proxy.set拦截里面使用了Reflect.set，而且传入了receiver，导致触发Proxy.defineProperty拦截。这是因为Proxy.set的receiver参数总是指向当前的 Proxy实例（即上例的obj），而Reflect.set一旦传入receiver，就会将属性赋值到receiver上面（即obj），导致触发defineProperty拦截。如果Reflect.set没有传入receiver，那么就不会触发defineProperty拦截。
			
		let p = {
		  a: 'a'
		};
		
		let handler = {
		  set(target, key, value, receiver) {
		    console.log('set');
		    Reflect.set(target, key, value)
		  },
		  defineProperty(target, key, attribute) {
		    console.log('defineProperty');
		    Reflect.defineProperty(target, key, attribute);
		  }
		};
		
		let obj = new Proxy(p, handler);
		obj.a = 'A';
		// set

   - **如果第一个参数不是对象，Reflect.set会报错。**

		Reflect.set(1, 'foo', {}) // 报错
		Reflect.set(false, 'foo', {}) // 报错


 （3）**Reflect.has(obj, name)**
 
   - **Reflect.has方法对应name in obj里面的in运算符。**

		var myObject = {
		  foo: 1,
		};
		
		// 旧写法
		'foo' in myObject // true
		
		// 新写法
		Reflect.has(myObject, 'foo') // true

  - **如果Reflect.has()方法的第一个参数不是对象，会报错。**


 （4）**Reflect.deleteProperty(obj, name)**

   - **Reflect.deleteProperty方法等同于delete obj[name]，用于删除对象的属性。**

		const myObj = { foo: 'bar' };
		
		// 旧写法
		delete myObj.foo;
		
		// 新写法
		Reflect.deleteProperty(myObj, 'foo');
		
   - **该方法返回一个布尔值。如果删除成功，或者被删除的属性不存在，返回true；删除失败，被删除的属性依然存在，返回false。**

   - **如果Reflect.deleteProperty()方法的第一个参数不是对象，会报错。**


 （5）**Reflect.construct(target,args) **
 
   - **Reflect.construct方法等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法。**

		function Greeting(name) {
		  this.name = name;
		}
		
		// new 的写法
		const instance = new Greeting('张三');
		
		// Reflect.construct 的写法
		const instance = Reflect.construct(Greeting, ['张三']);
		
    - **如果Reflect.construct()方法的第一个参数不是函数，会报错。**

 （6）**Reflect.getPrototypeOf(obj **
 
   - **Reflect.getPrototypeOf方法用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj)。**
		
		const myObj = new FancyThing();
		
		// 旧写法
		Object.getPrototypeOf(myObj) === FancyThing.prototype;
		
		// 新写法
		Reflect.getPrototypeOf(myObj) === FancyThing.prototype;

  - **Reflect.getPrototypeOf和Object.getPrototypeOf的一个区别是，如果参数不是对象，Object.getPrototypeOf会将这个参数转为对象，然后再运行，而Reflect.getPrototypeOf会报错。**

		Object.getPrototypeOf(1) // Number {[[PrimitiveValue]]: 0}
		Reflect.getPrototypeOf(1) // 报错

 （7）**Reflect.setPrototypeOf(obj,newProto) **

   - **Reflect.setPrototypeOf方法用于设置目标对象的原型（prototype），对应Object.setPrototypeOf(obj, newProto)方法。它返回一个布尔值，表示是否设置成功。**

		const myObj = {};
		
		// 旧写法
		Object.setPrototypeOf(myObj, Array.prototype);
		
		// 新写法
		Reflect.setPrototypeOf(myObj, Array.prototype);
		
		myObj.length // 0

   - **如果无法设置目标对象的原型（比如，目标对象禁止扩展），Reflect.setPrototypeOf方法返回false。**

		Reflect.setPrototypeOf({}, null)
		// true
		Reflect.setPrototypeOf(Object.freeze({}), null)
		// false

   - **如果第一个参数不是对象，Object.setPrototypeOf会返回第一个参数本身，而Reflect.setPrototypeOf会报错。**

		Object.setPrototypeOf(1, {})
		// 1
		
		Reflect.setPrototypeOf(1, {})
		// TypeError: Reflect.setPrototypeOf called on non-object

   - **如果第一个参数是undefined或null，Object.setPrototypeOf和Reflect.setPrototypeOf都会报错。**

		Object.setPrototypeOf(null, {})
		// TypeError: Object.setPrototypeOf called on null or undefined
		
		Reflect.setPrototypeOf(null, {})
		// TypeError: Reflect.setPrototypeOf called on non-object


 （8）**Reflect.apply(func,thisArg,args) **

   - **Reflect.apply方法等同于Function.prototype.apply.call(func, thisArg, args)，用于绑定this对象后执行给定函数。**

   - **一般来说，如果要绑定一个函数的this对象，可以这样写fn.apply(obj, args)，但是如果函数定义了自己的apply方法，就只能写成Function.prototype.apply.call(fn, obj, args)，采用Reflect对象可以简化这种操作。**

		const ages = [11, 33, 12, 54, 18, 96];
		
		// 旧写法
		const youngest = Math.min.apply(Math, ages);
		const oldest = Math.max.apply(Math, ages);
		const type = Object.prototype.toString.call(youngest);
		
		// 新写法
		const youngest = Reflect.apply(Math.min, Math, ages);
		const oldest = Reflect.apply(Math.max, Math, ages);
		const type = Reflect.apply(Object.prototype.toString, youngest, []);

（9）**Reflect.defineProperty(target,propertyKey,attributes) **

  - **Reflect.defineProperty方法基本等同于Object.defineProperty**，用来为对象定义属性。未来，后者会被逐渐废除，请从现在开始就使用Reflect.defineProperty代替它。

		function MyDate() {
		  /*…*/
		}
		
		// 旧写法
		Object.defineProperty(MyDate, 'now', {
		  value: () => Date.now()
		});
		
		// 新写法
		Reflect.defineProperty(MyDate, 'now', {
		  value: () => Date.now()
		});

- **如果Reflect.defineProperty的第一个参数不是对象，就会抛出错误，比如Reflect.defineProperty(1, 'foo')。**

- 这个方法可以与Proxy.defineProperty配合使用。

		const p = new Proxy({}, {
		  defineProperty(target, prop, descriptor) {
		    console.log(descriptor);
		    return Reflect.defineProperty(target, prop, descriptor);
		  }
		});
		
		p.foo = 'bar';
		// {value: "bar", writable: true, enumerable: true, configurable: true}
		
		p.foo // "bar"

- 上面代码中，Proxy.defineProperty对属性赋值设置了拦截，然后使用Reflect.defineProperty完成了赋值。
 
（10）**Reflect.getOwnPropertyDescriptor(target,propertyKey) **

  - **Reflect.getOwnPropertyDescriptor基本等同于Object.getOwnPropertyDescriptor，用于得到指定属性的描述对象，将来会替代掉后者。**

		var myObject = {};
		Object.defineProperty(myObject, 'hidden', {
		  value: true,
		  enumerable: false,
		});
		
		// 旧写法
		var theDescriptor = Object.getOwnPropertyDescriptor(myObject, 'hidden');
		
		// 新写法
		var theDescriptor = Reflect.getOwnPropertyDescriptor(myObject, 'hidden');

   - **Reflect.getOwnPropertyDescriptor和Object.getOwnPropertyDescriptor的一个区别是，如果第一个参数不是对象，Object.getOwnPropertyDescriptor(1, 'foo')不报错，返回undefined，而Reflect.getOwnPropertyDescriptor(1, 'foo')会抛出错误，表示参数非法。**

（11）** Reflect.isExtensible(target) **

  - **Reflect.isExtensible方法对应Object.isExtensible，返回一个布尔值，表示当前对象是否可扩展。**

		const myObject = {};
		
		// 旧写法
		Object.isExtensible(myObject) // true
		
		// 新写法
		Reflect.isExtensible(myObject) // true

  - **如果参数不是对象，Object.isExtensible会返回false，因为非对象本来就是不可扩展的，而Reflect.isExtensible会报错。**

		Object.isExtensible(1) // false
		Reflect.isExtensible(1) // 报错

（12）** Reflect.preventExtensions(target) **

  - **Reflect.preventExtensions对应Object.preventExtensions方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。**

		var myObject = {};
		
		// 旧写法
		Object.preventExtensions(myObject) // Object {}
		
		// 新写法
		Reflect.preventExtensions(myObject) // true

  - **如果参数不是对象，Object.preventExtensions在 ES5 环境报错，在 ES6 环境返回传入的参数，而Reflect.preventExtensions会报错。**

		// ES5 环境
		Object.preventExtensions(1) // 报错
		
		// ES6 环境
		Object.preventExtensions(1) // 1
		
		// 新写法
		Reflect.preventExtensions(1) // 报错


（12）** Reflect.ownKeys(target) **

  - **Reflect.ownKeys方法用于返回对象的所有属性，基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和。**

		var myObject = {
		  foo: 1,
		  bar: 2,
		  [Symbol.for('baz')]: 3,
		  [Symbol.for('bing')]: 4,
		};
		
		// 旧写法
		Object.getOwnPropertyNames(myObject)
		// ['foo', 'bar']
		
		Object.getOwnPropertySymbols(myObject)
		//[Symbol(baz), Symbol(bing)]
		
		// 新写法
		Reflect.ownKeys(myObject)
		// ['foo', 'bar', Symbol(baz), Symbol(bing)]

  - **如果Reflect.ownKeys()方法的第一个参数不是对象，会报错。**

** 3.使用Proxy实现观察者模式 **

      - **观察者模式（Observer mode）指的是函数自动观察数据对象，一旦对象有变化，函数就会自动执行。**

		const queuedObservers = new Set();
		
		const observe = fn => queuedObservers.add(fn);
		const observable = obj => new Proxy(obj, {set});
		
		function set(target, key, value, receiver) {
		  const result = Reflect.set(target, key, value, receiver);
		  queuedObservers.forEach(observer => observer());
		  return result;
		}

    - 上面代码中，先定义了一个Set集合，所有观察者函数都放进这个集合。然后，observable函数返回原始对象的代理，拦截赋值操作。拦截函数set之中，会自动执行所有观察者。


#### 十三、Promise对象 ####

** 1.特点 **

（1）**对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态**。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

（2）**一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。**

** 2.缺点 **

  （1）首先，**无法取消Promise，一旦新建它就会立即执行，无法中途取消。**

  （2）其次，**如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。**

  （3）第三，**当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。**

** 3.基本用法 **

   - ES6 规定，**Promise对象是一个构造函数**，用来生成Promise实例。

   - 下面代码创造了一个Promise实例。

	const promise = new Promise(function(resolve, reject) {
	  // ... some code
	
	  if (/* 异步操作成功 */){
	    resolve(value);
	  } else {
	    reject(error);
	  }
	});


   - **Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。**

   - **resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；**
   
   - **reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。**

   - **Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。**

   - **then方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为resolved时调用，第二个回调函数是Promise对象的状态变为rejected时调用。这两个函数都是可选的，不一定要提供。它们都接受Promise对象传出的值作为参数。**
		
		function timeout(ms) {
		  return new Promise((resolve, reject) => {
		    setTimeout(resolve, ms, 'done');
		  });
		}
		
		timeout(100).then((value) => {
		  console.log(value);
		});

   - **Promise 新建后就会立即执行。**

		let promise = new Promise(function(resolve, reject) {
		  console.log('Promise');
		  resolve();
		});
		
		promise.then(function() {
		  console.log('resolved.');
		});
		
		console.log('Hi!');
		
		// Promise
		// Hi!
		// resolved

  - **如果调用resolve函数和reject函数时带有参数，那么它们的参数会被传递给回调函数。reject函数的参数通常是Error对象的实例，表示抛出的错误；resolve函数的参数除了正常的值以外，还可能是另一个 Promise 实例**

		const p1 = new Promise(function (resolve, reject) {
		  setTimeout(() => reject(new Error('fail')), 3000)
		})
		
		const p2 = new Promise(function (resolve, reject) {
		  setTimeout(() => resolve(p1), 1000)
		})
		
		p2
		  .then(result => console.log(result))
		  .catch(error => console.log(error))
		// Error: fail

  - **注意，这时p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。如果p1的状态是pending，那么p2的回调函数就会等待p1的状态改变；如果p1的状态已经是resolved或者rejected，那么p2的回调函数将会立刻执行。**

  - **调用resolve或reject并不会终结 Promise 的参数函数的执行。**

		new Promise((resolve, reject) => {
		  resolve(1);
		  console.log(2);
		}).then(r => {
		  console.log(r);
		});
		// 2
		// 1


** 4.Promise.prototype.then() **

    - Promise 实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的。它的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，then方法的第一个参数是resolved状态的回调函数，第二个参数是rejected状态的回调函数，它们都是可选的。

    - **then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。**

		getJSON("/posts.json").then(function(json) {
		  return json.post;
		}).then(function(post) {
		  // ...
		});

    - **采用链式的then，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个Promise对象（即有异步操作），这时后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用。**

		getJSON("/post/1.json").then(function(post) {
		  return getJSON(post.commentURL);
		}).then(function (comments) {
		  console.log("resolved: ", comments);
		}, function (err){
		  console.log("rejected: ", err);
		});

** 5.Promise.prototype.catch() **

   - Promise.prototype.catch()方法是.then(null, rejection)或.then(undefined, rejection)的别名，**用于指定发生错误时的回调函数。**

		getJSON('/posts.json').then(function(posts) {
		  // ...
		}).catch(function(error) {
		  // 处理 getJSON 和 前一个回调函数运行时发生的错误
		  console.log('发生错误！', error);
		});

   - 上面代码中，getJSON()方法返回一个 Promise 对象，如果该对象状态变为resolved，则会调用then()方法指定的回调函数；**如果异步操作抛出错误，状态就会变为rejected，就会调用catch()方法指定的回调函数，处理这个错误。另外，then()方法指定的回调函数，如果运行中抛出错误，也会被catch()方法捕获。**

  - **如果 Promise 状态已经变成resolved，再抛出错误是无效的。**

		const promise = new Promise(function(resolve, reject) {
		  resolve('ok');
		  throw new Error('test');
		});
		promise
		  .then(function(value) { console.log(value) })
		  .catch(function(error) { console.log(error) });
		// ok

   - 上面代码中，Promise 在resolve语句后面，再抛出错误，不会被捕获，等于没有抛出。因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。

   - **Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。**

		getJSON('/post/1.json').then(function(post) {
		  return getJSON(post.commentURL);
		}).then(function(comments) {
		  // some code
		}).catch(function(error) {
		  // 处理前面三个Promise产生的错误
		});

  - 上面代码中，一共有三个 Promise 对象：一个由getJSON()产生，两个由then()产生。它们之中任何一个抛出的错误，都会被最后一个catch()捕获。

  - **一般来说，不要在then()方法里面定义 Reject 状态的回调函数（即then的第二个参数），总是使用catch方法。**
			 
			// bad
			promise
			  .then(function(data) {
			    // success
			  }, function(err) {
			    // error
			  });
			
			// good
			promise
			  .then(function(data) { //cb
			    // success
			  })
			  .catch(function(err) {
			    // error
			  });

  - 上面代码中，第二种写法要好于第一种写法，理由是第二种写法可以捕获前面then方法执行中的错误，也更接近同步的写法（try/catch）。因此，建议总是使用catch()方法，而不使用then()方法的第二个参数。

  - **跟传统的try/catch代码块不同的是，如果没有使用catch()方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。**

		const someAsyncThing = function() {
		  return new Promise(function(resolve, reject) {
		    // 下面一行会报错，因为x没有声明
		    resolve(x + 2);
		  });
		};
		
		someAsyncThing().then(function() {
		  console.log('everything is great');
		});
		
		setTimeout(() => { console.log(123) }, 2000);
		// Uncaught (in promise) ReferenceError: x is not defined
		// 123

 - 上面代码中，**someAsyncThing()函数产生的 Promise 对象，内部有语法错误。浏览器运行到这一行，会打印出错误提示ReferenceError: x is not defined，但是不会退出进程、终止脚本执行，2 秒之后还是会输出123。这就是说，Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”。**

  - ** catch()方法返回的还是一个 Promise 对象，因此后面还可以接着调用then()方法。 **

		const someAsyncThing = function() {
		  return new Promise(function(resolve, reject) {
		    // 下面一行会报错，因为x没有声明
		    resolve(x + 2);
		  });
		};
		
		someAsyncThing()
		.catch(function(error) {
		  console.log('oh no', error);
		})
		.then(function() {
		  console.log('carry on');
		});
		// oh no [ReferenceError: x is not defined]
		// carry on

 - **上面代码运行完catch()方法指定的回调函数，会接着运行后面那个then()方法指定的回调函数。如果没有报错，则会跳过catch()方法。**

	    Promise.resolve()
		.catch(function(error) {
		  console.log('oh no', error);
		})
		.then(function() {
		  console.log('carry on');
		});
		// carry on

 - **上面的代码因为没有报错，跳过了catch()方法，直接执行后面的then()方法。此时，要是then()方法里面报错，就与前面的catch()无关了。**

 - ** catch()方法之中，还能再抛出错误。 **

		const someAsyncThing = function() {
		  return new Promise(function(resolve, reject) {
		    // 下面一行会报错，因为x没有声明
		    resolve(x + 2);
		  });
		};
		
		someAsyncThing().then(function() {
		  return someOtherAsyncThing();
		}).catch(function(error) {
		  console.log('oh no', error);
		  // 下面一行会报错，因为 y 没有声明
		  y + 2;
		}).then(function() {
		  console.log('carry on');
		});
		// oh no [ReferenceError: x is not defined]

- 上面代码中，catch()方法抛出一个错误，因为后面没有别的catch()方法了，导致这个错误不会被捕获，也不会传递到外层。如果改写一下，结果就不一样了。

		someAsyncThing().then(function() {
		  return someOtherAsyncThing();
		}).catch(function(error) {
		  console.log('oh no', error);
		  // 下面一行会报错，因为y没有声明
		  y + 2;
		}).catch(function(error) {
		  console.log('carry on', error);
		});
		// oh no [ReferenceError: x is not defined]
		// carry on [ReferenceError: y is not defined]

- 上面代码中，第二个catch()方法用来捕获前一个catch()方法抛出

** 6.Promise.prototype.finally() **
 
   - **finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作**。该方法是 ES2018 引入标准的。

		promise
		.then(result => {···})
		.catch(error => {···})
		.finally(() => {···});
  
  - 上面代码中，不管promise最后的状态，在执行完then或catch指定的回调函数以后，都会执行finally方法指定的回调函数。

  - **finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。**

  - **finally本质上是then方法的特例。**

		promise
		.finally(() => {
		  // 语句
		});
		
		// 等同于
		promise
		.then(
		  result => {
		    // 语句
		    return result;
		  },
		  error => {
		    // 语句
		    throw error;
		  }
		);

  - 上面代码中，如果不使用finally方法，同样的语句需要为成功和失败两种情况各写一次。有了finally方法，则只需要写一次。

  - **它的实现也很简单。**

	Promise.prototype.finally = function (callback) {
	  let P = this.constructor;
	  return this.then(
	    value  => P.resolve(callback()).then(() => value),
	    reason => P.resolve(callback()).then(() => { throw reason })
	  );
	};

  - 上面代码中，不管前面的 Promise 是fulfilled还是rejected，都会执行回调函数callback。

  - **从上面的实现还可以看到，finally方法总是会返回原来的值。**

		// resolve 的值是 undefined
		Promise.resolve(2).then(() => {}, () => {})
		
		// resolve 的值是 2
		Promise.resolve(2).finally(() => {})
		
		// reject 的值是 undefined
		Promise.reject(3).then(() => {}, () => {})
		
		// reject 的值是 3
		Promise.reject(3).finally(() => {})

** 7.Promise.all() **

   - **Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。**

      const p = Promise.all([p1, p2, p3]);

   - **Promise.all()方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。**
   
   - **另外，Promise.all()方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。**


   - **p的状态由p1、p2、p3决定，分成两种情况。**

   （1）**只有p1、p2、p3的状态都变成fulfilled（成功），p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。**

   （2）**只要p1、p2、p3之中有一个被rejected（失败），p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。**

  - **注意，如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法。**

		const p1 = new Promise((resolve, reject) => {
		  resolve('hello');
		})
		.then(result => result)
		.catch(e => e);
		
		const p2 = new Promise((resolve, reject) => {
		  throw new Error('报错了');
		})
		.then(result => result)
		.catch(e => e);
		
		Promise.all([p1, p2])
		.then(result => console.log(result))
		.catch(e => console.log(e));
		// ["hello", Error: 报错了]

** 8.Promise.race() **

   - **Promise.race()方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例**

       const p = Promise.race([p1, p2, p3]);

   - **只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。**

   - **Promise.race()方法的参数与Promise.all()方法一样，如果不是 Promise 实例，就会先调用下面讲到的Promise.resolve()方法，将参数转为 Promise 实例，再进一步处理。**

   - 下面是一个例子，如果指定时间内没有获得结果，就将 Promise 的状态变为reject，否则变为resolve。

		const p = Promise.race([
		  fetch('/resource-that-may-take-a-while'),
		  new Promise(function (resolve, reject) {
		    setTimeout(() => reject(new Error('request timeout')), 5000)
		  })
		]);
		
		p
		.then(console.log)
		.catch(console.error);

   - 上面代码中，如果 5 秒之内fetch方法无法返回结果，变量p的状态就会变为rejected，从而触发catch方法指定的回调函数。
 
** 9.Promise.allSettled() **
   
   - 有时候，我们希望等到一组异步操作都结束了，不管每一个操作是成功还是失败，再进行下一步操作。但是，现有的 Promise 方法很难实现这个要求。

   - **Promise.all()方法只适合所有异步操作都成功的情况，如果有一个操作失败，就无法满足要求。**

		const urls = [url_1, url_2, url_3];
		const requests = urls.map(x => fetch(x));
		
		try {
		  await Promise.all(requests);
		  console.log('所有请求都成功。');
		} catch {
		  console.log('至少一个请求失败，其他请求可能还没结束。');
		}

    - 上面示例中，Promise.all()可以确定所有请求都成功了，但是只要有一个请求失败，它就会报错，而不管另外的请求是否结束。

    - 为了解决这个问题，ES2020 引入了**Promise.allSettled()方法，用来确定一组异步操作是否都结束了（不管成功或失败）。所以，它的名字叫做”Settled“，包含了”fulfilled“和”rejected“两种情况。**

    - **Promise.allSettled()方法接受一个数组作为参数，数组的每个成员都是一个 Promise 对象，并返回一个新的 Promise 对象。只有等到参数数组的所有 Promise 对象都发生状态变更（不管是fulfilled还是rejected），返回的 Promise 对象才会发生状态变更。**

		const promises = [
		  fetch('/api-1'),
		  fetch('/api-2'),
		  fetch('/api-3'),
		];
		
		await Promise.allSettled(promises);
		removeLoadingIndicator();

   - 上面示例中，数组promises包含了三个请求，只有等到这三个请求都结束了（不管请求成功还是失败），removeLoadingIndicator()才会执行。 

   - **该方法返回的新的 Promise 实例，一旦发生状态变更，状态总是fulfilled，不会变成rejected。状态变成fulfilled后，它的回调函数会接收到一个数组作为参数，该数组的每个成员对应前面数组的每个 Promise 对象。**

		const resolved = Promise.resolve(42);
		const rejected = Promise.reject(-1);
		
		const allSettledPromise = Promise.allSettled([resolved, rejected]);
		
		allSettledPromise.then(function (results) {
		  console.log(results);
		});
		// [
		//    { status: 'fulfilled', value: 42 },
		//    { status: 'rejected', reason: -1 }
		// ]

   - results的每个成员是一个对象，对象的格式是固定的，对应异步操作的结果。

		// 异步操作成功时
		{status: 'fulfilled', value: value}
		
		// 异步操作失败时
		{status: 'rejected', reason: reason}

 
   - **成员对象的status属性的值只可能是字符串fulfilled或字符串rejected，用来区分异步操作是成功还是失败。如果是成功（fulfilled），对象会有value属性，如果是失败（rejected），会有reason属性，对应两种状态时前面异步操作的返回值。**


** 10.Promise.any() **
 
   - 该方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。

   - **只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。**

	    Promise.any([
		  fetch('https://v8.dev/').then(() => 'home'),
		  fetch('https://v8.dev/blog').then(() => 'blog'),
		  fetch('https://v8.dev/docs').then(() => 'docs')
		]).then((first) => {  // 只要有一个 fetch() 请求成功
		  console.log(first);
		}).catch((error) => { // 所有三个 fetch() 全部请求失败
		  console.log(error);
		});

   - **Promise.any()抛出的错误是一个 AggregateError 实例（详见《对象的扩展》一章），这个 AggregateError 实例对象的errors属性是一个数组，包含了所有成员的错误。**


** 11.Promise.resolve() **

   - 有时需要将现有对象转为 Promise 对象，Promise.resolve()方法就起到这个作用。

   - Promise.resolve()等价于下面的写法。

		Promise.resolve('foo')
		// 等价于
		new Promise(resolve => resolve('foo'))

   - Promise.resolve()方法的参数分成四种情况。

   （1）**参数是一个 Promise 实例**

        - 如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。

   （2）**参数是一个thenable对象**

        - thenable对象指的是具有then方法的对象，比如下面这个对象。

			let thenable = {
			  then: function(resolve, reject) {
			    resolve(42);
			  }
			};
			
          - Promise.resolve()方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then()方法。
			
			let thenable = {
			  then: function(resolve, reject) {
			    resolve(42);
			  }
			};
			
			let p1 = Promise.resolve(thenable);
			p1.then(function (value) {
			  console.log(value);  // 42
			});

       - 上面代码中，thenable对象的then()方法执行后，对象p1的状态就变为resolved，从而立即执行最后那个then()方法指定的回调函数，输出42。

   （3）**参数不是具有then()方法的对象，或根本就不是对象**

       - 如果参数是一个原始值，或者是一个不具有then()方法的对象，则Promise.resolve()方法返回一个新的 Promise 对象，状态为resolved。

		const p = Promise.resolve('Hello');
		
		p.then(function (s) {
		  console.log(s)
		});
		// Hello

     - 上面代码生成一个新的 Promise 对象的实例p。由于字符串Hello不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是resolved，所以回调函数会立即执行。Promise.resolve()方法的参数，会同时传给回调函数。

   （4）**不带有任何参数**

    - Promise.resolve()方法允许调用时不带参数，直接返回一个resolved状态的 Promise对象。

    - 所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用Promise.resolve()方法。

		const p = Promise.resolve();
		
		p.then(function () {
		  // ...
		});

    - 上面代码的变量p就是一个 Promise 对象。

    - **需要注意的是，立即resolve()的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。**
		
		setTimeout(function () {
		  console.log('three');
		}, 0);
		
		Promise.resolve().then(function () {
		  console.log('two');
		});
		
		console.log('one');
		
		// one
		// two
		// three

    - 上面代码中，setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行，console.log('one')则是立即执行，因此最先输出。
 
	
** 12.Promise.reject() **

   - **Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。**

		const p = Promise.reject('出错了');
		// 等同于
		const p = new Promise((resolve, reject) => reject('出错了'))
		
		p.then(null, function (s) {
		  console.log(s)
		});
		// 出错了


    - Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。

		Promise.reject('出错了')
		.catch(e => {
		  console.log(e === '出错了')
		})
		// true

    - 上面代码中，Promise.reject()方法的参数是一个字符串，后面catch()方法的参数e就是这个字符串。

** 13.Promise.try() **(待理解)
	   
    - Promise.try方法让同步函数同步执行，异步函数异步执行，并且让它们具有统一的 API

		const f = () => console.log('now');
		Promise.try(f);
		console.log('next');
		// now
		// next


#### 十四、Iterator 和 for...of 循环 ####

**1.Iterator(遍历器)的概念**

  - 遍历器（Iterator）是**一种接口**，为各种不同的数据结构提供统一的访问机制。**任何数据结构只要部署 Iterator 接口，就可以完成遍历操作**（即依次处理该数据结构的所有成员）。

  - **Iterator 的作用有三个**：
  
      - 一是为各种数据结构，提供一个统一的、简便的访问接口；**
      
      - 二是使得数据结构的成员能够按某种次序排列；
      
      - 三是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费

   - **Iterator 的遍历过程：**

      - 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

      - 第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。

      - 第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。

      - 不断调用指针对象的next方法，直到它指向数据结构的结束位置。

   - **每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。**

   - 下面是一个模拟next方法返回值的例子。

		var it = makeIterator(['a', 'b']);
		
		it.next() // { value: "a", done: false }
		it.next() // { value: "b", done: false }
		it.next() // { value: undefined, done: true }
		
		function makeIterator(array) {
		  var nextIndex = 0;
		  return {
		    next: function() {
		      return nextIndex < array.length ?
		        {value: array[nextIndex++], done: false} :
		        {value: undefined, done: true};
		    }
		  };
		}

  -上面代码定义了一个makeIterator函数，它是一个遍历器生成函数，作用就是返回一个遍历器对象。对数组['a', 'b']执行这个函数，就会返回该数组的遍历器对象（即指针对象）it。


  - 对于遍历器对象来说，done: false和value: undefined属性都是可以省略的，因此上面的makeIterator函数可以简写成下面的形式。

		function makeIterator(array) {
		  var nextIndex = 0;
		  return {
		    next: function() {
		      return nextIndex < array.length ?
		        {value: array[nextIndex++]} :
		        {done: true};
		    }
		  };
		}

  - **由于 Iterator 只是把接口规格加到数据结构之上，所以，遍历器与它所遍历的那个数据结构，实际上是分开的，完全可以写出没有对应数据结构的遍历器对象，或者说用遍历器对象模拟出数据结构。**下面是一个无限运行的遍历器对象的例子。

		var it = idMaker();
		
		it.next().value // 0
		it.next().value // 1
		it.next().value // 2
		// ...
		
		function idMaker() {
		  var index = 0;
		
		  return {
		    next: function() {
		      return {value: index++, done: false};
		    }
		  };
		}

  - 上面的例子中，遍历器生成函数idMaker，返回一个遍历器对象（即指针对象）。但是并没有对应的数据结构，或者说，遍历器对象自己描述了一个数据结构出来。

**2.默认Iterator接口**
  
  - **Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即for...of循环。当使用for...of循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。**

  - **一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。**

  - **ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）。**

  - **Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。至于属性名Symbol.iterator，它是一个表达式，返回Symbol对象的iterator属性，这是一个预定义好的、类型为 Symbol 的特殊值，所以要放在方括号内**

		const obj = {
		  [Symbol.iterator] : function () {
		    return {
		      next: function () {
		        return {
		          value: 1,
		          done: true
		        };
		      }
		    };
		  }
		};


 -上面代码中，对象obj是可遍历的（iterable），因为具有Symbol.iterator属性。执行这个属性，会返回一个遍历器对象。该对象的根本特征就是具有next方法。每次调用next方法，都会返回一个代表当前成员的信息对象，具有value和done两个属性。

 - **ES6 的有些数据结构原生具备 Iterator 接口（比如数组），即不用任何处理，就可以被for...of循环遍历。原因在于，这些数据结构原生部署了Symbol.iterator属性（详见下文），另外一些数据结构没有（比如对象）。凡是部署了Symbol.iterator属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。**

 - **原生具备 Iterator 接口的数据结构如下**:

   - Array
   
   - Map
 
   - Set
 
   - String

   - TypedArray（类数组：存在数值键名和length属性）

   - 函数的 arguments 对象

   - NodeList 对象

 - 下面的例子是数组的Symbol.iterator属性。

	let arr = ['a', 'b', 'c'];
	let iter = arr[Symbol.iterator]();
	
	iter.next() // { value: 'a', done: false }
	iter.next() // { value: 'b', done: false }
	iter.next() // { value: 'c', done: false }
	iter.next() // { value: undefined, done: true }

 - 对于原生部署 Iterator 接口的数据结构，不用自己写遍历器生成函数，for...of循环会自动遍历它们。除此之外，其他数据结构（主要是对象）的 Iterator 接口，都需要自己在Symbol.iterator属性上面部署，这样才会被for...of循环遍历。

 - 对象（Object）之所以没有默认部署 Iterator 接口，是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动指定。**本质上，遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换。**不过，严格地说，对象部署遍历器接口并不是很必要，因为这时对象实际上被当作 Map 结构使用，ES5 没有 Map 结构，而 ES6 原生提供了。

- **对于类似数组的对象（存在数值键名和length属性），部署 Iterator 接口，有一个简便方法，就是Symbol.iterator方法直接引用数组的 Iterator 接口。**
	
	NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
	// 或者
	NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];
	
	[...document.querySelectorAll('div')] // 可以执行了

- NodeList 对象是类似数组的对象，本来就具有遍历接口，可以直接遍历。上面代码中，我们将它的遍历接口改成数组的Symbol.iterator属性，可以看到没有任何影响。

- 下面是另一个类似数组的对象调用数组的Symbol.iterator方法的例子。

		let iterable = {
		  0: 'a',
		  1: 'b',
		  2: 'c',
		  length: 3,
		  [Symbol.iterator]: Array.prototype[Symbol.iterator]
		};
		for (let item of iterable) {
		  console.log(item); // 'a', 'b', 'c'
		}

- **注意，普通对象部署数组的Symbol.iterator方法，并无效果。**


		let iterable = {
		  a: 'a',
		  b: 'b',
		  c: 'c',
		  length: 3,
		  [Symbol.iterator]: Array.prototype[Symbol.iterator]
		};
		for (let item of iterable) {
		  console.log(item); // undefined, undefined, undefined
		}

- **如果Symbol.iterator方法对应的不是遍历器生成函数（即会返回一个遍历器对象），解释引擎将会报错。**

		var obj = {};
		
		obj[Symbol.iterator] = () => 1;
		
		[...obj] // TypeError: [] is not a function



- **有了遍历器接口，数据结构就可以用for...of循环遍历，也可以使用while循环遍历。**


**3.调用Iterator接口的场合**

  - 有一些场合会默认调用 Iterator 接口（即Symbol.iterator方法），除了下文会介绍的for...of循环，还有几个别的场合。

 （1）**解构赋值**

   - 对数组和 Set 结构进行解构赋值时，会默认调用Symbol.iterator方法。

		let set = new Set().add('a').add('b').add('c');
		
		let [x,y] = set;
		// x='a'; y='b'
		
		let [first, ...rest] = set;
		// first='a'; rest=['b','c'];

 （2）**扩展运算符**

   - 扩展运算符（...）也会调用默认的 Iterator 接口。
		
		// 例一
		var str = 'hello';
		[...str] //  ['h','e','l','l','o']
		
		// 例二
		let arr = ['b', 'c'];
		['a', ...arr, 'd']
		// ['a', 'b', 'c', 'd']

   - 上面代码的扩展运算符内部就调用 Iterator 接口。

   - **实际上，这提供了一种简便机制，可以将任何部署了 Iterator 接口的数据结构，转为数组。也就是说，只要某个数据结构部署了 Iterator 接口，就可以对它使用扩展运算符，将其转为数组。**

      let arr = [...iterable];

（3）** yield* **

  - yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。
		
		let generator = function* () {
		  yield 1;
		  yield* [2,3,4];
		  yield 5;
		};
		
		var iterator = generator();
		
		iterator.next() // { value: 1, done: false }
		iterator.next() // { value: 2, done: false }
		iterator.next() // { value: 3, done: false }
		iterator.next() // { value: 4, done: false }
		iterator.next() // { value: 5, done: false }
		iterator.next() // { value: undefined, done: true }

（4）**其他场合**

  - **由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口**。下面是一些例子。

     - for...of
		
     - Array.from()
		
     - Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
		
     - Promise.all()
		
     - Promise.race()

** 4.字符串的Iterator接口 **

   - 字符串是一个类似数组的对象，也原生具有 Iterator 接口。

		var someString = "hi";
		typeof someString[Symbol.iterator]
		// "function"
		
		var iterator = someString[Symbol.iterator]();
		
		iterator.next()  // { value: "h", done: false }
		iterator.next()  // { value: "i", done: false }
		iterator.next()  // { value: undefined, done: true }

   - 上面代码中，调用Symbol.iterator方法返回一个遍历器对象，在这个遍历器上可以调用 next 方法，实现对于字符串的遍历。

   - 可以覆盖原生的Symbol.iterator方法，达到修改遍历器行为的目的。

		var str = new String("hi");
		
		[...str] // ["h", "i"]
		
		str[Symbol.iterator] = function() {
		  return {
		    next: function() {
		      if (this._first) {
		        this._first = false;
		        return { value: "bye", done: false };
		      } else {
		        return { done: true };
		      }
		    },
		    _first: true
		  };
		};
		
		[...str] // ["bye"]
		str // "hi"

  - 上面代码中，字符串 str 的Symbol.iterator方法被修改了，所以扩展运算符（...）返回的值变成了bye，而字符串本身还是hi。
 
**5.Iterator接口与Generator函数**

  - Symbol.iterator()方法的最简单实现，还是使用下一章要介绍的 Generator 函数。

		let myIterable = {
		  [Symbol.iterator]: function* () {
		    yield 1;
		    yield 2;
		    yield 3;
		  }
		};
		[...myIterable] // [1, 2, 3]
		
		// 或者采用下面的简洁写法
		
		let obj = {
		  * [Symbol.iterator]() {
		    yield 'hello';
		    yield 'world';
		  }
		};
		
		for (let x of obj) {
		  console.log(x);
		}
		// "hello"
		// "world"

  - 上面代码中，Symbol.iterator()方法几乎不用部署任何代码，只要用 yield 命令给出每一步的返回值即可。

** 6.遍历器对象的return()，throw() **

   - 遍历器对象除了具有next()方法，还可以具有return()方法和throw()方法。如果你自己写遍历器对象生成函数，那么**next()方法是必须部署的，return()方法和throw()方法是否部署是可选的。**

   - **return()方法的使用场合是，如果for...of循环提前退出（通常是因为出错，或者有break语句），就会调用return()方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署return()方法。**

		function readLinesSync(file) {
		  return {
		    [Symbol.iterator]() {
		      return {
		        next() {
		          return { done: false };
		        },
		        return() {
		          file.close();
		          return { done: true };
		        }
		      };
		    },
		  };
		}

   - 上面代码中，函数readLinesSync接受一个文件对象作为参数，返回一个遍历器对象，其中除了next()方法，还部署了return()方法。下面的两种情况，都会触发执行return()方法。


		// 情况一
		for (let line of readLinesSync(fileName)) {
		  console.log(line);
		  break;
		}
		
		// 情况二
		for (let line of readLinesSync(fileName)) {
		  console.log(line);
		  throw new Error();
		}


  - 上面代码中，情况一输出文件的第一行以后，就会执行return()方法，关闭这个文件；情况二会在执行return()方法关闭文件之后，再抛出错误。

  - **注意，return()方法必须返回一个对象，这是 Generator 语法决定的。**

  - **throw()方法主要是配合 Generator 函数使用，一般的遍历器对象用不到这个方法。**

**7.for...of循环**

  - ES6 借鉴 C++、Java、C# 和 Python 语言，引入了for...of循环，作为**遍历所有数据结构的统一的方法。**

  - **一个数据结构只要部署了Symbol.iterator属性，就被视为具有 iterator 接口，就可以用for...of循环遍历它的成员。也就是说，for...of循环内部调用的是数据结构的Symbol.iterator方法。**

  - **for...of循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。**

  - JavaScript 原有的**for...in循环，只能获得对象的键名，不能直接获取键值。ES6 提供for...of循环，允许遍历获得键值。**

		var arr = ['a', 'b', 'c', 'd'];
		
		for (let a in arr) {
		  console.log(a); // 0 1 2 3
		}
		
		for (let a of arr) {
		  console.log(a); // a b c d
		}


  - 上面代码表明，for...in循环读取键名，for...of循环读取键值。**如果要通过for...of循环，获取数组的索引，可以借助数组实例的entries方法和keys方法**

 （1）**for...of循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。这一点跟for...in循环也不一样。**

		let arr = [3, 5, 7];
		arr.foo = 'hello';
		
		for (let i in arr) {
		  console.log(i); // "0", "1", "2", "foo"
		}
		
		for (let i of arr) {
		  console.log(i); //  "3", "5", "7"
		}

  - 上面代码中，for...of循环不会返回数组arr的foo属性。

  （2）Set 和 Map 结构也原生具有 Iterator 接口，可以直接使用for...of循环。

		var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
		for (var e of engines) {
		  console.log(e);
		}
		// Gecko
		// Trident
		// Webkit
		
		var es6 = new Map();
		es6.set("edition", 6);
		es6.set("committee", "TC39");
		es6.set("standard", "ECMA-262");
		for (var [name, value] of es6) {
		  console.log(name + ": " + value);
		}
		// edition: 6
		// committee: TC39
		// standard: ECMA-262

  - 上面代码演示了如何遍历 Set 结构和 Map 结构。值得注意的地方有两个，**首先，遍历的顺序是按照各个成员被添加进数据结构的顺序。其次，Set 结构遍历时，返回的是一个值，而 Map 结构遍历时，返回的是一个数组，该数组的两个成员分别为当前 Map 成员的键名和键值。**


 （3）类似数组的对象包括好几类。下面是for...of循环用于字符串、DOM NodeList 对象、arguments对象的例子。
		
		// 字符串
		let str = "hello";
		
		for (let s of str) {
		  console.log(s); // h e l l o
		}
		
		// DOM NodeList对象
		let paras = document.querySelectorAll("p");
		
		for (let p of paras) {
		  p.classList.add("test");
		}
		
		// arguments对象
		function printArgs() {
		  for (let x of arguments) {
		    console.log(x);
		  }
		}
		printArgs('a', 'b');
		// 'a'
		// 'b'


  - 对于字符串来说，for...of循环还有一个特点，就是会正确识别 32 位 UTF-16 字符。

		for (let x of 'a\uD83D\uDC0A') {
		  console.log(x);
		}
		// 'a'
		// '\uD83D\uDC0A'

  - **并不是所有类似数组的对象都具有 Iterator 接口，一个简便的解决方法，就是使用Array.from方法将其转为数组。**
		
		let arrayLike = { length: 2, 0: 'a', 1: 'b' };
		
		// 报错
		for (let x of arrayLike) {
		  console.log(x);
		}
		
		// 正确
		for (let x of Array.from(arrayLike)) {
		  console.log(x);
		}

 （4）**对于普通的对象，for...of结构不能直接使用，会报错，必须部署了 Iterator 接口后才能使用。但是，这样情况下，for...in循环依然可以用来遍历键名。**

		let es6 = {
		  edition: 6,
		  committee: "TC39",
		  standard: "ECMA-262"
		};
		
		for (let e in es6) {
		  console.log(e);
		}
		// edition
		// committee
		// standard
		
		for (let e of es6) {
		  console.log(e);
		}
		// TypeError: es6[Symbol.iterator] is not a function

  - 上面代码表示，对于普通的对象，for...in循环可以遍历键名，for...of循环会报错。

  - **一种解决方法是，使用Object.keys方法将对象的键名生成一个数组，然后遍历这个数组。**

		for (var key of Object.keys(someObject)) {
		  console.log(key + ': ' + someObject[key]);
		}

  - **另一个方法是使用 Generator 函数将对象重新包装一下。**

		const obj = { a: 1, b: 2, c: 3 }
		
		function* entries(obj) {
		  for (let key of Object.keys(obj)) {
		    yield [key, obj[key]];
		  }
		}
		
		for (let [key, value] of entries(obj)) {
		  console.log(key, '->', value);
		}
		// a -> 1
		// b -> 2
		// c -> 3

 （5）与其他遍历语法的比较

   - 以数组为例，JavaScript 提供多种遍历语法。最原始的写法就是for循环。

		for (var index = 0; index < myArray.length; index++) {
		  console.log(myArray[index]);
		}
  
   - 这种写法比较麻烦，因此数组提供内置的forEach方法。

		myArray.forEach(function (value) {
		  console.log(value);
		});

   - 这种写法的问题在于，无法中途跳出forEach循环，break命令或return命令都不能奏效。

   - for...in循环可以遍历数组的键名。

		for (var index in myArray) {
		  console.log(myArray[index]);
		}

   - **for...in循环有几个缺点。**

     - **数组的键名是数字，但是for...in循环是以字符串作为键名“0”、“1”、“2”等等。**

     - **for...in循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。**

     - **某些情况下，for...in循环会以任意顺序遍历键名。**

    - **总之，for...in循环主要是为遍历对象而设计的，不适用于遍历数组。**

   - **for...of循环相比上面几种做法，有一些显著的优点。**

		for (let value of myArray) {
		  console.log(value);
		}

     - **有着同for...in一样的简洁语法，但是没有for...in那些缺点。**

     - **不同于forEach方法，它可以与break、continue和return配合使用。**

     - **提供了遍历所有数据结构的统一操作接口。**

   - 下面是一个使用 break 语句，跳出for...of循环的例子。

		for (var n of fibonacci) {
		  if (n > 1000)
		    break;
		  console.log(n);
		}

   - 上面的例子，会输出斐波纳契数列小于等于 1000 的项。如果当前项大于 1000，就会使用break语句跳出for...of循环。


 
### 十五、Generator 函数的语法 ####

**1.基本概念**

  - **Generator 函数是 ES6 提供的一种异步编程解决方案**，语法行为与传统函数完全不同。

  - Generator 函数有多种理解角度：

     - **语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。**

     - **形式上，Generator 函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）。**
		
		function* helloWorldGenerator() {
		  yield 'hello';
		  yield 'world';
		  return 'ending';
		}
		
		var hw = helloWorldGenerator();

  - 上面代码定义了一个 Generator 函数helloWorldGenerator，它内部有两个yield表达式（hello和world），即**该函数有三个状态：hello，world 和 return 语句（结束执行）。**

  - 然后，Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，**调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是上一章介绍的遍历器对象（Iterator Object）。**

  - **下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态。也就是说，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止。换言之，Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。**

		hw.next()
		// { value: 'hello', done: false }
		
		hw.next()
		// { value: 'world', done: false }
		
		hw.next()
		// { value: 'ending', done: true }
		
		hw.next()
		// { value: undefined, done: true }

  - 总结一下，**调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。**

  - ES6 没有规定，function关键字与函数名之间的星号，写在哪个位置。这导致下面的写法都能通过。

		function * foo(x, y) { ··· }
		function *foo(x, y) { ··· }
		function* foo(x, y) { ··· }
		function*foo(x, y) { ··· }

  - 由于 Generator 函数仍然是普通函数，所以一般的写法是上面的第三种，即星号紧跟在function关键字后面。本书也采用这种写法。


**2.yield表达式**

 （1）概述

  - 由于 Generator 函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。**yield表达式就是暂停标志。**

  - 遍历器对象的next方法的运行逻辑如下。
 
     - **遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。**

     - **下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式。**

     - **如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。**

     - **如果该函数没有return语句，则返回的对象的value属性值为undefined。**

  - 需要注意的是，**yield表达式后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行，**因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。

		function* gen() {
		  yield  123 + 456;
		}

  - 上面代码中，yield后面的表达式123 + 456，不会立即求值，只会在next方法将指针移到这一句时，才会求值。

 （2）**yield VS return**

    - **相似之处**：都能返回紧跟在语句后面的那个表达式的值

    - **不同点**： 
    
       - 每次遇到yield，函数暂停执行，下一次再从该位置继续向后执行，而return语句不具备位置记忆的功能。
       
       - 一个函数里面，只能执行一次（或者说一个）return语句，但是可以执行多次（或者说多个）yield表达式。

       - 正常函数只能返回一个值，因为只能执行一次return；Generator 函数可以返回一系列的值，因为可以有任意多个yield。从另一个角度看，也可以说 Generator 生成了一系列的值，这也就是它的名称的来历（英语中，generator 这个词是“生成器”的意思）。

 （3）**Generator 函数可以不用yield表达式，这时就变成了一个单纯的暂缓执行函数。**
		
		function* f() {
		  console.log('执行了！')
		}
		
		var generator = f();
		
		setTimeout(function () {
		  generator.next()
		}, 2000);

  - 上面代码中，函数f如果是普通函数，在为变量generator赋值时就会执行。但是，函数f是一个 Generator 函数，就变成只有调用next方法时，函数f才会执行。

（4）另外需要注意，**yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。**

		(function (){
		  yield 1;
		})()
		// SyntaxError: Unexpected number

  - 上面代码在一个普通函数中使用yield表达式，结果产生一个句法错误。


		var arr = [1, [[2, 3], 4], [5, 6]];
		
		var flat = function* (a) {
		  a.forEach(function (item) {
		    if (typeof item !== 'number') {
		      yield* flat(item);
		    } else {
		      yield item;
		    }
		  });
		};
		
		for (var f of flat(arr)){
		  console.log(f);
		}

   - 上面代码也会产生句法错误，因为forEach方法的参数是一个普通函数，但是在里面使用了yield表达式（这个函数里面还使用了yield*表达式，详细介绍见后文）。一种修改方法是改用for循环。

		var arr = [1, [[2, 3], 4], [5, 6]];
		
		var flat = function* (a) {
		  var length = a.length;
		  for (var i = 0; i < length; i++) {
		    var item = a[i];
		    if (typeof item !== 'number') {
		      yield* flat(item);
		    } else {
		      yield item;
		    }
		  }
		};
		
		for (var f of flat(arr)) {
		  console.log(f);
		}
		// 1, 2, 3, 4, 5, 6

   - **yield表达式如果用在另一个表达式之中，必须放在圆括号里面。**

		function* demo() {
		  console.log('Hello' + yield); // SyntaxError
		  console.log('Hello' + yield 123); // SyntaxError
		
		  console.log('Hello' + (yield)); // OK
		  console.log('Hello' + (yield 123)); // OK
		}


   - yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号。

		function* demo() {
		  foo(yield 'a', yield 'b'); // OK
		  let input = yield; // OK
		}

**3.与Iterator接口的关系  **

  - **任意一个对象的Symbol.iterator方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象。**

  - **由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口。**

		var myIterable = {};
		myIterable[Symbol.iterator] = function* () {
		  yield 1;
		  yield 2;
		  yield 3;
		};
		
		[...myIterable] // [1, 2, 3]

  - 上面代码中，Generator 函数赋值给Symbol.iterator属性，从而使得myIterable对象具有了 Iterator 接口，可以被...运算符遍历了。

  - **Generator 函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身。**

		function* gen(){
		  // some code
		}
		
		var g = gen();
		
		g[Symbol.iterator]() === g
		// true

 - 上面代码中，gen是一个 Generator 函数，调用它会生成一个遍历器对象g。它的Symbol.iterator属性，也是一个遍历器对象生成函数，执行后返回它自己


**4.next方法的参数**

  - **yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。**

		function* f() {
		  for(var i = 0; true; i++) {
		    var reset = yield i;
		    if(reset) { i = -1; }
		  }
		}
		
		var g = f();
		
		g.next() // { value: 0, done: false }
		g.next() // { value: 1, done: false }
		g.next(true) // { value: 0, done: false }

  - 上面代码先定义了一个可以无限运行的 Generator 函数f，如果next方法没有参数，每次运行到yield表达式，变量reset的值总是undefined。当next方法带一个参数true时，变量reset就被重置为这个参数（即true），因此i会等于-1，下一轮循环就会从-1开始递增。

		function* foo(x) {
		  var y = 2 * (yield (x + 1));
		  var z = yield (y / 3);
		  return (x + y + z);
		}
		
		var a = foo(5);
		a.next() // Object{value:6, done:false}
		a.next() // Object{value:NaN, done:false}
		a.next() // Object{value:NaN, done:true}
		
		var b = foo(5);
		b.next() // { value:6, done:false }
		b.next(12) // { value:8, done:false }
		b.next(13) // { value:42, done:true }


 - 上面代码中，第二次运行next方法的时候不带参数，导致 y 的值等于2 * undefined（即NaN），除以 3 以后还是NaN，因此返回对象的value属性也等于NaN。第三次运行next方法的时候不带参数，所以z等于undefined，返回对象的value属性等于5 + NaN + undefined，即NaN。

 - 如果向next方法提供参数，返回结果就完全不一样了。上面代码第一次调用b的next方法时，返回x+1的值6；第二次调用next方法，将上一次yield表达式的值设为12，因此y等于24，返回y / 3的值8；第三次调用next方法，将上一次yield表达式的值设为13，因此z等于13，这时x等于5，y等于24，所以return语句的值等于42。

 - **注意，由于next方法的参数表示上一个yield表达式的返回值，所以在第一次使用next方法时，传递参数是无效的。V8 引擎直接忽略第一次使用next方法时的参数，只有从第二次使用next方法开始，参数才是有效的。从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数。**


**5.for...of循环**

  - **for...of循环可以自动遍历 Generator 函数运行时生成的Iterator对象，且此时不再需要调用next方法。**

		function* foo() {
		  yield 1;
		  yield 2;
		  yield 3;
		  yield 4;
		  yield 5;
		  return 6;
		}
		
		for (let v of foo()) {
		  console.log(v);
		}
		// 1 2 3 4 5

  - 上面代码使用for...of循环，依次显示 5 个yield表达式的值。这里需要注意，**一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象** ，所以上面代码的return语句返回的6，不包括在for...of循环之中。

  - **利用for...of循环，可以写出遍历任意对象（object）的方法。原生的 JavaScript 对象没有遍历接口，无法使用for...of循环，通过 Generator 函数为它加上这个接口，就可以用了。**

		function* objectEntries(obj) {
		  let propKeys = Reflect.ownKeys(obj);
		
		  for (let propKey of propKeys) {
		    yield [propKey, obj[propKey]];
		  }
		}
		
		let jane = { first: 'Jane', last: 'Doe' };
		
		for (let [key, value] of objectEntries(jane)) {
		  console.log(`${key}: ${value}`);
		}
		// first: Jane


  - **加上遍历器接口的另一种写法是，将 Generator 函数加到对象的Symbol.iterator属性上面。**

		function* objectEntries() {
		  let propKeys = Object.keys(this);
		
		  for (let propKey of propKeys) {
		    yield [propKey, this[propKey]];
		  }
		}
		
		let jane = { first: 'Jane', last: 'Doe' };
		
		jane[Symbol.iterator] = objectEntries;
		
		for (let [key, value] of jane) {
		  console.log(`${key}: ${value}`);
		}
		// first: Jane
		// last: Doe

 - **除了for...of循环以外，扩展运算符（...）、解构赋值和Array.from方法内部调用的，都是遍历器接口。这意味着，它们都可以将 Generator 函数返回的 Iterator 对象，作为参数。**
		
		function* numbers () {
		  yield 1
		  yield 2
		  return 3
		  yield 4
		}
		
		// 扩展运算符
		[...numbers()] // [1, 2]
		
		// Array.from 方法
		Array.from(numbers()) // [1, 2]
		
		// 解构赋值
		let [x, y] = numbers();
		x // 1
		y // 2
		
		// for...of 循环
		for (let n of numbers()) {
		  console.log(n)
		}
		// 1
		// 2

**6.Generator.prototype.throw()**

  - Generator 函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获。

		var g = function* () {
		  try {
		    yield;
		  } catch (e) {
		    console.log('内部捕获', e);
		  }
		};
		
		var i = g();
		i.next();
		
		try {
		  i.throw('a');
		  i.throw('b');
		} catch (e) {
		  console.log('外部捕获', e);
		}
		// 内部捕获 a
		// 外部捕获 b

  - 上面代码中，遍历器对象i连续抛出两个错误。第一个错误被 Generator 函数体内的catch语句捕获。i第二次抛出错误，由于 Generator 函数内部的catch语句已经执行过了，不会再捕捉到这个错误了，所以这个错误就被抛出了 Generator 函数体，被函数体外的catch语句捕获。

  - **throw方法可以接受一个参数，该参数会被catch语句接收，建议抛出Error对象的实例。**

		var g = function* () {
		  try {
		    yield;
		  } catch (e) {
		    console.log(e);
		  }
		};
		
		var i = g();
		i.next();
		i.throw(new Error('出错了！'));
		// Error: 出错了！(…)


- **注意，不要混淆遍历器对象的throw方法和全局的throw命令。上面代码的错误，是用遍历器对象的throw方法抛出的，而不是用throw命令抛出的。后者只能被函数体外的catch语句捕获。**

		var g = function* () {
		  while (true) {
		    try {
		      yield;
		    } catch (e) {
		      if (e != 'a') throw e;
		      console.log('内部捕获', e);
		    }
		  }
		};
		
		var i = g();
		i.next();
		
		try {
		  throw new Error('a');
		  throw new Error('b');
		} catch (e) {
		  console.log('外部捕获', e);
		}
		// 外部捕获 [Error: a]


- 上面代码之所以只捕获了a，是因为函数体外的catch语句块，捕获了抛出的a错误以后，就不会再继续try代码块里面剩余的语句了。

- **如果 Generator 函数内部没有部署try...catch代码块，那么throw方法抛出的错误，将被外部try...catch代码块捕获。**

		var g = function* () {
		  while (true) {
		    yield;
		    console.log('内部捕获', e);
		  }
		};
		
		var i = g();
		i.next();
		
		try {
		  i.throw('a');
		  i.throw('b');
		} catch (e) {
		  console.log('外部捕获', e);
		}
		// 外部捕获 a

- 上面代码中，Generator 函数g内部没有部署try...catch代码块，所以抛出的错误直接被外部catch代码块捕获。


- **如果 Generator 函数内部和外部，都没有部署try...catch代码块，那么程序将报错，直接中断执行。**

	 	    var gen = function* gen(){
			  yield console.log('hello');
			  yield console.log('world');
			}
			
			var g = gen();
			g.next();
			g.throw();
			// hello
			// Uncaught undefined

- **throw方法抛出的错误要被内部捕获，前提是必须至少执行过一次next方法。**

		function* gen() {
		  try {
		    yield 1;
		  } catch (e) {
		    console.log('内部捕获');
		  }
		}
		
		var g = gen();
		g.throw(1);
		// Uncaught 1

- 上面代码中，g.throw(1)执行时，next方法一次都没有执行过。这时，抛出的错误不会被内部捕获，而是直接在外部抛出，导致程序出错。这种行为其实很好理解，**因为第一次执行next方法，等同于启动执行 Generator 函数的内部代码，否则 Generator 函数还没有开始执行，这时throw方法抛错只可能抛出在函数外部。**
*

- **throw方法被内部捕获以后，会附带执行到下一条yield表达式，这种情况下等同于执行一次next方法。**

	var gen = function* gen(){
	  try {
	    yield 1;
	  } catch (e) {
	    yield 2;
	  }
	  yield 3;
	}
	
	var g = gen();
	g.next() // { value:1, done:false }
	g.throw() // { value:2, done:false }
	g.next() // { value:3, done:false }
	g.next() // { value:undefined, done:true }


- **Generator 函数体外抛出的错误，可以在函数体内捕获；反过来，Generator 函数体内抛出的错误，也可以被函数体外的catch捕获。**

		function* foo() {
		  var x = yield 3;
		  var y = x.toUpperCase();
		  yield y;
		}
		
		var it = foo();
		
		it.next(); // { value:3, done:false }
		
		try {
		  it.next(42);
		} catch (err) {
		  console.log(err);
		}

- 上面代码中，第二个next方法向函数体内传入一个参数 42，数值是没有toUpperCase方法的，所以会抛出一个 TypeError 错误，被函数体外的catch捕获。

- **一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用next方法，将返回一个value属性等于undefined、done属性等于true的对象，即 JavaScript 引擎认为这个 Generator 已经运行结束了。**

		function* g() {
		  yield 1;
		  console.log('throwing an exception');
		  throw new Error('generator broke!');
		  yield 2;
		  yield 3;
		}
		
		function log(generator) {
		  var v;
		  console.log('starting generator');
		  try {
		    v = generator.next();
		    console.log('第一次运行next方法', v);
		  } catch (err) {
		    console.log('捕捉错误', v);
		  }
		  try {
		    v = generator.next();
		    console.log('第二次运行next方法', v);
		  } catch (err) {
		    console.log('捕捉错误', v);
		  }
		  try {
		    v = generator.next();
		    console.log('第三次运行next方法', v);
		  } catch (err) {
		    console.log('捕捉错误', v);
		  }
		  console.log('caller done');
		}
		
		log(g());
		// starting generator
		// 第一次运行next方法 { value: 1, done: false }
		// throwing an exception
		// 捕捉错误 { value: 1, done: false }
		// 第三次运行next方法 { value: undefined, done: true }
		// caller done


- 上面代码一共三次运行next方法，第二次运行的时候会抛出错误，然后第三次运行的时候，Generator 函数就已经结束了，不再执行下去了。

**7.Generator.prototype.return()**

  - Generator 函数返回的遍历器对象，还有一个return()方法，可以返回给定的值，并且终结遍历 Generator 函数。

		function* gen() {
		  yield 1;
		  yield 2;
		  yield 3;
		}
		
		var g = gen();
		
		g.next()        // { value: 1, done: false }
		g.return('foo') // { value: "foo", done: true }
		g.next()        // { value: undefined, done: true }


  - 上面代码中，遍历器对象g调用return()方法后，**返回值的value属性就是return()方法的参数foo。**并且，Generator 函数的遍历就终止了，返回值的done属性为true，以后再调用next()方法，done属性总是返回true。

  - **如果return()方法调用时，不提供参数，则返回值的value属性为undefined。**

		function* gen() {
		  yield 1;
		  yield 2;
		  yield 3;
		}
		
		var g = gen();
		
		g.next() // { value: 1, done: false }
		g.return() // { value: undefined, done: true }



- **如果 Generator 函数内部有try...finally代码块，且正在执行try代码块，那么return()方法会导致立刻进入finally代码块，执行完以后，整个函数才会结束。**


		function* numbers () {
		  yield 1;
		  try {
		    yield 2;
		    yield 3;
		  } finally {
		    yield 4;
		    yield 5;
		  }
		  yield 6;
		}
		var g = numbers();
		g.next()       // { value: 1, done: false }
		g.next()       // { value: 2, done: false }
		g.return(7)   // { value: 4, done: false }
		g.next()     // { value: 5, done: false }
		g.next()    // { value: 7, done: true }

- 上面代码中，调用return()方法后，就开始执行finally代码块，不执行try里面剩下的代码了，然后**等到finally代码块执行完，再返回return()方法指定的返回值。**

**8.next()、throw()、retrun()的共同点**

  - next()、throw()、return()这三个方法本质上是同一件事，可以放在一起理解。**它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换yield表达式。**

  - **next()是将yield表达式替换成一个值。**

		const g = function* (x, y) {
		  let result = yield x + y;
		  return result;
		};
		
		const gen = g(1, 2);
		gen.next(); // Object {value: 3, done: false}
		
		gen.next(1); // Object {value: 1, done: true}
		// 相当于将 let result = yield x + y
		// 替换成 let result = 1;

  - 上面代码中，第二个next(1)方法就相当于将yield表达式替换成一个值1。如果next方法没有参数，就相当于替换成undefined。

  - **throw()是将yield表达式替换成一个throw语句。**

		gen.throw(new Error('出错了')); // Uncaught Error: 出错了
		// 相当于将 let result = yield x + y
		// 替换成 let result = throw(new Error('出错了'));

 - ** return()是将yield表达式替换成一个return语句。**

		gen.return(2); // Object {value: 2, done: true}
		// 相当于将 let result = yield x + y
		// 替换成 let result = return 2;

** 9.yield*表达式 **

   - 如果在 Generator 函数内部，调用另一个 Generator 函数。需要在前者的函数体内部，自己手动完成遍历。
		
		function* foo() {
		  yield 'a';
		  yield 'b';
		}
		
		function* bar() {
		  yield 'x';
		  // 手动遍历 foo()
		  for (let i of foo()) {
		    console.log(i);
		  }
		  yield 'y';
		}
		
		for (let v of bar()){
		  console.log(v);
		}
		// x
		// a
		// b
		// y
   
   - 上面代码中，foo和bar都是 Generator 函数，在bar里面调用foo，就需要手动遍历foo。如果有多个 Generator 函数嵌套，写起来就非常麻烦。

   - **ES6 提供了yield*表达式，作为解决办法，用来在一个 Generator 函数里面执行另一个 Generator 函数。**
		
		function* bar() {
		  yield 'x';
		  yield* foo();
		  yield 'y';
		}
		
		// 等同于
		function* bar() {
		  yield 'x';
		  yield 'a';
		  yield 'b';
		  yield 'y';
		}
		
		// 等同于
		function* bar() {
		  yield 'x';
		  for (let v of foo()) {
		    yield v;
		  }
		  yield 'y';
		}
		
		for (let v of bar()){
		  console.log(v);
		}
		// "x"
		// "a"
		// "b"
		// "y"

  - 从语法角度看，**如果yield表达式后面跟的是一个遍历器对象，需要在yield表达式后面加上星号，表明它返回的是一个遍历器对象。这被称为yield*表达式。**

		let delegatedIterator = (function* () {
		  yield 'Hello!';
		  yield 'Bye!';
		}());
		
		let delegatingIterator = (function* () {
		  yield 'Greetings!';
		  yield* delegatedIterator;
		  yield 'Ok, bye.';
		}());
		
		for(let value of delegatingIterator) {
		  console.log(value);
		}
		// "Greetings!
		// "Hello!"
		// "Bye!"
		// "Ok, bye."

  - 上面代码中，delegatingIterator是代理者，delegatedIterator是被代理者。**由于yield* delegatedIterator语句得到的值，是一个遍历器，**所以要用星号表示。运行结果就是使用一个遍历器，遍历了多个 Generator 函数，有递归的效果。

  - **yield*后面的 Generator 函数（没有return语句时），等同于在 Generator 函数内部，部署一个for...of循环。**

		function* concat(iter1, iter2) {
		  yield* iter1;
		  yield* iter2;
		}
		
		// 等同于
		
		function* concat(iter1, iter2) {
		  for (var value of iter1) {
		    yield value;
		  }
		  for (var value of iter2) {
		    yield value;
		  }
		}

- **如果yield*后面跟着一个数组，由于数组原生支持遍历器，因此就会遍历数组成员。**

		function* gen(){
		  yield* ["a", "b", "c"];
		}
		
		gen().next() // { value:"a", done:false }


- 上面代码中，yield命令后面如果不加星号，返回的是整个数组，加了星号就表示返回的是数组的遍历器对象。

- **实际上，任何数据结构只要有 Iterator 接口，就可以被yield*遍历。**

		let read = (function* () {
		  yield 'hello';
		  yield* 'hello';
		})();
		
		read.next().value // "hello"
		read.next().value // "h"

- 上面代码中，yield表达式返回整个字符串，yield*语句返回单个字符。因为字符串具有 Iterator 接口，所以被yield*遍历。

- **如果被代理的 Generator 函数有return语句，那么就可以向代理它的 Generator 函数返回数据。**

		function* foo() {
		  yield 2;
		  yield 3;
		  return "foo";
		}
		
		function* bar() {
		  yield 1;
		  var v = yield* foo();
		  console.log("v: " + v);
		  yield 4;
		}
		
		var it = bar();
		
		it.next()
		// {value: 1, done: false}
		it.next()
		// {value: 2, done: false}
		it.next()
		// {value: 3, done: false}
		it.next();
		// "v: foo"
		// {value: 4, done: false}
		it.next()
		// {value: undefined, done: true}

- **yield*命令可以很方便地取出嵌套数组的所有成员。**

		function* iterTree(tree) {
		  if (Array.isArray(tree)) {
		    for(let i=0; i < tree.length; i++) {
		      yield* iterTree(tree[i]);
		    }
		  } else {
		    yield tree;
		  }
		}
		
		const tree = [ 'a', ['b', 'c'], ['d', 'e'] ];
		
		for(let x of iterTree(tree)) {
		  console.log(x);
		}
		// a
		// b
		// c
		// d
		// e


**10.作为对象属的Generator函数**

   - 如果一个对象的属性是 Generator 函数，可以简写成下面的形式。

		let obj = {
		  * myGeneratorMethod() {
		    ···
		  }
		};

   - 上面代码中，myGeneratorMethod属性前面有一个星号，表示这个属性是一个 Generator 函数。

   - 它的完整形式如下，与上面的写法是等价的。
		
		let obj = {
		  myGeneratorMethod: function* () {
		    // ···
		  }
		};


**11.Generator函数的this**

  - **Generator 函数总是返回一个遍历器，ES6 规定这个遍历器是 Generator 函数的实例，也继承了 Generator 函数的prototype对象上的方法。**

		function* g() {}
		
		g.prototype.hello = function () {
		  return 'hi!';
		};
		
		let obj = g();
		
		obj instanceof g // true
		obj.hello() // 'hi!'


  - 上面代码表明，Generator 函数g返回的遍历器obj，是g的实例，而且继承了g.prototype。但是，如果把g当作普通的构造函数，并不会生效，因为**g返回的总是遍历器对象，而不是this对象。**
		
		function* g() {
		  this.a = 11;
		}
		
		let obj = g();
		obj.next();
		obj.a // undefined

  - 上面代码中，Generator 函数g在this对象上面添加了一个属性a，但是obj对象拿不到这个属性。

  - **Generator 函数也不能跟new命令一起用，会报错。**

		function* F() {
		  yield this.x = 2;
		  yield this.y = 3;
		}
		
		new F()
		// TypeError: F is not a constructor



  - 上面代码中，new命令跟构造函数F一起使用，结果报错，因为F不是构造函数。

  - 那么，有没有办法让 Generator 函数返回一个正常的对象实例，既可以用next方法，又可以获得正常的this？

  - 下面是一个变通方法。**首先，生成一个空对象，使用call方法绑定 Generator 函数内部的this。这样，构造函数调用以后，这个空对象就是 Generator 函数的实例对象了。**
		
		function* F() {
		  this.a = 1;
		  yield this.b = 2;
		  yield this.c = 3;
		}
		var obj = {};
		var f = F.call(obj);
		
		f.next();  // Object {value: 2, done: false}
		f.next();  // Object {value: 3, done: false}
		f.next();  // Object {value: undefined, done: true}
		
		obj.a // 1
		obj.b // 2
		obj.c // 3

  - 上面代码中，首先是F内部的this对象绑定obj对象，然后调用它，返回一个 Iterator 对象。这个对象执行三次next方法（因为F内部有两个yield表达式），完成 F 内部所有代码的运行。这时，所有内部属性都绑定在obj对象上了，因此obj对象也就成了F的实例。

  - 上面代码中，执行的是遍历器对象f，但是生成的对象实例是obj，有没有办法将这两个对象统一呢？

		function* F() {
		  this.a = 1;
		  yield this.b = 2;
		  yield this.c = 3;
		}
		var f = F.call(F.prototype);
		
		f.next();  // Object {value: 2, done: false}
		f.next();  // Object {value: 3, done: false}
		f.next();  // Object {value: undefined, done: true}
		
		f.a // 1
		f.b // 2
		f.c // 3


  - 再将F改成构造函数，就可以对它执行new命令了。

			function* gen() {
			  this.a = 1;
			  yield this.b = 2;
			  yield this.c = 3;
			}
			
			function F() {
			  return gen.call(gen.prototype);
			}
			
			var f = new F();
			
			f.next();  // Object {value: 2, done: false}
			f.next();  // Object {value: 3, done: false}
			f.next();  // Object {value: undefined, done: true}
			
			f.a // 1
			f.b // 2
			f.c // 3


**12.Generator与上下文**

 - JavaScript 代码运行时，会产生一个全局的上下文环境（context，又称运行环境），包含了当前所有的变量和对象。然后，执行函数（或块级代码）的时候，又会在当前上下文环境的上层，产生一个函数运行的上下文，变成当前（active）的上下文，由此形成一个上下文环境的堆栈（context stack）。

 - 这个堆栈是“后进先出”的数据结构，最后产生的上下文环境首先执行完成，退出堆栈，然后再执行完成它下层的上下文，直至所有代码执行完成，堆栈清空。

 - **Generator 函数不是这样，它执行产生的上下文环境，一旦遇到yield命令，就会暂时退出堆栈，但是并不消失，里面的所有变量和对象会冻结在当前状态。等到对它执行next命令时，这个上下文环境又会重新加入调用栈，冻结的变量和对象恢复执行。**

		function* gen() {
		  yield 1;
		  return 2;
		}
		
		let g = gen();
		
		console.log(
		  g.next().value,
		  g.next().value,
		);

- 上面代码中，第一次执行 g.next()时，Generator 函数gen的上下文会加入堆栈，即开始运行gen内部的代码。等遇到yield 1时，gen上下文退出堆栈，内部状态冻结。第二次执行g.next()时，gen上下文重新加入堆栈，变成当前的上下文，重新恢复执行。

**13.应用**

（1）**异步操作的同步化表达**

  - Generator 函数的暂停执行的效果，意味着可以把异步操作写在yield表达式里面，等到调用next方法时再往后执行。这实际上等同于不需要写回调函数了，因为异步操作的后续操作可以放在yield表达式下面，反正要等到调用next方法时再执行。所以，Generator 函数的一个重要实际意义就是用来处理异步操作，改写回调函数。

		function* loadUI() {
		  showLoadingScreen();
		  yield loadUIDataAsynchronously();
		  hideLoadingScreen();
		}
		var loader = loadUI();
		// 加载UI
		loader.next()
		
		// 卸载UI
		loader.next()


 - 上面代码中，第一次调用loadUI函数时，该函数不会执行，仅返回一个遍历器。下一次对该遍历器调用next方法，则会显示Loading界面（showLoadingScreen），并且异步加载数据（loadUIDataAsynchronously）。等到数据加载完成，再一次使用next方法，则会隐藏Loading界面。可以看到，这种写法的好处是所有Loading界面的逻辑，都被封装在一个函数，按部就班非常清晰。

 - Ajax 是典型的异步操作，通过 Generator 函数部署 Ajax 操作，可以用同步的方式表达。

		function* main() {
		  var result = yield request("http://some.url");
		  var resp = JSON.parse(result);
		    console.log(resp.value);
		}
		
		function request(url) {
		  makeAjaxCall(url, function(response){
		    it.next(response);
		  });
		}
		
		var it = main();
		it.next();

- 上面代码的main函数，就是通过 Ajax 操作获取数据。可以看到，除了多了一个yield，它几乎与同步操作的写法完全一样。注意，makeAjaxCall函数中的next方法，必须加上response参数，因为yield表达式，本身是没有值的，总是等于undefined


- 下面是另一个例子，通过 Generator 函数逐行读取文本文件。

		function* numbers() {
		  let file = new FileReader("numbers.txt");
		  try {
		    while(!file.eof) {
		      yield parseInt(file.readLine(), 10);
		    }
		  } finally {
		    file.close();
		  }
		}

- 上面代码打开文本文件，使用yield表达式可以手动逐行读取文件。

（2）**控制流管理**

 - 如果有一个多步操作非常耗时，采用回调函数，可能会写成下面这样。

		step1(function (value1) {
		  step2(value1, function(value2) {
		    step3(value2, function(value3) {
		      step4(value3, function(value4) {
		        // Do something with value4
		      });
		    });
		  });
		});

 - 采用 Promise 改写上面的代码。

		Promise.resolve(step1)
		  .then(step2)
		  .then(step3)
		  .then(step4)
		  .then(function (value4) {
		    // Do something with value4
		  }, function (error) {
		    // Handle any error from step1 through step4
		  })
		  .done();



 - 上面代码已经把回调函数，改成了直线执行的形式，但是加入了大量 Promise 的语法。Generator 函数可以进一步改善代码运行流程。

	function* longRunningTask(value1) {
	  try {
	    var value2 = yield step1(value1);
	    var value3 = yield step2(value2);
	    var value4 = yield step3(value3);
	    var value5 = yield step4(value4);
	    // Do something with value4
	  } catch (e) {
	    // Handle any error from step1 through step4
	  }
	}

  - 然后，使用一个函数，按次序自动执行所有步骤。
	
	scheduler(longRunningTask(initialValue));
	
	function scheduler(task) {
	  var taskObj = task.next(task.value);
	  // 如果Generator函数未结束，就继续调用
	  if (!taskObj.done) {
	    task.value = taskObj.value
	    scheduler(task);
	  }
	}

  - **注意，上面这种做法，只适合同步操作，即所有的task都必须是同步的，不能有异步操作。因为这里的代码一得到返回值，就继续往下执行，没有判断异步操作何时完成。如果要控制异步的操作流程**

（3）**部署Iterator接口**

  - 利用 Generator 函数，可以在任意对象上部署 Iterator 接口。

		function* iterEntries(obj) {
		  let keys = Object.keys(obj);
		  for (let i=0; i < keys.length; i++) {
		    let key = keys[i];
		    yield [key, obj[key]];
		  }
		}
		
		let myObj = { foo: 3, bar: 7 };
		
		for (let [key, value] of iterEntries(myObj)) {
		  console.log(key, value);
		}
		
		// foo 3
		// bar 7
 
  - 上述代码中，myObj是一个普通对象，通过iterEntries函数，就有了 Iterator 接口。也就是说，可以在任意对象上部署next方法。

（4）**作为数据结构**

  - Generator 可以看作是数据结构，更确切地说，可以看作是一个数组结构，因为 Generator 函数可以返回一系列的值，这意味着它可以对任意表达式，提供类似数组的接口。

		function* doStuff() {
		  yield fs.readFile.bind(null, 'hello.txt');
		  yield fs.readFile.bind(null, 'world.txt');
		  yield fs.readFile.bind(null, 'and-such.txt');
		}

  - 上面代码就是依次返回三个函数，但是由于使用了 Generator 函数，导致可以像处理数组那样，处理这三个返回的函数。

		for (task of doStuff()) {
		  // task是一个函数，可以像回调函数那样使用它
		}

  - 实际上，如果用 ES5 表达，完全可以用数组模拟 Generator 的这种用法。

		function doStuff() {
		  return [
		    fs.readFile.bind(null, 'hello.txt'),
		    fs.readFile.bind(null, 'world.txt'),
		    fs.readFile.bind(null, 'and-such.txt')
		  ];
		}

 - 上面的函数，可以用一模一样的for...of循环处理！两相一比较，就不难看出 Generator 使得数据或者操作，具备了类似数组的接口。

#### 十六、Generator 函数的异步应用 ####

** 1.异步 **

   - **所谓"异步"，简单说就是一个任务不是连续完成的，可以理解成该任务被人为分成两段，先执行第一段，然后转而执行其他任务，等做好了准备，再回过头执行第二段。**

   - 比如，有一个任务是读取文件进行处理，任务的第一段是向操作系统发出请求，要求读取文件。然后，程序执行其他任务，等到操作系统返回文件，再接着执行任务的第二段（处理文件）。这种不连续的执行，就叫做异步。
   
   - **相应地，连续的执行就叫做同步。由于是连续执行，不能插入其他任务，所以操作系统从硬盘读取文件的这段时间，程序只能干等着。**

   - **ES6 诞生以前，异步编程的方法，大概有下面四种。**

     - 回调函数

     - 事件监听

     - 发布/订阅

     - Promise 对象

   - Generator 函数将 JavaScript 异步编程带入了一个全新的阶段。


** 2.回调函数 **

   - JavaScript 语言对异步编程的实现，就是回调函数。**所谓回调函数，就是把任务的第二段单独写在一个函数里面，等到重新执行这个任务的时候，就直接调用这个函数。回调函数的英语名字callback，直译过来就是"重新调用"。**

   - 读取文件进行处理，是这样写的。

		fs.readFile('/etc/passwd', 'utf-8', function (err, data) {
		  if (err) throw err;
		  console.log(data);
		});

   - 上面代码中，readFile函数的第三个参数，就是回调函数，也就是任务的第二段。等到操作系统返回了/etc/passwd这个文件以后，回调函数才会执行。

   - 一个有趣的问题是，为什么 Node 约定，回调函数的第一个参数，必须是错误对象err（如果没有错误，该参数就是null）？

   - 原因是执行分成两段，第一段执行完以后，任务所在的上下文环境就已经结束了。在这以后抛出的错误，原来的上下文环境已经无法捕捉，只能当作参数，传入第二段。

** 3.Promise **

   - **回调函数本身并没有问题，它的问题出现在多个回调函数嵌套(回调地狱)。**假定读取A文件之后，再读取B文件，代码如下。

		fs.readFile(fileA, 'utf-8', function (err, data) {
		  fs.readFile(fileB, 'utf-8', function (err, data) {
		    // ...
		  });
		});

   - **Promise 对象就是为了解决这个问题而提出的。它不是新的语法功能，而是一种新的写法，允许将回调函数的嵌套，改成链式调用。**采用 Promise，连续读取多个文件，写法如下。
		
		var readFile = require('fs-readfile-promise');
		
		readFile(fileA)
		.then(function (data) {
		  console.log(data.toString());
		})
		.then(function () {
		  return readFile(fileB);
		})
		.then(function (data) {
		  console.log(data.toString());
		})
		.catch(function (err) {
		  console.log(err);
		});

   - 上面代码中，我使用了fs-readfile-promise模块，它的作用就是返回一个 Promise 版本的readFile函数。Promise 提供then方法加载回调函数，catch方法捕捉执行过程中抛出的错误。

   - 可以看到，Promise 的写法只是回调函数的改进，使用then方法以后，异步任务的两段执行看得更清楚了，除此以外，并无新意。

   - **Promise 的最大问题是代码冗余，原来的任务被 Promise 包装了一下，不管什么操作，一眼看去都是一堆then，原来的语义变得很不清楚。**

** 4.Generator函数 **

 （1）**协程**

   - 传统的编程语言，早有异步编程的解决方案（其实是多任务的解决方案）。其中有一种叫做"协程"（coroutine），意思是多个线程互相协作，完成异步任务。

   - **协程有点像函数，又有点像线程。它的运行流程大致如下。**
    
      - 第一步，协程A开始执行。
		
      - 第二步，协程A执行到一半，进入暂停，执行权转移到协程B。
		
      - 第三步，（一段时间后）协程B交还执行权。
		
      - 第四步，协程A恢复执行。
		
    - **上面流程的协程A，就是异步任务，因为它分成两段（或多段）执行。**

    - 举例来说，读取文件的协程写法如下。

		function* asyncJob() {
		  // ...其他代码
		  var f = yield readFile(fileA);
		  // ...其他代码
		}

    - 上面代码的函数asyncJob是一个协程，**它的奥妙就在其中的yield命令。它表示执行到此处，执行权将交给其他协程。也就是说，yield命令是异步两个阶段的分界线。**

    - **协程遇到yield命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。它的最大优点，就是代码的写法非常像同步操作，如果去除yield命令，简直一模一样。**
  
 （2）**协程的Generator函数实现**

   - Generator 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权（即暂停执行）。

   - 整个 Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方，都用yield语句注明。Generator 函数的执行方法如下。

		function* gen(x) {
		  var y = yield x + 2;
		  return y;
		}
		
		var g = gen(1);
		g.next() // { value: 3, done: false }
		g.next() // { value: undefined, done: true }

   - 上面代码中，调用 Generator 函数，会返回一个内部指针（即遍历器）g。这是 Generator 函数不同于普通函数的另一个地方，即执行它不会返回结果，返回的是指针对象。调用指针g的next方法，会移动内部指针（即执行异步任务的第一段），指向第一个遇到的yield语句，上例是执行到x + 2为止。

（3）**Generator函数的数据交换和错误处理**

  - **Generator 函数可以暂停执行和恢复执行，这是它能封装异步任务的根本原因**。
  
  - **除此之外，它还有两个特性，使它可以作为异步编程的完整解决方案：函数体内外的数据交换和错误处理机制。**

  - **next返回值的 value 属性，是 Generator 函数向外输出数据；next方法还可以接受参数，向 Generator 函数体内输入数据。**

		function* gen(x){
		  var y = yield x + 2;
		  return y;
		}
		
		var g = gen(1);
		g.next() // { value: 3, done: false }
		g.next(2) // { value: 2, done: true }


  - 上面代码中，第一个next方法的value属性，返回表达式x + 2的值3。第二个next方法带有参数2，这个参数可以传入 Generator 函数，作为上个阶段异步任务的返回结果，被函数体内的变量y接收。因此，这一步的value属性，返回的就是2（变量y的值）。

  - **Generator 函数内部还可以部署错误处理代码，捕获函数体外抛出的错误。**

		function* gen(x){
		  try {
		    var y = yield x + 2;
		  } catch (e){
		    console.log(e);
		  }
		  return y;
		}
		
		var g = gen(1);
		g.next();
		g.throw('出错了');
		// 出错了

  - 上面代码的最后一行，Generator 函数体外，使用指针对象的throw方法抛出的错误，可以被函数体内的try...catch代码块捕获。这意味着，出错的代码与处理错误的代码，实现了时间和空间上的分离，这对于异步编程无疑是很重要的。

 （4）**异步任务的封装**

   - 下面看看如何使用 Generator 函数，执行一个真实的异步任务。

		var fetch = require('node-fetch');
		
		function* gen(){
		  var url = 'https://api.github.com/users/github';
		  var result = yield fetch(url);
		  console.log(result.bio);
		}

   - 上面代码中，Generator 函数封装了一个异步操作，该操作先读取一个远程接口，然后从 JSON 格式的数据解析信息。就像前面说过的，这段代码非常像同步操作，除了加上了yield命令。

   - 执行这段代码的方法如下

		var g = gen();
		var result = g.next();
		
		result.value.then(function(data){
		  return data.json();
		}).then(function(data){
		  g.next(data);
		});

  - 上面代码中，首先执行 Generator 函数，获取遍历器对象，然后使用next方法（第二行），执行异步任务的第一阶段。由于Fetch模块返回的是一个 Promise 对象，因此要用then方法调用下一个next方法。

  - 可以看到，虽然 Generator 函数将异步操作表示得很简洁，但是流程管理却不方便（即何时执行第一阶段、何时执行第二阶段）。

** 5.Thunk函数 **
 
   - Thunk 函数是自动执行 Generator 函数的一种方法。
   
  （1）**参数的求值策略**

       - Thunk 函数早在上个世纪 60 年代就诞生了。

       - 那时，编程语言刚刚起步，计算机学家还在研究，编译器怎么写比较好。**一个争论的焦点是"求值策略"，即函数的参数到底应该何时求值。**

		var x = 1;
		
		function f(m) {
		  return m * 2;
		}
		
		f(x + 5)

      - 上面代码先定义函数f，然后向它传入表达式x + 5。请问，这个表达式应该何时求值？

      - **一种意见是"传值调用"（call by value），即在进入函数体之前，就计算x + 5的值（等于 6），再将这个值传入函数f。C 语言就采用这种策略。**

		f(x + 5)
		// 传值调用时，等同于
		f(6)

     - **另一种意见是“传名调用”（call by name），即直接将表达式x + 5传入函数体，只在用到它的时候求值。Haskell 语言采用这种策略。**

		f(x + 5)
		// 传名调用时，等同于
		(x + 5) * 2

    - **传值调用和传名调用，哪一种比较好？**

    - **回答是各有利弊。传值调用比较简单，但是对参数求值的时候，实际上还没用到这个参数，有可能造成性能损失。**

		function f(a, b){
		  return b;
		}
		
		f(3 * x * x - 2 * x - 1, x);

     - 上面代码中，函数f的第一个参数是一个复杂的表达式，但是函数体内根本没用到。对这个参数求值，实际上是不必要的。**因此，有一些计算机学家倾向于"传名调用"，即只在执行时求值。**

  （2）**Thunk函数的含义**

   - **编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数。**

		function f(m) {
		  return m * 2;
		}
		
		f(x + 5);
		
		// 等同于
		
		var thunk = function () {
		  return x + 5;
		};
		
		function f(thunk) {
		  return thunk() * 2;
		}

  - 上面代码中，函数 f 的参数x + 5被一个函数替换了。凡是用到原参数的地方，对Thunk函数求值即可。

  - 这就是 Thunk 函数的定义，**它是“传名调用”的一种实现策略，用来替换某个表达式。**

 （3）**JavaScript语言的Thunk函数**

   - JavaScript 语言是传值调用，它的 Thunk 函数含义有所不同。在 JavaScript 语言中，**Thunk 函数替换的不是表达式，而是多参数函数，将其替换成一个只接受回调函数作为参数的单参数函数。**

		// 正常版本的readFile（多参数版本）
		fs.readFile(fileName, callback);
		
		// Thunk版本的readFile（单参数版本）
		var Thunk = function (fileName) {
		  return function (callback) {
		    return fs.readFile(fileName, callback);
		  };
		};
		
		var readFileThunk = Thunk(fileName);
		readFileThunk(callback);

  - 上面代码中，fs模块的readFile方法是一个多参数函数，两个参数分别为文件名和回调函数。经过转换器处理，它变成了一个单参数函数，只接受回调函数作为参数。这个单参数版本，就叫做 Thunk 函数。

   - **任何函数，只要参数有回调函数，就能写成 Thunk 函数的形式**。下面是一个简单的 Thunk 函数转换器。

		// ES5版本
		var Thunk = function(fn){
		  return function (){
		    var args = Array.prototype.slice.call(arguments);
		    return function (callback){
		      args.push(callback);
		      return fn.apply(this, args);
		    }
		  };
		};
		
		// ES6版本
		const Thunk = function(fn) {
		  return function (...args) {
		    return function (callback) {
		      return fn.call(this, ...args, callback);
		    }
		  };
		};

  - 使用上面的转换器，生成fs.readFile的 Thunk 函数。

		var readFileThunk = Thunk(fs.readFile);
		readFileThunk(fileA)(callback);

  - 下面是另一个完整的例子。

		function f(a, cb) {
		  cb(a);
		}
		const ft = Thunk(f);
		
		ft(1)(console.log) // 1


 （4）**Thunkify模块**

  - 生产环境的转换器，建议使用 Thunkify 模块。

  - 首先是安装。

		$ npm install thunkify

  - 使用方式如下。
		
		var thunkify = require('thunkify');
		var fs = require('fs');
		
		var read = thunkify(fs.readFile);
		read('package.json')(function(err, str){
		  // ...
		});

  - Thunkify 的源码与上一节那个简单的转换器非常像。

		function thunkify(fn) {
		  return function() {
		    var args = new Array(arguments.length);
		    var ctx = this;
		
		    for (var i = 0; i < args.length; ++i) {
		      args[i] = arguments[i];
		    }
		
		    return function (done) {
		      var called;
		
		      args.push(function () {
		        if (called) return;
		        called = true;
		        done.apply(null, arguments);
		      });
		
		      try {
		        fn.apply(ctx, args);
		      } catch (err) {
		        done(err);
		      }
		    }
		  }
		};

  - 它的源码主要多了一个检查机制，变量called确保回调函数只运行一次。这样的设计与下文的 Generator 函数相关。请看下面的例子。

		function f(a, b, callback){
		  var sum = a + b;
		  callback(sum);
		  callback(sum);
		}
		
		var ft = thunkify(f);
		var print = console.log.bind(console);
		ft(1, 2)(print);
		// 3

  - 上面代码中，由于thunkify只允许回调函数执行一次，所以只输出一行结果。

  （5）Generator函数的流程管理

    - 你可能会问， Thunk 函数有什么用？回答是以前确实没什么用，但是 ES6 有了 Generator 函数，**Thunk 函数现在可以用于 Generator 函数的自动流程管理。**

    - Generator 函数可以自动执行。

		function* gen() {
		  // ...
		}
		
		var g = gen();
		var res = g.next();
		
		while(!res.done){
		  console.log(res.value);
		  res = g.next();
		}

    - 上面代码中，Generator 函数gen会自动执行完所有步骤。
  
    - **但是，这不适合异步操作。如果必须保证前一步执行完，才能执行后一步，上面的自动执行就不可行。这时，Thunk 函数就能派上用处。**以读取文件为例。下面的 Generator 函数封装了两个异步操作。

		var fs = require('fs');
		var thunkify = require('thunkify');
		var readFileThunk = thunkify(fs.readFile);
		
		var gen = function* (){
		  var r1 = yield readFileThunk('/etc/fstab');
		  console.log(r1.toString());
		  var r2 = yield readFileThunk('/etc/shells');
		  console.log(r2.toString());
		};

   - 上面代码中，yield命令用于将程序的执行权移出 Generator 函数，那么就需要一种方法，将执行权再交还给 Generator 函数。

   - 这种方法就是 **Thunk 函数，因为它可以在回调函数里，将执行权交还给 Generator 函数。**为了便于理解，我们先看如何手动执行上面这个 Generator 函数。

		var g = gen();
		
		var r1 = g.next();
		r1.value(function (err, data) {
		  if (err) throw err;
		  var r2 = g.next(data);
		  r2.value(function (err, data) {
		    if (err) throw err;
		    g.next(data);
		  });
		});

   - 上面代码中，变量g是 Generator 函数的内部指针，表示目前执行到哪一步。next方法负责将指针移动到下一步，并返回该步的信息（value属性和done属性）。

   - 仔细查看上面的代码，可以发现 Generator 函数的执行过程，其实是将同一个回调函数，反复传入next方法的value属性。这使得我们可以用递归来自动完成这个过程。

（6）Thunk函数的自动流程管理

 - Thunk 函数真正的威力，在于可以自动执行 Generator 函数。下面就是一个基于 Thunk 函数的 Generator 执行器。
		
		function run(fn) {
		  var gen = fn();
		
		  function next(err, data) {
		    var result = gen.next(data);
		    if (result.done) return;
		    result.value(next);
		  }
		
		  next();
		}
		
		function* g() {
		  // ...
		}
		
		run(g);

  - 上面代码的run函数，就是一个 Generator 函数的自动执行器。内部的next函数就是 Thunk 的回调函数。next函数先将指针移到 Generator 函数的下一步（gen.next方法），然后判断 Generator 函数是否结束（result.done属性），如果没结束，就将next函数再传入 Thunk 函数（result.value属性），否则就直接退出。

  - 有了这个执行器，执行 Generator 函数方便多了。不管内部有多少个异步操作，直接把 Generator 函数传入run函数即可。当然，前提是每一个异步操作，都要是 Thunk 函数，也就是说，跟在yield命令后面的必须是 Thunk 函数。

		var g = function* (){
		  var f1 = yield readFileThunk('fileA');
		  var f2 = yield readFileThunk('fileB');
		  // ...
		  var fn = yield readFileThunk('fileN');
		};

		run(g);

  - 上面代码中，函数g封装了n个异步的读取文件操作，只要执行run函数，这些操作就会自动完成。这样一来，异步操作不仅可以写得像同步操作，而且一行代码就可以执行。

  - Thunk 函数并不是 Generator 函数自动执行的唯一方案。因为自动执行的关键是，必须有一种机制，自动控制 Generator 函数的流程，接收和交还程序的执行权。回调函数可以做到这一点，Promise 对象也可以做到这一点。

**6.co模块**

 （1）基本用法

   - co 模块是著名程序员 TJ Holowaychuk 于 2013 年 6 月发布的一个小工具，用于 Generator 函数的自动执行。

   - 下面是一个 Generator 函数，用于依次读取两个文件。

		var gen = function* () {
		  var f1 = yield readFile('/etc/fstab');
		  var f2 = yield readFile('/etc/shells');
		  console.log(f1.toString());
		  console.log(f2.toString());
		};

   - co 模块可以让你不用编写 Generator 函数的执行器。

		var co = require('co');
		co(gen);
		上面代码中，Generator 函数只要传入co函数，就会自动执行。
		
		co函数返回一个Promise对象，因此可以用then方法添加回调函数。
		
		co(gen).then(function (){
		  console.log('Generator 函数执行完成');
		});

   - 上面代码中，等到 Generator 函数执行结束，就会输出一行提示。

  （2）co模块的原理

    - 为什么 co 可以自动执行 Generator 函数？

    - 前面说过，Generator 就是一个异步操作的容器。**它的自动执行需要一种机制，当异步操作有了结果，能够自动交回执行权。**

    - 两种方法可以做到这一点。

      - （1）**回调函数。将异步操作包装成 Thunk 函数，在回调函数里面交回执行权。**

      - （2）**Promise 对象。将异步操作包装成 Promise 对象，用then方法交回执行权。**

    - **co 模块其实就是将两种自动执行器（Thunk 函数和 Promise 对象），包装成一个模块。使用 co 的前提条件是，Generator 函数的yield命令后面，只能是 Thunk 函数或 Promise 对象。如果数组或对象的成员，全部都是 Promise 对象，也可以使用 co。**


  （3）**基于Promise对象的自动执行**

    - 首先，把fs模块的readFile方法包装成一个 Promise 对象。

		var fs = require('fs');
		
		var readFile = function (fileName){
		  return new Promise(function (resolve, reject){
		    fs.readFile(fileName, function(error, data){
		      if (error) return reject(error);
		      resolve(data);
		    });
		  });
		};
		
		var gen = function* (){
		  var f1 = yield readFile('/etc/fstab');
		  var f2 = yield readFile('/etc/shells');
		  console.log(f1.toString());
		  console.log(f2.toString());
		};

   - 然后，手动执行上面的 Generator 函数。

		var g = gen();
		
		g.next().value.then(function(data){
		  g.next(data).value.then(function(data){
		    g.next(data);
		  });
		});

   - 手动执行其实就是用then方法，层层添加回调函数。理解了这一点，就可以写出一个自动执行器。
		
		function run(gen){
		  var g = gen();
		
		  function next(data){
		    var result = g.next(data);
		    if (result.done) return result.value;
		    result.value.then(function(data){
		      next(data);
		    });
		  }
		
		  next();
		}
		
		run(gen);

  - 上面代码中，只要 Generator 函数还没执行到最后一步，next函数就调用自身，以此实现自动执行。


  （4）**co模块的源码**

    - co 就是上面那个自动执行器的扩展，它的源码只有几十行，非常简单。

    - 首先，co 函数接受 Generator 函数作为参数，返回一个 Promise 对象。

		function co(gen) {
		  var ctx = this;
		
		  return new Promise(function(resolve, reject) {
		  });
		}

    - 在返回的 Promise 对象里面，co 先检查参数gen是否为 Generator 函数。如果是，就执行该函数，得到一个内部指针对象；如果不是就返回，并将 Promise 对象的状态改为resolved。

		function co(gen) {
		  var ctx = this;
		
		  return new Promise(function(resolve, reject) {
		    if (typeof gen === 'function') gen = gen.call(ctx);
		    if (!gen || typeof gen.next !== 'function') return resolve(gen);
		  });
		}

    - 接着，co 将 Generator 函数的内部指针对象的next方法，包装成onFulfilled函数。这主要是为了能够捕捉抛出的错误。

		function co(gen) {
		  var ctx = this;
		
		  return new Promise(function(resolve, reject) {
		    if (typeof gen === 'function') gen = gen.call(ctx);
		    if (!gen || typeof gen.next !== 'function') return resolve(gen);
		
		    onFulfilled();
		    function onFulfilled(res) {
		      var ret;
		      try {
		        ret = gen.next(res);
		      } catch (e) {
		        return reject(e);
		      }
		      next(ret);
		    }
		  });
		}
 
   - 最后，就是关键的next函数，它会反复调用自身。

		function next(ret) {
		  if (ret.done) return resolve(ret.value);
		  var value = toPromise.call(ctx, ret.value);
		  if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
		  return onRejected(
		    new TypeError(
		      'You may only yield a function, promise, generator, array, or object, '
		      + 'but the following object was passed: "'
		      + String(ret.value)
		      + '"'
		    )
		  );
		}

  - 上面代码中，next函数的内部代码，一共只有四行命令。

      - 第一行，检查当前是否为 Generator 函数的最后一步，如果是就返回。

      - 第二行，确保每一步的返回值，是 Promise 对象。

      - 第三行，使用then方法，为返回值加上回调函数，然后通过onFulfilled函数再次调用next函数。
 
      - 第四行，在参数不符合要求的情况下（参数非 Thunk 函数和 Promise 对象），将 Promise 对象的状态改为rejected，从而终止执行。


  （5）**处理并发的异步操作**

    - co 支持并发的异步操作，即允许某些操作同时进行，等到它们全部完成，才进行下一步。

    - 这时，要把并发的操作都放在数组或对象里面，跟在yield语句后面。

		// 数组的写法
		co(function* () {
		  var res = yield [
		    Promise.resolve(1),
		    Promise.resolve(2)
		  ];
		  console.log(res);
		}).catch(onerror);
		
		// 对象的写法
		co(function* () {
		  var res = yield {
		    1: Promise.resolve(1),
		    2: Promise.resolve(2),
		  };
		  console.log(res);
		}).catch(onerror);

    - 下面是另一个例子。

		co(function* () {
		  var values = [n1, n2, n3];
		  yield values.map(somethingAsync);
		});
		
		function* somethingAsync(x) {
		  // do something async
		  return y
		}

   - 上面的代码允许并发三个somethingAsync异步操作，等到它们全部完成，才会进行下一步

 （6）**实例：处理Stream**

    - Node 提供 Stream 模式读写数据，特点是一次只处理数据的一部分，数据分成一块块依次处理，就好像“数据流”一样。这对于处理大规模数据非常有利。Stream 模式使用 EventEmitter API，会释放三个事件。

       - data事件：下一块数据块已经准备好了。
  
       - end事件：整个“数据流”处理完了。
		
       - error事件：发生错误。

     - 使用Promise.race()函数，可以判断这三个事件之中哪一个最先发生，只有当data事件最先发生时，才进入下一个数据块的处理。从而，我们可以通过一个while循环，完成所有数据的读取。

		const co = require('co');
		const fs = require('fs');
		
		const stream = fs.createReadStream('./les_miserables.txt');
		let valjeanCount = 0;
		
		co(function*() {
		  while(true) {
		    const res = yield Promise.race([
		      new Promise(resolve => stream.once('data', resolve)),
		      new Promise(resolve => stream.once('end', resolve)),
		      new Promise((resolve, reject) => stream.once('error', reject))
		    ]);
		    if (!res) {
		      break;
		    }
		    stream.removeAllListeners('data');
		    stream.removeAllListeners('end');
		    stream.removeAllListeners('error');
		    valjeanCount += (res.toString().match(/valjean/ig) || []).length;
		  }
		  console.log('count:', valjeanCount); // count: 1120
		});

  - 上面代码采用 Stream 模式读取《悲惨世界》的文本文件，对于每个数据块都使用stream.once方法，在data、end、error三个事件上添加一次性回调函数。变量res只有在data事件发生时才有值，然后累加每个数据块之中valjean这个词出现的次数。

#### 十七、async 函数 ####

**1.含义**

  - async 函数是什么？一句话，**它就是 Generator 函数的语法糖。**

  - 前文有一个 Generator 函数，依次读取两个文件。

		const fs = require('fs');
		
		const readFile = function (fileName) {
		  return new Promise(function (resolve, reject) {
		    fs.readFile(fileName, function(error, data) {
		      if (error) return reject(error);
		      resolve(data);
		    });
		  });
		};

		const gen = function* () {
		  const f1 = yield readFile('/etc/fstab');
		  const f2 = yield readFile('/etc/shells');
		  console.log(f1.toString());
		  console.log(f2.toString());
		};

  - 上面代码的函数gen可以写成async函数，就是下面这样。

		const asyncReadFile = async function () {
		  const f1 = await readFile('/etc/fstab');
		  const f2 = await readFile('/etc/shells');
		  console.log(f1.toString());
		  console.log(f2.toString());
		};

  - 一比较就会发现，**async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已。**

  - **async函数对 Generator 函数的改进**，体现在以下四点：

  （1）**内置执行器。**

    - Generator 函数的执行必须靠执行器，所以才有了co模块，而async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样，只要一行。

     asyncReadFile();

   - **上面的代码调用了asyncReadFile函数，然后它就会自动执行，输出最后结果。这完全不像 Generator 函数，需要调用next方法，或者用co模块，才能真正执行，得到最后结果。**
 

  （2）**更好的语义。**

    - async和await，比起星号和yield，语义更清楚了。**async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。**

  （3）**更广的适用性**

    - co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而**async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。**

   （4）**返回值是Promise**

     - **async函数的返回值是Promise对象**这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作。

     - 进一步说，async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖。

**2.基本用法**

  - **async函数返回一个 Promise 对象，可以使用then方法添加回调函数。**
  
  - **当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句** 

**3.返回Promise对象**

  - **async函数返回一个Promise对象**
  
  - **async函数内部return语句返回的值，会成为then方法回调函数的参数**
   

		async function f() {
		  return 'hello world';
		}
		
		f().then(v => console.log(v))
		// "hello world"


    - 上面代码中，函数f内部return命令返回的值，会被then方法回调函数接收到。

  - **async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。抛出的错误对象会被catch方法回调函数接收到。**

		 async function f() {
		  throw new Error('出错了');
		}
		
		f().then(
		  v => console.log('resolve', v),
		  e => console.log('reject', e)
		)
		//reject Error: 出错了

**4.Promise对象的状态变化**

  - **async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误。也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。**

  - 下面是一个例子。
	
	async function getTitle(url) {
	  let response = await fetch(url);
	  let html = await response.text();
	  return html.match(/<title>([\s\S]+)<\/title>/i)[1];
	}
	getTitle('https://tc39.github.io/ecma262/').then(console.log)
	// "ECMAScript 2017 Language Specification"

  - 上面代码中，函数getTitle内部有三个操作：抓取网页、取出文本、匹配页面标题。只有这三个操作全部完成，才会执行then方法里面的console.log。


**5.await命令**

（1）**await命令后面是一个 Promise 对象**

  - 正常情况下，await命令后面是一个 Promise 对象，返回该对象的结果。

（2）**await命令后面如果不是 Promise 对象**

  - await命令后面如果不是 Promise 对象，就直接返回对应的值**

		async function f() {
		  // 等同于
		  // return 123;
		  return await 123;
		}
		
		f().then(v => console.log(v))
		// 123

（3）**await命令后面是一个thenable对象（即定义了then方法的对象）**

  - await命令后面是一个thenable对象（即定义了then方法的对象），那么await会将其等同于 Promise 对象。

		class Sleep {
		  constructor(timeout) {
		    this.timeout = timeout;
		  }
		  then(resolve, reject) {
		    const startTime = Date.now();
		    setTimeout(
		      () => resolve(Date.now() - startTime),
		      this.timeout
		    );
		  }
		}
		
		(async () => {
		  const sleepTime = await new Sleep(1000);
		  console.log(sleepTime);
		})();
		// 1000

  - 上面代码中，await命令后面是一个Sleep对象的实例。这个实例不是 Promise 对象，但是因为定义了then方法，await会将其视为Promise处理。

  - **await命令后面的 Promise 对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到。**

		async function f() {
		  await Promise.reject('出错了');
		}
		
		f()
		.then(v => console.log(v))
		.catch(e => console.log(e))
		// 出错了

  - 注意，上面代码中，**await语句前面没有return，但是reject方法的参数依然传入了catch方法的回调函数。这里如果在await前面加上return，效果是一样的。**

  - **任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。**

		async function f() {
		  await Promise.reject('出错了');
		  await Promise.resolve('hello world'); // 不会执行
		}

  - 上面代码中，第二个await语句是不会执行的，因为第一个await语句状态变成了reject。

  - **有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。这时可以将第一个await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行。**

		async function f() {
		  try {
		    await Promise.reject('出错了');
		  } catch(e) {
		  }
		  return await Promise.resolve('hello world');
		}
		
		f()
		.then(v => console.log(v))
		// hello world

   - **另一种方法是await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误。**


		async function f() {
		  await Promise.reject('出错了')
		    .catch(e => console.log(e));
		  return await Promise.resolve('hello world');
		}
		
		f()
		.then(v => console.log(v))
		// 出错了
		// hello world

  - **async 函数可以保留运行堆栈。**

	    const a = () => {
		  b().then(() => c());
		};

  - 上面代码中，函数a内部运行了一个异步任务b()。当b()运行的时候，函数a()不会中断，而是继续执行。等到b()运行结束，可能a()早就运行结束了，b()所在的上下文环境已经消失了。如果b()或c()报错，错误堆栈将不包括a()。

  - 现在将这个例子改成async函数。

		const a = async () => {
		  await b();
		  c();
		};

  - 上面代码中，**b()运行的时候，a()是暂停执行，上下文环境都保存着。一旦b()或c()报错，错误堆栈将包括a()。**


**6.async函数的实现原理**

  - async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。

		async function fn(args) {
		  // ...
		}
		
		// 等同于
		
		function fn(args) {
		  return spawn(function* () {
		    // ...
		  });
		}

  - 所有的async函数都可以写成上面的第二种形式，其中的spawn函数就是自动执行器。

  - 下面给出spawn函数的实现，基本就是前文自动执行器的翻版。

		function spawn(genF) {
		  return new Promise(function(resolve, reject) {
		    const gen = genF();
		    function step(nextF) {
		      let next;
		      try {
		        next = nextF();
		      } catch(e) {
		        return reject(e);
		      }
		      if(next.done) {
		        return resolve(next.value);
		      }
		      Promise.resolve(next.value).then(function(v) {
		        step(function() { return gen.next(v); });
		      }, function(e) {
		        step(function() { return gen.throw(e); });
		      });
		    }
		    step(function() { return gen.next(undefined); });
		  });
		}


**7.顶层await**

  - 早期的语法规定是，await命令只能出现在 async 函数内部，否则都会报错。

		// 报错
		const data = await fetch('https://api.example.com');

  - 上面代码中，await命令独立使用，没有放在 async 函数里面，就会报错。

  - **从 ES2022 开始，允许在模块的顶层独立使用await命令，使得上面那行代码不会报错了。它的主要目的是使用await解决模块异步加载的问题。**

  - **注意，顶层await只能用在 ES6 模块，不能用在 CommonJS 模块。这是因为 CommonJS 模块的require()是同步加载，如果有顶层await，就没法处理加载了。**

  - 下面是顶层await的一些使用场景。

		// import() 方法加载
		const strings = await import(`/i18n/${navigator.language}`);
		
		// 数据库操作
		const connection = await dbConnector();
		
		// 依赖回滚
		let jQuery;
		try {
		  jQuery = await import('https://cdn-a.com/jQuery');
		} catch {
		  jQuery = await import('https://cdn-b.com/jQuery');
		}

  - **注意，如果加载多个包含顶层await命令的模块，加载命令是同步执行的。**
		
		// x.js
		console.log("X1");
		await new Promise(r => setTimeout(r, 1000));
		console.log("X2");
		
		// y.js
		console.log("Y");
		
		// z.js
		import "./x.js";
		import "./y.js";
		console.log("Z");

  - 上面代码有三个模块，最后的z.js加载x.js和y.js，打印结果是X1、Y、X2、Z。这说明，z.js并没有等待x.js加载完成，再去加载y.js。

  - 顶层的await命令有点像，交出代码的执行权给其他的模块加载，等异步操作完成后，再拿回执行权，继续向下执行。
  

####  十八、Class 的基本语法 ####

**1.概述**

  - **ES6 的class可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已**

		class Point {
		  constructor(x, y) {
		    this.x = x;
		    this.y = y;
		  }
		
		  toString() {
		    return '(' + this.x + ', ' + this.y + ')';
		  }
		}

 - 上面代码定义了一个“类”，可以看到里面有一个**constructor()方法，这就是构造方法，而this关键字则代表实例对象**。

 - **ES6 的类，完全可以看作构造函数的另一种写法。**

		class Point {
		  // ...
		}
		
		typeof Point // "function"
		Point === Point.prototype.constructor // true

 - 上面代码表明，**类的数据类型就是函数，类本身就指向构造函数。**

 - **使用的时候，也是直接对类使用new命令，跟构造函数的用法完全一致。**

		class Bar {
		  doStuff() {
		    console.log('stuff');
		  }
		}
		
		const b = new Bar();
		b.doStuff() // "stuff"

 - **构造函数的prototype属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面。**

		class Point {
		  constructor() {
		    // ...
		  }
		
		  toString() {
		    // ...
		  }
		
		  toValue() {
		    // ...
		  }
		}
		
		// 等同于
		
		Point.prototype = {
		  constructor() {},
		  toString() {},
		  toValue() {},
		};

- 上面代码中，constructor()、toString()、toValue()这三个方法，其实都是定义在Point.prototype上面。

- **因此，在类的实例上面调用方法，其实就是调用原型上的方法。**

		class B {}
		const b = new B();
		
		b.constructor === B.prototype.constructor // true


- **由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。Object.assign()方法可以很方便地一次向类添加多个方法。**

		class Point {
		  constructor(){
		    // ...
		  }
		}
		
		Object.assign(Point.prototype, {
		  toString(){},
		  toValue(){}
		});

- **prototype对象的constructor属性，直接指向“类”的本身，这与 ES5 的行为是一致的。**

     Point.prototype.constructor === Point // true

- 另外，**类的内部所有定义的方法，都是不可枚举的（non-enumerable）。**

	class Point {
	  constructor(x, y) {
	    // ...
	  }
	
	  toString() {
	    // ...
	  }
	}
	
	Object.keys(Point.prototype)
	// []
	Object.getOwnPropertyNames(Point.prototype)
	// ["constructor","toString"]


- **上面代码中，toString()方法是Point类内部定义的方法，它是不可枚举的。这一点与 ES5 的行为不一致。**

	var Point = function (x, y) {
	  // ...
	};
	
	Point.prototype.toString = function () {
	  // ...
	};
	
	Object.keys(Point.prototype)
	// ["toString"]
	Object.getOwnPropertyNames(Point.prototype)
	// ["constructor","toString"]

- **上面代码采用 ES5 的写法，toString()方法就是可枚举的。**

**2.constructor()方法**

  - **constructor()方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。**
  
  - **一个类必须有constructor()方法，如果没有显式定义，一个空的constructor()方法会被默认添加。**

		class Point {
		}
		
		// 等同于
		class Point {
		  constructor() {}
		}

  - **constructor()方法默认返回实例对象（即this），完全可以指定返回另外一个对象。**

		class Foo {
		  constructor() {
		    return Object.create(null);
		  }
		}
		
		new Foo() instanceof Foo
		// false

  - 上面代码中，constructor()函数返回一个全新的对象，结果导致实例对象不是Foo类的实例。

  - **类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。**

		class Foo {
		  constructor() {
		    return Object.create(null);
		  }
		}
		
		Foo()
		// TypeError: Class constructor Foo cannot be invoked without 'new'

**3.类的实例**

  - **类的实例必须通过new命令生成**

  - **类的属性和方法，除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。**

		class Point {
		  constructor(x, y) {
		    this.x = x;
		    this.y = y;
		  }
		
		  toString() {
		    return '(' + this.x + ', ' + this.y + ')';
		  }
		}
		
		var point = new Point(2, 3);
		
		point.toString() // (2, 3)
		
		point.hasOwnProperty('x') // true
		point.hasOwnProperty('y') // true
		point.hasOwnProperty('toString') // false
		point.__proto__.hasOwnProperty('toString') // true


   - 上面代码中，x和y都是实例对象point自身的属性（因为定义在this对象上），所以hasOwnProperty()方法返回true，而toString()是原型对象的属性（因为定义在Point类上），所以hasOwnProperty()方法返回false。这些都与 ES5 的行为保持一致。

 - **与 ES5 一样，类的所有实例共享一个原型对象。**

		var p1 = new Point(2,3);
		var p2 = new Point(3,2);
		
		p1.__proto__ === p2.__proto__
		//true
 
 - 上面代码中，p1和p2都是Point的实例，它们的原型都是Point.prototype，所以__proto__属性是相等的。

**4.实例属性的新写法**

  -  ES2022 为类的实例属性，又规定了一种新写法。**实例属性现在除了可以定义在constructor()方法里面的this上面，也可以定义在类内部的最顶层。**

		// 原来的写法
		class IncreasingCounter {
		  constructor() {
		    this._count = 0;
		  }
		  get value() {
		    console.log('Getting the current value!');
		    return this._count;
		  }
		  increment() {
		    this._count++;
		  }
		}

  - 上面示例中，实例属性_count定义在constructor()方法里面的this上面。

  - **现在的新写法是，这个属性也可以定义在类的最顶层，其他都不变。**

		class IncreasingCounter {
		  _count = 0;
		  get value() {
		    console.log('Getting the current value!');
		    return this._count;
		  }
		  increment() {
		    this._count++;
		  }
		}
  
  - 上面代码中，实例属性_count与取值函数value()和increment()方法，处于同一个层级。这时，不需要在实例属性前面加上this。

  - **注意，新写法定义的属性是实例对象自身的属性，而不是定义在实例对象的原型上面。**

  - **这种新写法的好处是，所有实例对象自身的属性都定义在类的头部，看上去比较整齐，一眼就能看出这个类有哪些实例属性。**
		
		class foo {
		  bar = 'hello';
		  baz = 'world';
		
		  constructor() {
		    // ...
		  }
		}

- 上面的代码，一眼就能看出，foo类有两个实例属性，一目了然。另外，写起来也比较简洁。


**5.取值函数（getter）和存值函数（setter）**

  - **与ES5一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。**

		class MyClass {
		  constructor() {
		    // ...
		  }
		  get prop() {
		    return 'getter';
		  }
		  set prop(value) {
		    console.log('setter: '+value);
		  }
		}
		
		let inst = new MyClass();
		
		inst.prop = 123;
		// setter: 123
		
		inst.prop
		// 'getter'

   - 上面代码中，prop属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了。

   - **存值函数和取值函数是设置在属性的 Descriptor 对象上的。**

		class CustomHTMLElement {
		  constructor(element) {
		    this.element = element;
		  }
		
		  get html() {
		    return this.element.innerHTML;
		  }
		
		  set html(value) {
		    this.element.innerHTML = value;
		  }
		}
		
		var descriptor = Object.getOwnPropertyDescriptor(
		  CustomHTMLElement.prototype, "html"
		);
		
		"get" in descriptor  // true
		"set" in descriptor  // true

  - 上面代码中，存值函数和取值函数是定义在html属性的描述对象上面，这与 ES5 完全一致。

**6.属性表达式**

  - 类的属性名，可以采用表达式。
	
	let methodName = 'getArea';
	
	class Square {
	  constructor(length) {
	    // ...
	  }
	
	  [methodName]() {
	    // ...
	  }
	}

  - 上面代码中，Square类的方法名getArea，是从表达式得到的。

**7.Class表达式**

  - 与函数一样，类也可以使用表达式的形式定义。

	const MyClass = class Me {
	  getClassName() {
	    return Me.name;
	  }
	};

 - 上面代码使用表达式定义了一个类。**需要注意的是，这个类的名字是Me，但是Me只在 Class 的内部可用，指代当前类。在 Class 外部，这个类只能用MyClass引用。**
	
	let inst = new MyClass();
	inst.getClassName() // Me
	Me.name // ReferenceError: Me is not defined


 - 上面代码表示，Me只在 Class 内部有定义。

 - **如果类的内部没用到的话，可以省略Me**，也就是可以写成下面的形式。

	const MyClass = class { /* ... */ };

 - 采用 Class 表达式，可以写出立即执行的 Class。

	let person = new class {
	  constructor(name) {
	    this.name = name;
	  }
	
	  sayName() {
	    console.log(this.name);
	  }
	}('张三');
	
	person.sayName(); // "张三"

 - 上面代码中，person是一个立即执行的类的实例。

**8.静态方法**

  - **类相当于实例的原型，所有在类中定义的方法，都会被实例继承。**
  
  - **如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。**

	class Foo {
	  static classMethod() {
	    return 'hello';
	  }
	}
	
	Foo.classMethod() // 'hello'
	
	var foo = new Foo();
	foo.classMethod()
	// TypeError: foo.classMethod is not a function

 - 上面代码中，Foo类的classMethod方法前有static关键字，表明该方法是一个静态方法，可以直接在Foo类上调用（Foo.classMethod()），而不是在Foo类的实例上调用。如果在实例上调用静态方法，会抛出一个错误，表示不存在该方法。

 - **注意，如果静态方法包含this关键字，这个this指的是类，而不是实例。**

	class Foo {
	  static bar() {
	    this.baz();
	  }
	  static baz() {
	    console.log('hello');
	  }
	  baz() {
	    console.log('world');
	  }
	}
	
	Foo.bar() // hello

 - 上面代码中，静态方法bar调用了this.baz，这里的this指的是Foo类，而不是Foo的实例，等同于调用Foo.baz。另外，从这个例子还可以看出，静态方法可以与非静态方法重名。

 - **父类的静态方法，可以被子类继承。**
	
	class Foo {
	  static classMethod() {
	    return 'hello';
	  }
	}
	
	class Bar extends Foo {
	}
	
	Bar.classMethod() // 'hello'


 - 上面代码中，父类Foo有一个静态方法，子类Bar可以调用这个方法。

- **静态方法也是可以从super对象上调用的。**

	class Foo {
	  static classMethod() {
	    return 'hello';
	  }
	}
	
	class Bar extends Foo {
	  static classMethod() {
	    return super.classMethod() + ', too';
	  }
	}
	
	Bar.classMethod() // "hello, too"

 
**9.静态属性**

 - 静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。

		class Foo {
		}
		
		Foo.prop = 1;
		Foo.prop // 1

- 上面的写法为Foo类定义了一个静态属性prop。

- 目前，只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。**现在有一个提案提供了类的静态属性，写法是在实例属性的前面，加上static关键字。**

		class MyClass {
		  static myStaticProp = 42;
		
		  constructor() {
		    console.log(MyClass.myStaticProp); // 42
		  }

		}
- 这个新写法大大方便了静态属性的表达。

		// 老写法
		class Foo {
		  // ...
		}
		Foo.prop = 1;
		
		// 新写法
		class Foo {
		  static prop = 1;
		}

-上面代码中，老写法的静态属性定义在类的外部。整个类生成以后，再生成静态属性。这样让人很容易忽略这个静态属性，也不符合相关代码应该放在一起的代码组织原则。另外，新写法是显式声明（declarative），而不是赋值处理，语义更好。

**10.私有属性和私有方法**

  - **ES2022正式为class添加了私有属性，方法是在属性名之前使用#表示**

		class IncreasingCounter {
		  #count = 0;
		  get value() {
		    console.log('Getting the current value!');
		    return this.#count;
		  }
		  increment() {
		    this.#count++;
		  }
		}

  - 上面代码中，#count就是私有属性，只能在类的内部使用（this.#count）。如果在类的外部使用，就会报错。

		const counter = new IncreasingCounter();
		counter.#count // 报错
		counter.#count = 42 // 报错

  - **注意，从 Chrome 111 开始，开发者工具里面可以读写私有属性，不会报错，原因是 Chrome 团队认为这样方便调试。**

  - **另外，不管在类的内部或外部，读取一个不存在的私有属性，也都会报错。这跟公开属性的行为完全不同，如果读取一个不存在的公开属性，不会报错，只会返回undefined。**

		class IncreasingCounter {
		  #count = 0;
		  get value() {
		    console.log('Getting the current value!');
		    return this.#myCount; // 报错
		  }
		  increment() {
		    this.#count++;
		  }
		}
		
		const counter = new IncreasingCounter();
		counter.#myCount // 报错

- 上面示例中，#myCount是一个不存在的私有属性，不管在函数内部或外部，读取该属性都会导致报错。

- **这种写法不仅可以写私有属性，还可以用来写私有方法。**

		class Foo {
		  #a;
		  #b;
		  constructor(a, b) {
		    this.#a = a;
		    this.#b = b;
		  }
		  #sum() {
		    return this.#a + this.#b;
		  }
		  printSum() {
		    console.log(this.#sum());
		  }
		}

  - 上面示例中，#sum()就是一个私有方法。

- **另外，私有属性也可以设置 getter 和 setter 方法。**

		class Counter {
		  #xValue = 0;
		
		  constructor() {
		    console.log(this.#x);
		  }
		
		  get #x() { return this.#xValue; }
		  set #x(value) {
		    this.#xValue = value;
		  }
		}

- 上面代码中，#x是一个私有属性，它的读写都通过get #x()和set #x()操作另一个私有属性#xValue来完成。

- **私有属性不限于从this引用，只要是在类的内部，实例也可以引用私有属性。**

		class Foo {
		  #privateValue = 42;
		  static getPrivateValue(foo) {
		    return foo.#privateValue;
		  }
		}
		
		Foo.getPrivateValue(new Foo()); // 42


- 上面代码允许从实例foo上面引用私有属性。

- **私有属性和私有方法前面，也可以加上static关键字，表示这是一个静态的私有属性或私有方法。**

		class FakeMath {
		  static PI = 22 / 7;
		  static #totallyRandomNumber = 4;
		
		  static #computeRandomNumber() {
		    return FakeMath.#totallyRandomNumber;
		  }
		
		  static random() {
		    console.log('I heard you like random numbers…')
		    return FakeMath.#computeRandomNumber();
		  }
		}
		
		FakeMath.PI // 3.142857142857143
		FakeMath.random()
		// I heard you like random numbers…
		// 4
		FakeMath.#totallyRandomNumber // 报错
		FakeMath.#computeRandomNumber() // 报错

- 上面代码中，#totallyRandomNumber是私有属性，#computeRandomNumber()是私有方法，只能在FakeMath这个类的内部调用，外部调用就会报错。

**11.in运算符**

  - 前面说过，**直接访问某个类不存在的私有属性会报错，但是访问不存在的公开属性不会报错。这个特性可以用来判断，某个对象是否为类的实例。**

		class C {
		  #brand;
		
		  static isC(obj) {
		    try {
		      obj.#brand;
		      return true;
		    } catch {
		      return false;
		    }
		  }
		}

  - 上面示例中，类C的静态方法isC()就用来判断，某个对象是否为C的实例。它采用的方法就是，访问该对象的私有属性#brand。如果不报错，就会返回true；如果报错，就说明该对象不是当前类的实例，从而catch部分返回false。

  - **因此，try...catch结构可以用来判断某个私有属性是否存在。但是，这样的写法很麻烦，代码可读性很差，ES2022 改进了in运算符，使它也可以用来判断私有属性。**

		class C {
		  #brand;
		
		  static isC(obj) {
		    if (#brand in obj) {
		      // 私有属性 #brand 存在
		      return true;
		    } else {
		      // 私有属性 #foo 不存在
		      return false;
		    }
		  }
		}

  - 上面示例中，in运算符判断某个对象是否有私有属性#brand。它不会报错，而是返回一个布尔值。

  - 这种用法的in，也可以跟this一起配合使用。

		class A {
		  #foo = 0;
		  m() {
		    console.log(#foo in this); // true
		  }
		}


   - **注意，判断私有属性时，in只能用在类的内部。另外，判断所针对的私有属性，一定要先声明，否则会报错。**

		class A {
		  m() {
		    console.log(#foo in this); // 报错
		  }
		}

   - 上面示例中，私有属性#foo没有声明，就直接用于in运算符的判断，导致报错。


**12.静态块**

  - 静态属性的一个问题是，如果它有初始化逻辑，这个逻辑要么写在类的外部，要么写在constructor()方法里面。

		class C {
		  static x = 234;
		  static y;
		  static z;
		}
		
		try {
		  const obj = doSomethingWith(C.x);
		  C.y = obj.y
		  C.z = obj.z;
		} catch {
		  C.y = ...;
		  C.z = ...;
		}

  - 上面示例中，静态属性y和z的值依赖于静态属性x的运算结果，这段初始化逻辑写在类的外部（上例的try...catch代码块）。另一种方法是写到类的constructor()方法里面。**这两种方法都不是很理想，前者是将类的内部逻辑写到了外部，后者则是每次新建实例都会运行一次。**

   - **为了解决这个问题，ES2022 引入了静态块（static block），允许在类的内部设置一个代码块，在类生成时运行且只运行一次，主要作用是对静态属性进行初始化。以后，新建类的实例时，这个块就不运行了。**

		class C {
		  static x = ...;
		  static y;
		  static z;
		
		  static {
		    try {
		      const obj = doSomethingWith(this.x);
		      this.y = obj.y;
		      this.z = obj.z;
		    }
		    catch {
		      this.y = ...;
		      this.z = ...;
		    }
		  }
		}

   - 上面代码中，类的内部有一个 static 代码块，这就是静态块。它的好处是将静态属性y和z的初始化逻辑，写入了类的内部，而且只运行一次。

    - **每个类允许有多个静态块，每个静态块中只能访问之前声明的静态属性。另外，静态块的内部不能有return语句。**

    - **静态块内部可以使用类名或this，指代当前类。**
 
			class C {
			  static x = 1;
			  static {
			    this.x; // 1
			    // 或者
			    C.x; // 1
			  }
			}

   - 上面示例中，this.x和C.x都能获取静态属性x。

   - **除了静态属性的初始化，静态块还有一个作用，就是将私有属性与类的外部代码分享**

		let getX;
		
		export class C {
		  #x = 1;
		  static {
		    getX = obj => obj.#x;
		  }
		}
		
		console.log(getX(new C())); // 1

    - 上面示例中，#x是类的私有属性，如果类外部的getX()方法希望获取这个属性，以前是要写在类的constructor()方法里面，这样的话，每次新建实例都会定义一次getX()方法。现在可以写在静态块里面，这样的话，只在类生成时定义一次。


**13.类的注意点**

 （1）**严格模式**

   - **类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。**

 （2）**不存在提升**

   - 类不存在变量提升（hoist），这一点与 ES5 完全不同。

		new Foo(); // ReferenceError
		class Foo {}

   - 上面代码中，Foo类使用在前，定义在后，这样会报错，因为 ES6 不会把类的声明提升到代码头部。这种规定的原因与下文要提到的继承有关，必须保证子类在父类之后定义。

		{
		  let Foo = class {};
		  class Bar extends Foo {
		  }
		}

   - 上面的代码不会报错，因为Bar继承Foo的时候，Foo已经有定义了。但是，如果存在class的提升，上面代码就会报错，因为class会被提升到代码头部，而定义Foo的那一行没有提升，导致Bar继承Foo的时候，Foo还没有定义。

 （3）**name属性**

   - 由于本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被Class继承，包括name属性。

		class Point {}
		Point.name // "Point"

    - **name属性总是返回紧跟在class关键字后面的类名。**

 （4）**Generator方法**

   - 如果某个方法之前加上星号（*），就表示该方法是一个 Generator 函数。

		class Foo {
		  constructor(...args) {
		    this.args = args;
		  }
		  * [Symbol.iterator]() {
		    for (let arg of this.args) {
		      yield arg;
		    }
		  }
		}
		
		for (let x of new Foo('hello', 'world')) {
		  console.log(x);
		}
		// hello
		// world

   - 上面代码中，Foo类的Symbol.iterator方法前有一个星号，表示该方法是一个 Generator 函数。Symbol.iterator方法返回一个Foo类的默认遍历器，for...of循环会自动调用这个遍历器。

 （5）**this的指向**

   - **类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。**

		class Logger {
		  printName(name = 'there') {
		    this.print(`Hello ${name}`);
		  }
		
		  print(text) {
		    console.log(text);
		  }
		}
		
		const logger = new Logger();
		const { printName } = logger;
		printName(); // TypeError: Cannot read property 'print' of undefined


    - 上面代码中，printName方法中的this，默认指向Logger类的实例。但是，如果**将这个方法提取出来单独使用，this会指向该方法运行时所在的环境（由于 class 内部是严格模式，所以 this 实际指向的是undefined），从而导致找不到print方法而报错。**


    - 一个比较简单的解决方法是，**在构造方法中绑定this，**这样就不会找不到print方法了。

		class Logger {
		  constructor() {
		    this.printName = this.printName.bind(this);
		  }
		
		  // ...
		}


    - **另一种解决方法是使用箭头函数。**

		class Obj {
		  constructor() {
		    this.getThis = () => this;
		  }
		}
		
		const myObj = new Obj();
		myObj.getThis() === myObj // true

    - **箭头函数内部的this总是指向定义时所在的对象。**上面代码中，箭头函数位于构造函数内部，它的定义生效的时候，是在构造函数执行的时候。这时，箭头函数所在的运行环境，肯定是实例对象，所以this会总是指向实例对象。


    - **还有一种解决方法是使用Proxy，获取方法的时候，自动绑定this。**

		function selfish (target) {
		  const cache = new WeakMap();
		  const handler = {
		    get (target, key) {
		      const value = Reflect.get(target, key);
		      if (typeof value !== 'function') {
		        return value;
		      }
		      if (!cache.has(value)) {
		        cache.set(value, value.bind(target));
		      }
		      return cache.get(value);
		    }
		  };
		  const proxy = new Proxy(target, handler);
		  return proxy;
		}
		
		const logger = selfish(new Logger());

**14.new.target 属性**

  - new是从构造函数生成实例对象的命令。ES6 为new命令引入了一个new.target属性，该属性一般用在构造函数之中，**返回new命令作用于的那个构造函数**

  - **如果构造函数不是通过new命令或Reflect.construct()调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的。**

		function Person(name) {
		  if (new.target !== undefined) {
		    this.name = name;
		  } else {
		    throw new Error('必须使用 new 命令生成实例');
		  }
		}
		
		// 另一种写法
		function Person(name) {
		  if (new.target === Person) {
		    this.name = name;
		  } else {
		    throw new Error('必须使用 new 命令生成实例');
		  }
		}
		
		var person = new Person('张三'); // 正确
		var notAPerson = Person.call(person, '张三');  // 报错

   - 上面代码确保构造函数只能通过new命令调用。

   - **Class 内部调用new.target，返回当前 Class。**

		class Rectangle {
		  constructor(length, width) {
		    console.log(new.target === Rectangle);
		    this.length = length;
		    this.width = width;
		  }
		}

		var obj = new Rectangle(3, 4); // 输出 true

    - **需要注意的是，子类继承父类时，new.target会返回子类。**

		class Rectangle {
		  constructor(length, width) {
		    console.log(new.target === Rectangle);
		    // ...
		  }
		}
		
		class Square extends Rectangle {
		  constructor(length, width) {
		    super(length, width);
		  }
		}
		
		var obj = new Square(3); // 输出 false

    - 上面代码中，new.target会返回子类。

    - **利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。**

			class Shape {
			  constructor() {
			    if (new.target === Shape) {
			      throw new Error('本类不能实例化');
			    }
			  }
			}
			
			class Rectangle extends Shape {
			  constructor(length, width) {
			    super();
			    // ...
			  }
			} 
			
			var x = new Shape();  // 报错
			var y = new Rectangle(3, 4);  // 正确

    - 上面代码中，Shape类不能被实例化，只能用于继承。

    - **注意，在函数外部，使用new.target会报错。**
    
####  十九、Class 的继承 #### 
 
** 1.简介 **

   - Class可以通过**extends关键字实现继承**，让子类继承父类的属性和方法。

		class Point {
		}
		
		class ColorPoint extends Point {
		}


** 2.super关键字 **

   - **super这个关键字，既可以当作函数使用，也可以当作对象使用**。在这两种情况下，它的用法完全不同

  （1）**super作为函数调用**

    - **super在这里表示父类的构造函数，用来新建一个父类的实例对象。**

    - **注意，这里的super虽然代表了父类的构造函数，但是因为返回的是子类的this（即子类的实例对象），所以super内部的this代表子类的实例，而不是父类的实例，这里的super()相当于A.prototype.constructor.call(this)（在子类的this上运行父类的构造函数）。**

    - **为什么子类的构造函数，一定要调用super()？**
    
        - **原因就在于 ES6 的继承机制，与 ES5 完全不同。**
      
        - **ES5 的继承机制，是先创造一个独立的子类的实例对象，然后再将父类的方法添加到这个对象上面，即“实例在前，继承在后”。**
      
        - **ES6 的继承机制，则是先将父类的属性和方法，加到一个空的对象上面，然后再将该对象作为子类的实例，即“继承在前，实例在后”。这就是为什么 ES6 的继承必须先调用super()方法，因为这一步会生成一个继承父类的this对象，没有这一步就无法继承父类。**

    - **调用super()的作用是形成子类的this对象，把父类的实例属性和方法放到这个this对象上面。子类在调用super()之前，是没有this对象的，任何对this的操作都要放在super()的后面。**

    - **ES6 规定，子类必须在constructor()方法中调用super()，否则就会报错。这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，添加子类自己的实例属性和方法。如果不调用super()方法，子类就得不到自己的this对象。**

		class Point { /* ... */ }
		
		class ColorPoint extends Point {
		  constructor() {
		  }
		}
		
		let cp = new ColorPoint(); // ReferenceError
    
        - 上面代码中，ColorPoint继承了父类Point，但是它的构造函数没有调用super()，导致新建实例时报错。


    - **注意，这意味着新建子类实例时，父类的构造函数必定会先运行一次。**

		class Foo {
		  constructor() {
		    console.log(1);
		  }
		}
		
		class Bar extends Foo {
		  constructor() {
		    super();
		    console.log(2);
		  }
		}
		
		const bar = new Bar();
		// 1
		// 2

     - 上面示例中，子类 Bar 新建实例时，会输出1和2。原因就是子类构造函数调用super()时，会执行一次父类构造函数。

   - 另一个需要注意的地方是，**在子类的构造函数中，只有调用super()之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，必须先完成父类的继承，只有super()方法才能让子类实例继承父类。**


		class Point {
		  constructor(x, y) {
		    this.x = x;
		    this.y = y;
		  }
		}
		
		class ColorPoint extends Point {
		  constructor(x, y, color) {
		    this.color = color; // ReferenceError
		    super(x, y);
		    this.color = color; // 正确
		  }
		}


   - 上面代码中，子类的constructor()方法没有调用super()之前，就使用this关键字，结果报错，而放在super()之后就是正确的。

   - **如果子类没有定义constructor()方法，这个方法会默认添加，并且里面会调用super()。也就是说，不管有没有显式定义，任何一个子类都有constructor()方法。**

		class ColorPoint extends Point {
		}
		
		// 等同于
		class ColorPoint extends Point {
		  constructor(...args) {
		    super(...args);
		  }
		}

  - 有了子类的定义，就可以生成子类的实例了。

		let cp = new ColorPoint(25, 8, 'green');
		
		cp instanceof ColorPoint // true
		cp instanceof Point // true

  - 上面示例中，实例对象cp同时是ColorPoint和Point两个类的实例，这与 ES5 的行为完全一致。

  - **由于super()在子类构造方法中执行时，子类的属性和方法还没有绑定到this，所以如果存在同名属性，此时拿到的是父类的属性。**
		
		class A {
		  name = 'A';
		  constructor() {
		    console.log('My name is ' + this.name);
		  }
		}
		
		class B extends A {
		  name = 'B';
		}
		
		const b = new B(); // My name is A

  - 上面示例中，最后一行输出的是A，而不是B，原因就在于super()执行时，B的name属性还没有绑定到this，所以this.name拿到的是A类的name属性。

 
  - **作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。**

		class A {}
		
		class B extends A {
		  m() {
		    super(); // 报错
		  }
		}

  - 上面代码中，super()用在B类的m方法之中，就会造成语法错误。


（2）super作为对象时

  - **super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。**

		class A {
		  p() {
		    return 2;
		  }
		}
		
		class B extends A {
		  constructor() {
		    super();
		    console.log(super.p()); // 2
		  }
		}
		
		let b = new B();
   
   - 上面代码中，子类B当中的super.p()，就是将super当作一个对象使用。这时，super在普通方法之中，指向A.prototype，所以super.p()就相当于A.prototype.p()。

   - **这里需要注意，由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。**
   
		class A {
		  constructor() {
		    this.p = 2;
		  }
		}
		
		class B extends A {
		  get m() {
		    return super.p;
		  }
		}
		
		let b = new B();
		b.m // undefined

  - 上面代码中，p是父类A实例的属性，super.p就引用不到它。
 
  - **如果属性定义在父类的原型对象上，super就可以取到。**

		class A {}
		A.prototype.x = 2;
		
		class B extends A {
		  constructor() {
		    super();
		    console.log(super.x) // 2
		  }
		}
		
		let b = new B();

  - **ES6 规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。**

		class A {
		  constructor() {
		    this.x = 1;
		  }
		  print() {
		    console.log(this.x);
		  }
		}
		
		class B extends A {
		  constructor() {
		    super();
		    this.x = 2;
		  }
		  m() {
		    super.print();
		  }
		}
		
		let b = new B();
		b.m() // 2

- 上面代码中，super.print()虽然调用的是A.prototype.print()，但是A.prototype.print()内部的this指向子类B的实例，导致输出的是2，而不是1。也就是说，实际上执行的是super.print.call(this)。

- **由于this指向子类实例，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。**

		class A {
		  constructor() {
		    this.x = 1;
		  }
		}
		
		class B extends A {
		  constructor() {
		    super();
		    this.x = 2;
		    super.x = 3;
		    console.log(super.x); // undefined
		    console.log(this.x); // 3
		  }
		}
		
		let b = new B();

- 上面代码中，super.x赋值为3，这时等同于对this.x赋值为3。而当读取super.x的时候，读的是A.prototype.x，所以返回undefined。

- **如果super作为对象 ，用在静态方法之中，这时super将指向父类，而不是父类的原型对象**

		class Parent {
		  static myMethod(msg) {
		    console.log('static', msg);
		  }
		
		  myMethod(msg) {
		    console.log('instance', msg);
		  }
		}
		
		class Child extends Parent {
		  static myMethod(msg) {
		    super.myMethod(msg);
		  }
		
		  myMethod(msg) {
		    super.myMethod(msg);
		  }
		}
		
		Child.myMethod(1); // static 1
		
		var child = new Child();
		child.myMethod(2); // instance 2

- 上面代码中，super在静态方法之中指向父类，在普通方法之中指向父类的原型对象。

- **另外，在子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类，而不是子类的实例。**

		class A {
		  constructor() {
		    this.x = 1;
		  }
		  static print() {
		    console.log(this.x);
		  }
		}
		
		class B extends A {
		  constructor() {
		    super();
		    this.x = 2;
		  }
		  static m() {
		    super.print();
		  }
		}
		
		B.x = 3;
		B.m() // 3

  - 上面代码中，静态方法B.m里面，super.print指向父类的静态方法。这个方法里面的this指向的是B，而不是B的实例。


- **注意，使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。**

		class A {}
		
		class B extends A {
		  constructor() {
		    super();
		    console.log(super); // 报错
		  }
		}


- 上面代码中，console.log(super)当中的super，无法看出是作为函数使用，还是作为对象使用，所以 JavaScript 引擎解析代码的时候就会报错。这时，如果能清晰地表明super的数据类型，就不会报错。

		class A {}
		
		class B extends A {
		  constructor() {
		    super();
		    console.log(super.valueOf() instanceof B); // true
		  }
		}
		
		let b = new B();

- 上面代码中，super.valueOf()表明super是一个对象，因此就不会报错。同时，由于super使得this指向B的实例，所以super.valueOf()返回的是一个B的实例。

- **最后，由于对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字。**

		var obj = {
		  toString() {
		    return "MyObject: " + super.toString();
		  }
		};
		
		obj.toString(); // MyObject: [object Object]


** 3.私有属性和私有方法的继承 **
  
   - **父类所有的属性和方法，都会被子类继承，除了私有的属性和方法。**

   - **子类无法继承父类的私有属性，或者说，私有属性只能在定义它的class里面使用**

		class Foo {
		  #p = 1;
		  #m() {
		    console.log('hello');
		  }
		}
		
		class Bar extends Foo {
		  constructor() {
		    super();
		    console.log(this.#p); // 报错
		    this.#m(); // 报错
		  }
		}

   - 上面示例中，子类 Bar 调用父类 Foo 的私有属性或私有方法，都会报错。

   - **如果父类定义了私有属性的读写方法，子类就可以通过这些方法，读写私有属性。**

		class Foo {
		  #p = 1;
		  getP() {
		    return this.#p;
		  }
		}
		
		class Bar extends Foo {
		  constructor() {
		    super();
		    console.log(this.getP()); // 1
		  }
		}

  - 上面示例中，getP()是父类用来读取私有属性的方法，通过该方法，子类就可以读到父类的私有属性。

** 4.静态属性和静态方法的继承 **

   - **父类的静态属性和静态方法，也会被子类继承。**

		class A {
		  static hello() {
		    console.log('hello world');
		  }
		}
		
		class B extends A {
		}
		
		B.hello()  // hello world

  - 上面代码中，hello()是A类的静态方法，B继承A，也继承了A的静态方法。

  - **注意，静态属性是通过浅拷贝实现继承的**。如果父类的静态属性的值是一个对象，那么子类的静态属性也会指向这个对象，因为浅拷贝只会拷贝对象的内存地址。


		class A {
		  static foo = { n: 100 };
		}
		
		class B extends A {
		  constructor() {
		    super();
		    B.foo.n--;
		  }
		}
		
		const b = new B();
		B.foo.n // 99
		A.foo.n // 99

  - 上面示例中，A.foo的值是一个对象，浅拷贝导致B.foo和A.foo指向同一个对象。所以，子类B修改这个对象的属性值，会影响到父类A。

** 5.Object.getPrototypeOf() **
  
   - **Object.getPrototypeOf()方法可以用来从子类上获取父类。**

		class Point { /*...*/ }
		
		class ColorPoint extends Point { /*...*/ }
		
		Object.getPrototypeOf(ColorPoint) === Point
		// true

   - 因此，可以使用这个方法判断，一个类是否继承了另一个类。

** 6.类的prototype属性和__proto__属性 **

   - 大多数浏览器的 ES5 实现之中，每一个对象都有__proto__属性，指向对应的构造函数的prototype属性。**Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。**
 
  （1）**子类的__proto__属性，表示构造函数的继承，总是指向父类。**

  （2）**子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。**

		class A {
		}
		
		class B extends A {
		}
		
		B.__proto__ === A // true
		B.prototype.__proto__ === A.prototype // true


  - 上面代码中，子类B的__proto__属性指向父类A，子类B的prototype属性的__proto__属性指向父类A的prototype属性。

  - **这样的结果是因为，类的继承是按照下面的模式实现的。**
		
		class A {
		}
		
		class B {
		}
		
		// B 的实例继承 A 的实例
		Object.setPrototypeOf(B.prototype, A.prototype);
		
		// B 继承 A 的静态属性
		Object.setPrototypeOf(B, A);
		
		const b = new B();

  - **《对象的扩展》一章给出过Object.setPrototypeOf方法的实现。**

		Object.setPrototypeOf = function (obj, proto) {
		  obj.__proto__ = proto;
		  return obj;
		}

  - 因此，就得到了上面的结果。

		Object.setPrototypeOf(B.prototype, A.prototype);
		// 等同于
		B.prototype.__proto__ = A.prototype;
		
		Object.setPrototypeOf(B, A);
		// 等同于
		B.__proto__ = A;


  - 这两条继承链，可以这样理解：**作为一个对象，子类（B）的原型（__proto__属性）是父类（A）；作为一个构造函数，子类（B）的原型对象（prototype属性）是父类的原型对象（prototype属性）的实例。**

		B.prototype = Object.create(A.prototype);
		// 等同于
		B.prototype.__proto__ = A.prototype;

  - extends关键字后面可以跟多种类型的值。

		class B extends A {
		}

  - 上面代码的A，只要是一个有prototype属性的函数，就能被B继承。由于函数都有prototype属性（除了Function.prototype函数），因此A可以是任意函数。
 
  - 下面，讨论两种情况。**第一种，子类继承Object类。**

		class A extends Object {
		}
		
		A.__proto__ === Object // true
		A.prototype.__proto__ === Object.prototype // true

  - 这种情况下，A其实就是构造函数Object的复制，A的实例就是Object的实例。

  - **第二种情况，不存在任何继承。**

		class A {
		}
		
		A.__proto__ === Function.prototype // true
		A.prototype.__proto__ === Object.prototype // true

  - 这种情况下，A作为一个 基类（即不存在任何继承），就是一个普通函数，所以直接继承Function.prototype。但是，A调用后返回一个空对象（即Object实例），所以A.prototype.__proto__指向构造函数（Object）的prototype属性。

** 7.实例的__proto__属性 **

   - **子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。也就是说，子类的原型的原型，是父类的原型。**
	
	class A {
	}
	
	class B extends A {
	}
    
    let p1 = new A()
    let p2 = new B()

    B.__proto = A
    B.prototype.__proto__ = A.prototype
    p2.__proto__ = B.prototype
    p1.__proto__ = A.prototype
    P2.__proto__.__proto__ = p1.__proto__

** 8.原生构造函数的继承 **

   - 原生构造函数是指语言内置的构造函数，通常用来生成数据结构。ECMAScript 的原生构造函数大致有下面这些。
		
     - Boolean()
		
     - Number()
	 
     - String()
		
     - Array()
		
     - Date()
		
     - Function()
		
     - RegExp()
		
     - Error()
		
     - Object()
  
  - **以前，这些原生构造函数是无法继承的，**比如，不能自己定义一个Array的子类。

		function MyArray() {
		  Array.apply(this, arguments);
		}
		
		MyArray.prototype = Object.create(Array.prototype, {
		  constructor: {
		    value: MyArray,
		    writable: true,
		    configurable: true,
		    enumerable: true
		  }
		});

  - 上面代码定义了一个继承 Array 的MyArray类。但是，这个类的行为与Array完全不一致。

		var colors = new MyArray();
		colors[0] = "red";
		colors.length  // 0
		
		colors.length = 0;
		colors[0]  // "red"

 - 之所以会发生这种情况，是因为**子类无法获得原生构造函数的内部属性，通过Array.apply()或者分配给原型对象都不行。原生构造函数会忽略apply方法传入的this，也就是说，原生构造函数的this无法绑定，导致拿不到内部属性**


 - **ES5 是先新建子类的实例对象this，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数。**比如，Array构造函数有一个内部属性[[DefineOwnProperty]]，用来定义新属性时，更新length属性，这个内部属性无法在子类获取，导致子类的length属性行为不正常。



 - **ES6 允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象this，然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承。**下面是一个继承Array的例子。

		class MyArray extends Array {
		  constructor(...args) {
		    super(...args);
		  }
		}
		
		var arr = new MyArray();
		arr[0] = 12;
		arr.length // 1
		
		arr.length = 0;
		arr[0] // undefined

 - 上面代码定义了一个MyArray类，继承了Array构造函数，因此就可以从MyArray生成数组的实例。这意味着，ES6 可以自定义原生数据结构（比如Array、String等）的子类，这是 ES5 无法做到的。

 - **注意，继承Object的子类，有一个行为差异。**

		class NewObj extends Object{
		  constructor(){
		    super(...arguments);
		  }
		}
		var o = new NewObj({attr: true});
		o.attr === true  // false


- 上面代码中，**NewObj继承了Object，但是无法通过super方法向父类Object传参。这是因为 ES6 改变了Object构造函数的行为，一旦发现Object方法不是通过new Object()这种形式调用，ES6 规定Object构造函数会忽略参数**。

** 9.Mixin模式的实现 ** 

   - **Mixin 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。**它的最简单实现如下。

		const a = {
		  a: 'a'
		};
		const b = {
		  b: 'b'
		};
		const c = {...a, ...b}; // {a: 'a', b: 'b'}

   - 上面代码中，c对象是a对象和b对象的合成，具有两者的接口。

   - 下面是一个更完备的实现，将多个类的接口“混入”（mix in）另一个类。

		function mix(...mixins) {
		  class Mix {
		    constructor() {
		      for (let mixin of mixins) {
		        copyProperties(this, new mixin()); // 拷贝实例属性
		      }
		    }
		  }
		
		  for (let mixin of mixins) {
		    copyProperties(Mix, mixin); // 拷贝静态属性
		    copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
		  }
		
		  return Mix;
		}
		
		function copyProperties(target, source) {
		  for (let key of Reflect.ownKeys(source)) {
		    if ( key !== 'constructor'
		      && key !== 'prototype'
		      && key !== 'name'
		    ) {
		      let desc = Object.getOwnPropertyDescriptor(source, key);
		      Object.defineProperty(target, key, desc);
		    }
		  }
		}
 
- 上面代码的mix函数，可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。

		class DistributedEdit extends mix(Loggable, Serializable) {
		  // ...


####二十、Module的语法####  

**1.概述**

  - **ES6模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS和AMD模块，都只能在运行时确定这些东西。**

  - 比如，CommonJS模块就是对象， 输入时必须查找对象属性。

		 // CommonJS模块
		let { stat, exists, readfile } = require('fs');
		
		// 等同于
		let _fs = require('fs');
		let stat = _fs.stat;
		let exists = _fs.exists;
		let readfile = _fs.readfile;

  - **上面代码的实质是整体加载fs模块（即加载fs的所有方法），生成一个对象（_fs），然后再从这个对象上面读取 3 个方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。**

  
  - **ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。**

		// ES6模块
		import { stat, exists, readFile } from 'fs';

  - 上面代码的**实质是从fs模块加载 3 个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。**

  - **由于 ES6 模块是编译时加载，使得静态分析成为可能。有了它，就能进一步拓宽 JavaScript 的语法，比如引入宏（macro）和类型检验（type system）这些只能靠静态分析实现的功能。**

  - 除了静态加载带来的各种好处，**ES6 模块还有以下好处**：

    - 不再需要UMD模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。目前，通过各种工具库，其实已经做到了这一点。

    - 将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者navigator对象的属性。

    - 不再需要对象作为命名空间（比如Math对象），未来这些功能可以通过模块提供。


**2.严格模式**

  - **ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";。**

  - 严格模式主要有以下限制：

     - 变量必须声明后再使用
	
     - 函数的参数不能有同名属性，否则报错
	
     - 不能使用with语句
	
     - 不能对只读属性赋值，否则报错
	
     - 不能使用前缀 0 表示八进制数，否则报错
	
     - 不能删除不可删除的属性，否则报错
	
     - 不能删除变量delete prop，会报错，只能删除属性delete global[prop]
	
     - eval不会在它的外层作用域引入变量
	
     - eval和arguments不能被重新赋值
	
     - arguments不会自动反映函数参数的变化
	
     - 不能使用arguments.callee
	
     - 不能使用arguments.caller
	
     - 禁止this指向全局对象
	
     - 不能使用fn.caller和fn.arguments获取函数调用的堆栈
	
     - 增加了保留字（比如protected、static和interface）


- 上面这些限制，模块都必须遵守。其中，尤其需要注意this的限制。ES6 模块之中，顶层的this指向undefined，即不应该在顶层代码使用this。

**3.export命令**
 
  - **模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。**

  - **一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。**

		// profile.js
		export var firstName = 'Michael';
		export var lastName = 'Jackson';
		export var year = 1958;

  - export的写法，除了像上面这样，还有另外一种。

		// profile.js
		var firstName = 'Michael';
		var lastName = 'Jackson';
		var year = 1958;
		
		export { firstName, lastName, year };


  - 上面代码在export命令后面，使用大括号指定所要输出的一组变量。它与前一种写法（直接放置在var语句前）是等价的，但是应该优先考虑使用这种写法。因为这样就可以在脚本尾部，一眼看清楚输出了哪些变量。

  - **export命令除了输出变量，还可以输出函数或类（class）。**

		export function multiply(x, y) {
		  return x * y;
		};

  - **通常情况下，export输出的变量就是本来的名字，但是可以使用as关键字重命名。**

		function v1() { ... }
		function v2() { ... }
		
		export {
		  v1 as streamV1,
		  v2 as streamV2,
		  v2 as streamLatestVersion
		};

   - 上面代码使用as关键字，重命名了函数v1和v2的对外接口。重命名后，v2可以用不同的名字输出两次。

   - 需要特别注意的是，export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。
		
		// 报错
		export 1;
		
		// 报错
		var m = 1;
		export m;

  - 上面两种写法都会报错，因为没有提供对外的接口。第一种写法直接输出 1，第二种写法通过变量m，还是直接输出 1。1只是一个值，不是接口。正确的写法是下面这样。

		 // 写法一
		export var m = 1;
		
		// 写法二
		var m = 1;
		export {m};
		
		// 写法三
		var n = 1;
		export {n as m};

 - 上面三种写法都是正确的，规定了对外的接口m。其他脚本可以通过这个接口，取到值1。**它们的实质是，在接口名与模块内部变量之间，建立了一一对应的关系。**

 - 同样的，function和class的输出，也必须遵守这样的写法。

		// 报错
		function f() {}
		export f;
		
		// 正确
		export function f() {};
		
		// 正确
		function f() {}
		export {f};

  - **目前，export 命令能够对外输出的就是三种接口：函数（Functions）， 类（Classes），var、let、const 声明的变量（Variables）。**

  - **export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。**

		export var foo = 'bar';
		setTimeout(() => foo = 'baz', 500);

  - 上面代码输出变量foo，值为bar，500 毫秒之后变成baz。

  - **这一点与 CommonJS 规范完全不同。CommonJS 模块输出的是值的缓存，不存在动态更新。**

  - **export命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，import命令也是如此。这是因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷。**

		function foo() {
		  export default 'bar' // SyntaxError
		}
		foo()

  - 上面代码中，export语句放在函数之中，结果报错。

**4.import命令**

  - 使用export命令定义了模块的对外接口以后，其他 JS 文件就可以通过import命令加载这个模块。

		// main.js
		import { firstName, lastName, year } from './profile.js';
		
		function setName(element) {
		  element.textContent = firstName + ' ' + lastName;
		}

  - **import命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块（profile.js）对外接口的名称相同。**

  - **如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名。**

       import { lastName as surname } from './profile.js';

  - **import命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。**

		import {a} from './xxx.js'
		
		a = {}; // Syntax Error : 'a' is read-only;

 - 上面代码中，脚本加载了变量a，对其重新赋值就会报错，因为a是一个只读的接口。但是，**如果a是一个对象，改写a的属性是允许的。**

		import {a} from './xxx.js'
		
		a.foo = 'hello'; // 合法操作

 - **import后面的from指定模块文件的位置，可以是相对路径，也可以是绝对路径。如果不带有路径，只是一个模块名，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。**

		import { myMethod } from 'util';

- 上面代码中，util是模块文件名，由于不带有路径，必须通过配置，告诉引擎怎么取到这个模块。

- **注意，import命令具有提升效果，会提升到整个模块的头部，首先执行。**

		foo();
		
		import { foo } from 'my_module';

- 上面的代码不会报错，因为import的执行早于foo的调用。**这种行为的本质是，import命令是编译阶段执行的，在代码运行之前。**

- **由于import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。**

		// 报错
		import { 'f' + 'oo' } from 'my_module';
		
		// 报错
		let module = 'my_module';
		import { foo } from module;
		
		// 报错
		if (x === 1) {
		  import { foo } from 'module1';
		} else {
		  import { foo } from 'module2';
		}

- 上面三种写法都会报错，因为它们用到了表达式、变量和if结构。在静态分析阶段，这些语法都是没法得到值的。

- **import语句会执行所加载的模块，因此可以有下面的写法。**

		import 'lodash';

- 上面代码仅仅执行lodash模块，但是不输入任何值。

- **如果多次重复执行同一句import语句，那么只会执行一次，而不会执行多次。**

		import 'lodash';
		import 'lodash';

- 上面代码加载了两次lodash，但是只会执行一次。

		import { foo } from 'my_module';
		import { bar } from 'my_module';
		
		// 等同于
		import { foo, bar } from 'my_module';

- 上面代码中，虽然foo和bar在两个语句中加载，但是它们对应的是同一个my_module模块。也就是说，import语句是 Singleton 模式。


- **目前阶段，通过 Babel 转码，CommonJS 模块的require命令和 ES6 模块的import命令，可以写在同一个模块里面，但是最好不要这样做。因为import在静态解析阶段执行，所以它是一个模块之中最早执行的。**下面的代码可能不会得到预期结果。

		require('core-js/modules/es6.symbol');
		require('core-js/modules/es6.promise');
		import React from 'React';

**5.模块的整体加载**

  - 除了指定加载某个输出值，还可以使用整体加载，**即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。**

  - 下面是一个circle.js文件，它输出两个方法area和circumference。

		// circle.js
		
		export function area(radius) {
		  return Math.PI * radius * radius;
		}
		
		export function circumference(radius) {
		  return 2 * Math.PI * radius;
		}

  - 现在，加载这个模块。

		// main.js
		
		import { area, circumference } from './circle';
		
		console.log('圆面积：' + area(4));
		console.log('圆周长：' + circumference(14));

  - 上面写法是逐一指定要加载的方法，整体加载的写法如下。
		
		import * as circle from './circle';
		
		console.log('圆面积：' + circle.area(4));
		console.log('圆周长：' + circle.circumference(14));

  - **注意，模块整体加载所在的那个对象（上例是circle），应该是可以静态分析的，所以不允许运行时改变。下面的写法都是不允许的。**

		import * as circle from './circle';
		
		// 下面两行都是不允许的
		circle.foo = 'hello';
		circle.area = function () {};

**6.export default命令**

  - **export default命令，为模块指定默认输出。**

		// export-default.js
		export default function () {
		  console.log('foo');
		}

  - 上面代码是一个模块文件export-default.js，它的默认输出是一个函数。
  
  - **其他模块加载该模块时，import命令可以为该匿名函数指定任意名字。**

		// import-default.js
		import customName from './export-default';
		customName(); // 'foo'

  - **上面代码的import命令，可以用任意名称指向export-default.js输出的方法，这时就不需要知道原模块输出的函数名。需要注意的是，这时import命令后面，不使用大括号。**

  - **export default命令用在非匿名函数前，也是可以的**

		// export-default.js
		export default function foo() {
		  console.log('foo');
		}
		
		// 或者写成
		
		function foo() {
		  console.log('foo');
		}
		
		export default foo;

  - 上面代码中，foo函数的函数名foo，在模块外部是无效的。加载的时候，视同匿名函数加载。

  - 下面比较一下默认输出和正常输出。

		// 第一组
		export default function crc32() { // 输出
		  // ...
		}
		
		import crc32 from 'crc32'; // 输入
		
		// 第二组
		export function crc32() { // 输出
		  // ...
		};+ 
		
		import {crc32} from 'crc32'; // 输入

  - 上面代码的两组写法，**第一组是使用export default时，对应的import语句不需要使用大括号；第二组是不使用export default时，对应的import语句需要使用大括号。**

  - **export default命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此export default命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能唯一对应export default命令。**

  - **本质上，export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。**所以，下面的写法是有效的。

		// modules.js
		function add(x, y) {
		  return x * y;
		}
		export {add as default};
		// 等同于
		// export default add;
		
		// app.js
		import { default as foo } from 'modules';
		// 等同于
		// import foo from 'modules';

  - 正是因为**export default命令其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句。**

		// 正确
		export var a = 1;
		
		// 正确
		var a = 1;
		export default a;
		
		// 错误
		export default var a = 1;

  - 上面代码中，export default a的含义是将变量a的值赋给变量default。所以，最后一种写法会报错。

  - 同样地，**因为export default命令的本质是将后面的值，赋给default变量，所以可以直接将一个值写在export default之后。**
  
		// 正确
		export default 42;
		
		// 报错
		export 42;

  - 上面代码中，后一句报错是因为没有指定对外的接口，而前一句指定对外接口为default。

  - **export default也可以用来输出类。**

		// MyClass.js
		export default class { ... }
		
		// main.js
		import MyClass from 'MyClass';
		let o = new MyClass();

**7.export与import的复合写法**

  - **如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。**
		
		export { foo, bar } from 'my_module';
		
		// 可以简单理解为
		import { foo, bar } from 'my_module';
		export { foo, bar };

  - 上面代码中，export和import语句可以结合在一起，写成一行。**但需要注意的是，写成一行以后，foo和bar实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用foo和bar。**

  - **模块的接口改名和整体输出，也可以采用这种写法。**

		// 接口改名
		export { foo as myFoo } from 'my_module';
		
		// 整体输出
		export * from 'my_module';

 - 默认接口的写法如下。

		export { default } from 'foo';

 - 具名接口改为默认接口的写法如下。

		export { es6 as default } from './someModule';
		
		// 等同于
		import { es6 } from './someModule';
		export default es6;

- 同样地，默认接口也可以改名为具名接口。

		export { default as es6 } from './someModule';

- ES2020 之前，有一种import语句，没有对应的复合写法。

		import * as someIdentifier from "someModule";

- ES2020补上了这个写法。

		export * as ns from "mod";
		
		// 等同于
		import * as ns from "mod";
		export {ns};


**8.模块的继承** 


**9.跨模块常量**


**10.import()**


**11.import.meta**
 





















####  二十一、  ####  