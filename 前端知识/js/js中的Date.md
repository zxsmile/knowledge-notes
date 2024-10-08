#### 一、创建Date实例 ####

- 在JS中，通过new关键字和Date()构造函数来创建Date实例：

		let now = new Date()
		console.log(now)

- 这段代码**在Node.js中输出**是以下结果：

        2024-09-15T23:58:35.374Z

        - 2024-09-15:日期部分，遵循YYYY-MM-DD 的格式

        - T：分割符，主要的作用就是分割日期和时间，让计算机和用户知道，接下来要显示时间了

        - 23:58:35.374:时间部分，遵循HH:MM:SS.mmm 其中的mmm为毫秒部分

        - Z：标识符，用于标明时区，标识符为Z，说明这个时间是按照UTC时区表示的。

             - UTC时区，即 协调世界时时区（Coordinated Universal Time），是世界时间标准的基础。UTC不属于任何特定的地理时区，而是通过原子时钟精确计时，通过科学方法确定的。**无论身处世界的哪一个时区，UTC时间都是一致的**

             - Z实际上指的是Zulu时间，即另一种说法的UTC。标识为Z说明这个时间是相对于UTC的，没有时区偏差。


#### 二、时区 ####

- 高中地理说过，整个地球被分为了24个时区，如果你坐飞机一路向东，每经过一个时区，你的手表上的时间都应该修改一小时。

- 假设我们在中国是12号的12点，要吃午饭了🍚。而按照时区的划分，美国中部现在却是11号的19点，还是晚上。

- 如果按照当地时间的话，地球上不同时区的时间都是不同的

- 这个问题可就太头疼了，假如我要做外商，需要做一个限时抢购功能。我如果使用的是中国时区，从10号14:00点开抢，那么美国的用户应该在几点开抢呢？想想就头痛。

- 为了解决时区不同，时间不同的问题，科学家们引入了UTC时区，即协调世界时（Coordinated Universal Time）

#### 三、UTC时区 ####

- UTC时区消除了世界各地的时间差异，不管你身处地球何处，你的UTC时区的时间与其他任何地方的时间都是一样的。

- 为什么呢？因为UTC是建立在原子时间的基础上，感兴趣的可自行了解

#### 四、为什么UTC时区要用Z来标识呢？ ####

- 其实就涉及到历史背景了，在过去，使用 NATO（北大西洋公约组织）音标字母（也称为国际音标字母）来代表不同的时区。例如，“Alpha”代表 UTC+1，"Bravo" 代表 UTC+2，以此类推。在这个系统中，"Zulu" 代表了 0 时区，即 UTC。

- 总是用大写字母Z来标识UTC时区，其实是一个历史遗留叫法，就好比JavaScript里面有个Java，你能说JavaScript和Java有关系吗？

#### 五、浏览器输出Date实例 ####

- 上文中为了介绍JS日期的字符串表达方式，我们使用的是Node.js环境，输出的是一行字符串。而我们知道Date实例实际上是一个对象，通过log输出得到的字符串日期其实是Date实例序列化之后的结果。

- 那么我们如果**在浏览器环境输出Date实例**，会发生什么呢？

	let browserNow = new Date()
	console.log(browserNow)
 
    Mon Sep 16 2024 07:58:35 GMT+0800 (中国标准时间)

- 为什么在Node环境下和浏览器环境下输出的结果不一样呢？

- 首先，我们先了解输出的这段字符串是什么意思：

    - Mon：表示今天是星期一

    - Sep：表示现在是九月份
    
    - 16：表示现在是十六号

    - 2024：表示今年是2024年

    - 07:58:35：表示现在是上午7点58分35秒

    - GMT+0800：是一个时区标志

    - GMT：格林尼治标准时间

    - +0800：表示相对于格林尼治标准时间的偏移量，偏移量为+0800。中国的时区统一使用东八区，这整个GMT+0800的意思是，当前所在时区比GMT时区要快8小时

    - (中国标准时间)：提供了时区具体名称，中国整体使用东八区时间

