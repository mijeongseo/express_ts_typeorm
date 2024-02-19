import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import dotenvConfig from './dotenv.config';

dotenvConfig();

export type TDataSource = DataSourceOptions & SeederOptions;
export const db: TDataSource = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_1,
    host: process.env.DB_HOST,
    name: 'db1',
    type: 'mysql',
    port: 3306,
    entities: [],
    seeds: [],
};
export default db;
