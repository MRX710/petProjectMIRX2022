import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import { BuildOptions } from './types/config';
import { buildCssLoader } from './loaders/buildCssLoader';
import { buildBabelLoader } from "./loaders/buildBabelLoader";

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const {
        isDev,
    } = options;

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    const babelLoader = buildBabelLoader(options);

    const cssLoader = buildCssLoader(options);

    // Если не используем тайпскрипт - нужен babel-loader
    const typescriptLoader = {
        test: /\.tsx?$/,
        exclude: /node_modules/,

        // когда используешь массив в use = [{loader: 'ts-loader', и т.д }] - отваливается горячая перезагрузка
        // (можно проверить изменением css в модалке (в коде) и изменение значений инпутов в браузере, к примеру)
        use: {
            loader: 'ts-loader',
            options: {
                getCustomTransformers: () => ({
                    before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
                }),
            },
        },
    };

    const fileLoader = {
        test: /\.(png|jpe?g|webp|gif|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    return [
        fileLoader,
        svgLoader,
        babelLoader,
        typescriptLoader,
        cssLoader,
    ];
}