#### 六、为什么Node.js环境与浏览器环境Date实例输出不同？ ####

- 首先我们要知道，Date实例是对象。如果直接输出的话，应当输出一个对象才对。但是我们通过console.log()输出的都是字符串，这时为什么呢？

- console.log()输出的Date类型与环境有关。**在浏览器中，会默认先调用Date.prototyoe.toString()方法，转化为我们在浏览器中看到的格式**
*
- 为了验证我们的说法，我们在Node.js环境下，手动调用Date.prototype.toString()方法再输出

		let now = new Date()
		console.log(now.toString())

        Mon Sep 16 2024 07:58:35 GMT+0800 (中国标准时间)

- 这时候我们发现，Node.js环境下的输出与浏览器一致了！

- 那么在Node.js中，是不是调用Date.prototpye.toUTCString()的方法，转化为UTC格式的字符串输出呢？ 同样的，为了验证我们的说法，我们在浏览器环境下，手动调用Date.prototype.toUTCString()

		let now = new Date()
		console.log(now.toUTCString())

        Sun, 15 Sep 2024 23:58:35 GMT

- 我们发现，欸？！怎么回事，为什么不是2024-09-15T23:58:35.374Z的格式？

- 首先同样是输出当前日期，将为什么调用Date实例的toUTCString()方法后，输出的时间是9月15号的晚上23:58:35；而调用Date实例的toString()方法，输出的时间是9月16号的上午07:58:35呢？


#### 七、Date实例的三种格式转化方法 ####

- 在JS中，Date实例有三种格式转换的方法，它们分别为：

**1.toString()**

   - 将Date对象转化为字符串，**同时使用浏览器所在本地时区的时间表示。在中国的话会显示中国时区的时间，美国的话会显示美国时区的时间**

       Mon Sep 16 2024 07:58:35 GMT+0800 (中国标准时间)

**2.toUTCString()**

   - 将Date对象转化为符合**RFC 1123规范**的字符串，**统一按照UTC时区显示时间，不同地区时间相同，所以与中国时区的时间不同。**其中的GMT是格林威治标准时间，GTM是基于地球自转和太阳相对于格林威治天文台的位置来计算的时间。在1972年以前，它曾经作为全球时间标准

      Sun, 15 Sep 2024 23:58:35 GMT

    - ***为什么调用toUTCSting()，最后的时区标识是GMT？**这其实又是一个JS的历史遗留问题，因为GMT术语用的更多，这是一个历史习惯问题。**实际上的时间，还是基于UTC时区的**。JS真的好多历史遗留问题......

**3.toISOString()**

   - 将Date对象转化为符合**ISO 8601**规范的字符串，同时这个字符串是**基于UTC时区的，不同地区时间相同**。而这个**格式就是之前在node.js环境下输出的日期字符串格式**

 
      node.js环境：2024-09-15T23:58:35.374Z
      浏览器环境：2024-09-15T23:58:35.374Z

#### 八、获取时间戳 ####

- 在JS中，我们可以通过调用Date实例的.getTime()方法，将当前Date实例转化为对应的时间戳

	  let now = new Date()
	  console.log(now.getTime())

      1726448103676

- 那么什么是时间戳呢？**在JS里时间戳表示的是从UTC时区的1970年1月1日到现在所经过的毫秒数。注意是毫秒数哦！这点很重要。**

- 时间戳1726448103676的意思是，按照UTC时区的1970年1月1日后，经过1726448103676毫秒

- 我们也可以通过Date.now()的方法，直接获取当前时间戳

	let now = Date.now()
	console.log(now)

    1726448103676

- 要注意的是，**时间戳是number数字类型，不是对象也不是字符串，注意是number类型！**

#### 九、Date实例 ####

- JS的Date时，需要特别注意一点：**不管如何实例化一个Date对象，JS在本地存储时，都会将它转换成本地时区。**

