const {Router }=require("express");
import dotenv from 'dotenv';
import { Request, Response } from 'express';
dotenv.config();
const router = Router();
const {ClientID}= require("./configure");
console.log(ClientID);
router.get("/get",(req:Request,res:Response)=>{
   

    res.json({
        mesg:process.env.ClientID
    });

});

export default router;