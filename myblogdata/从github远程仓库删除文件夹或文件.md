---
title: 从github远程仓库删除文件夹或文件
date: 2019-01-28 12:39:51
tags:
cover: /images/psb3.jpg
---
1 首先进入文件夹下，右击选择Git Bash Here,打开命令窗口。<br/>
2 输入git pull origin master(或分支名),将远程仓库或分支里面的项目拉下来。<br/>
3 输入dir，查看有哪些文件或文件夹。<br/>
4 输入git rm -r --cached 文件或文件夹名，删除文件或文件夹。<br/>
5 输入git commit -m "任意文字",提交，添加操作说明。<br/>
6 输入git push origin master(或分支名)。<br/>
操作完成。<br/>
**注**:本地项目中的要删除的文件夹不收操作影响,删除的只是远程仓库中的文件夹, 可放心删除。