- Date实例有一个独特的地方。

    - **其他对象求值的时候，都是默认调用.valueOf()方法，但是Date实例求值的时候，默认调用的是toString()方法。**
    
    - **这导致对Date实例求值，返回的是一个字符串，得到本地时间，在不同时区打印new Date()，输出的结果会不一样**：

		new Date() // Wed Feb 09 2022 17:17:50 GMT+0800 (中国标准时间)
		new Date().toString() // Wed Feb 09 2022 17:17:50 GMT+0800 (中国标准时间)

- 在不给Date构造函数传参数的情况下，创建的对象将保存当前日期和时间。

- Date还可以传入一个整数值，表示自1970年1月1日00:00:00以来的毫秒数。

       new Date(1644398818532) // Wed Feb 09 2022 17:26:58 GMT+0800 (中国标准时间)
       new Date().getTime() // 1644398818532

- **如果想要根据指定的日期和时间创建对象，必须传入该日期的毫秒数（即从UTC时间1970年1月1日0点至指定时间经过的毫秒数）。难道我们还要自己计算好毫秒数才能创建相应的时间对象吗？这样岂不是太麻烦了？**

- **针对上面的问题ECMAScript提供了两个方法Date.parse()和Date.UTC()，以此来简化这一计算过程。它们会根据我们传入的参数来自动计算出毫秒数的大小。**下面我们来分别介绍一下这两个方法。

#### 十、Date.parse() ####

- **Date.parse()方法是基于本地时区建立的**。

- Date.parse()方法接收一个表示日期的**字符串参数**，尝试将这个字符串转换为表示该日期的毫秒数。

- ECMA-262第5版定义了**Date.parse()应该支持的日期格式**：

   - "月/日/年"，如 "5/23/2019"

   - "月名 日,年" 如 "May 23,2019"

   - "周几 月名 日 年 时:分:秒 时区"，如"Tue May 23 2019 00:00:00 GMT-0700"；

   - ISO 8601扩展格式“YYYY-MM-DDTHH:mm:ss.sssZ”，如 2019-05-23T00:00:00。


- 比如，要创建一个表示"2019年5月23日"的日期对象，可以使用以下代码：

    new Date(Date.parse('May 23, 2019')) 

    Thu May 23 2019 00:00:00 GMT+0800 (中国标准时间)

- **如果传给Date.parse()的字符串并不表示日期，则该方法会返回NaN。**

- 如果直接把表示日期的字符串传给Date构造函数，那么Date会在后台调用Date.parse()。换句话说，下面这行代码跟前面那行代码是等价的：

    new Date('May 23, 2019') 
  
    Thu May 23 2019 00:00:00 GMT+0800 (中国标准时间)

- **不同的浏览器对Date类型的实现有很多问题。如果我们输入的日期值超过了正常的范围，在不同的浏览器中的会有不同的处理方式**。

    - 例如在解析"January 32，2007"时，有的浏览器会将其解析为February 1，2007"。而Opera浏览器则倾向于插入当前月份的当前日期值，返回"January 当前日期值，2007"。


#### 十一、Date.UTC() ####

- **Date.UTC()方法是基于无时区偏差建立的（和本地时间相差八个小时）**。

- Date.UTC()方法也返回日期的毫秒表示，但**它需要的参数不是字符串，它的参数分别是年份，基于0的月份(0到11)，日(1到31)，小时(0到23)，分钟，秒和毫秒**。

