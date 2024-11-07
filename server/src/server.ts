// const forceDatabaseRefresh = false;
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import sequelize from './config/connection.js';
import routes from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serves static files in the entire client's dist folder
// app.use(express.static(path.resolve(__dirname, '../client')));

// Uncomment once client folder is resolved
// app.get('/', (_, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/index.html'));
// });

app.get('/', (_, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});


app.use(express.json());
app.use(routes);

// sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
//   });
// });

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
