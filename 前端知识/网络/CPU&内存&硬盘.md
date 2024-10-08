1. 电脑的硬件构成，主要分为五个部分：
 
    * 控制器(Control)：是整个计算机的中枢神经，其功能是对程序规定的控制信息进行解释，根据其要求进行控制，调度程序、数据、地址，协调计算机各部分工作及内存与外设的访问等
   
    * 运算器(Datapath)：运算器的功能是对数据进行各种算术运算和逻辑运算，即对数据进行加工处理

    * 存储器(Memory)：存储器的功能是存储程序、数据和各种信号、命令等信息，并在需要时提供这些信息
   
    * 输入(Input system)：输入设备是计算机的重要组成部分，输入设备与输出设备合称为外部设备，简称外设，输入设备的作用是将程序、原始数据、文字、字符、控制命令或现场采集的数据等信息输入到计算机。常见的输入设备有键盘、鼠标器、光电输入机、磁带机、磁盘机、光盘机等
    
    * 输出(Output system)：输出设备与输入设备同样是计算机的重要组成部分，它把外算机的中间结果或最后结果、机内的各种数据符号及文字或各种控制信号等信息输出出来。微机常用的输出设备有显示终端CRT、打印机、激光印字机、绘图仪及磁带、光盘机等
    * CPU是中央处理器，是控制和运算器。内存和硬盘都是存储器，受CPU的指挥。一般是从硬盘中读取程序，在内存中处理，然后再写回到硬盘中。I/O接口是输入/输出的接口。硬盘就是通过I/O接口，把数据送到内存中供CPU处理的

2. 内存

   * 它是与CPU进行沟通的桥梁。计算机中所有程序的运行都是在内存中进行的，因此内存的性能对计算机的影响非常大

   * 内存(Memory)也被称为内存储器，其作用是用于暂时存放CPU中的运算数据，以及与硬盘等外部存储器交换的数据

   * 断电后数据丢失

3. 硬盘

   * 存储资料和软件等数据的设备，有容量大，断电数据不丢失的特点。也被人们称之为“数据仓库”

4. CPU

   * 是计算机的运算核心和控制核心，让电脑的各个部件顺利工作，起到协调和控制作用

   * CPU对数据进行判断以及逻辑处理，本身不能存储数据

5. 三者之间的关系

   * CPU是负责运算和处理的
   
   * 内存是交换数据的

   - (1)CPU即中央处理器，是英语“Central Processing Unit”的缩写。CPU从内存或缓存中取出指令，放入指令寄存器，并对指令译码分解成一系列的微操作，然后发出各种控制命令，执行微操作系列，从而完成一条指令的执行
   
   - (2)但是，CPU并不能直接调用存储在硬盘上的系统、程序和数据，必须首先将硬盘的有关内容存储在内存中，这样才能被CPU读取运行。因而，内存(即物理内存，是相对于硬盘这个“外存”而言)作为硬盘和CPU的“中转站”，对电脑运行速度有较大影响
   
   - (3)当运行数据超出物理内存容纳限度的时候，部分数据就会自行“溢出”，这时系统就会将硬盘上的部分空间模拟成内存——虚拟内存，并将暂时不运行的程序或不使用的数据存放到这部分空间之中，等待需要的时候方便及时调用
   
   - (4)由于内存是带电存储的(一旦断电数据就会消失)，而且容量有限，所以要长时间储存程序或数据就需要使用硬盘(外存储器)。硬盘也会影响系统速度，因为系统从硬盘中读取数据并通过总线存入内存的速度也会影响系统运行的快慢
   
   - (5)形象比喻：“CPU是工厂，硬盘是大仓库，内存是正规中转中心，虚拟内存是临时中转中心”，大致接近实际，但不完全准确


6. CPU从内存调用数据，为什么不从硬盘中获取呢？这就牵扯到一个访问速度的问题

   - 比较三种存储器：硬盘、内存和高速存储器的存取速度，我们发现：

      * 内存的存取速度远高于硬盘的存取速度，而CPU内高速存储器的存取速度更是远高于内存的存取速度。当我们把程序从硬盘放到内存以后，CPU就直接在内存运行程序，这样比CPU直接在硬盘运行程序就要快很多。

      * 内存解决了一部分CPU运行过快，而硬盘数据存取太慢的问题。 提高了我们的电脑的运行速度。

      * 内存就如同一条“高速车道”一般，数据由传输速度较慢的硬盘通过这条高速车道传送至CPU进行处理。

      * 其实内存在这里起了两个作用：

         * 保存从硬盘读取的数据，提供给CPU使用

         * 保存CPU的一些临时执行结果，以便CPU下次使用或保存到硬盘

   - 关于三者之间的关系进行总结，CPU运行的速度很快，但是储存空间很小，如果是大量的数据或是很大的程序就无法运行了，因而如果CPU接收到了指令运行储存在硬盘之中的程序，就需要通过内存这一中枢去传导数据，使得处理数据与传输数据的速度相匹配。硬盘是永久保存数据，拿出来之后就暂时储存在内存里面了，因为这样提取数据的时候速度快比较方便，之后CPU便可以进行数据处理了

7. 系统CPU利用率高是什么原因？

   * 系统中断和切换频繁很耗用CPU，共享资源竞争，大量io交互。CPU太差，主频太低，都是形容CPU差

  * 苹果系统一直是单线程，因为这样减少了N多插队的请求导致的中断减速

8. 用户CPU利用率高是什么原因？ 

   * 计算量大，比如运算，连接查询，数据统计

   * 非空闲等待，比如IO等待、资源争用（同一资源被不同线程请求，而此资源又需要保持一致性，只能前一个释放后一个再访问，这样导致的等待）

   * 过多的系统调用，系统调用即调用操作系统提供的程序接口，比如Java项目中写日志，会调用系统接口进行日志写操作，这样会导致系统CPU使用率过高

   * 过多的中断，中断是CPU用来响应请求的机制，比如键盘的输入，鼠标的点击等都会产生中断，中断是通知CPU有任务需要响应，CPU停下正在执行的程序来响应当前的中断

9. 内存吃紧的原因？ 

   * 多数是过多的页交换和内存泄漏

   * 页交换：内存不够用来存储需要的数据时，操作系统会把原内存中的部分内容释放掉（移除或者存入磁盘），然后把需要的内容载入，这个过程就是页交换

