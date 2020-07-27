        var express = require('express');
		var proxy = require('http-proxy-middleware').createProxyMiddleware;
		var app = express();
		
		app.use('/', proxy({
		    // 代理跨域目标接口
		    target: 'http://localhost:8081',
		    changeOrigin: true,
		
		    // 修改响应头信息，实现跨域并允许带cookie
		    onProxyRes: function(proxyRes, req, res) {
		        res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
                res.header('Access-Control-Allow-Credentials', 'true');
                res.send('555')
                console.log()
		    },
		
		    // 修改响应信息中的cookie域名
            cookieDomainRewrite: 'http://localhost:8080'  // 可以为false，表示不修改
            
           
		}));
		
		app.listen(3000);
	