import express, { json } from "express";
import cors from "cors";
import router from "./API/ApiV1";
import dotenv from 'dotenv';
import session from "express-session";
dotenv.config();
const app=express();
app.use(json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'my_default_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // true if using HTTPS
}))
app.use(cors());
app.use("/api/v1",router);
app.listen(3001);