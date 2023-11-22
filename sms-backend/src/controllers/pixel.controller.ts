import { Request, Response, Router } from 'express';
import fs from 'fs';

/******************************************* P I X E L  S E R V I C E ******************************************************* */
export const logActivity = (
  req: Request,
  activityType: 'VIEW' | 'CLICK',
  logFilePath: string
  ): void => {
    const timestamp = new Date().toISOString();
  const ipAddress = req.ip;
  const userAgent = req.headers['user-agent'] || 'Unknown';

  const logEntry = `Time: ${timestamp}, Activity: ${activityType}, IP: ${ipAddress}, User-Agent: ${userAgent}\n`;
  fs.appendFileSync(logFilePath, logEntry, 'utf8');
};

export const getCount = (logFilePath: string, activityType: 'VIEW' | 'CLICK'): number => {
  const data = fs.readFileSync(logFilePath, 'utf8');
  const lines = data.split('\n');
  const count = lines.filter((line) => line.includes(activityType)).length;
  return count;
};

/**************************************************************************************************** */

const pixelRouter = Router();

pixelRouter.post('/log-view', (req: Request, res: Response) => {
  logActivity(req, 'VIEW', 'widget-activity.log');
  res.status(200).send('View logged');
});

pixelRouter.post('/log-click', (req: Request, res: Response) => {
  logActivity(req, 'CLICK', 'widget-activity.log');
  res.status(200).send('Click logged');
});

pixelRouter.get('/view-count', (req: Request, res: Response) => {
  const count = getCount('widget-activity.log', 'VIEW');
  res.json({ viewCount: count });
});

pixelRouter.get('/click-count', (req: Request, res: Response) => {
  const count = getCount('widget-activity.log', 'CLICK');
  res.json({ clickCount: count });
});

export default pixelRouter;
