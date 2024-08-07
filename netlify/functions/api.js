const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const mainRouter = require("../../src/app.routes");
const SwaggerConfig = require("../../src/config/swagger.config");
const NotFoundHandler = require("../../src/common/exception/not-found.handler");
const AllExceptionHandler = require("../../src/common/exception/all-exception.handler");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("../../src/config/mongoose.config");

app.use("/api", mainRouter);

SwaggerConfig(app);
NotFoundHandler(app);
AllExceptionHandler(app);

module.exports.handler = serverless(app);
