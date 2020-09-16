---
title: parseInt用法理解
date: 2019-02-12 20:02:48
tags:
cover: /images/psb4.jpg
---
&ensp;&ensp;一&ensp;先回忆一下parseInt()的基本语法：<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;1 parseInt(string，radix)可以接受两个参数，第一个参数表示你要转化为数字的字符串，<font color="red">第二个参数radix设置第一个字符串是几进制。</font><br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;2 将字符串转化为整数，parseInt的返回值只有两种可能，不是一个十进制整数，就是NaN。<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;3 如果字符串头部有空格，空格会被自动去除。parseInt('   81') &ensp;&ensp;// 81。<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;4 <font color="red">如果parseInt的参数不是字符串，则会先转为字符串再转换。</font><br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;5 字符串转为整数的时候，是一个个字符依次转换，如果遇到不能转为数字的字符，就不再进行下去，返回已经转好的部分。<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;6 如果字符串的第一个字符不能转化为数字（后面跟着数字的正负号除外），返回NaN。<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;7 如果字符串以0x或0X开头，parseInt会将其按照十六进制数解析。parseInt('0x10') &ensp;&ensp;// 16<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;8 如果字符串以0开头，ECMAScript 3默认使用八进制基数。ECMAScript 5，默认的是十进制的基数。parseInt('011') &ensp;&ensp;//11<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;9 如果参数以0开头，但不是字符串，则会先将数值转成字符串，然后解析，见规则c  parseInt(011) &ensp;&ensp;//9<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;10 对于那些会自动转为科学计数法的数字，parseInt会将科学计数法的表示方法视为字符串，因此导致一些奇怪的结果。<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;parseInt(0.000005)&ensp;&ensp;//0<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;parseInt(0.0000005)&ensp;&ensp;//5</br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;parseInt(6000000000000000000000,10)&ensp;&ensp;//6000000000000000000000<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;parseInt(60000000000000000000000,10)&ensp;&ensp;//6<br/>
&ensp;&ensp;<font color="red">当小数点后的0的个数小于等于5个时，会采用字面量形式直接表示，当小数点后0的个数大于5个时，会采用科学计数法来表示，即：0.000005不会采用科学计数法，而0.0000005则会转换为5e-7，parseInt方法不会将"e"视为数字，因此只是将5转换为10进制，还是5。<br/>
&ensp;&ensp;同理，当小数点前数字位数为21及以下的时候，会采用字面量形式直接表示，而当小数点前数字位数大于21的时候。会采用科学计数法，因此6000000000000000000000会转换为科学计数法，为6e+21，将6转换为10进制还是6。<br/></font>
&ensp;&ensp;二&ensp;例如：</br>
&ensp;&ensp;&ensp;&ensp;&ensp;console(parseInt(3,8))&ensp;&ensp;//3<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;console(parseInt(3,2))&ensp;&ensp;//NaN<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;console(parseInt(3,0))&ensp;&ensp;//3<br/>
&ensp;&ensp;解释一下上面的结果：<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;parseInt里面有两个参数，第二个参数是八进制（0,1,2,3,4,5,6,7），所以认识3，所以返回3。<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;parseInt里面有两个参数，第二个参数是二进制（0,1），所以不认识3，所以返回NaN。<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;parseInt里面有两个参数，第二个参数是0，默认十进制（0,1,2,3,4,5,6,7,8,9），所以认识3，所以返回3。<br/>
&ensp;&ensp;三 下面是几个很奇怪的例子：<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;console(parseInt(1/0,19))&ensp;&ensp;//18<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;console(parseInt(false,16))&ensp;&ensp;//250<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;console(parseInt(parseInt,16))&ensp;&ensp;//15<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;console(parseInt('0x10'))&ensp;&ensp;//16<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;console(parseInt('10',2))&ensp;&ensp;//2<br/>
&ensp;&ensp;解释一下上面的结果：<br/>
&ensp;&ensp;&ensp;&ensp;先console.log(1/0)一下，结果为Infinity。parseInt里面有两个参数，第二个参数是十九进制（0,1,2,3,4,5,6,7,9,a,b,c,d,e,f,g,h,i），I十九进制认识，n不认识，直接返回i(i在十进制里面表示18）<br/>
&ensp;&ensp;&ensp;&ensp;parseInt里面有两个参数，第二个参数是十六进制（0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f）,false字符串（parseInt的世界里没有布尔值），f十六进制认识，a十六进制认识，l不认识，则立即返回fa(十六进制fa转换为十进制是250）。<br/>
&ensp;&ensp;&ensp;&ensp;先console.log(parseInt)一下，结果为'function parseInt()'为字符串。parseInt里面有两个参数，第二个参数是十六进制（0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f）,f十六进制认识，u不认识，则立即返回f(十六进制f转换为十进制是15）。<br/>
&ensp;&ensp;&ensp;&ensp;parseInt里面只有一个参数，则默认十进制（0,1,2,3,4,5,6,7,8,9），0x十六进制的写法，十六进制的10转换为十进制为16（0*16^0+1*16^1=16）。<br/>
&ensp;&ensp;&ensp;&ensp;parseInt里面有两个参数，第二个参数是二进制（0,1），1认识，0认识，返回二进制的10转换为十进制为2。<br/>
<font color="red">总结一下，理解了parseInt中的第二个参数radix是介于2-36的数，计算机中0-9为十进制，再往上十一进制开始用字母表示那么26个字母就可以再十进制上面加多26个进制，即36进制。如果第二个参数不是数值，会被自动转为一个整数。这个整数只有在2到36之间，才能得到有意义的结果，超出这个范围，则返回NaN。如果第二个参数是0、undefined和null，则直接忽略。</font><br/>


