require("dotenv").config();
const { checkConnection, syncModels } = require("./db_conection/index");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const addRelationsToModels = require("./db_conection/model");

async function connectDB() {
  await checkConnection();
  addRelationsToModels();
  syncModels("alter");
}

function launchServer() {
  const app = express();

  app
    .use(cors())
    .use(morgan("dev"))
    .use(express.json())
    .use("/api", require("./api/routers/index"))
    .listen(process.env.PORT, () =>
      console.log("Server listening on port 3000")
    );
}

async function startApi() {
  await connectDB();     // 🔥 espera la conexión real
  launchServer();
}

startApi();
