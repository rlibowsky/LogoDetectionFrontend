let path =      require("path"),
    webpack =   require("webpack");


module.exports = {
    cache: true,
    devtool: "source-map",
    context: path.join(__dirname, "/src"),
    entry: {
        main: "./App",
        vendor: ["jquery", "react", "react-dom", "react-router"]
    },
    output: {
        path: path.join(__dirname, "/public/js/"),
        filename: "[name].js",
        chunkFilename: "[id].js",
        sourceMapFilename: "[name].map",
        publicPath: "./js/"
    },
    module: {
        rules: [
            // required for babel to kick in
            { test: /\.js$/, exclude: /node_modules/, use: [
                { loader: "babel-loader" }
            ]},

            // required to write "require('./style.scss')"
            { test: /\.css$/,  use: [
                { loader: "style-loader" },
                { loader: "css-loader" }
            ]},
            {
                test: /\.(jpg|png|gif|svg|pdf|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name]-[hash:8].[ext]'
                        },
                    },
                ]
            },
            { test: /\.svg$/,           use: [
                { loader: "file-loader?prefix=font/" }
            ]}
        ],
        loaders: [
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new webpack.ProvidePlugin({
            "$":        "jquery",
            "jQuery":   "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js"
        })
    ]
};