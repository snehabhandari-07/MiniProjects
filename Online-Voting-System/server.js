if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}
const express = require("express");
const app = express();
const path = require("path");
const db = require("./db");

const PORT= process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


// Import router file
const userRoutes = require("./routes/userRoute");
const candidateRoutes = require("./routes/candidateRoute");

// Use router file
app.use("/user", userRoutes);
app.use("/candidate", candidateRoutes);


app.listen(PORT, (req, res) => {
    console.log(`Server is listening on PORT=${PORT}`);
})