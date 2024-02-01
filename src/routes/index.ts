import express, { Router } from 'express';
import sampleRouter from './sample';

export const routes: Router = express.Router();

routes.use('/sample', sampleRouter);

export default routes;
