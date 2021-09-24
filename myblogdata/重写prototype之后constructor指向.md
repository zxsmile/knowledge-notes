---
title: 重写prototype之后constructor指向
date: 2019-02-22 20:13:43
tags:
cover: /images/psb9.jpg
---

**原型对象**
&ensp;&ensp;用function定义的方法（对象方法）有一个prototype属性，使用new生成的对象就没有这个prototype属性。也就是prototype是对象方法或者构造方法的专有属性。prototype属性又指向了一个prototype对象，注意prototype属性与prototype对象是两个不同的东西，要注意区别。在prototype对象中又有一个constructor属性，这个constructor属性同样指向一个constructor对象，而这个constructor对象恰恰就是这个function函数本身。<br/>
```php
function Person(){
}
Person.prototype.name="Nicholas";
var p=new Person();
```
&ensp;&ensp;p是构造函数Person的实例，当这个对象被创建时，构造函数将会把它的属性prototype赋给新对象的内部属性\__proto\__。这个\__proto\__被这个对象用来查找它的属性。<font color="red">对象都有\__proto\__属性，一般这个是被称为隐式的原型，该隐式原型指向构造该对象的构造函数的原型对象。</font><br/>
**改写原型对象之后的constructor指向**
```php
function Person(){
}
var p3=new Person();
Person.prototype={
      name："Nicholas";
}；
var p1=new Person();
```
```php
function Person(){
}
Person.prototype.name="Nicholas";
var p2=new Person();
```
&ensp;&ensp;<font color="red">如例一所示：p1.constructor为Object：p1本来没有constructor属性，但是prototype对象有constructor属性，并且prototype对象被重新指定为了一个普通的js对象，而js对象的构造函数就是object构造函数。</font><br/>
&ensp;&ensp;<font color="red">如例一所示：p3.constructor为Person：p3本来没有constructor属性，但是prototype对象有constructor属性，在定义p3时，prototype对象还没有被改写，因此prototype对象的constructor指向Person构造函数。</font><br/>
&ensp;&ensp;<font color="red">如例二所示：p2.constructor为Person：p2本来没有constructor属性，但是prototype对象有constructor属性，prototype对象没有重新指定对象，因此prototype对象的constructor指向Person构造函数。<br/>
&ensp;&ensp;<font color="green">prototype对象的constructor属性指向创造prototype对象的构造函数。实例的内部属性[[Prototype]]指向构造函数的原型对象。</font><br/>
&ensp;&ensp;<font color="red">总结一下重写原型对象会造成：1.构造函数的prototype属性指向新的原型。<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;2.原型对象的constructor属性指向Object；<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;3.相当于新原型取代了就原型，原型链不变，新原型的\__proto\__指<br/>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;向Object.prototype；<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;4.如果在重写原型对象之前创建了实例如p3，那个实例的\__proto\__<br/>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;指向的是旧原型，定义在新原型上的属性与它无关。<br/>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;5.如果在重写原型对象之后创建了实例如p1，则实例的\__proto\__指<br/>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;向的是新原型，能够继承原型的一切。</font>