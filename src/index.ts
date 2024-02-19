import express, { Express, Request, Response } from 'express';
import routes from '@routes/index';
import { initializeDatabase } from './dataSource';

const app: Express = express();

/* 
미들웨어 설정
*/
{
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
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
