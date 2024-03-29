- http://www.360doc.com/content/15/1123/14/737570_515232775.shtml
#### 一、DOS(Denial of Service 拒绝服务) ####

1. 概念

    - DOS攻击是指，攻击者利用网络协议的缺陷或通过野蛮的手段残忍的耗尽被攻击对象的资源，目的是让目标计算机或者网络无法提供正常的服务或资源访问，使目标系统服务系统停止响应甚至崩溃，而在此攻击中并不侵入目标服务器或目标网络设备，单纯利用网络缺陷或暴力消耗即可达到目的。
    - 最常见的DOS攻击有对计算机网络的带宽攻击和连通性攻击。带宽攻击是指以极大的通信量冲击网络，使得所有可用的网络资源都被消耗殆尽，最后导致合法用户请求无法通过。连通性攻击是指用大量的连接请求冲击服务器或计算机，使得所有可用的操作系统资源都被消耗殆尽，最终计算机无法再处理合法用户请求

2. 相关概念

   - (1)半连接：收到SYN包而还未收到ACK包时的连接状态称为半连接，即尚未完全完成三次握手的TCP连接。
   - (2)半连接队列：在三次握手协议中，服务器维护一个半连接队列，该队列为每个客户端的SYN包(SYN=i )开设一个条目，该条目表明服务器已收到SYN包，并向客户发出确认，正在等待客户的确认包。这些条目所标识的连接在服务器处于SYN_ RECV状态，当服务器收到客户的确认包时，删除该条目，服务器进入ESTABLISHED状态。
   - (3)Backlog参数：表示半连接队列的最大容纳数目
   - (4)SYN-ACK重传次数：服务器发送完SYN-ACK包，如果未收到客户确认包，服务器进行首次重传，等待一段时间仍未收到客户确认包，进行第二次重传，如果重传次数超过系统规定的最大重传次数，系统将该连接信息、从半连接队列中删除。注意，每次重传等待的时间不一定相同
   - (5)半连接存活时间：是指半连接队列的条目存活的最长时间，也即服务从收到SYN包到确认这个报文无效的最长时间，该时间值是所有重传请求包的最长等待时间总和。有时也称半连接存活时间为Timeout时间、SYN_RECV存活时间

4. 类型

   - (1)死亡之Ping

      - 死亡之Ping利用的是ICMP,在TCP/IP的RFC文档中对包的最大尺寸都有严格限制规定，许多操作系统的TCP/IP协议栈都规定ICMP包大小为64KB，且在对包的标题头进行读取之后，要根据该标题头里包含的信息来为有效载荷生成缓冲区。"死亡之Ping"就是故意产生畸形的测试Ping（PacketInternetGroper）包，声称自己的尺寸超过ICMP上限，也就是加载的尺寸超过64KB上限，使未采取保护措施的网络系统出现内存分配错误，导致TCP/IP协议栈崩溃，最终接收方宕机

  - (2)泪滴

     - 泪滴是一个特殊构造的应用程序，通过发送伪造的相互重叠的IP分组数据包，使其难以被接收主机重新组合。他们通常会导致目标主机内核失措。 泪滴攻击利用IP分组数据包重叠造成TCP/ IP分片重组代码不能恰当处理IP包。 泪滴攻击不被认为是一个严重的DOS攻击，不会对主机系统造成重大损失。 在大多数情况下，一次简单的重新启动是最好的解决办法，但重新启动操作系统可能导致正在运行的应用程序中未保存的数据丢失。

  - (3)UDP洪水

     - 如echo服务会显示接收到的每一个数据包，而原本作为测试功能的chargen服务会在收到每一个数据包时随机反馈一些字符
     - UDPflood假冒攻击就是利用这两个简单的TCP/IP服务的漏洞进行恶意攻击，通过伪造与某一主机的Chargen服务之间的一次的UDP连接，回复地址指向开着Echo服务的一台主机，通过将Chargen和Echo服务互指，来回传送毫无用处且占满带宽的垃圾数据，在两台主机之间生成足够多的无用数据流，这一拒绝服务攻击飞快地导致网络可用带宽耗尽

  - (4)SYN洪水

     - 首先是请求服务方发送一个SYN（SynchronizeSequenceNumber）消息，服务方收到SYN后，会向请求方回送一个SYN-ACK表示确认，当请求方收到SYN-ACK后，再次向服务方发送一个ACK消息，这样一次TCP连接建立成功。

     - “SYNFlooding”则专门针对TCP协议栈在两台主机间初始化连接握手的过程进行DoS攻击，

     - 实现过程：当服务方收到请求方的SYN-ACK确认消息后，请求方由于采用源地址欺骗等手段使得服务方收不到ACK回应，于是服务方会在一定时间处于等待接收请求方ACK消息的状态。而对于某台服务器来说，可用的TCP连接是有限的，因为它们只有有限的内存缓冲区用于创建连接，如果这一缓冲区充满了虚假连接的初始信息，该服务器就会对接下来的连接停止响应，直至缓冲区里的连接企图超时。如果恶意攻击方快速连续地发送此类连接请求，该服务器可用的TCP连接队列将很快被阻塞，系统可用资源急剧减少，网络可用带宽迅速缩小，长此下去，除了少数幸运用户的请求可以插在大量虚假请求间得到应答外，服务器将无法向用户提供正常的合法服务

  - (5)IP欺骗

     - 这种攻击利用TCP协议栈的RST位来实现，使用IP欺骗，迫使服务器把合法用户的连接复位，影响合法用户的连接。
     - TCP的RST:当 RST = 1 的时候，表示 TCP 连接中出现严重错误，需要释放并重新建立连接。一般称携带 RST 标志的 TCP 报文段为「复位报文段」
     - 假设有一个合法用户（100.100.100.100）已经同服务器建了正常的连接，攻击者构造攻击的TCP数据，伪装自己的IP为100.100.100.100，并向服务器发送一个带有RST位的TCP数据段。服务器接收到这样的数据后，认为从100.100.100.100发送的连接有错误，就会清空缓冲区中已建立好的连接。这时，合法用户100.100.100.100再发送合法数据，服务器就已经没有这样的连接了，该用户就被拒绝服务而只能重新开始建立新的连接。


