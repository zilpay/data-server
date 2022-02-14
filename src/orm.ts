import path from 'path';
import { MikroORM } from "@mikro-orm/core";

export async function initORM() {
  const orm = await MikroORM.init({
    migrations: {
      path: path.join(__dirname, '../migrations'),
    },
    entities: [path.join(__dirname, '/models')],
    entitiesTs: [path.join(__dirname, '/models/**/*.ts')],
    type: 'sqlite',
    dbName: 'dev.sqlite',
    debug: false,
    allowGlobalContext: true
  });
  const migrator = orm.getMigrator();
  await migrator.createMigration();
  await migrator.up();

  return orm;
}
