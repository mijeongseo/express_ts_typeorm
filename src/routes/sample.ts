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

export default router;
