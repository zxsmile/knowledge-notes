| `Loader`名称                         | 作用                                                         |
| ------------------------------------ | ------------------------------------------------------------ |
| `babel-loader`                       | 将ES6+代码转换为ES5代码，以便在旧版浏览器中运行。            |
| `css-loader`                         | 解析 CSS 文件，处理 CSS中的依赖关系，并 将CSS转换为JS模块。  |
| `style-loader`                       | 将CSS代码以内联的方式注入到HTML页面中。                      |
| `file-loader`                        | 处理文件资源(如图片、字体等)，将文件复制到输出目录，并返回文件路径 |
| `url-loader`                         | 与file-loader类似，但可以根据文件大小将文件转换为 Data URL (base64格式)或文件路径。 |
| `sass-loader`                        | 解析 Sass/ SCSS文件，并将其转换为CSS代码。                   |
| `less-loader`                        | 解析 Less 文件，并将其转换为CSS代码。                        |
| `postcss-loader`                     | 使用PostCSS 处理CSS，可以进行自动添加前缀、压缩、CSS Modules 等操作。 |
| `ts-loader`                          | 将TypeScript代码转换为JavaScript代码                         |
| `eslint-loader`                      | 在构建过程中使用 ESLint 进行代码检查。                       |
| `stylelint-	webpack-plugin`       | 在构建过程中使用Stylelint 进行 CSS/SCSS 代码检查。           |
| `vue-loader`                         | 解析Vue单文件组件(.vue 文件)，并将其转换为 JavaScript代码    |
| `image-webpack-loader`               | 优化图片资源，包括压缩、转换格式等操作。                     |
| `html-loader`                        | 解析HTML文件，处理其中的引用资源(如图片、字体等)，并返回处理后的HTML代码。 |
| `markdown-loader`                    | 将 Markdown文件转换为HTML代码。                              |
| `json-loader`                        | 解析JSON文件,并返回解析后的JavaScript对象。                  |
| `eslint-loader`                      | 在构建过程中使用ESLint 进行代码检查。                        |
| `telint.Inader`                      | 在构建过程中使用TSlint进行TypeScript代码检查。               |
| `prettier-loader`                    | 在构建过程中使用Prettier 进行代码格式化.                     |
| `stylelint-webpack-plugin`           | 在构建过程中使用Stylelint进行 CSS/ SCSS 代码检查。           |
| `mini-css-extract-plugin`            | 提取CSS代码到单独的文件，而不是内联到JavaScript代码中。      |
| `optimize-css-assets-webpack-plugin` | 压缩CSS代码。                                                |
| `terser-webpack-plugin`              | 压缩JavaScript代码。                                         |


这些Loader可以根据需要配置在Webpack的模块规则(module.rules)中，以实现对不同类型文件的处理和转换操作。