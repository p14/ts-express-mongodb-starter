import cors from 'cors';
import { Application, json } from 'express';

// Specify origins that are authorized to make API requests
const corsConfig = cors({
    credentials: true,
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://hoppscotch.io',
    ],
});

// Apply JSON and CORS middleware to the entire application
const appConfig = (app: Application) => {
    app.use(json());
    app.use(corsConfig);
};

export default appConfig;
