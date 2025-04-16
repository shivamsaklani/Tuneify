const {Router }=require("express");
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import generateRandomString from "./Generate"
dotenv.config();
const router = Router();
const ClientID=process.env.ClientID;
const ClientKey=process.env.ClientKey;
const RedirectURL=process.env.RedirectURL;
var scope = "streaming \
               user-read-email \
               user-read-private";
router.get("/authorize",(req:Request,res:Response)=>{
    var state= generateRandomString(16);
    console.log(state);
    var auth_query_parameters = new URLSearchParams({
        response_type:"code",
        client_id:ClientID,
        scope:scope,
        redirect_uri:RedirectURL,
        state:state
    });

    res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());

});

export default router;