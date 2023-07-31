import express from 'express';
import Server from './Server';
import dotenv from 'dotenv';

dotenv.config();

const port = Number(process.env.PORT);
const app = express();
const server = new Server(app, port);
export default app;

//=-=-=-=-=-=-=-=-=-=//
server.config();

if (process.env.NODE_ENV !== 'test') {
    server.run();
}