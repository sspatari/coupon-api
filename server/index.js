import express from 'express';
import config from './config';

let app = express();

app.listen(config.port, () => {
  console.log(`Application is running on port: ${config.port}`);
});
