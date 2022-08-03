import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import routes from './router.js';

const app = express();

const port = process.env.PORT || 3000;

app.disable('x-powered-by');
app.use(cors({ exposedHeaders: ['x-session-id'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

routes(app);

app.listen(port, '0.0.0.0', () => console.log(`Server running on port ${port}! 🌏🚀`));
