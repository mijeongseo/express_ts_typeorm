import express, { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response, next) => {
    try {
        res.status(200).send('ok');
    } catch (error) {
        console.error(error);
        res.status(400).json({ code: 'InvalidRequest', message: '요청 실패' });
        // next(error);
    }
});

router.post('/valid', body('email').isEmail().withMessage('Please enter a valid email'), async (req: Request, res: Response, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Invalid value');
            error.status = 400;
            error.errors = errors.array();
            throw error;
        }
        res.status(200).send('ok');
    } catch (error) {
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
