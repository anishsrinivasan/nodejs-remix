import express from "express";
import http from "http";
import https from "https";
import fs from "fs";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";

import { PORT, HTTPS_KEY, HTTPS_CERT, HTTPS_ENABLED } from "./config";
import routesV1 from "./routes/v1";

let httpServer;
const app = express();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors());

app.use("/v1", routesV1);

if (HTTPS_ENABLED) {
  const httpsOptions = {
    key: fs.readFileSync(path.resolve(__dirname, HTTPS_KEY)),
    cert: fs.readFileSync(path.resolve(__dirname, HTTPS_CERT)),
  };
  httpServer = https.createServer(httpsOptions, app);
} else {
  httpServer = http.createServer(app);
}

httpServer.listen(PORT, () => {
  console.log(
    `⚡️[server]: Server is running at ${
      HTTPS_ENABLED ? "https" : "http"
    }://localhost:${PORT}`
  );
});

const io = require("socket.io")(httpServer);
io.on("connection", function (socket: any) {
  console.log(`New connection: ${socket.id}`);
  socket.on("disconnect", () => console.log(`Connection left (${socket.id})`));
});
