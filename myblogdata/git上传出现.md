---
title: git上传出现
date: 2019-01-17 13:06:21
tags:
cover: /images/psb2.jpg
---
git上传出现了“！[rejected] master->master (non-fastt-forward)”
将github上的仓库和本地仓库关联：
 <table><tr><td bgcolor=black><font color=white>$ git remote add origin git@github.com:github账户名/learngit.git</td></tr></table>
 把本地库的所有内容推送到远程库上：
  <table><tr><td bgcolor=black><font color=white>$ git push -u origin master </td></tr></table>
 &emsp;&emsp 把本地库的内容推送到远程，用git push命令，实际上是把当前分支master推送到远程。由于远程库是空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。<br>
  &emsp;后面直接使用：
   <table><tr><td bgcolor=black><font color=white>$ git push origin master </td></tr></table>
    &emsp;把本地master分支的最新修改推送至GitHub把本地master分支的最新修改推送至GitHub.<br>
     &emsp;我后面修改使用此命令时，出现了如下错误提示：<br>
     <font color=green>To github.com:zxsmile/learngit.git
 ! [rejected]        master -> master (non-fast-forward)
error: failed to push some refs to 'git@github.com:zxsmile/learngit.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.<br>
从提示语中可以看出是，问题（Non-fast-forward）的出现原因在于：git仓库中已经有一部分代码，所以它不允许你直接把你的代码覆盖上去。</font><br>
&emsp;我在看了别人博客之后有了如下解决方案：<br>
<font color=red>&emsp;首先从远程的origin的master主分支下载最新的版本到origin/master分支上 :<br></font>
 <table><tr><td bgcolor=black><font color=red>git fetch origin</td></tr></table>
<font color=red>&emsp;将本地的master分支和origin/master分支进行合并:<br></font>
 <table><tr><td bgcolor=black><font color=red>git merge origin/master</td></tr></table>
<font color=red>&emsp;暂存，提交，push:<br></font>
<table><tr><td bgcolor=black><font color=red>git add <文件名><br>
git commit -m "add file"<br>
git push origin master</td></tr></table></font>
上传完成！