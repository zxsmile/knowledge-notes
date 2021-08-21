一、填充规则

    - 如果一侧定值，一侧auto，则auto为剩余空间大小
    - 如果两侧均是auto，则平分剩余空间

      例：<style>
		    .father {
		      width: 300px;
		      background-color: #f0f3f9;
		    }
		    .son {
		      width: 200px;
		      height: 120px;
		      margin-right: 80px;
		      margin-left: auto;
		      background-color: #cd0000;
		    }
		 </style>
		
		<div class="father">
		    <div class="son"></div>
		</div>

       左边距是20px,右边距是80px。这里son宽度是200px，容器是300px，总剩余空间大小是100px，其中margin-right使用了80px，那么margin-left的‘auto’计算值就是剩余的20px了

二、为什莫margin：auto在水平方向上有用，而在垂直方向上没用呢？

    - 通过margin: 0 auto实现水平居中全都是因为元素在水平方向上具有自动填充父元素剩余空间的特性，但在垂直方向是没有这个特性的（我们的文档流方向决定了这一现象）
    - 标准流中，margin：auto 默认只会计算左右边距。而上下如果设置为auto时默认是取0.也就是说，margin：auto和margin：0 auto 在一般情况下没有区别，不能实现垂直居中

三、设置position：absolute可以实现垂直居中

          div  {
                background: #FF0000;
                width: 200px;
                height: 200px;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
            }

   - 原因：

        - 1.在普通内容流中，margin:auto的效果等同于margin-top:0;margin-bottom:0
        - 2.position:absolute使绝对定位块跳出了内容流，内容流中的其余部分渲染时绝对定位部分不进行渲染
        - 3.为块区域设置top: 0; left: 0; bottom: 0; right: 0;将给浏览器重新分配一个边界框，此时该块将填充其父元素的所有可用空间，所以margin 垂直方向上有了可分配的空间
        - 4.再设置margin 垂直方向上下为auto，即可实现垂直居中。（注意高度得设置）

