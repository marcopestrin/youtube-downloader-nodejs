import { config } from "dotenv";
config();
import express from "express";
import bodyParser from "body-parser";
import http, { Server } from "http";
import router from "./router";

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(router);

const server: Server = http.createServer(app);

server.listen(3000, () => {
  console.log("Server running up 3000");
});
