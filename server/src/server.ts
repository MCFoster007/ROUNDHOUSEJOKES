const forceDatabaseRefresh = false;
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import sequelize from './config/connection.js';
import routes from './routes/index.js';
import path from 'path';


const app = express();
const PORT = process.env.PORT || 3001;



// Serves static files in the entire client's dist folder
app.use(express.static(path.resolve('../client/dist')));



app.get('/', (_, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});


app.use(express.json());
app.use(routes);

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});


