import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import dbConnect from './utils/db.connect';
import registerControllers from './controllers/_register.controllers';
import appConfig from './utils/app.config';

// Call env file
dotenv.config();

// Set the port number
const port = process.env.PORT || 8000;

// Setup application
const app: Application = express();

// Configure application and register controllers
appConfig(app);
registerControllers(app);

// Status check endpoint
app.get('/', (req: Request, res: Response) => {
    res.send(`Welcome to Express & TypeScript Server`);
});

// Connect to MongoDB and start the server if the connection succeeds
dbConnect().then(() => {
    app.listen(port, () => {
        console.log(`Express app listening on port ${port}`);
    });
});
