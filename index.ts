import { Worker } from 'worker_threads';
import path from 'path';
import { initORM } from './src/orm';
import { config } from 'dotenv';

config();
(async function(){
  const orm = await initORM();

  try {
    const generator = orm.getSchemaGenerator();
    await generator.createSchema();
  } catch (err) {
    console.log('already created database');
  }
  const migrator = orm.getMigrator();
  await migrator.createInitialMigration();
  await migrator.createMigration();
  await migrator.up();

  orm.close();

  const updaterThread = new Worker(path.join(__dirname, './src/tasks/updater.js'));
  const serverThread = new Worker(path.join(__dirname, './src/tasks/server.js'));
  const trackThread = new Worker(path.join(__dirname, './src/tasks/tracker.js'));
  const rateThread = new Worker(path.join(__dirname, './src/tasks/rate.js'));
}());

// function updateData() {
//   updaterThread.postMessage('');
// }

// updateData();
