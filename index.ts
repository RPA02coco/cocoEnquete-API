require('dotenv').config()
import express, { Application, Request, Response } from "express";
import cors from 'cors';
import { KintoneRestAPIClient } from "@kintone/rest-api-client";

const app: Application = express();
const port = 3010;

const client = new KintoneRestAPIClient({
  baseUrl: "https://rdmuhwtt6gx7.cybozu.com",
  // Use password authentication
  /* auth: {
    username: process.env.KINTONE_USERNAME,
    password: process.env.KINTONE_PASSWORD,
  }, */
  // Use API token authentication
  auth: { apiToken: process.env.KINTONE_API_TOKEN }
  // Use OAuth token authentication
  // auth: { oAuthToken: process.env.KINTONE_OAUTH_TOKEN }

  // Use session authentication if `auth` is omitted (in browser only)
});

/* client.record.getAllRecords({
  app: 183
}).then(res => console.log('allRecords', res));

console.log('KINTONE_API_TOKEN', process.env.KINTONE_API_TOKEN);
 */



// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())

app.get(
    "/",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({
            message: "Hello World!",
        });
    }
);

app.post(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
      //データの受信処理
      client.record.addRecord({
        app: 183,
        record: req.body.jsonForm
      })
      console.log('req.body.jsonForm', req.body.jsonForm);

      return res.status(200).send({
          message: "Hello cocoEnquete World!" + JSON.stringify(req.body) ,
      });
  }
);
try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error) {
    console.error(`Error occured: `);
}
