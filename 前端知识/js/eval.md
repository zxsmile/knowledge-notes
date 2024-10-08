#### 一、eval()使用场景以及使用方法简单介绍 ####

- eval()函数简单来说就是可以执行一段字符。如果你字符串里面时可执行的js，那么他就会执行这一段代码。

- 使用场景比较少，假设一个对象下的key未知，是其他地方传过来的时候，它就可以派上用场

    const a = 'game_name'

    function getGameName(index){
      const obj = {
          game_name: '仙剑n  
      }
      return eval('obj.' + index)
    }

    console.log(getGameName(a))

#### 二、安全性问题 ####

- 尽管eval()提供了执行动态代码的能力，但它也带来了严重的安全风险。如果不不小心，它可能会被用来执行恶意代码，这可能导致数据泄露、系统损坏或其他安全问题。

    例如，如果你从用户输入中获取代码并执行它，恶意用户可能会尝试注入恶意代码来攻击你的应用程序：

        let userInput = '<script>alert('XSS');</script>'
        eval('console.log('+ userInput + ')');

