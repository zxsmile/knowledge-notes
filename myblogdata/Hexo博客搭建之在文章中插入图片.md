---
title: Hexo博客搭建之在文章中插入图片
date: 2019-07-31 16:06:36
tags:
cover: /images/psb24.jpg
---
通过配置博客文件目录中的_config.yml文件：
 
将_config.yml文件中的post_asset_folder设置为true,就可以了

post_asset_folder: true

然后在执行 hexo new 'xxx'命令新建博文的时候，会在source/_posts中生成一个，xxx.md用来编辑博文，和一个xxx文件夹用来存放该篇博文需要用到的图片

在博文中使用![](image.jpg)来引入图片，image.jpg为图片的名字。