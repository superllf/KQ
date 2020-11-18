const path =  require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin'); 


// 获取地址路径
function  resolve( dir ) {
    return path.join( __dirname, dir )
}

module.exports= {
    publicPath:"./",
    productionSourceMap:false,
    lintOnSave: false,
    assetsDir: 'assets', 
    outputDir: 'dist',
    devServer: {
		open: 'Chrome',
		port: 8888,
		hot: true,
		host: 'localhost',
        disableHostCheck: true

    },
    transpileDependencies: [
        'webpack-dev-server/client',
    ],
    chainWebpack: config => {
        new HtmlWebpackPlugin({
            filename: "index.html", // 生成的模板文件的名字 默认index.html
            template: "./public/index.html", //模板来源文件
            inject: true,
            hash: true,
            favicon: resolve('./public/favicon.ico'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        })

        config.plugins.delete('prefetch')
        config.resolve.alias
        .set('@', resolve('src'))
        .set('Base', resolve('src/base'))
        .set('Api', resolve('src/api'))
        .set('View', resolve('src/views'))
        .set('Com', resolve('src/components'))
    }
    
}