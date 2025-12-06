const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const path = require("path");
require('dotenv').config();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("home");
})
app.listen(PORT, () => {
    console.log(`App is listening on PORT=${PORT}`);
})