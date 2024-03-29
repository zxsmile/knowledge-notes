#### 一、为什么要使用DNS ####

- 网络通讯大部分是基于TCP/IP的，而TCP/IP是基于IP地址的，所以计算机在网络上进行通讯时只能识别如“202.96.134.133”之类的IP地址，而不能认识域名。我们无法记住10个以上IP地址的网站，所以我们访问网站时，更多的是在浏览器地址栏中输入域名，就能看到所需要的页面，这是因为有一个叫“DNS服务器”的计算机自动把我们的域名“翻译”成了相应的IP地址，然后调出IP地址所对应的网页。
- 简单的说,通过域名,最终得到该域名对应的IP地址的过程叫做域名解析（或主机名解析）。

		www.dnscache.com (域名)  - DNS解析 -> 11.222.33.444 (IP地址)

- DNS协议运行在UDP协议之上，使用端口号53。

#### 二、DNS 的过程？ ####

- DNS是应用层协议，事实上他是为其他应用层协议工作的，包括不限于HTTP和SMTP以及FTP，用于将用户提供的主机名解析为IP地址。
- 具体过程如下：

  - 用户主机上运行着DNS的客户端，就是我们的PC机或者手机客户端运行着DNS客户端
  - 浏览器将接收到的url中抽取出域名字段，就是访问的主机名，比如 http://www.baidu.com/, 并将这个主机名传送给DNS应用的客户端
  - DNS客户机端向DNS服务器端发送一份查询报文，报文中包含着要访问的主机名字段（中间包括一系列缓存查询以及分布式DNS集群的工作）
  - 该DNS客户机最终会收到一份回答报文，其中包含有该主机名对应的IP地址
  - 一旦该浏览器收到来自DNS的IP地址，就可以向该IP地址定位的HTTP服务器发起TCP连接

#### 三、DNS服务的体系架构是怎样的？ ####

- 主要作用就是将主机域名转换为ip地址
- 假设运行在用户主机上的某些应用程序（如Webl浏览器或者邮件阅读器）需要将主机名转换为IP地址。这些应用程序将调用DNS的客户机端，并指明需要被转换的主机名。用户主机的DNS客户端接收到后，向网络中发送一个DNS查询报文。所有DNS请求和回答报文使用的UDP数据报经过端口53发送，经过若干ms到若干s的延时后，用户主机上的DNS客户端接收到一个提供所希望映射的DNS回答报文。这个查询结果则被传递到调用DNS的应用程序。因此，从用户主机上调用应用程序的角度看，DNS是一个提供简单、直接的转换服务的黑盒子。但事实上，实现这个服务的黑盒子非常复杂，它由分布于全球的大量DNS服务器以及定义了DNS服务器与查询主机通信方式的应用层协议组成。

#### 四、域名服务器 ####

- (1)根域名服务器

  - 最高层次的域名服务器，也是最重要的域名服务器。所有的根域名服务器都知道所有的顶级域名服务器的域名和IP地址。不管是哪一个本地域名服务器，若要对因特网上任何一个域名进行解析，只要自己无法解析，就首先求助根域名服务器。所以根域名服务器是最重要的域名服务器。假定所有的根域名服务器都瘫痪了，那么整个DNS系统就无法工作。需要注意的是，在很多情况下，根域名服务器并不直接把待查询的域名直接解析出IP地址，而是告诉本地域名服务器下一步应当找哪一个顶级域名服务器进行查询。

- (2)顶级域名服务器

   - 负责管理在该顶级域名服务器注册的二级域名。

- (3)权限域名服务器

   - 负责一个“区”的域名服务器。

- (4)本地域名服务器

   - 本地服务器不属于域名服务器的层次结构，但是它对域名系统非常重要。当一个主机发出DNS查询请求时，这个查询请求报文就发送给本地域名服务器。

#### 五、域名的解析过程 ####

- (1)递归查询

   - 主机向本地域名服务器的查询一般都是采用递归查询。所谓递归查询就是：如果主机所询问的本地域名服务器不知道被查询的域名的IP地址，那么本地域名服务器就以DNS客户的身份，向其它根域名服务器继续发出查询请求报文(即替主机继续查询)，而不是让主机自己进行下一步查询。因此，递归查询返回的查询结果或者是所要查询的IP地址，或者是报错，表示无法查询到所需的IP地址。

