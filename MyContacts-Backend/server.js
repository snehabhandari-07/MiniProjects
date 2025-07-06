const express = require("express");
const app = express();
require('dotenv').config()
const errorHandler = require("./middleware/errorHandler");
const port = process.env.PORT || 5000;
const contactRouter = require("./routes/contactRoutes");
const userRouter = require("./routes/userRoutes");
const connectDb = require("./config/dbConnection");

connectDb();
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


app.use("/api/contacts", contactRouter);
app.use("/api/users", userRouter);

// Middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`App is listening on Port ${port}`);
})