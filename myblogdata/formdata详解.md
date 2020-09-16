---
title: formdata详解
date: 2019-09-13 11:24:56
tags:
cover: /images/psb21.jpg
---
# 简述
FormData对象用以将数据编译成键值对，以便用XMLHttpRequest来发送数据。其主要用于发送表单数据，但亦可用于发送带键数据(keyed data)，而独立于表单使用。如果表单enctype属性设为multipart/form-data ，则会使用表单的submit()方法来发送数据，从而，发送数据具有同样形式。

# FormData的主要用途有两个：
1、将form表单元素的name与value进行组合，实现表单数据的序列化，从而减少表单元素的拼接，提高工作效率。
2、异步上传文件

# 从零开始创建FormData对象

你可以自己创建一个FormData对象，然后调用它的append()方法来添加字段，像这样：
```php
var formData = new FormData();

formData.append("username", "Groucho");
formData.append("accountnum", 123456); //数字123456会被立即转换成字符串 "123456"

// HTML 文件类型input，由用户选择
formData.append("userfile", fileInputElement.files[0]);

// JavaScript file-like 对象
var content = '<a id="a"><b id="b">hey!</b></a>'; // 新文件的正文...
var blob = new Blob([content], { type: "text/xml"});

formData.append("webmasterfile", blob);

var request = new XMLHttpRequest();
request.open("POST", "http://foo.com/submitform.php");
request.send(formData);
```
<strong>注意：</strong>字段 "userfile" 和 "webmasterfile"  都包含一个文件. 字段 "accountnum" 是数字类型，它将被FormData.append()方法转换成字符串类型<font color='red'>(FormData 对象的字段类型可以是 Blob, File, 或者 string: 如果它的字段类型不是Blob也不是File，则会被转换成字符串类)。</font>

上面的示例创建了一个FormData实例，包含"username", "accountnum", "userfile" 和 "webmasterfile"四个字段，然后使用XMLHttpRequest的send()方法发送表单数据。字段 "webmasterfile" 是 Blob类型。一个 Blob对象表示一个不可变的, 原始数据的类似文件对象。Blob表示的数据不一定是一个JavaScript原生格式。 File 接口基于Blob，继承 blob功能并将其扩展为支持用户系统上的文件。你可以通过 Blob() 构造函数创建一个Blob对象。
# 通过表单对formData进行初始化
创建表单：
```php
<form id="advForm">
    <p>广告名称：<input type="text" name="advName"  value="xixi"></p>
    <p>广告类别：<select name="advType">
        <option value="1">轮播图</option>
        <option value="2">轮播图底部广告</option>
        <option value="3">热门回收广告</option>
        <option value="4">优品精选广告</option>
    </select></p>
    <p><input type="button" id="btn" value="添加"></p>
</form>
```
通过表单元素作为参数，实现对formData的初始化：
```php
//获得表单按钮元素
var btn=document.querySelector("#btn");
//为按钮添加点击事件
btn.onclick=function(){
    //根据ID获得页面当中的form表单元素
    var form=document.querySelector("#advForm");
    //将获得的表单元素作为参数，对formData进行初始化
    var formdata=new FormData(form);
    //通过get方法获得name为advName元素的value值
    console.log(formdata.get("advName"));//xixi
    //通过get方法获得name为advType元素的value值
    console.log(formdata.get("advType"));//1 
}
```
# FormData 对象方法介绍
* 通过get(key)与getAll(key)来获取相对应的值
```php
// 获取key为age的第一个值
formdata.get("age"); 
 // 获取key为age的所有值，返回值为数组类型
formdata.getAll("age");
```
* append()
append()方法用于向 FormData 对象中添加键值对(通过append(key,value)在数据末尾追加数据)：
```php
//通过FormData构造函数创建一个空对象
var formdata=new FormData();
//通过append()方法在末尾追加key为name值为laoliu的数据
formdata.append("name","laoliu");
//通过append()方法在末尾追加key为name值为laoli的数据
formdata.append("name","laoli");
//通过append()方法在末尾追加key为name值为laotie的数据
formdata.append("name","laotie");
//通过get方法读取key为name的第一个值
console.log(formdata.get("name"));//laoliu
//通过getAll方法读取key为name的所有值
console.log(formdata.getAll("name"));//["laoliu", "laoli", "laotie"]
```
* 通过set(key, value)来设置修改数据
key的值不存在，会添加一条数据
```php
//通过FormData构造函数创建一个空对象
var formdata=new FormData();
//如果key的值不存在会为数据添加一个key为name值为laoliu的数据
formdata.set("name","laoli");
//通过get方法读取key为name的第一个值
console.log(formdata.get("name"));//laoli
```
key的值存在，会修改对应的value值
```php
//通过FormData构造函数创建一个空对象
var formdata=new FormData();
//通过append()方法在末尾追加key为name值为laoliu的数据
formdata.append("name","laoliu");
//通过append()方法在末尾追加key为name值为laoliu2的数据
formdata.append("name","laoliu2");
//通过get方法读取key为name的第一个值
console.log(formdata.get("name"));//laoliu
//通过getAll方法读取key为name的所有值
console.log(formdata.getAll("name"));//["laoliu", "laoliu2"]

//将存在的key为name的值修改为laoli
formdata.set("name","laoli");
//通过get方法读取key为name的第一个值
console.log(formdata.get("name"));//laoli
//通过getAll方法读取key为name的所有值
console.log(formdata.getAll("name"));//["laoli"]
```
* 通过has(key)来判断是否存在对应的key值
```php
//通过FormData构造函数创建一个空对象
var formdata=new FormData();
//通过append()方法在末尾追加key为name值为laoliu的数据
formdata.append("name","laoliu");
//判断是否包含key为name的数据
console.log(formdata.has("name"));//true
//判断是否包含key为age的数据
console.log(formdata.has("age"));//false
```
* delete()
 接收一个参数，表示你要删除的 key 值的名字,如果有多个相同 key 值，会一并删除：
