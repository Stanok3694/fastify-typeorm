# fastify-typeorm

Fastify plugin to work with [TypeORM](https://github.com/typeorm/typeorm)

## install

```bash
npm install fastify-typeorm

```

## Usage

```javascript
const fastify = require('fastify')();
const ftypeorm = require('fastify-typeorm');

const typeormConfig = {
  instance: 'db', // the name of fastify plugin instance. defaults to db
  typeormConfig // this is an optional param, see: http://typeorm.io/#/using-ormconfig
};

fastify.register(ftypeorm, typeormConfig).ready();

fastify.listen(3000, () => {
  console.log('> listening on port 3000');
});
```

- `instance`: _(optional)_ the name of instance will be mapped to fastify, default is `typeorm`
- `typeormConfig`: all typeorm configurations, you can see [here](http://typeorm.io/#/connection-options).
