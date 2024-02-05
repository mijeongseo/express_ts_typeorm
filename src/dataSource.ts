import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import path from 'path';
import { database } from './config';

const entities = [path.join(__dirname + '/entities/*.{ts,js}'), path.join(__dirname + '/entities/*.{ts,js}')];

const setDataSources = () => {
    const dataSources = Object.values(database).map((db, idx) => {
        // console.log(db);
        const options: DataSourceOptions & SeederOptions = {
            ...db,
            name: 'default',
            type: 'mysql',
            port: 3306,
            // entities: [...entities[idx]],
            // seeds: ['database/seeds/*.ts'],
            logging: true,
            synchronize: false,
        };
        return new DataSource(options);
    });

    return dataSources;
};

const dataSources = setDataSources();

export default dataSources;
