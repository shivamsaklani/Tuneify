import dotenv from 'dotenv';
dotenv.config();
const ClientId=process.env.ClientID;
const ClientSecret = process.env.ClientKey;
const RedirectURL = process.env.RedirectURL;

export {
    ClientId,
    ClientSecret,
    RedirectURL
}