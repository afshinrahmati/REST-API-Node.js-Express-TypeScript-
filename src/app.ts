import express from "express";
import deserializeUser from "./middleware/deserializeUser";
const app = express();

app.use(express.json());
app.use(deserializeUser);
export default app;
