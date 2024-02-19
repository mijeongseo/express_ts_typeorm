import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import dotenvConfig from './dotenv.config';

dotenvConfig();

export type TDataSource = DataSourceOptions & SeederOptions;
export const db: TDataSource = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    name: 'default',
    type: 'postgres',
    port: 5432,
    entities: [],
    seeds: [],
    synchronize: false,
    logging: true,
};
export default db;
