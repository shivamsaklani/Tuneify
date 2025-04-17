const { Router } = require("express");
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import generateRandomString from "./Generate";
import axios from 'axios';
import qs from "qs";
dotenv.config();
const router = Router();
const ClientID = process.env.ClientID;
const ClientKey = process.env.ClientKey;
const RedirectURL = process.env.RedirectURL;
var scope = "streaming \
               user-read-email \
               user-read-private";
router.get("/authorize", (req: Request, res: Response) => {
    var state = generateRandomString(16);
    var auth_query_parameters = new URLSearchParams({
        response_type: "code",
        client_id: ClientID,
        scope: scope,
        redirect_uri: RedirectURL,
        state: state
    });

    res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());

});

router.get('/auth/callback', async (req:Request, res:Response) => {
    const code = req.query.code;
     console.log(code);
    const authOptions = {
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: qs.stringify({
        code: code,
        redirect_uri: RedirectURL,
        grant_type: 'authorization_code'
      }),
      headers: {
        'Authorization': 'Basic ' + Buffer.from(ClientID+ ':' + ClientKey).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
  
    try {
      const response = await axios(authOptions);
      const access_token = response.data.access_token;
      res.redirect('/');
    } catch (error) {
      console.error('Error getting token:', error);
      res.status(500).send('Authentication failed');
    }
  });
  

router.get("/auth", (req: Request, res: Response) => {

});

export default router;