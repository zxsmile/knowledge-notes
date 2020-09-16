---
title: IP地址
date: 2019-05-13 17:44:23
tags:
cover: /images/psb13.jpg
---
**1. MAC地址**
1
&nbsp;&nbsp;&nbsp;&nbsp;MAC（Media Access Control，介质访问控制）地址，或称为物理地址，也叫硬件地址，用来定义网络设备的位置，MAC地址是网卡出厂时设定的，是固定的（但可以通过在设备管理器中或注册表等方式修改，同一网段内的MAC地址必须唯一）。MAC地址采用十六进制数表示，长度是6个字节（48位），分为前24位和后24位。   
<table><tr><td bgcolor=#FAEBD7  align="left" > 1.前24位叫做组织唯一标志符（Organizationally Unique Identifier，即OUI），是由IEEE的注册管理机构给不同厂家分配的代码，区分了不同的厂家。<br/>
2.后24位是由厂家自己分配的，称为扩展标识符。同一个厂家生产的网卡中MAC地址后24位是不同的。</td></tr></table>
MAC地址对应于OSI参考模型的第二层数据链路层，工作在数据链路层的交换机维护着计算机MAC地址和自身端口的数据库，交换机根据收到的数据帧中的“目的MAC地址”字段来转发数据帧。
<hr/>

**2. IP地址**

&nbsp;&nbsp;&nbsp;&nbsp;(1)介绍

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IP地址（Internet Protocol Address），缩写为IP Adress，是一种在Internet上的给主机统一编址的地址格式，也称为网络协议（IP协议）地址。它为互联网上的每一个网络和每一台主机分配一个逻辑地址，常见的IP地址，分为IPv4与IPv6两大类，当前广泛应用的是IPv4，目前IPv4几乎耗尽，下一阶段必然会进行版本升级到IPv6；如无特别注明，一般我们讲的的IP地址所指的是IPv4。
![](IP1.png)
IP地址对应于OSI参考模型的第三层网络层，工作在网络层的路由器根据目标IP和源IP来判断是否属于同一网段，如果是不同网段，则转发数据包。

&nbsp;&nbsp;&nbsp;&nbsp;(2)IP地址的格式和表示
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IP地址(IPv4)由32位二进制数组成，分为4段（4个字节），每一段为8位二进制数（1个字节），每一段8位二进制，中间使用英文的标点符号“.”隔开，由于二进制数太长，为了便于记忆和识别，把每一段8位二进制数转成十进制，大小为0至255。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IP地址的这种表示法叫做“点分十进制表示法”。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IP地址表示为：xxx.xxx.xxx.xxx
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;举个例子：210.21.196.6就是一个IP地址的表示。 

&nbsp;&nbsp;&nbsp;&nbsp;(3)IP地址的组成
![](ip2.png)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IP地址=网络地址+主机地址，比如：
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;计算机的IP地址由两部分组成，一部分为网络标识，一部分为主机标识，同一网段内的计算机网络部分相同，主机部分不同。路由器连接不同网段，负责不同网段之间的数据转发，交换机连接的是同一网段的计算机。通过设置网络地址和主机地址，在互相连接的整个网络中保证每台主机的IP地址不会互相重叠，即IP地址具有了唯一性。

&nbsp;&nbsp;&nbsp;&nbsp;(4)IP地址的分类

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IP地址分A、B、C、D、E五类，其中A、B、C这三类是比较常用的IP地址，D、E类为特殊地址。
![](Ip3.png)
&nbsp;&nbsp;&nbsp;&nbsp;① A类地址

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A类地址第1字节为网络地址（最高位固定是0），另外3个字节为主机地址。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A类地址范围：1.0.0.0 - 126.255.255.255，其中0和127作为特殊地址。
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A类网络默认子网掩码为255.0.0.0，也可写作/8。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A类网络最大主机数量是256×256×256-2=166777214（减去1个主机位为0的网络地址和1个广播地址）。

 <table><tr><td bgcolor=#FAEBD7  align="left" > 在计算机网络中，主机ID全部为0的地址为网络地址，而主机ID全部为1的地址为广播地址，这2个地址是不能分配给主机用的。</td></tr></table>
&nbsp;&nbsp;&nbsp;&nbsp;② B类地址

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; B类地址第1字节（最高位固定是10）和第2字节为网络地址，另外2个字节为主机地址。
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B类地址范围：128.0.0.0 - 191.255.255.255。
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B类网络默认子网掩码为255.255.0.0，也可写作/16。
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B类网络最大主机数量256×256-2=6554。

