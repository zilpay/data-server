
// Import the express in typescript file
import express from 'express';
import bodyParser from 'body-parser';

import { router } from './routers';
import { initORM } from '../orm';
 
// const DDDoS = require('dddos');
const cors = require("cors");

// Initialize the express engine
const app: express.Application = express();
 
// Take a port 3000 for running server.
const port: number = 3000;

// app.use(new DDDoS({
//   regexp: ".*",
//   flags: "i",
//   maxWeight: 4,
//   queueSize: 4
//   /*Configuration options*/
// }).express('ip', 'path'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);
 
// Handling '/' Request
app.get('/health', (_req, _res) => {
  _res.send("health 200");
});

(async function(){
  const orm = await initORM();

  app.set('orm', orm);

  // Server setup
  app.listen(port, () => {
    console.log(`TypeScript with Express http://localhost:${port}/`);
  });
}());
