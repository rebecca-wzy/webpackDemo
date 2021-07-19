const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.base')

module.exports = merge(baseConfig,{
    mode: 'development',
    //精确定位报错信息所在代码位置
    devtool: 'eval-cheap-module-source-map',
    devServer:{
        host: '192.168.88.90',
        port:'3001',
        hot: true,
        // 是否启动gzip压缩
        compress: true,
        proxy:{
            '/api':{
                target: '',
                pathRewrite:{
                    '/api':''
                }
            }
        }
    },
    
})