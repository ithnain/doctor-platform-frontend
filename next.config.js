const nextTranslate = require('next-translate');
const withPlugins = require('next-compose-plugins');

const nextSettings = {
    env: {
        APP_ENV:"production",
        NEXT_PUBLIC_APP_ENV:"production",
    },
  };

// module.exports = nextTranslate();

//for netlify
module.exports = withPlugins([nextTranslate(), nextSettings]);
