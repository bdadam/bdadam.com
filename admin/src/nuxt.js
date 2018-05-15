const { Nuxt, Builder } = require('nuxt');
const config = require('../nuxt.config.js');
config.dev = !(process.env.NODE_ENV === 'production')

const nuxt = new Nuxt(config);

if (config.dev) {
    const builder = new Builder(nuxt);
    builder.build();
}

module.exports = nuxt.render;
