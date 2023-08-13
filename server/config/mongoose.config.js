// ---------------------------------------------------
// CONFIG SETUP - Database
// ---------------------------------------------------

// 1) Importing External Libraries (Moongose)
const mongoose = require("mongoose");
const db_name = "pojects_list_db";

// 2) Setting connection to Mongo DB using 'mongoose' instance
mongoose
    .connect(`mongodb://127.0.0.1/${db_name}`, {
        useNewUrlParser: true, // Avoids deprecation warnings -> enables new MongoDB connection string parser
        useUnifiedTopology: true, // Avoids connection errors -> enables new unified topology engine for MongoDB Node.js driver
    })
    .then(() => console.log(`Successfully connected to ${db_name} database`))
    .catch((err) => console.log(`Error connecting to ${db_name} database`, err));