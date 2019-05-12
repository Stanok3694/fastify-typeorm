'use strict';
const fp = require('fastify-plugin');


async function handler(fastify, opts, next) {
  try {
    if (!opts.typeormConfig) {
      const connection = await require('typeorm').createConnection();
      fastify.register(opts.instance, connection);
    } else {
      const connection = await require('typeorm').createConnection(
        opts.typeormConfig
      );
      fastify.register(opts.instance, connection);
    }
    next();
  } catch (e) {
    next(e);
  }
}

const plugin = fp(handler, {
  fastify: '2.x',
  name: 'fastify-typeorm'
});

plugin.many = fp(function (fastify, opts, next){
  try {
    if (!opts.typeormConfig) {
      const connection = await require('typeorm').createConnections();
      fastify.register(opts.instance, connection);
    } else {
      const connection = await require('typeorm').createConnections(
        opts.typeormConfig
      );
      fastify.register(opts.instance, connection);
    }
    next();
  } catch (e) {
    next(e);
  }
}, {
  fastify: '2.x',
  name: 'fastify-typeorm'
})

module.exports = plugin;
