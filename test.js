str = '<h1>我买了一个{{thing}}，好{{mood}}啊</h1>'
let re = /{{([^}}]+)?}}/g
      let match = re.exec(str)
    //   match:[
	// 	    "{{thing}}",
	// 	    " thing", 
	// 	    index: 21,
	// 	    input: "<p>Hello, my name is <%name%>. I\'m <%age%> years old.</p>"
		//]
console.log(match)