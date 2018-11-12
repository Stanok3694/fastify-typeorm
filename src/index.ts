import fp, { nextCallback, PluginOptions } from "fastify-plugin";
import { Plugin } from "fastify";
import {
  createConnection,
  createConnections,
  ConnectionOptions
} from "typeorm";

const pluginFactory = (
  connectionCreator: typeof createConnection | typeof createConnections
) => (
  fastify: any,
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
        fastify.register(instance, connection);
        next();
      })
      .catch(next);
  } else {
    (connectionCreator as typeof createConnection)(
      typeormConfig as ConnectionOptions
    )
      .then(connection => {
        fastify.register(instance, connection);
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