- **这些参数中，只有前两个（年和月）是必需的。如果不提供日，那么默认为1日。其他参数的默认值都是0。**

    **js在本地存储时，都会将它转换成本地时区，需要调用toUTCString()方法来正确显示无时区偏差。 **

	// 内部先得到UTC时间，再被转为本地时区，就多了8个小时。
	new Date(Date.UTC(2000, 0)) // Sat Jan 01 2000 08:00:00 GMT+0800 (中国标准时间)
	
	// 内部先得到UTC时间，再被转为本地时区，就多了8个小时。
	new Date(Date.UTC(2022, 1, 9, 12, 55, 55)) // Wed Feb 09 2022 20:55:55 GMT+0800 (中国标准时间)
	
	// GMT时间2000年1月1日零点
	new Date(Date.UTC(2000, 0)).toUTCString() // "Sat, 01 Jan 2000 00:00:00 GMT"
	
	// GMT时间2022年2月9日下午12点55分55秒
	new Date(Date.UTC(2022, 1, 9, 12, 55, 55)).toUTCString() // "Wed, 09 Feb 2022 12:55:55 GMT"


- **和Date.parse()一样，Date.UTC()也会被Date构造函数隐式调用，但有一个区别：new Date(2000, 0) 这种情况下创建的是本地日期，不是GMT日期。** 

- **不过Date构造函数跟Date.UTC()接收的参数是一样的。因此，如果第一个参数是数值，则构造函数假设它是日期中的年，第二个参数就是月，以此类推**。前面的例子也可以这样来写：

	// 本地时间2000年1月1日零点
	new Date(2000, 0) // Sat Jan 01 2000 00:00:00 GMT+0800 (中国标准时间)

   
    new Date(Date.UTC(2000, 0)) // Sat Jan 01 2000 08:00:00 GMT+0800 (中国标准时间)

	// 本地时间2022年2月9日下午12点55分55秒
	new Date(2022, 1, 9, 12, 55, 55) // Wed Feb 09 2022 12:55:55 GMT+0800 (中国标准时间)


    new Date(Date.UTC(2022, 1, 9, 12, 55, 55)) // Wed Feb 09 2022 20:55:55 GMT+0800 (中国标准时间)

- 以上代码创建了与前面例子中**相同的两个日期，通过比较我们可以看出来无论是显示调用还是隐式调用打印出来的结果都是本地时区，但是会相差8小时**：

     // 28800000 = 8 * 60 * 60 * 1000
     new Date(Date.UTC(2000, 0)) - new Date(2000, 0)


#### 十二、UTC() VS parse() ####

- **Date.UTC()日期指的是在没有时区偏差的情况下(将日期转换为GMT时间)的日期值。**

- **Date.parse()方法是基于本地时区建立的，而Date.UTC()方法是基于无时区偏差建立的。**

- 所以如果我们对两个方法传入相同的时间，我们会发现**Date.UTC()方法得到的毫秒数相对于Date.parse()方法得到的毫秒数会多八个小时的毫秒数(这里的本地时区指的是北京时间)。**

	//假设我们传入相同的时间2022年2月9日
	
	Date.UTC(2022, 1, 9) // 1644364800000
	
	Date.parse('2/9/2022') // 1644336000000
	
	// 1646784000000 - 1644336000000 = 28800000 = 8 * 60 * 60 * 1000

#### 十三、Date.now() ####

- ES5添加了Date.now()方法，**Date.now() 方法返回自1970年1月1日 00:00:00(UTC)到当前时间的毫秒数**。这个方法可以用来分析函数的运行时间，如下：

		// 取得开始时间
		let start = Date.now()
		
		// 调用函数
		doSomething()
		
		// 获取结束时间
		let end = Date.now()
		
		// 得到函数运行时间
		let runtime = start - end

- 在不支持它的浏览器中，我们可以**通过+操作符获取Date对象的时间戳**：

		// 取得开始时间
		let start = +new Date()
		
		// 调用函数
		doSomething()
		
		// 获取结束时间
		let end = +new Date()
		
		// 得到函数运行时间
		let runtime = start - end


#### 十三、继承的方法 ####

- **与其他类型一样，Date类型重写了toLocaleString()、toString()和valueOf()方法**。

