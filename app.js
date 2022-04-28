const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routing/userRouting");
const bookRouting = require("./routing/bookRouting");
const bodyParse = require("body-parser");
const auth = require("./Authontication/auth");
const cors = require("cors");

app.use(cors());
dotenv.config();
const app = express();
const mongooseUrl = process.env.mongodb_url;
app.use(bodyParse.json());
app.use("/user", userRoute);
app.use("/books", auth, bookRouting);
app.use((req, res, next) => {
  const err = new Error("not found");
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: { message: err.message } });
});

mongoose
  .connect(mongooseUrl, { useNewUrlParser: true })
  .then(() => {
    console.log("mongoDB is Connected");
    return app.listen(3500, () => console.log("3500 server is running"));
  })
  .catch((err) => console.log(err.message));
