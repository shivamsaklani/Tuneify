import { Router }from "express";
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import generateRandomString from "./Generate";
import axios from 'axios';
import qs from "qs";
dotenv.config();
const router = Router();
const ClientID = process.env.ClientID;
const ClientKey = process.env.ClientKey;
const RedirectURI = process.env.RedirectURL;
var scope = "streaming \
                user-read-email \
                user-read-private \
                user-read-playback-state \
                user-modify-playback-state \
                user-read-currently-playing \
                user-library-read \
                user-read-recently-played \
                user-follow-read \
                playlist-read-private \
                streaming";
router.get("/authorize", (req: Request, res: Response) => {
    var state = generateRandomString(16);
    var auth_query_parameters = new URLSearchParams({
        response_type: "code",
        client_id: ClientID,
        scope: scope,
        redirect_uri: RedirectURI,
        state: state,
        show_dialog:"true",
    });

    res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());

});

router.get('/auth/callback', async (req:Request, res:Response) => {
    const code = req.query.code;
    const authOptions = {
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: qs.stringify({
        code: code,
        redirect_uri: RedirectURI,
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
      const refresh_token=response.data.refresh_token;
      res.redirect(`/callback?token=${access_token}&refresh_token=${refresh_token}`);
    } catch (error) {
      console.error('Error getting token:', error);
      res.status(500).send('Authentication failed');
    }
  });
  

router.get('/auth/refresh_token',async(req:Request,res:Response)=>{
  const refresh_token= req.query.refresh_token as string;
  console.log(refresh_token);
  const authHeader = Buffer.from(`${ClientID}:${ClientKey}`).toString('base64');
  if(!refresh_token) return;
  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refresh_token);
     const GenerateNewtoken = await axios.post("https://accounts.spotify.com/api/token",params,{
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${authHeader}`,
      }
     });
     res.status(200).json({
      token:GenerateNewtoken.data.access_token,
      new_refresh_token:GenerateNewtoken.data.refresh_token || refresh_token
     });
     return;
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
    return;
  }

});

router.put('/playstatus', async (req:Request,res:Response)=>{
  const token = req.body.token;
  const isPlaying = req.body.PlayStatus;
  const Play = await axios.put(`https://api.spotify.com/v1/me/player/${isPlaying?"play":"pause"}`,null,{
    headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type":"application/json"
    }
});
});



export default router;