---
title: js中的数组sort比较函数及原理
date: 2019-02-15 20:56:14
tags:
cover: /images/psb5.jpg
---
&ensp;&ensp;sort()方法用于对数组中的元素进行排序，当我们的数组中的元素都是字符串的时候不会有问题，但当我们的数组中的元素为数据时就会产生问题，比如：15和5比较谁更大，就会产生5比15大的结果，因为sort在进行比较时会调用toString()将数值转化为字符串，然后利用字符串规则进行比较。因此sort()方法可以接受一个比较函数作为参数，来解决这个问题。<br/>
```php
//定义一个比较函数sortfunction：<br/>
function sortfunction(a,b){
return a-b //升序
//return b-a 降序
}
```
```php
//compare()函数是升序的另一种写法：
function sortfunction(a,b){
if(a>b){
return 1;
}else if(a==b){
return 0
}else{
return -1
}
```
```php
//compare()函数是降序的另一种写法：
function sortfunction(a,b){
if(a>b){
return -1;
}else if(a==b){
return 0
}else{
return 1
}
```
```php
//定义一个数组
var myArray=[80,16,50,6,100,1];
//使用sort()
myArray.sort(sortfunction);
```
&ensp;&ensp;数组的sort()方法内部是如何运作的呢？<br/>
&ensp;&ensp;<font color='red'>sort()内部排序思想类似于冒泡排序思想，通过前后相邻的两个数进行比较，例如80与16，这时将80作为方法函数sortfunction(a,b)参数列表中的a，16作为b，通过语句return a-b；返回一个数组，80-16=64，若返回值>=1，则表示a在排序后的序列中会出现在b之后，所以80会在排序后出现在16之后，此时，新的数据序列为16，80,50，6，100,1，再将80作为a，50作为b进行上述的做法，第一轮下来，100就会排在最后，又开始新的一轮排序，就是类似于冒泡排序的思想吧。</font><br/>