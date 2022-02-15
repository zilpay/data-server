import path from 'path';
import { config } from 'dotenv';
import { MikroORM } from "@mikro-orm/core";

config();

export async function initORM() {
  const orm = await MikroORM.init({
    migrations: {
      path: path.join(__dirname, '../migrations'),
    },
    entities: [path.join(__dirname, '/models')],
    entitiesTs: [path.join(__dirname, '/models/**/*.ts')],
    type: String(process.env.TYPE) as "mongo" | "mysql" | "mariadb" | "postgresql" | "sqlite",
    dbName: String(process.env.DB_NAME),
    debug: false,
    allowGlobalContext: true
  });
  const migrator = orm.getMigrator();
  await migrator.createMigration();
  await migrator.up();

  return orm;
}
