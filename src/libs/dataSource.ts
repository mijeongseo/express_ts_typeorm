import { DataSource } from 'typeorm';
import { database } from '../config';

const dataSource = new DataSource(database);

export default dataSource;

export const initializeDatabase = async () => {
    await new Promise((resolve, reject) =>
        dataSource
            .initialize()
            .then(() => {
                // console.log(`Data Source has been initialized!`);
                resolve(`Data Source has been initialized!`);
            })
            .catch((err) => {
                // console.error(`Error during Data Source ${idx + 1} initialization:`, err);
                reject(err);
            })
    );
};
