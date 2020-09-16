---
title: Git LFS
date: 2019-07-31 11:21:45
tags:
cover: /images/psb30.jpg
---
一.问题引入
&nbsp;&nbsp;&nbsp;&nbsp;今天在向我的github仓库上push项目时遇到了一个问题，报错如下：

```php
remote: error: GH001: Large files detected. You may want to try Git Large File Storage - https://git-lfs.github.com.
remote: error: Trace: e02412b12f77002b85ac7113dac1cf66
remote: error: See http://git.io/iEPt8g for more information.
remote: error: File 禅意花园.rar is 452.77 MB; this exceeds GitHub's file size limit of 100.00 MB
To github.com:zxsmile/Demo.git
 ! [remote rejected]   master -> master (pre-receive hook declined)
error: failed to push some refs to 'git@github.com:zxsmile/Demo.git'
```

上面错误的原因很好理解就是GitHub不允许直接上传大文件（超过100M）的文件到远程仓库，若要想继续提交可以尝试使用大文件支持库：https://git-lfs.github.com，为了便于管理代码库和方便合作伙伴们使用，当你push50M以上的文件时github将会警告，当push100M以上文件，就直接拒绝你的push。

二.问题解决

&nbsp;&nbsp;&nbsp;&nbsp;要解决以上问题有两种办法：

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.第一种是删掉这个超过100M的文件
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;开始我是想着直接删除掉禅意花园.rar这个压缩包，结果不行，还是会报上面的错。于是我就在网上看了一下别人的博客，那就是在commit的时候，之前的版本里面已经包含过这些大文件了，虽然后来在新版本里面删除了大文件，但是之前commit的记录还是存在。所以在统一push的时候还是失败的。要想push必须把该文件从本地仓库移除掉并且把以前提交过的commit记录全部修改。

