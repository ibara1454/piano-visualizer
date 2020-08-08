module.exports = {
  publicPath: process.env.PUBLIC_PATH ? process.env.PUBLIC_PATH : '/',

  // About the configurations.
  // https://cli.vuejs.org/core-plugins/pwa.html#configuration
  pwa: {
    name: 'Piano Visualizer',
    // The theme color will be applied to the <meta name="theme-color" content="...">
    // tag, manifest file and etc.
    themeColor: '#000000',
    // The value will be inserted into head tag.
    iconPaths: {
      // <link rel="icon" type="image/png" sizes="16x16" href="...">
      favicon16: 'img/icons/favicon-16x16.png',
      favicon32: 'img/icons/favicon-32x32.png',
      // <link rel="apple-touch-icon" href="...">
      appleTouchIcon: 'img/icons/apple-icon-152x152.png',
      // <link rel="mask-icon" href="...">
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      // <meta name="msapplication-TileImage" content="...">
      msTileImage: 'img/icons/msapplication-icon-144x144.png',
    },
  },
};
