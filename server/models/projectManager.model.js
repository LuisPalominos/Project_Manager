// ---------------------------------------------------
// MODEL SETUP - User
// ---------------------------------------------------

// 1) Importing External Libraries
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// 2) Creating Schema for Model (blueprint)
const ProjectsSchema = new mongoose.Schema(
{
    title:{
        type: String,
        unique: [true,"that project is already created"],
        required: [true, "please put project title"],
        minLength: [3, "projects title needs to be 3 characters or more"]
    }, 
    date:{
        type: Date,
        required: [true, "please put due date of the project"],
        validate: {
            validator: function (value) {
                return value > Date.now();
            },
            message: "Due date have expired",
        },
    },
    status:{
        type: String,
        enum: ["backlog", "progress", "completed"]
    }
}, 
    { timestamps: true}
);

ProjectsSchema.plugin(uniqueValidator,  { message: 'Error: User already registered.' });

// 3) Creating Model using Schema
const ProjectsModel = mongoose.model("Projects", ProjectsSchema);

// 4) Exporting Model
module.exports = ProjectsModel;