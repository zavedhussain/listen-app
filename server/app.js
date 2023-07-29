require("dotenv").config();
require("express-async-errors");

//extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

const logger = require("morgan");
const express = require("express");
const app = express();
const connectdb = require("./db/connect");

//import routes
const authRouter = require("./routes/auth");
const listeningsRouter = require("./routes/listenings");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authMiddleware = require("./middleware/authentication");

//use logger
app.use(logger("dev"));

//as we are going to deploy to cloud hosting
//set to accept reverse proxy
app.set("trust proxy", 1);

app.use(express.json());
// extra packages

//use security packages
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/listenings", authMiddleware, listeningsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectdb(process.env.DB_URI);
    // console.log("Db connected...");
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