- (2)迭代查询

  - 本地域名服务器向根域名服务器的查询的迭代查询。迭代查询的特点：当根域名服务器收到本地域名服务器发出的迭代查询请求报文时，要么给出所要查询的IP地址，要么告诉本地服务器：“你下一步应当向哪一个域名服务器进行查询”。然后让本地服务器进行后续的查询。根域名服务器通常是把自己知道的顶级域名服务器的IP地址告诉本地域名服务器，让本地域名服务器再向顶级域名服务器查询。顶级域名服务器在收到本地域名服务器的查询请求后，要么给出所要查询的IP地址，要么告诉本地服务器下一步应当向哪一个权限域名服务器进行查询。最后，知道了所要解析的IP地址或报错，然后把这个结果返回给发起查询的主机。

- (3)举例说明域名解析过程

   * 在浏览器中输入www . qq .com 域名，操作系统会先检查自己本地的hosts文件是否有这个网址映射关系，如果有，就先调用这个IP地址映射，完成域名解析。
   * hosts文件没有就去查本地dns解析器有没有缓存。
   * 如果hosts与本地DNS解析器缓存都没有相应的网址映射关系，首先会找TCP/ip参数中设置的首选DNS服务器，在此我们叫它本地DNS服务器，此服务器收到查询时，如果要查询的域名，包含在本地配置区域资源中，则返回解析结果给客户机，完成域名解析，此解析具有权威性。 
   * 如果要查询的域名，不由本地DNS服务器区域解析，但该服务器已缓存了此网址映射关系，则调用这个IP地址映射，完成域名解析，此解析不具有权威性。
   * 如果本地DNS服务器本地区域文件与缓存解析都失效[ 注：当DNS服务器在接收到DNS客户端的查询请求后，它将在所管辖区域的数据库中寻找是否有该客户端的数据。如果该DNS服务器的区域中没有该客户端的数据（在DNS服务器所在管辖区域数据库中没有该DNS客户端所查询的主机名）时，该DNS服务器需要转向其他的DNS服务器进行查询。DNS服务器可以解析自己区域文件中的域名，对于本服务器查询不了的域名，默认情况下是将直接转发查询请求到根域DNS服务器。除此之外还有一种方法，在DNS服务器上设置转发器将请求转发给其他DNS服务器。转发到转发器的查询一般为递归查询。则根据本地DNS服务器的设置（是否设置转发器）进行查询，如果未用转发模式，本地DNS就把请求发至13台根DNS，根DNS服务器收到请求后会判断这个域名(.com)是谁来授权管理，并会返回一个负责该顶级域名服务器的一个IP。本地DNS服务器收到IP信息后，将会联系负责.com域的这台服务器。这台负责.com域的服务器收到请求后，如果自己无法解析，它就会找一个管理.com域的下一级DNS服务器地址(http://qq.com)给本地DNS服务器。当本地DNS服务器收到这个地址后，就会找http://qq.com域服务器，重复上面的动作，进行查询，直至找到www . qq .com主机。
   * 如果用的是转发模式，此DNS服务器就会把请求转发至上一级DNS服务器，由上一级服务器进行解析，上一级服务器如果不能解析，或找根DNS或把转请求转至上上级，以此循环。不管是本地DNS服务器用是是转发，还是根提示，最后都是把结果返回给本地DNS服务器，由此DNS服务器再返回给客户机。

   * **注：**
      
      * 本机查找完缓存后如果没有结果，会先查找hosts文件，如果没有找到再把查询发送给DNS服务器，但这仅仅是默认情况，这个默认顺序是可以改变的。在/etc/nsswitch.conf中有一行" hosts: files dns"就是定义先查找hosts文件还是先提交给DNS服务器的，如果修改该行为"hosts: dns files"则先提交给DNS服务器，这种情况下hosts文件几乎就不怎么用的上了。
      * 由于缓存是多层次缓存的，所以真正的查询可能并没有那么多步骤，上图的步骤是完全没有所需缓存的查询情况。假如某主机曾经向DNS服务器提交了www.baidu.com的查询，那么在DNS服务器上除了缓存了 www.baidu.com的记录，还缓存了".com"和"baidu.com"的记录，如果再有主机向该DNS服务器提交ftp.baidu.com的查询，那么将跳过".“和”.com"的查询过程直接向baidu.com发出查询请求。
  
      * DNS解析过程中存在两种查询类型：递归查询（从客户机至指定DNS服务器）、迭代查询（从DNS服务器至各个域）。

#### 六、解析顺序 ####

* 浏览器缓存

　　当用户通过浏览器访问某域名时，浏览器首先会在自己的缓存中查找是否有该域名对应的IP地址（若曾经访问过该域名且没有清空缓存便存在）；
　
* 系统缓存

　　当浏览器缓存中无域名对应IP则会自动检查用户计算机系统Hosts文件DNS缓存是否有该域名对应IP；

* 路由器缓存

　　当浏览器及系统缓存中均无域名对应IP则进入路由器缓存中检查，以上三步均为客服端的DNS缓存；

* ISP（互联网服务提供商）DNS缓存

　　当在用户客服端查找不到域名对应IP地址，则将进入ISP DNS缓存中进行查询。比如你用的是电信的网络，则会进入电信的DNS缓存服务器中进行查找；

* 根域名服务器

　　当以上均未完成，则进入根服务器进行查询。全球仅有13台根域名服务器，1个主根域名服务器，其余12为辅根域名服务器。根域名收到请求后会查看区域文件记录，若无则将其管辖范围内顶级域名（如.com）服务器IP告诉本地DNS服务器；

* 顶级域名服务器

　　顶级域名服务器收到请求后查看区域文件记录，若无则将其管辖范围内主域名服务器的IP地址告诉本地DNS服务器；

* 主域名服务器
　　主域名服务器接受到请求后查询自己的缓存，如果没有则进入下一级域名服务器进行查找，并重复该步骤直至找到正确纪录；

* 保存结果至缓存

　　本地域名服务器把返回的结果保存到缓存，以备下一次使用，同时将该结果反馈给客户端，客户端通过这个IP地址与web服务器建立链接。

#### 七、DNS分类 ####
 
* 主DNS服务器： 就是一台存储着原始资料的DNS服务器。
* 从DNS服务器： 使用自动更新方式从主DNS服务器同步数据的DNS服务器。也成辅助DNS服务器。
* 缓存服务器： 不负责本地解析，采用递归方式转发客户机查询请求，并返回结果给客户机的DNS服务器。同时缓存查询回来的结果，也叫递归服务器。
* 转发器： 这台DNS发现非本机负责的查询请求时，不再向根域发起请求，而是直接转发给指定的一台或者多台服务器。自身并不缓存查询结果。

#### 八、解析记录 ####

- (1)A记录：最简单最常用，添加记录时候填写IP地址即可。A记录(Address)是用来指定主机名（或域名）对应的IP地址记录。通过A记录您可以将该域名指向到自己的网站服务器IP地址，同时也可以设置您域名的二级域名。 
- (2)MX记录：是Mail Exchanger的缩写，意思是邮件交换记录。它指向一个邮件服务器，用于电子邮件系统发邮件时根据收信人的地址后缀来定位邮件服务器。例如，当Internet上的某用户要发一封信给 user@vipiis.com时，该用户的邮件系统通过DNS查找vipiis.com这个域名的MX记录，如果MX记录存在， 用户计算机就将邮件发送到MX记录所指定的邮件服务器上。 
- (3)CNAME记录 ：也被称为别名记录，是双线智能解析和使用CDN加速必须用到的解析方法。CNAME解析通常是一个三级域名地址，您可以在主机管理后台"绑定域名"位置看到cname解析地址的信息提示，不同服务器会使用不同的cname解析地址。通过cname解析，可以让域名捆绑到多个服务器IP地址，需要注意的是cname解析地址后面有个英文“.”符号。 因为用到的解析类型是CNAME记录，所以着重学习了解了一下这个类型。以新网为例子，讲解一下该解析的使用步骤：

   * 在主机名处填写www或者其他名称;
   * 在记录类型选择类型为CNAME记录;
   * 在记录值填写别名地址;
   * 点击立即添加，完成添加别名解析。

   - 通常来说，别名解析可以提供更大的灵活性，便于统一管理。举个例子来说，当主机因各种因素的影响需要更换IP时，如果域名做了CNAME记录，就可以同时更新别名的解析指向，不用需要进行新的解析操作，也就是说可以做到无缝更换IP，这对实际中IP的维护是很实用的。而且对于双线主机来说，电信和联通有不同的接口对应不同的IP,由于A记录只能指向一个IP,这时采用别名解析就可以很好的解决这个问题。当然了CNAME记录也存在一定的不足，很多人认为不同的IP会对网站优化产生一定的影响，当蜘蛛每次爬行的时候，IP变化容易让蜘蛛产生网站不稳定的误解。不过见仁见智，到底好不好还需要自己去判断。

- (4)NS记录：是域名DNS服务器记录，全称Name Server记录，用来指定该域名由哪个DNS服务器来对您的域名进行解析。您注册域名时，总有默认的DNS服务器，每个注册的域名都是由一组DNS域名服务器来解析的。
- (5) TXT记录：一种文本记录，仅用于对主机名或者域名的记录信息，对解析无实质影响。
- (6)TTL值：全称是“生存时间（Time To Live)”，简单的说它表示DNS记录在DNS服务器上缓存时间。默认即可。 

- 泛解析：使用“*”建立二级域名解析到同一独立IP。在域名前添加任何子域名，均可解析到指定的服务器IP地址。 


 ![](DNS2.png)     



