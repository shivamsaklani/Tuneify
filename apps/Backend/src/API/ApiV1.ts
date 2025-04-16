import { Router } from "express";

import spotify from "./Spotify/spotify";
import dotenv from 'dotenv';
dotenv.config();
const router=Router();


router.use("/spotify",spotify);

export default router;
