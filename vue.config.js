// 这就是common.js规范，amd：record.js，cmd：c.js
var path = require('path')
module.exports = {
//webpack,nodejs的server，静态目录路径。可以指定一个publicPath:'/static',

//我们项目是根路径，所以不需要配置。

// 假如访问的是8080下面的api下面的XXXXX,就需要把api当做静态路径加进去

    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'assets',

// 最核心的devServer。在webpack里基本默认配置devServer

    devServer:{

//也可以改成任意想改的信息，

// 前提是要改域名的话，需要配置本地的host。我们这里就默认localhost了。

        host:'localhost',

// 端口

        port:80,

// 代理：因为后面需要使用接口,需要使用代理。

// 通常接口要调用服务端接口可能都不是同一个域名,

// 不是同一个域名涉及跨域，一旦跨域很麻烦。

// 最简单的方式是设置代理，代理解决跨域的问题。

        proxy:{

// 比如所有请求都发/mock，比如/mock/cart.json

            '/mock':{

// 会把mock代理到哪?代理到目标路径target

// 请求的是/mock这个路径，会代理到target后面的这个路径上去。

                target:'http://localhost:80',

// 是否需要开启websoket，否。

                ws:false,

// 是否将主机头的原点改为目标的URL

// 假如访问/mock/cart.json，

// 如果是true，就会访问

// http://localhost:9090/cart.json,会自动去掉/mock。

// 虽然路径请求有/mock，但是真实请求没有/mock

// 这个很关键,很多场景要用到。

// 因为路径里和真实接口是有区别的。

                changeOrigin:false

            },
            '/api': {
                target: 'http://localhost:8150'
                // pathRewrite: {
                //     '^/api/core/org': '/core/org'
                // }
            }

        }

    },
    // 第三方插件配置
    pluginOptions: {
        // ...
        pwa: {
            iconPaths: {
                favicon32: './favicon.ico',
                favicon16: './favicon.ico',
                appleTouchIcon: './favicon.ico',
                maskIcon: './favicon.ico',
                msTileImage: './favicon.ico'
            }
        },
    }

    }
