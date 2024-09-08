import { DataSource } from "typeorm";
import env from "../env";

const databaseType = env.ENV_DATABASE.DB_DIALECT as "mysql" | "mariadb" | "postgres" | "sqlite" | "oracle" | "mssql";

const connection = new DataSource({
  type: databaseType,
  host: env.ENV_DATABASE.DB_HOST,
  port: parseInt(env.ENV_DATABASE.DB_PORT || '3306'),
  username: env.ENV_DATABASE.DB_USERNAME || 'root',
  password: env.ENV_DATABASE.DB_PASSWORD || 'yourpassword',
  database: env.ENV_DATABASE.DB_NAME || 'database',
  synchronize: true,  
  logging: true,      
  subscribers: [],
  migrations: [__dirname + "/../migrations/*.ts"],
  entities: [__dirname + "/../entities/*.ts"]
});

const ConnectDB = async (): Promise<void> => {
  try {
    await connection
    console.log(`Database connected: ${connection.options.database}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};
ConnectDB();

export default connection;
