import express, { Express, Request, Response } from 'express';
import routes from '@routes/index';

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
app.get('/', (req: Request, res: Response) => {
    res.send(`${process.env.NODE_ENV || 'development'}-server is running`);
});

app.use('/', routes);
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에 서버 실행');
});
