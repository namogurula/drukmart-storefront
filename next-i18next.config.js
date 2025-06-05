// next-i18next.config.js

/** @type {import('next-i18next').UserConfig} */
const nextI18NextConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'dz'],
    localeDetection: false,
  },
  localePath: './public/locales',
  reloadOnPrerender: true,
};

module.exports = nextI18NextConfig;
