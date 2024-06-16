import express, { Express, Request, Response } from 'express';
import cors from 'cors';

import AccountController from './controllers/account';
import LinkController from './controllers/link';
import ProfileController from './controllers/profile';
import bodyParser from 'body-parser';

export const app: Express = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/health', (req: Request, res: Response) =>
	res.send('Server is up and running.'),
);

// Account Routes
app.post('/api/account/register', (req: Request, res: Response) =>
	AccountController.register(req, res),
);

app.post('/api/account/login', (req: Request, res: Response) =>
	AccountController.login(req, res),
);

app.put('/api/account/:id', (req: Request, res: Response) =>
	AccountController.update(req, res),
);

app.delete('/api/account/:id', (req: Request, res: Response) =>
	AccountController.delete(req, res),
);

// Link Routes
app.post('/api/link/:username', (req: Request, res: Response) =>
	LinkController.create(req, res),
);

app.get('/api/link/:username', (req: Request, res: Response) =>
	LinkController.get(req, res),
);

app.put('/api/link/:id', (req: Request, res: Response) =>
	LinkController.update(req, res),
);

app.delete('/api/link/:id', (req: Request, res: Response) =>
	LinkController.delete(req, res),
);

// Profile Routes
app.get('/api/profile/:username', (req: Request, res: Response) =>
	ProfileController.get(req, res),
);

app.post('/api/profile/image/:username', (req: Request, res: Response) =>
	ProfileController.uploadImage(req, res),
);

app.put('/api/profile/theme/:username', (req: Request, res: Response) =>
	ProfileController.updateTheme(req, res),
);

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
