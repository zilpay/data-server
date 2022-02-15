
// Import the express in typescript file
import express from 'express';
import { router } from './routers';
import { initORM } from '../orm';
 
const DDDoS = require('dddos');
// Initialize the express engine
const app: express.Application = express();
 
// Take a port 3000 for running server.
const port: number = 3000;

app.use(new DDDoS({
  /*Configuration options*/
}).express('ip', 'path'));
app.use(express.json());
app.use(router);
 
// Handling '/' Request
app.get('/', (_req, _res) => {
  _res.send("TypeScript With Expresss");
});

(async function(){
  const orm = await initORM();

  app.set('orm', orm);

  // Server setup
  app.listen(port, () => {
    console.log(`TypeScript with Express http://localhost:${port}/`);
  });
}());