- **但与其他类型不同，重写后这些方法的返回值不一样。**
  
     - **Date类型的toLocaleString()方法返回与浏览器运行的本地环境一致的日期和时间。这通常意味着格式中包含针对时间的AM（上午）或PM（下午），但不包含时区信息（具体格式可能因浏览器而不同）。**
  
        let now = new Date()
        console.log(now.toLocaleString()) // 2024/9/16 10:30:34


     - Date类型的toString()方法会返回带有时区信息的日期和时间，其中时间一般以军用时间(范围0到23)表示。

        let now = new Date()
        console.log(now.toString()) // Wed Feb 09 2022 18:24:37 GMT+0800 (中国标准时间)

     - Date类型的**valueOf()方法被重写后返回的是日期的毫秒表示。因此，操作符（如小于号和大于号）可以直接使用它返回的值。**比如下面的例子：

        console.log(new Date().valueOf())  //1726454106657

        let date1 = new Date(2022, 0, 1); // 2022 年 1 月 1 日
		let date2 = new Date(2022, 1, 1); // 2022 年 2 月 1 日
		console.log(date1 < date2); // true
		console.log(date1 > date2); // false

     - **在使用比较操作符，会隐式地调用Date对象的valueOf()方法，然后根据得到的毫秒数来进行比较。**
      

#### 十三、日期格式化方法 ####

Date类型有几个专门用于格式化日期的方法，它们都会返回字符串：

1.toDateString()：返回日期中的周几、月、日、年。

2.toTimeString()：返回日期中的时、分、秒和时区。

3.toLocaleDateString()：返回日期中的周几、月、日、年（格式特定于地区）。

4.toLocaleTimeString()：返回日期中的时、分、秒（格式特定于地区）。

5.toUTCString()：返回完整的UTC日期。

6.toISOString()：返回返回对应时间的ISO 8601写法。

7.toJSON()：返回一个符合JSON格式的ISO 8601日期字符串。与toISOString()方法的返回结果完全相同。

8.toGMTString()：这个方法跟toUTCString()是一样的，目的是为了向后兼容。不过，规范建议新代码使用toUTCString()。

	let now = new Date()
	console.log(now.toDateString()) // Thu Feb 10 2022
	console.log(now.toTimeString()) // 15:46:31 GMT+0800 (中国标准时间)
	console.log(now.toLocaleDateString()) // 2022/2/10
	console.log(now.toLocaleTimeString()) // 下午3:46:31
	console.log(now.toUTCString()) // Thu, 10 Feb 2022 07:47:04 GMT
	console.log(now.toISOString()) // 2022-02-10T15:38:12.529Z
	console.log(now.toJSON()) // 2022-02-10T15:38:12.529Z
	console.log(now.toGMTString()) // Thu, 10 Feb 2022 07:47:14 GMT


- Date类型这些专门用来将日期转化为字符串的方法，不过与toLocaleString()和toString() 的缺点一样，在平常的使用中没有多大价值，所以仅做一下了解就好。


#### 十四、日期/时间组件方法 ####

- Date类型本身的字符串格式化方法在日常使用中用处不大，所以一般我们只有自己编写适用于项目的format方法，这时我们一般需要用到获取日期中特定部分的方法。**注意表中UTC 日期，指的是没有时区偏移（将日期转换为 GMT）时的日期。**如下：

**1.getTime()**：返回表示日期的毫秒数；与valueOf()方法返回的值相同

**2.setTime(毫秒)**：设置日期的毫秒表示，从而修改整个日期

**3.getFullYear()**：取得4位数的年份（如2022而非仅22）

**4.getUTCFullYear()**：返回UTC日期的4位数年份

**5.setFullYear(年)**：设置日期的年份。传入的年份值必须是4位数字（如2022而非仅22）

**6.setUTCFullYear(年)**：设置UTC日期的年份。传入的年份值必须是4位数字（如2022而非仅22）

**7.getMonth()**：返回日期中的月份，其中0表示一月，11表示十二月

**8.getUTCMonth()**：返回日期中的月份，其中0表示一月，11表示十二月

