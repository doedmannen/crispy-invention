import express, { Request, Response } from 'express';
import { shopItemController } from '../../controllers';

export const router = express.Router({
    strict: true
});

router.post('/', (req: Request, res: Response) => {
    shopItemController.create(req, res);
});

router.get('/', (req: Request, res: Response) => {
    shopItemController.read(req, res);
});

router.patch('/', (req: Request, res: Response) => {
    shopItemController.update(req, res);
});

router.delete('/', (req: Request, res: Response) => {
    shopItemController.delete(req, res);
});
