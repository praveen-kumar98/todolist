const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const Routes = require("./routes");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"))
  .catch((err) => console.error(err));

const logger = (req, _, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
};

app.use(express.json({ extended: false }));
app.use(cors());
app.use(logger);
app.use("/api", Routes);
app.use((_, __, next) => {
  const err = new Error("Page not found");
  err.status = 404;
  next(err);
});
app.use((err, _, res, __) => {
  res.statusCode = err.status || 500;
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log("Running on port 4000"));