**9.setMonth(月)**：设置日期的月份。传入的月份值必须大于0，超过11则增加年份

**10.setUTCMonth(月)**：设置UTC日期的月份。传入的月份值必须大于0，超过11则增加年份

**11.getDate()**:返回日期月份中的天数（1到31）

**12.getUTCDate()**:返回UTC日期月份中的天数（1到31）

**13.setDate(日)**:设置日期月份中的天数。如果传入的值超过了该月中应有的天数，则增加月份

**14.setUTCDate(日)**:设置UTC日期月份中的天数。如果传入的值超过了该月中应有的天数，则增加月份

**15.getDay()**:返回日期中星期的星期几（其中0表示星期日，6表示星期六）

**16.getUTCDay()**:返回UTC日期中星期的星期几（其中0表示星期日，6表示星期六）

**17.getHours()**:返回日期中的小时数（0到23）

**18.getUTCHours()**:返回UTC日期中的小时数（0到23）

**19.setHours(时)**:设置日期中的小时数。传入的值超过了23则增加月份中的天数

**20.setUTCHours(时)**:设置UTC日期中的小时数。传入的值超过了23则增加月份中的天数

**21.getMinutes()**:返回日期中的分钟数（0到59）

**22.getUTCMinutes()**:返回UTC日期中的分钟数（0到59）

**23.setMinutes(分)**:设置日期中的分钟数。传入的值超过59则增加小时数

**24.setUTCMinutes(分)**:设置UTC日期中的分钟数。传入的值超过59则增加小时数

**25.getSeconds()**:返回日期中的秒数（0到59）

**26.getUTCSeconds()**:返回UTC日期中的秒数（0到59）

**27.setSeconds(秒)**:设置日期中的秒数。传入的值超过了59会增加分钟数

**28.setUTCSeconds(秒)**:设置UTC日期中的秒数。传入的值超过了59会增加分钟数

**29.getMilliseconds()**:返回日期中的毫秒数

**30.getUTCMilliseconds()**:返回UTC日期中的毫秒数

**31.setMilliseconds(毫秒)**:设置日期中的毫秒数

**32.setUTCMilliseconds(毫秒)**:设置UTC日期中的毫秒数

**33.getTimezoneOffset()**:返回本地时间与 UTC 时间相差的分钟数。例如，美国东部标准时间返回300。在某地进入夏令时的情况下，这个值会有所变化


#### 十五、使用日期时间需要注意的地方 ####

1.**用 new Date(string) 就等于 Date.parse(string)，可以让JS来帮你解析一个字符串并转换成时间。如果传入的字符串符合标准格式的话就没有问题，但如果不符合标准的话就会有不同的结果。**

这就是需要特别注意的地方了，**因为格式的问题相同的时间会输出不一样的结果**，比如说下面的代码：

	new Date('2022-02-10') // Thu Feb 10 2022 08:00:00 GMT+0800 (中国标准时间)
	
	new Date('2022/02/10') // Thu Feb 10 2022 00:00:00 GMT+0800 (中国标准时间)

还有另外一种常见的非标准格式：2022-02-10 00:00:00。

	new Date('2022-02-10') // Thu Feb 10 2022 08:00:00 GMT+0800 (中国标准时间)
	
	new Date('2022-02-10 00:00:00') // Thu Feb 10 2022 00:00:00 GMT+0800 (中国标准时间)

- 因为2022-02-10是符合ISO 8601格式的。所以我们看到的结果是+8时区的8点。

- new Date('2022-02-10')就被解析为UTC+0的2月10号0点0分。在它的内部先获取到了一个2022-02-10 00:00:00 GMT+00:00这样的时间，再被转为本地时区，就多了8个小时。

- 而2022/02/10和2022-02-10 00:00:00并不符合ISO 8601格式，所以会产生不同的结果，这里被当做GMT+08:00的本地时区，所以得到的时间，就是0点。

