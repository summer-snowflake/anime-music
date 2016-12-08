const hypernova = require('hypernova/server');

hypernova({
  devMode: true,

  getComponent(name) {
    if (name === 'MyComponentjs') {
      return require('./app/assets/javascripts/components/MyComponent2.js');
    }
    return null;
  },

  port: 3030,
});
