import Dotenv from 'dotenv-webpack';
import { ESBuildMinifyPlugin } from 'esbuild-loader';
import ESLintPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack, {
    Configuration as WebpackConfiguration,
    HotModuleReplacementPlugin,
} from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

interface WebPackDevConfiguration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const config: WebPackDevConfiguration = {
    mode: 'development',
    output: {
        publicPath: '/',
    },
    context: __dirname,
    entry: './src/Index.tsx',
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'esbuild-loader',
                    options: {
                        loader: 'tsx',
                        target: 'es2022',
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
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
    ],
    optimization: {
        minimizer: [
            new ESBuildMinifyPlugin({
                target: 'es2022',
            }),
        ],
    },
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
