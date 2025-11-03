const express = require("express");
const app = express();
const PORT = 8000;
const connectToMongoDB = require("./connect");
const urlRoute = require("./routes/url");

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("Connected to Mongodb")
);

app.use(express.json());

app.use("/url", urlRoute);

app.listen(PORT, () => {
  console.log(`App is listening on PORT=${PORT}`);
});
