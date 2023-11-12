import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export default class PixelController {
    public async servePixel(req: Request, res: Response): Promise<void> {
        try {
            console.log(`Received request for pixel: ${req.url}`);
            const logEntry = `Time: ${new Date().toISOString()}, IP: ${req.ip}, User-Agent: ${req.headers['user-agent']}\n`;
            fs.appendFile('pixel.log', logEntry, (err) => {
                if (err) {
                    console.error('Error writing to log:', err);
                }
            });

            const pixelPath = path.join(__dirname, '../img/pxl.png'); // Ensure this path is correct
            console.log(`Serving pixel from: ${pixelPath}`);
            res.sendFile(pixelPath);
        } catch (error) {
            console.error('Error in servePixel:', error);
            res.status(500).send('Error serving pixel');
        }
    }
}
