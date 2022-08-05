import express from "express";
import bodyParser from "body-parser";
import deserializeUser from "./middleware/deserializeUser";
const app = express();


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(deserializeUser);
export default app;
