# 1.entry #

     - 入口（entry）指示webpack以哪个文件作为入口起点开始打包，分析构建内部依赖图

# 2.output #

    - 输出（output）指示webpack打包后的资源bundles输出到哪里，以及如何命名

# 3.loader #

    - loader让webpack能够去处理那些非JavaScript资源如css、img等，将他们处理成webpack能够识别的资源，可以理解成一个翻译的过程，webpack自身只能理解js和json

# 4.plugins #

    - 插件（plugins）可用于执行范围更广的任务，插件的范围包括，从打包优化和压缩，一直到重新定义范围中的变量等。

# 5.mode #

    - 模式（mode）指示webpack使用相应模式的配置

           - 开发模式（development）：配置比较简单，能让代码本地调试运行的环境
           - 生产模式（production）：代码需要不断优化达到性能最好，能让代码优化上线运行的环境