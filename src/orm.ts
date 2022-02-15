import path from 'path';
import { MikroORM } from "@mikro-orm/core";

export async function initORM() {
  const orm = await MikroORM.init({
    migrations: {
      path: path.join(__dirname, '../migrations'),
    },
    entities: [path.join(__dirname, '/models')],
    entitiesTs: [path.join(__dirname, '/models/**/*.ts')],
    type: 'sqlite',// String(process.env.TYPE) as "mongo" | "mysql" | "mariadb" | "postgresql" | "sqlite",
    dbName: String(process.env.DB_NAME),
    // password: process.env.PASSWORD,
    // user: process.env.USER,
    debug: false,
    allowGlobalContext: true,
    // port: Number(process.env.PORT)
  });

  return orm;
}
