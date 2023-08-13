// ---------------------------------------------------
// SERVER INITIALIZATION AND CONFIGURATION SETUP
// ---------------------------------------------------

// 0) load up all of our keys and values from the .env file into memory
require("dotenv").config();

// 1) Imports of 3rd-party Libraries
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")

// 2) Intiliazing Express instance ('app') and define auxiliar variables
const app = express();
const port = process.env.PORT;

// 3) Configuring cors in Express instace ('app')
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: "GET, POST, PATCH, DELETE"
}));

// 4) Enabling settings for being able to read JSON and parse url encoded data in requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5) Incorporating cookie-parser middleware to Express instance ('app')
app.use(cookieParser());

// 6) Initializing connection to NoSQL database (MongoDB) using Moongose interface
require("./config/mongoose.config");

// 7) Importing API routes passing the Express instance 'app'
const UserList = require("./routes/users.route");
UserList(app);
const ProjectsList = require("./routes/projectmanager.route");
ProjectsList(app);

// 8) Running instance of Express server in selected port
app.listen(port, () => console.log(`Listening on port: ${port}`));