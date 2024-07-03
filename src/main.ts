import express from "express";
import "dotenv/config";
import Router from "./router/router";

const port = process.env.PORT;

const app = express();

app.use(express.json());

app.use(Router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});