&nbsp;&nbsp;&nbsp;&nbsp;③ C类地址

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; C类地址第1字节（最高位固定是110）、第2字节和第3个字节，另外1个字节为主机地址。
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C类地址范围：192.0.0.0 - 223.255.255.255。
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C类网络默认子网掩码为255.255.255.0，也可写作/24。
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C类网络最大主机数量256-2=254。

&nbsp;&nbsp;&nbsp;&nbsp;④ D类地址
  
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;D类地址不分网络地址和主机地址，它的第1个字节的最高位固定是1110。
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;D类地址用于组播（也称为多播）的地址，无子网掩码。
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;D类地址范围：224.0.0.0 - 239.255.255.255。

&nbsp;&nbsp;&nbsp;&nbsp;⑤ E类地址

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E类地址也不分网络地址和主机地址，它的第1个字节的最高位固定是11110。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E类地址范围：240.0.0.0 - 255.255.255.255。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;其中240.0.0.0-255.255.255.254作为保留地址，主要用于Internet试验和开发，255.255.255.255作为广播地址。

![](ip4.png)

&nbsp;&nbsp;&nbsp;&nbsp;(5)保留的特殊IP地址

&nbsp;&nbsp;&nbsp;&nbsp;以下这些特殊IP地址都是不能分配给主机用的地址：
    
 * 主机ID全为0的地址：特指某个网段，比如：192.168.10.0 255.255.255.0，指192.168.10.0网段。
 * 主机ID全为1的地址：特指该网段的全部主机，比如：192.168.10.255，如果你的计算机发送数据包使用主机ID全是1的IP地址，数据链层地址用广播地址FF-FF-FF-FF-FF-FF。
 * 127.0.0.1：是本地环回地址，指本机地址，一般用来测试使用。回送地址(127.x.x.x)是本机回送地址(Loopback Address)，即主机IP堆栈内部的IP地址。
 * 169.254.0.0：169.254.0.0-169.254.255.255实际上是自动私有IP地址。
 *   0.0.0.0：如果计算机的IP地址和网络中的其他计算机地址冲突，使用ipconfig命令看到的就是0.0.0.0，子网掩码也是0.0.0.0。

![](ip5.png)

&nbsp;&nbsp;&nbsp;&nbsp;(6)公网和私网IP地址
* 公网IP地址
&nbsp;&nbsp;&nbsp;&nbsp;公有地址分配和管理由Inter NIC（Internet Network Information Center 因特网信息中心）负责。各级ISP使用的公网地址都需要向Inter NIC提出申请，有Inter NIC统一发放，这样就能确保地址块不冲突。

* 私网IP地址
&nbsp;&nbsp;&nbsp;&nbsp;创建IP寻址方案的人也创建了私网IP地址。这些地址可以被用于私有网络，在Internet没有这些IP地址，Internet上的路由器也没有到私有网络的路由表。

    &nbsp;&nbsp;&nbsp;&nbsp;A类：10.0.0.0 255.0.0.0，保留了1个A类网络。
    &nbsp;&nbsp;&nbsp;&nbsp;B类：172.16.0.0 255.255.0.0～172.31.0.0 255.255.0.0，保留了16个B类网络。
    &nbsp;&nbsp;&nbsp;&nbsp;C类：192.168.0.0 255.255.255.0～192.168.255.0 255.255.255.0，保留了256个C类网络。

   &nbsp;&nbsp;&nbsp;&nbsp;私网地址访问Internet需要做NAT或PAT网络地址转换。

![](ip6.png)
![](ip7.png)

<hr/>

**3.子网掩码**

 <table><tr><td bgcolor=#FAEBD7  align="left" > IP地址是以网络号和主机号来标示网络上的主机的，我们把网络号相同的主机称之为本地网络，网络号不相同的主机称之为远程网络主机，本地网络中的主机可以直接相互通信；远程网络中的主机要相互通信必须通过本地网关（Gateway）来传递转发数据。</td></tr></table>
   &nbsp;&nbsp;&nbsp;&nbsp; (1)子网掩码的概念及作用
 
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;① 子网掩码（Subnet Mask）又叫网络掩码、地址掩码，必须结合IP地址一起对应使用。
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;② 只有通过子网掩码，才能表明一台主机所在的子网与其他子网的关系，使网络正常工作。
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;③ 子网掩码和IP地址做“与”运算，分离出IP地址中的网络地址和主机地址，用于判断该IP地址是在本地网络上，还是在远程网络网上。
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;④ 子网掩码还用于将网络进一步划分为若干子网，以避免主机过多而拥堵或过少而IP浪费。

 &nbsp;&nbsp;&nbsp;&nbsp; (2)子网掩码的组成

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;① 同IP地址一样，子网掩码是由长度为32位二进制数组成的一个地址。
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;② 子网掩码32位与IP地址32位相对应，IP地址如果某位是网络地址，则子网掩码为1，否则为0。
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;③ 举个栗子：如：11111111.11111111.11111111.00000000

 <table><tr><td bgcolor=#FAEBD7  align="left" > 注：左边连续的1的个数代表网络号的长度，（使用时必须是连续的，理论上也可以不连续），右边连续的0的个数代表主机号的长度。</td></tr></table>