#### 二、DDOS(Distributed Denial of Service 分布式拒绝服务攻击) ####

1. DDOS的出现

   - DoS攻击是最早出现的，它的攻击方法说白了就是单挑，是比谁的机器性能好、速度快。但是现在的科技飞速发展，一般的网站主机都有十几台主机，而且各个主机的处理能力、内存大小和网络速度都有飞速的发展，有的网络带宽甚至超过了千兆级别。这样我们的一对一单挑式攻击就没有什么作用了，搞不好自己的机子就会死掉。举个这样的攻击例子，假如你的机器每秒能够发送10个攻击用的数据包，而被你攻击的机器(性能、网络带宽都是顶尖的)每秒能够接受并处理100攻击数据包，那样的话，你的攻击就什么用处都没有了，而且非常有死机的可能。要知道，你若是发送这种1Vs1的攻击，你的机器的CPU占用率是90%以上的，你的机器要是配置不够高的话，那你就死定了。
   - 不过，科技在发展，黑客的技术也在发展。黑客们又找到一种新的DoS攻击方法，这就是DDoS攻击。它的原理说白了就是群殴，用好多的机器对目标机器一起发动DoS攻击，但这不是很多黑客一起参与的，这种攻击只是由一名黑客来操作的。这名黑客不是拥有很多机器，他是通过他的机器在网络上占领很多的“肉鸡”，并且控制这些“肉鸡”来发动DDoS攻击，要不然怎么叫做分布式呢。还是刚才的那个例子，你的机器每秒能发送10攻击数据包，而被攻击的机器每秒能够接受100的数据包，这样你的攻击肯定不会起作用，而你再用10台或更多的机器来对被攻击目标的机器进行攻击的话，嘿嘿!结果我就不说了
   
2. 概念

   - 攻击者简单利用工具集合许多的网络带宽来同时对同一个目标发动大量的攻击请求

