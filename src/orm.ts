import path from 'path';
import { MikroORM } from "@mikro-orm/core";

export async function initORM() {
  const orm = await MikroORM.init({
    migrations: {
      path: path.join(__dirname, '../migrations'),
    },
    entities: [path.join(__dirname, '/models')],
    entitiesTs: [path.join(__dirname, '/models/**/*.ts')],
    type: String(process.env.TYPE) as "mongo" | "mysql" | "mariadb" | "postgresql" | "sqlite",
    dbName: String(process.env.DB_NAME),
    password: process.env.PASSWORD,
    user: process.env.USER,
    debug: false,
    allowGlobalContext: true,
    port: Number(process.env.PORT),
    host: 'localhost'
  });
  try {
    const generator = orm.getSchemaGenerator();
    await generator.createSchema();
  } catch (err) {
    console.log('already created database');
  }
  const migrator = orm.getMigrator();
  await migrator.createMigration();
  await migrator.up();  

  return orm;
}
