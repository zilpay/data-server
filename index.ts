import { Worker } from 'worker_threads';
import path from 'path';

const updaterThread = new Worker(path.join(__dirname, './src/tasks/updater.js'));
const serverThread = new Worker(path.join(__dirname, './src/tasks/server.js'));
const trackThread = new Worker(path.join(__dirname, './src/tasks/tracker.js'));
// const rateThread = new Worker(path.join(__dirname, './src/tasks/rate.js'));

// function updateData() {
//   updaterThread.postMessage('');
// }

// updateData();