3. 类型

   - (1)ICMP Flood

      - ICMP（Internet控制报文协议）用于在IP主机、路由器之间传递控制消息，控制消息是指网络通不通、主机是否可达、路由是否可用等网络本身的消息，虽然并不传输用户数据，但是对于用户数据的传递起着重要的作用。通过对目标系统发送海量数据包，就可以令目标主机瘫痪，如果大量发送就成了洪水攻击。

   - (2)UDP Flood

      - UDP协议是一种无连接的服务，在UDP Flood 中，攻击者通常发送大量伪造源IP地址的小UDP包冲击DNS服务器或Radius认证服务器、流媒体视频服务器。100k bps的UDP Flood经常将线路上的骨干设备例如防火墙打瘫，造成整个网段的瘫痪。
      - 上述传统的流量型攻击方式技术含量较低，伤人一千自损八百，攻击效果通常依赖受控主机本身的网络性能，而且容易被查到攻击源头，单独使用的情况已不常见。于是，具有四两拔千斤效果的反射型放大攻击就出现了。

   - (3)NTP Flood

       - NTP是标准的基于UDP协议传输的网络时间同步协议，由于UDP协议的无连接性，方便伪造源地址。攻击者使用特殊的数据包，也就是IP地址指向作为反射器的服务器，源IP地址被伪造成攻击目标的IP，反射器接收到数据包时就被骗了，会将响应数据发送给被攻击目标，耗尽目标网络的带宽资源。一般的NTP服务器都有很大的带宽，攻击者可能只需要1Mbps的上传带宽欺骗NTP服务器，就可给目标服务器带来几百上千Mbps的攻击流量。
       - 因此，“问-答”方式的协议都可以被反射型攻击利用，将质询数据包的地址伪造为攻击目标地址，应答的数据包就会都被发送至目标，一旦协议具有递归效果，流量就被显著放大了，堪称一种“借刀杀人”的流量型攻击。

   - (4)SYN Flood

      - 这是一种利用TCP协议缺陷，发送大量伪造的TCP连接请求，从而使得被攻击方资源耗尽（CPU满负荷或内存不足）的攻击方式。建立TCP连接，需要三次握手——客户端发送SYN报文，服务端收到请求并返回报文表示接受，客户端也返回确认，完成连接。
      - SYN Flood 就是用户向服务器发送报文后突然死机或掉线，那么服务器在发出应答报文后就无法收到客户端的确认报文（第三次握手无法完成），这时服务器端一般会重试并等待一段时间后再丢弃这个未完成的连接。一个用户出现异常导致服务器的一个线程等待一会儿并不是大问题，但恶意攻击者大量模拟这种情况，服务器端为了维护数以万计的半连接而消耗非常多的资源，结果往往是无暇理睬客户的正常请求，甚至崩溃。从正常客户的角度看来，网站失去了响应，无法访问

  - (5)CC 攻击

     - CC攻击是目前应用层攻击的主要手段之一，借助代理服务器生成指向目标系统的合法请求，实现伪装和DDoS。我们都有这样的体验，访问一个静态页面，即使人多也不需要太长时间，但如果在高峰期访问论坛、贴吧等，那就很慢了，因为服务器系统需要到数据库中判断访问者否有读帖、发言等权限。访问的人越多，论坛的页面越多，数据库压力就越大，被访问的频率也越高，占用的系统资源也就相当可观。
     - CC攻击就充分利用了这个特点，模拟多个正常用户不停地访问如论坛这些需要大量数据操作的页面，造成服务器资源的浪费，CPU长时间处于100%，永远都有处理不完的请求，网络拥塞，正常访问被中止。这种攻击技术性含量高，见不到真实源IP，见不到特别大的异常流量，但服务器就是无法进行正常连接。
     - 之所以选择代理服务器是因为代理可以有效地隐藏自己的身份，也可以绕开防火墙，因为基本上所有的防火墙都会检测并发的TCP/IP连接数目，超过一定数目一定频率就会被认为是Connection-Flood。当然也可以使用肉鸡来发动CC攻击，攻击者使用CC攻击软件控制大量肉鸡发动攻击，肉鸡可以模拟正常用户访问网站的请求伪造成合法数据包，相比前者来说更难防御。
     - CC攻击是针对Web服务在第七层协议发起的攻击，在越上层协议上发动DDoS攻击越难以防御，上层协议与业务关联愈加紧密，防御系统面临的情况也会更复杂。比如CC攻击中最重要的方式之一HTTP Flood，不仅会直接导致被攻击的Web前端响应缓慢，对承载的业务造成致命的影响，还可能会引起连锁反应，间接攻击到后端的Java等业务层逻辑以及更后端的数据库服务。
     - 由于CC攻击成本低、威力大，安全专家发现80%的DDoS攻击都是CC攻击。带宽资源严重被消耗，网站瘫痪；CPU、内存利用率飙升，主机瘫痪；瞬间快速打击，无法快速响应

  - (6)DNS Query Flood

     - DNS Query Flood采用的方法是操纵大量傀儡机器，向目标服务器发送大量的域名解析请求。服务器在接收到域名解析请求时，首先会在服务器上查找是否有对应的缓存，若查找不到且该域名无法直接解析时，便向其上层DNS服务器递归查询域名信息。
     - 通常，攻击者请求解析的域名是随机生成或者是网络上根本不存在的域名，由于在本地无法查到对应的结果，服务器必须使用递归查询向上层域名服务器提交解析请求，引起连锁反应。解析过程给服务器带来很大的负载，每秒钟域名解析请求超过一定的数量就会造成DNS服务器解析域名超时

4. 如何应对 DDoS 攻击？

   - (1)高防服务器

      - 高防服务器主要是指能独立硬防御 50Gbps 以上的服务器，能够帮助网站拒绝服务攻击，定期扫描网络主节点等，这东西是不错，就是价格昂贵

   - (2)黑名单

      - 设置黑名单，此方法秉承的就是“错杀一千，也不放一百”的原则，会封锁正常流量，影响到正常业务。

   - (3)DDoS 清洗

      - DDos 清洗，就是我发现客人进店几分钟以后，但是一直不买东西，我就把他踢出店里。
      - DDoS 清洗会对用户请求数据进行实时监控，及时发现DOS攻击等异常流量，在不影响正常业务开展的情况下清洗掉这些异常流量。

   - (4)CDN 加速

      - CDN 加速，我们可以这么理解：为了减少流氓骚扰，我干脆将商店开到了线上，承接外卖服务，这样流氓找不到店在哪里，也耍不来流氓了。
      - 在现实中，CDN 服务将网站访问流量分配到了各个节点中，这样一方面隐藏网站的真实 IP，另一方面即使遭遇 DDoS 攻击，也可以将流量分散到各个节点中，防止源站崩溃。

5. DOS和DDOS区别

      - 通过上面分析可以知道，DOS和DDOS最大的区别就是数量级的区别，DOS相对于DDOS来说就像是一个个体，而DDOS是无数个DOS的集合。另一方面，DDOS攻击方式较为自动化，攻击者可以把他的程序安装到网络中的多台机器上面，所采用的这种攻击方式很难被攻击对象察觉，直到攻击者发下统一的攻击命令，这些机器才统一发起攻击
