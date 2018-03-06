var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports ={
	entry:{
		index:'./src/js/page/index.js',
		list:'./src/js/page/list.js',
		about:'./src/js/page/about.js',
	},
	output:{
		path:path.join(__dirname,'dist'),
		publicPath:'/',
		filename:'js/[name].js',
		chunkFilename:'js/[id].chunk.js'
	},
	module:{
		loaders:[
		    {
		    	test:/\.css$/,
		    	loader:'style-loader!css-loader'
		    },{
          test: /\.less$/,
          //下面两行，作用相同，选择自己比较喜欢的样式即可
          // loader: 'style-loader!css-loader!less-loader'
          use: [
              'style-loader',
              { loader: 'css-loader', options: { importLoaders: 1 } },
              'less-loader'
          ]
      },{
		    	test:/\.html$/,
		    	loader:'html-loader'
		    },{
		    	test:/\.(png|jpg|jpeg|gif)$/,
		    	loader:'url-loader?limit=8192&name=./img/[hash].[ext]'
		    },{
                //文件加载器，处理文件静态资源
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=./fonts/[name].[ext]'
            }
		]
	},
	plugins:[
         new webpack.ProvidePlugin({
         	$:'jquery'
         }),
         new webpack.optimize.CommonsChunkPlugin({
         	name:'vendors',
         	chunks:['index','list','about'],
         	minChunks:3
         }),
         new ExtractTextPlugin('css/[name].css'),
         new HtmlWebpackPlugin({
         	favicon:'./src/img/favicon.ico',
         	filename:'./index.html',
         	template:'./src/view/index.html',
         	inject:'body',
         	hash:true,
         	chunks:['vendors','index'],
         	minify:{
         		removeComments:true,
         		collapseWhitespace:false
         	}
         }),
         new HtmlWebpackPlugin({
         	favicon:'./src/img/favicon.ico',
         	filename:'./list.html',
         	template:'./src/view/list.html',
         	inject:true,
         	hash:true,
         	chunks:['vendors','list'],
         	minify:{
         		removeComments:true,
         		collapseWhitespace:false
         	}
         }),
         new HtmlWebpackPlugin({
         	favicon:'./src/img/favicon.ico',
         	filename:'./about.html',
            template: './src/view/about.html',
         	inject:true,
         	hash:true,
         	chunks:['vendors','about'],
         	minify:{
         		removeComments:true,
         		collapseWhitespace:false
         	}
         }),
         new webpack.HotModuleReplacementPlugin()
	],
	devServer:{
		contentBase:'./',
		host:'localhost',
		port:9090,
		inline:true,
		hot:true,
	}
}