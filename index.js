"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const rest_api_client_1 = require("@kintone/rest-api-client");
const app = (0, express_1.default)();
const port = 3010;
const client = new rest_api_client_1.KintoneRestAPIClient({
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
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).send({
        message: "Hello World!",
    });
}));
app.post("/cocoEnquete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //データの受信処理
    client.record.addRecord({
        app: 183,
        record: req.body.jsonForm
    });
    console.log('req.body.jsonForm', req.body.jsonForm);
    return res.status(200).send({
        message: "Hello cocoEnquete World!" + JSON.stringify(req.body),
    });
}));
try {
    app.listen(port, () => {
        console.log(`Connected successfully on port ${port}`);
    });
}
catch (error) {
    console.error(`Error occured: `);
}
