import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import HttpError from './models/http-error';

const app: Express = express();

app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", '*')
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE");
    next();
});

app.use('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: 'GraphQl' })
});

app.use((req, res, next) => {
    throw new HttpError('The page you are looking for could not be found', null, 404)
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error has occured', content: error.content || null })
});

app.listen(process.env.PORT || 8000, () => {
    console.log('Connected');
})