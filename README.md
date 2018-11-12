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
// ftypeorm.many to use multiple connections

const typeormConfig = {
  instance: 'db', // the name of fastify plugin instance. defaults to db
  typeormConfig // this is an optional param, see: http://typeorm.io/#/using-ormconfig
};

fastify.register(ftypeorm, typeormConfig).ready();

fastify.get('/',async function(req, res) =>{
  // here you can use your connection just like any typeorm connection
  const repo = fastify.db.getRepository(Model) // or fastify.db[i].getRepository
  return repo.find()
})

fastify.listen(3000, () => {
  console.log('> listening on port 3000');
});
```

- `instance`: _(optional)_ the name of instance will be mapped to fastify, default is `db`
- `typeormConfig`: all typeorm configurations, you can see [here](http://typeorm.io/#/connection-options).
