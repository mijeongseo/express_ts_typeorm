import 'reflect-metadata';
import express, { Express, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import routes from '@routes/index';
import { initializeDatabase } from './libs/dataSource';
import { stream } from '@libs/logger';
import cors from 'cors';

const app: Express = express();

/* 
미들웨어 설정
*/
{
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(hpp());
    process.env.NODE_ENV === 'local' ? app.use(morgan('dev')) : morgan('tiny', { stream });
    if (process.env.NODE_ENV !== 'production') {
        app.use(cors({ origin: true, credentials: true }));
    } else {
        app.use(helmet({ contentSecurityPolicy: false }));
        app.use(cors({ origin: [], credentials: true }));
    }
}

/* 
라우팅 설정
*/
{
    app.get('/', (req: Request, res: Response) => {
        res.send(`${process.env.NODE_ENV || 'development'}-server is running`);
    });
    app.get('/health-check', (req, res) => {
        const data = {
            uptime: process.uptime(),
            message: 'Ok',
            date: new Date(),
        };
        res.status(200).send(data);
    });
    app.use('/', routes);
}

/* 
express server 실행
*/
{
    app.set('port', process.env.PORT || 3000);
    initializeDatabase().then(() =>
        app.listen(app.get('port'), () => {
            console.log(app.get('port'), '번 포트에 서버 실행');
        })
    );
}

/*
API 오류 핸들링
*/
{
    app.all('*', (_, res: Response) => {
        res.status(404).send('Not Found');
    });
    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(error);
        res.status(error.status || 500);
        res.json({ code: error.code || 'InvalidRequest', message: error.message || '요청 실패' });
    });
}
