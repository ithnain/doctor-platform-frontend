const nextTranslate = require('next-translate');
const withPlugins = require('next-compose-plugins');

const nextSettings = {
    env: {
        APP_ENV:"development",
        NEXT_PUBLIC_APP_ENV:"development",
    },
  };

// module.exports = nextTranslate();

//for netlify
module.exports = withPlugins([nextTranslate(), nextSettings]);
