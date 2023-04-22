import { config } from 'dotenv';

config();

import { Worker } from 'worker_threads';
import path from 'path';
import { initORM } from './src/orm';


(async function() {
  const orm = await initORM();

  try {
    const generator = orm.getSchemaGenerator();
    await generator.createSchema();
  } catch (err) {
    console.log('already created database');
  }
  const migrator = orm.getMigrator();

  try {
    await migrator.createInitialMigration();
  } catch (err) {
    console.log((err as Error).message);
  }
  try {
    await migrator.createMigration();
  } catch (err) {
    console.log((err as Error).message);
  }
  try {
    await migrator.up();
  } catch (err) {
    console.log((err as Error).message);
  }

  orm.close();

  new Worker(path.join(__dirname, './src/tasks/updater.js'));
  new Worker(path.join(__dirname, './src/tasks/server.js'));
  new Worker(path.join(__dirname, './src/tasks/tracker.js'));
  new Worker(path.join(__dirname, './src/tasks/rate.js'));
}());

// function updateData() {
//   updaterThread.postMessage('');
// }

// updateData();
