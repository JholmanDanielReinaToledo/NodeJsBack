import { DataSource, DataSourceOptions } from 'typeorm';
import { Tarea } from '../model/tarea.entity';
import { User } from '../model/security/user.entity';

const dataSource: DataSource  = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'juanesloco123',
  database: 'postgres',
  synchronize: true, // Sincronizar los modelos con la base de datos en cada inicio
  logging: true, // Habilitar registros de consulta en la consola
  entities: [
    // Importa aquí tus entidades de TypeORM
    Tarea,
    User,
  ],
  migrations: [
    // Importa aquí tus migraciones de TypeORM (opcional)
  ],
  subscribers: [
    // Importa aquí tus suscriptores de TypeORM (opcional)
  ],
});

export default dataSource;
