import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {
    mode: 'production',
    entry: './src/App.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        publicPath: '',
    },
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
        new ESLintPlugin({
            extensions: ['js', 'jsx', 'ts', 'tsx'],
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/Index.html',
        }),
        new ForkTsCheckerWebpackPlugin({
            async: false,
        }),
    ],
};

export default config;
