/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
require('dotenv').config()

/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        locales: ['en', 'ru', 'kk', 'uz'], // English, Russian, Kazakh, Uzbek
        defaultLocale: 'en',
        localeDetection: true,
    },
    images: {
        unoptimized: true,
    },
    trailingSlash: false,
    reactStrictMode: false,
    webpack: (config, { isServer }) => {
        if (isServer) {
            require('./scripts/sitemap-generator')
        }
        config.resolve.alias = {
            ...config.resolve.alias,
            apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
        }
        
        // Handle MDX files
        config.module.rules.push({
            test: /\.mdx?$/,
            use: [
                {
                    loader: '@mdx-js/loader',
                    options: {
                        remarkPlugins: [],
                        rehypePlugins: [],
                    },
                },
            ],
        });
        
        return config
    }
}

module.exports = nextConfig
