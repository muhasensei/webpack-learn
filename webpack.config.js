const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizedCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all"
        }
    }
    if (isProd) {
        config.minimizer = [
            new OptimizedCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config;
};

const styleLoader = (loaderType) => {
    const loader = [
        {
            loader: MiniCssExtractPlugin.loader
        },
        'css-loader',
    ];
    if (loaderType) {
        loader.push(`${loaderType}-loader`);
    }
    return loader;
}


const babelLoader = (loaderType) => {
    const loader = {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties']
      }
    };
    if (loaderType) {
        loader.options.presets.push(`@babel/preset-${loaderType}`);
    }
    return loader;
}

const plugins = () => {
    const basePlugins = [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
            ],
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new ESLintPlugin()
    ];
    if (isProd) {
        basePlugins.push(new BundleAnalyzerPlugin());
    }

    return basePlugins;
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './index.jsx'],
        analytics: './functions/analytics.ts'
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev,
        open: true
    },
    devtool: isDev ? 'source-map' : false,
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src')
        },
        extensions: ['.js', '.ts', '.jsx', '.tsx']
    },
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: styleLoader()
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.less$/,
                use: styleLoader('less')
            },
            {
                test: /\.s[ac]ss$/,
                use: styleLoader('sass')
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: babelLoader()
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: babelLoader('typescript')
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: babelLoader('react')
            }
        ]
    }
}