import Dotenv from 'dotenv-webpack';
import ESLintPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { Configuration as WebpackConfiguration, HotModuleReplacementPlugin } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

interface WebPackDevConfiguration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const config: WebPackDevConfiguration = {
    mode: 'development',
    output: {
        publicPath: '/',
    },
    entry: './src/App.tsx',
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            '@babel/preset-typescript',
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-transform-runtime',
                            '@babel/plugin-syntax-flow',
                            '@babel/plugin-transform-react-jsx',
                        ],
                    },
                },
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ['file-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new Dotenv(),
        new ESLintPlugin({
            extensions: ['js', 'jsx', 'ts', 'tsx'],
        }),
        new HtmlWebpackPlugin({
            template: 'src/Index.html',
        }),
        new ForkTsCheckerWebpackPlugin({
            async: false,
        }),
        new HotModuleReplacementPlugin(),
    ],
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'build'),
        },
        hot: false,
        historyApiFallback: true,
        port: 3000,
        open: {
            app: {
                name: 'google-chrome',
            },
        },
        proxy: {
            '/api': {
                target: 'https://localhost:7237/api',
                pathRewrite: { '^/api': '' },
                secure: false,
                changeOrigin: true,
                logLevel: 'debug',
            },
            '/swagger': {
                target: 'https://localhost:7237/swagger',
                pathRewrite: { '^/swagger': '' },
                secure: false,
                changeOrigin: true,
                logLevel: 'debug',
            },
        },
    },
};

export default config;
