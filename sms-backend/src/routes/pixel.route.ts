import { Router } from 'express';
import PixelController from '../controllers/pixel.controller';

const pixelRouter = Router();
const pixelController = new PixelController();

// Define the route for serving the pixel
pixelRouter.get('/pixel', (req, res) => {
    pixelController.servePixel(req, res);
});

export default pixelRouter;
