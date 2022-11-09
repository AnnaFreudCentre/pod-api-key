import fetch from "node-fetch";
import jwt from "jsonwebtoken";
import fs from "fs";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';

dotenv.config();

// Before you can call the API, you first need to generate and sign a JWT.

const payload = {
    iss: process.env.API_KEY, // The issuer of the JWT. Set this to your API Key
    sub: process.env.API_KEY, // The subject of the JWT. Also set this to your API Key
    exp: moment().add(5, 'minutes').unix(), // Expiry time of the JWT, expressed as a Numeric Time value - the number of seconds since epoch (for example, a UNIX timestamp). Must not be more than 5 minutes after the time of creation of the JWT
    jti: uuidv4() // A unique identifier for the JWT, used to prevent replay attacks. We recommend a randomly-generated GUID
}

// Sign the JWT with your private key

const private_key = fs.readFileSync('private.pem');
const token = jwt.sign(payload, private_key, { algorithm: 'RS256'});

// Once you have created the jwt token, an auth token can be requested from /rest/auth/api-key

const response = await fetch(`${process.env.API_URL}/rest/auth/api-key`, {
    method: 'post',
    body: JSON.stringify({
        token: token
    }),
    headers: {'Content-Type': 'application/json'}
});
const authToken = await response.text();

console.log({
    message: 'The auth token',
    data: authToken
});

// With your access token you can make requests to the API with the Authorization header

const contract = await fetch(`${process.env.API_URL}/rest/contracts/${process.env.CONTRACT_ID}`, {
    headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}`}
});
const contractJSON = await contract.json();

console.log({
    message: 'The contract response',
    data: contractJSON
});