```php
git log  查看 commit日志,找到需要回退的那次commit的commit_id

git reset --hard commit_id  回退到没提交时的版本

然后提交就可以了

```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.使用git lfs

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（1）git lfs简述
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;GitHub LFS 是一个开源的 git 扩展，可以让 git 追踪大文件的版本信息。LFS 使用文件指针来代替大文件，如音频文件，视频文件，数据采集和图形等文件，同时将文件内容存储到远程服务器，比如 GitHub.com 或者 GitHub Enterprise 。LFS 是 GitHub 所支持的一种完全免费的服务，目的是让 git 能跟踪大文件。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（2）git lfs如何对跟踪的文件进行版本控制
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;事实上，GIT LFS数据存储于GIT中普通文件类似,只是LFS文件被存储在.git下面的lfs文件夹下,而普通文件则被存储在.git下的objects文件夹下,在存储原理上是一致的，LFS特别不一样同时也是它精髓之处就在于: 它在本地仓库中并不保留所有的文件版本，而是仅根据需要提供检出版本中必需的文件，最终只会得到你真正想要的文件。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们不妨以一个demo来验证下这个结论是否成立，在本地建立一个工程，用3个大小不一命名一样的.a静态库来模拟该文本的3个版本，这里把它们统一名称test.a文件,三个大小分别为: 版本1(5.2M), 版本2(1.8M), 版本3(555kb),一个一个提交上传到远端,这样test.a就被迭代了3个版本,

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们重新新建一个文件夹，终端下进入该文件目录下，准备克隆上一步提交的仓库，这里分两种情况来克隆：
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第一种情况：允许下载lfs文件
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在终端下输入
```php
git clone git@github.com:zxsmile/Demo.git
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;将仓库克隆到了了本地，打开文件夹，查看text.a文件，你会发现它的大小是555kb，是第三个版本的内容。在终端查看提交历史，输入git reset hard <哈希值>，回到第二个版本，你会发现text.a文件大小变成了1.8M。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color='red'>这里值得提醒的是，由于LFS默认只下载了最新版本的test.a文件到本地仓库，因此这里在切到第二个版本时，实际上会自动去请求下载LFS管理的该test.a对应版本内容,不信你在切换之前把网络关闭会发现报错：报连接失败，没网的255错误。同理，切到第一次提交版本，test.a文件大小为5.2M。当我们把三个版本都切过后，这个时候你把网络关闭模拟与远端断开连接，然后再次切到最新的第三版本，你会发现很快就切过去了不会再次发起请求拉取该版本下的test.a文件了，这是因为之前已经下载过了，由此可以总结：LFS默认会克隆最新的版本到本地而不克隆之前的老版本，如果需要相应的旧版本，只需要将Git切到相应版本即可，如果本地还没有该版本对应的LFS对象,Git就会去远端下载该版本文件，如果有了则不用再去下载。</font>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第二种情况：不允许下载lfs文件
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重新新建一个目录，终端进入到该目录下，执行
```php
git lfs install（一定要记得先执行这句，不然对于GIT_LFS_SKIP_SMUDEGE=1,命令会不起作用）
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在终端输入：
```php
GIT_LFS_SKIP_SMUDEGE=1 git clone git@github.com:zxsmile/Demo.git
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;将仓库克隆到本地,打开文件夹查看下test.a的大小，你会惊奇地发现，这次test.a大小不是三个版本中的任何一个,而是131字节，用记事本打开查看内容:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version https://git-lfs.github.com/spec/v1

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;oidsha256:659315330f4214f81da86928dc3ecb8a526b95e9b2b634199682cea31c80a74b

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;size 555152

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发现是有个链接、哈希值、大小，这是因为我们不下载LFS任何文件，因此Git LFS只将存储在Git仓库的那份该文件的指针文件给我克隆下来，而真正的数据文本并没有克隆。不过不用担心，GIT LFS允许我们后面按“需”下载该文件对应版本，只需要在终端配置下单独下载该文件即可(当然你也可以配置匹配一类文件下载或更多),待下载完成后再次查看test.a文件大小，test.a大小为555kb,说明已经获取了版本3的数据文件。之后操作就与第一种情况是一样的了。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(3)git fls跟踪大文件操作步骤如下(以我要提交的Demo/Demo-yasuo/禅意花园.rar文件为例)：

![](Git-LFS1.jpg)

![](Git-LFS2.jpg)

```php
cd Demo 进入你要提交的项目根目录
先让回退到你还没有commit大文件时的版本（我是直接从仓库克隆了一个Demo文件夹）
git lfs install
git lfs track "Demo-yasuo/禅意花园.rar" 告诉lfs应该处理的文件路径（追踪文件路径）
执行完上面命令感觉好像没有什么作用，但你的项目根目录下会多一个名为".gitattributes"的新文件，这个文件记录了我们用 LFS 追踪的所有的文件路径。
git add .gitattributes ".gitattributes" 文件也需要提交到仓库
然后就正常提交文件就可以了
git add .
git commit -m 'xxx'
git push origin master

```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（4）追踪文件路径简述
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;添加单一文件像上面的操作就可以，但要追踪例如后缀为.rar的所有文件，总不能一个一个的添加吧，所以可以用以下操作：

```php
git lfs track "*/.rar"
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;追踪Demo文件夹中的所有文件使用以下操作：

```php
git lfs track "Demo/*"
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;查看当前你正在追踪的真实文件：

```php
git lfs ls-files
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（4）提交时出现错误
```php
Uploading LFS objects: 100% (6/6), 544 MB | 893 KB/s, done
Connection reset by 52.74.223.119 port 22
fatal: the remote end hung up unexpectedly
Enumerating objects: 11, done.
Counting objects: 100% (11/11), done.
Delta compression using up to 4 threads
Compressing objects: 100% (9/9), done.
fatal: sha1 file '<stdout>' write error: Broken pipe
fatal: the remote end hung up unexpectedly
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;问题原因是：http.postBuffer默认上限为1M所致，在git配置里将http.postBuffer变上限改大一些就好了，在终端执行命令：
```php
git config --global http.postBuffer 524288000
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;你会发现的项目(以我的为例就是Demo文件)根目录下的.git文件夹里的config文件里，多了如下内容：
```php
 [http]
	postBuffer = 524288000
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;然后再重新提交一次就好了