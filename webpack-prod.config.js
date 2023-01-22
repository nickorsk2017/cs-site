const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: {
        app: path.join(__dirname, 'src', 'index.tsx')
    },
    target: 'web',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.css', ".scss"],
        alias: {
          '@utils': path.resolve(__dirname, "src/utils"),
          '@coordinates': path.resolve(__dirname, "src/common/coordinates"),
          '@ui': path.resolve(__dirname, "src/ui"),
          "@types": path.resolve(__dirname, "src/types"),
          "@classes": path.resolve(__dirname, "src/classes"),
          "@stores": path.resolve(__dirname, "src/stores"),
          "@common": path.resolve(__dirname, "src/common"),
          "@editor-forms": path.resolve(__dirname, "src/pages/constructor/forms"),
          "@env": path.resolve(__dirname, "src/env.ts"),
          "@proto": path.resolve(__dirname, "src/proto"),
          "@clients": path.resolve(__dirname, "src/clients.ts"),
        }
    },
    module: {
        rules: [
            { 
              test: /\.tsx?$/,
              loader: 'ts-loader',
              exclude: '/node_modules/',
              options: { allowTsInNodeModules: true } 
            },
            {
              test: /\.module\.css$/,
              exclude: /node_modules/,
              use: [
                'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    modules: {
                        localIdentName: "[name]__[local]___[hash:base64:5]",
                    },
                    importLoaders: 1,
                    sourceMap: false,
                  },
                },
              ],
            },
            {
              test: /\.inline\.css$/,
              exclude: /node_modules/,
              use: [
                "style-loader", "css-loader",
              ],
            },
            { test: /\.(png|jpg|JPG|jpeg|gif)$/, use: ['url-loader?limit=25000'] },
            {
                test: /\.svg$/,
                use: [
                  {
                    loader: 'svg-url-loader',
                    options: {
                      limit: 10000,
                    },
                  },
                ],
            },
        ],
    },
    output: {
        filename: '[name]-[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.prefixMOD': JSON.stringify('/'),
            'process.env.prefixPublic': JSON.stringify('/public/'),
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html'),
            PUBLIC_URL: "/public",
            BASE_HREF: "/",
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CopyPlugin({
          patterns: [
            { from: "public", to: "public" },
          ],
        }),
    ]
}