```php
//通过FormData构造函数创建一个空对象
var formdata=new FormData();
//通过append()方法在末尾追加key为name值为laoliu的数据
formdata.append("name","laoliu");
console.log(formdata.get("name"));//laoliu
//删除key为name的值
formdata.delete("name");
console.log(formdata.get("name"));//null
```
* keys()
*该方法不需要接收参数，返回一个迭代器，通过这个迭代器，我们可以遍历FormData 对象中所有的 key。以上面的form为例：
```php
<form name="form1" id="form1">  

        <p>name:<input type="text" name="name" /></p>  

        <p>gender:<input type="radio" name="gender" value="1" />male <input type="radio" name="gender" value="2" />female</p>

        <p>stu-number：<input type="text" name="number" /></p>  

        <p>photo:<input type="file" name="photo" id="photo"></p>  

        <p><input type="button" name="b1" value="submit" onclick="fsubmit()" /></p>  

</form>  

<p id="result"></p>
```
```php
var formdata=new FormData();
for (var key of formdata.keys()) {

           console.log(key); 

        }  //name,gender,number,photo
```
* values()
有遍历 key 的迭代，当然也就少不了遍历 value 的迭代器了。values()就是遍历value 的迭代器，用法与 keys() 类似：
```php
var formdata=new FormData();
for (var value of formdata.values()) {

           console.log(value); 

        } //sean,1,123456,file{...}
```
* entries()
有遍历 key 的迭代器，也有遍历 value 的迭代器，为何不搞一个两者一起的呢！entries()就是返回一个包含键值对的迭代器：
```php
var formdata=new FormData();
for(var pair of formdata.entries()) {

           console.log(pair[0]+ ', '+ pair[1]); 

        }  // name,sean
           // gender,1
           // number,123456
           // photo,[object,File]
```
# FormData兼容性问题
由于 FormData 是 XMLHttpRequest Level 2 新增的接口，现在 低于IE10 的IE浏览器不支持 FormData ，至于 上面介绍的 FormData 对象的方法经过测试，在 IE 浏览器中都不支持。
