import { DataSource } from 'typeorm';
import { database } from './config';
import type { TDataSource } from './config/database.config';

const setDataSources = () => {
    const dataSources = Object.values(database).map((db, idx) => {
        const options: TDataSource = {
            ...db,
            logging: true,
            synchronize: false,
        };
        return new DataSource(options);
    });

    return dataSources;
};

const dataSources = setDataSources();

export default dataSources;

export const initializeDatabase = async () => {
    await Promise.all(
        dataSources.map(async (dataSource, idx) => {
            await dataSource
                .initialize()
                .then(() => {
                    console.log(`Data Source ${idx + 1} has been initialized!`);
                })
                .catch((err) => {
                    console.error(`Error during Data Source ${idx + 1} initialization:`, err);
                });
        })
    );
};