&nbsp;&nbsp;&nbsp;&nbsp; (3)子网掩码的表示方法

 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;① 点分十进制表示法
 
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;二进制转换十进制，每8位用点号隔开
 
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;例如：子网掩码二进制11111111.11111111.11111111.00000000，表示为255.255.255.0

 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;② CIDR斜线记法
 
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IP地址/n
 
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;例1：192.168.1.100/24，其子网掩码表示为255.255.255.0，二进制表示为11111111.11111111.11111111.00000000
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;例2：172.16.198.12/20，其子网掩码表示为255.255.240.0，二进制表示为11111111.11111111.11110000.00000000
不难发现，例1中共有24个１，例2中共有20个１，所以n是这么来的。运营商ISP常用这样的方法给客户分配IP地址。
 <table><tr><td bgcolor=#FAEBD7  align="left" >注：n为1到32的数字，表示子网掩码中网络号的长度，通过n的个数确定子网的主机数=2^(32-n)-2（-2的原因：主机位全为0时表示本网络的网络地址，主机位全为1时表示本网络的广播地址，这是两个特殊地址）。</td></tr></table>

&nbsp;&nbsp;&nbsp;&nbsp; (4)为什么要使用子网掩码？

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;前面说道，子网掩码可以分离出IP地址中的网络地址和主机地址，那为什么要分离呢？因为两台主机要通信，首先要判断是否处于同一网段，即网络地址是否相同。如果相同，那么可以把数据包直接发送到目标主机，否则就需要路由网关将数据包转发送到目的地。

   <table><tr><td bgcolor=#FAEBD7  align="left" > 可以这么简单的理解：A主机要与B主机通信，A和B各自的IP地址与A主机的子网掩码进行And与运算，看得出的结果：<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 1、结果如果相同，则说明这两台主机是处于同一个网段，这样A可以通过ARP广播发现B的MAC地址，B也可以发现A的MAC地址来实现正常通信。<br/>
 &nbsp;&nbsp;&nbsp;&nbsp; 2、如果结果不同，ARP广播会在本地网关终结，这时候A会把发给B的数据包先发给本地网关，网关再根据B主机的IP地址来查询路由表，再将数据包继续传递转发，最终送达到目的地B。<br/>
   &nbsp;&nbsp;&nbsp;&nbsp; 计算机的网关（Gateway）就是到其他网段的出口，也就是路由器接口IP地址。路由器接口使用的IP地址可以是本网段中任何一个地址，不过通常使用该网段的第一个可用的地址或最后一个可用的地址，这是为了尽可能避免和本网段中的主机地址冲突。</td></tr></table>

&nbsp;&nbsp;&nbsp;&nbsp; (5)子网掩码的分类

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;①、缺省子网掩码

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;也叫默认子网掩码，即未划分子网，对应的网络号的位都置 1 ，主机号都置 0 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;未做子网划分的IP地址：网络号＋主机号

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A类网络缺省子网掩码： 255.0.0.0，用CIDR表示为/8

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B类网络缺省子网掩码： 255.255.0.0，用CIDR表示为/16

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C类网络缺省子网掩码： 255.255.255.0，用CIDR表示为/24

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;②、自定义子网掩码

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;将一个网络划分子网后，把原本的主机号位置的一部分给了子网号，余下的才是给了子网的主机号。其形式如下：

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;做子网划分后的IP地址：网络号＋子网号＋子网主机号

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;举个栗子：

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如：192.168.1.100/25，其子网掩码表示：255.255.255.128

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;意思就是将192.168.1.0这个网段的主机位的最高1位划分为了子网。关于子网划分将在下篇文章讲到，这里不在阐述。
&nbsp;&nbsp;&nbsp;&nbsp; (6)子网掩码和IP地址的关系

&nbsp;&nbsp;&nbsp;&nbsp; 子网掩码是用来判断任意两台主机的IP地址是否属于同一网络的依据，就是拿双方主机的IP地址和自己主机的子网掩码做与运算，如结果为同一网络，就可以直接通信。
&nbsp;&nbsp;&nbsp;&nbsp; 如何根据IP地址和子网掩码，计算网络地址：
&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;① 将IP地址与子网掩码转换成二进制数。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;② 将二进制形式的 IP 地址与子网掩码做“与”运算。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;③ 将得出的结果转化为十进制，便得到网络地址。

<hr/>



