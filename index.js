const express = require("express");
const cors = require("cors");
const connectDb = require("./config/dbConnection");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

const userRoutes = require("./routes/userRoutes");
const urlRoutes = require("./routes/urlRoutes");
const urlRedirectRoute = require("./routes/urlRedirectRoute");


connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", urlRedirectRoute); // public
app.use("/api/user", userRoutes,urlRoutes); // public

app.listen(port, () => {
  console.log(`connected to port: ${port}`);
});
