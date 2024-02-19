import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response, next) => {
    try {
        res.status(200).send('ok');
    } catch (error) {
        console.error(error);
        res.status(400).json({ code: 'InvalidRequest', message: '요청 실패' });
        next(error);
    }
});

router.post('/error', async (req: Request, res: Response, next) => {
    try {
        const error = new Error('테스트 에러');
        error.code = 'TestError';
        error.status = 400;
        throw error;
    } catch (error) {
        next(error);
    }
});

export default router;
