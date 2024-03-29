const express = require("express");
require("dotenv").config();
const connectDB = require("./config/DB.config");
const cors = require("cors");

const bodyParser = require("body-parser");
const saloonRouter = require("./router/saloon/auth");
const saloonspecialistRouter = require("./router/saloon/stylist");
const saloonserviceRouter = require("./router/saloon/service");
const { UnAuthorized, NotFound } = require("./middleware/ErrorHandler");
const userRouter = require("./router/client/auth");
const shopRouter = require("./router/client/shop");
const serviceRouter = require("./router/client/service");
const stylistRouter = require("./router/client/stylist");

const app = express();

// middleware functions
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// routes
app.use("/api/v1/saloon/", saloonRouter);
app.use("/api/v1/saloon", saloonspecialistRouter);
app.use("/api/v1/saloon/", saloonserviceRouter);

// client
app.use("/api/v1/user/", userRouter);
app.use("/api/v1/user/", shopRouter);
app.use("/api/v1/user/", serviceRouter);
app.use("/api/v1/user/", stylistRouter);

app.use(UnAuthorized);
app.use(NotFound);

// db connection and server listning
connectDB()
  .then(() => {
    console.log("database connected ");
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`app lisning on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
