import fp, { nextCallback, PluginOptions } from "fastify-plugin";
import { FastifyInstance } from "fastify";
import {
  createConnection,
  createConnections,
  ConnectionOptions
} from "typeorm";

const pluginFactory = (
  connectionCreator: typeof createConnection | typeof createConnections
) => (
  fastify: FastifyInstance,
  {
    instance = "db",
    typeormConfig
  }: {
    instance: string;
    typeormConfig: ConnectionOptions | ConnectionOptions[];
  },
  next: nextCallback
) => {
  if (!typeormConfig) {
    (connectionCreator as typeof createConnection)()
      .then(connection => {
        fastify.decorate(instance, connection);
        next();
      })
      .catch(next);
  } else {
    (connectionCreator as typeof createConnection)(
      typeormConfig as ConnectionOptions
    )
      .then(connection => {
        fastify.decorate(instance, connection);
        next();
      })
      .catch(next);
  }
};

const fastifyPluginOptions: PluginOptions = {
  fastify: "1.x",
  name: "fastify-typeorm"
};
export default fp(pluginFactory(createConnection), fastifyPluginOptions);

export const many = fp(pluginFactory(createConnections), fastifyPluginOptions);
