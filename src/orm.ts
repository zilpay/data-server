import { MikroORM } from "@mikro-orm/core";

export async function initORM() {
  return await MikroORM.init({
    entities: [__dirname + '/src/models'],
    entitiesTs: [__dirname + '/src/models/**/*.ts'],
    type: 'sqlite',
    dbName: 'dev.sqlite',
    debug: false,
    allowGlobalContext: true
  });
}
initORM();