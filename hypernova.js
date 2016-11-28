const hypernova = require('hypernova/server');

hypernova({
  devMode: true,

  getComponent(name) {
    if (name === 'Welcome') {
      return require('./app/assets/javascripts/components/welcome/welcome.es6');
    }
    return null;
  },

  port: 3030,
});
