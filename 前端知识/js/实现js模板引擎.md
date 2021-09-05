#### 一、问题引出 ####

		var TemplateEngine = function(tpl, data) {
		    // magic here ...
		}
		var template = '<p>Hello, my name is {{name}}. I\'m {{age}} years old.</p>';
		console.log(TemplateEngine(template, {
		    name: "Krasimir",
		    age: 29
		}));

现在我们要实现TemplateEngine函数, 由上可知, 该函数的两个参数为模板及数据. 执行上述代码后会出现以下结果: 

       <p>Hello, my name is Krasimir. I'm 29 years old.</p>

#### 二、模板编译流程 ####

- 模板字符串->tokens->tokens和数据结合->解析dom字符串

    例：模板字符串： <h1>我买了一个{{thing}}，好{{mood}}啊</h1>

       转成tokens为：

                  [
                    ['text','<h1>我买了一个'],
                    ['name','thing'],
                    ['text','好'],
                    ['name','mood'],
                    ['text','啊</h1>']
                  ]

#### 三、实现模板编译 ####

- 模板引擎函数实现的本质，就是将模板中HTML结构与JavaScript语句、变量分离，通过Function构造函数 + apply(call)动态生成具有数据性的HTML代码。

      模板字符串： <h1>我买了一个{{thing}}，好{{mood}}啊</h1>，obj={thing:'灯泡',mood:'亮'}
      转换成：new Function('<h1>我买了一个thing，好mood啊</h1>').apply(obj)
      上面代码相当于：function fn(){
                      <h1>我买了一个thing，好mood啊</h1>
                     }.apply(obj)

1. 首先要找出所有花括号

      const re = /{{([^}}]+)?}}/g;

      正则式的 [^}}]。这是一个反向字符集，说明是不能匹配到中括号里面的}}。这个正是我们上面写的模板字符串动态区域的。
      (xx)? 是非贪婪匹配，这样就不会出现匹配到 {{foo}} barzzz {{bar}}

   - re.exec(str)会返回一个数组
   
      let str = '<h1>我买了一个{{thing}}，好{{mood}}啊</h1>'
      let match = re.exec(str)
      match:[
		    "{{thing}}",
		    " thing", 
		    index:9,
		    input: "<h1>我买了一个{{thing}}，好{{mood}}啊</h1>"
		   ]

    这样可以循环找完所有的花括号

2. 以花括号为临界点，将字符串分为很多段存入一个数组里，最后再将数组用join方法拼接起来

		var TemplateEngine = function(tpl, data) {
		    var re = /{{([^}}]+)?}}/g,
		        code = 'var r=[];\n',
		        cursor = 0, 
		        match;
		    var add = function(line) {
		        code += 'r.push("' + line.replace(/"/g, '\\"') + '");\n';
		    }
		    while(match = re.exec(tpl)) {
		        add(tpl.slice(cursor, match.index));
		        add(match[1]);
		        cursor = match.index + match[0].length;
		    }
		    add(tpl.substr(cursor, tpl.length - cursor));
		    code += 'return r.join("");'; // <-- return the result
		    console.log(code);
		    return tpl;
		}
		var template = '<h1>我买了一个{{this.thing}}，好{{this.profile.mood}}啊</h1>';
		console.log(TemplateEngine(template, {
		    thing: "Krasimir Tsonev",
		    profile: { mood: 29 }
		}));


		var r=[];
		r.push("<h1>我买了一个 ");
		r.push("this.thing");
		r.push(",好 ");
		r.push("this.profile.mood");
        r.push("啊</h1>")
		return r.join("");

3. 发现一个问题，变量是不能带双引号的，不然会被解析成字符串

		var add = function(line, js) {
		    js? code += 'r.push(' + line + ');\n' :
		        code += 'r.push("' + line.replace(/"/g, '\\"') + '");\n';
		}
		var match;
		while(match = re.exec(tpl)) {
		    add(tpl.slice(cursor, match.index));
		    add(match[1], true); // 
		    cursor = match.index + match[0].length;
		}

4. 这个是简单的，如果想要实现复杂的，比如for、if

		var re = /{{([^}}]+)?}}/g;,
		    reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
		    code = 'var r=[];\n',
		    cursor = 0;
		var add = function(line, js) {
		    js? code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n' :
		        code += 'r.push("' + line.replace(/"/g, '\\"') + '");\n';
		}

       上述代码添加了一个新的正则表达式, 如果JS代码以if, for, else, switch, case, break, { , }这些内容为起始值, 则直接添加该行代码, 不添加到数组中. 那么最后的结果就是:

		var r=[];
		r.push("My skills:");
		for(var index in this.skills) {
		r.push("<a href=\"#\">");
		r.push(this.skills[index]);
		r.push("</a>");
		}
		r.push("");
		return r.join("");

5. 最终代码

		var TemplateEngine = function(html, options) {
		    var re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0, match;
		    var add = function(line, js) {
		        js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
		            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
		        return add;
		    }
		    while(match = re.exec(html)) {
		        add(html.slice(cursor, match.index))(match[1], true);
		        cursor = match.index + match[0].length;
		    }
		    add(html.substr(cursor, html.length - cursor));
		    code += 'return r.join("");';
		    return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
		}



