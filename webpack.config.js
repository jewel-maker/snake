// 引入一个包
const path = require('path');
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin');
// 引入clean插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

// webpack中所有的配置信息都应该写在module.exports中
module.exports={
    // 指定入口文件
    entry:"./src/index.ts",
    // 指定打包文件所在的目录
    output:{
        // 指定打包文件的目录
        path:path.resolve(__dirname,'dist'),
        // 打包后文件的名字
        filename:"bundle.js",
        // 告诉webpack不使用箭头函数
        environment:{
            arrowFunction:false
        }
    },
    // 指定webpack打包时要使用模块
    module:{
        // 指定要加载的规则
        rules:[{
            // test指定规则生效的文件
            test:/\.ts$/,
            // use中从后往前执行
             use:[{
                // 指定加载器
                loader:"babel-loader",
                // // 设置bable
                // options:{
                //     // 设置配置环境
                //     persets:[
                //         [
                //             // 指定环境的插件
                //             "@babel/preset-env",
                //             // 配置信息
                //             {
                //                 // 要兼容的目标浏览器
                //                 targets:{
                //                     "chrome":"58",
                //                     "ie":"11"
                //                 },
                //                 // 指定corejs的版本
                //                 "corejs":"3",
                //                 // 使用corejs的方式 "usage"表示按需加载
                //                 "useBuiltIns":"usage"
                //             }
                //         ]
                //     ]
                // }
             },
            'ts-loader'],
            // 要排除的文件
            exclude:/node_modules/
        },
        // 设置less文件的处理
        {
            test:/\.less$/,
            use:[
                "style-loader",
                "css-loader",
                "less-loader"
            ]
        }
    ]
    },
    // 配置webpack插件
    plugins:[
        new HTMLWebpackPlugin({
            // title:"这是一个自定义的title"
            // 提供一个html模板
            template:"./src/index.html"
        }),
        new CleanWebpackPlugin()
    ],
    // 用来设置引用模块
    resolve:{
        extensions:['.ts','.js']
    }
}