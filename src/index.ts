import express from 'express';
import ServerV1 from './versions/server.v1';
import dotenv from 'dotenv';
import dataSource from '../config/database';
dotenv.config();

dataSource.initialize().then((values) => {
  console.log('Base de datos conectada');
  // console.log(values);
}).catch((err) => {
  console.log('Base de datos no conectada');
  // console.log(err);
})

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1', ServerV1);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
