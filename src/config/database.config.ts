import dotenvConfig from './dotenv.config';

dotenvConfig();

const db = {
    db1: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE_1,
        host: process.env.DB_HOST,
        dialect: 'mysql',
    },
    db2: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE_2,
        host: process.env.DB_HOST,
        dialect: 'mysql',
    },
};

export default db;
