// ---------------------------------------------------
// CONTROLLER SETUP - User
// ---------------------------------------------------

// 1) Importing Model
const mongoose = require("mongoose");
const {ObjectId} = mongoose.Types;
const ProjectsModel = require("../models/projectManager.model");

// 2) Exporting Controller functions
module.exports = {
  // 2.1) READ METHODS
    getAllProjects: (req, res) => {
        ProjectsModel.find()
            .then((projects) => {
                res.json({data: projects})
            })
            .catch((error) => {
                res.status(500).json({error: error})
            })
    },
    getOneProject : (req, res) => {
        let id = req.params.id
        if (!ObjectId.isValid(id))
            return res.status(400).json({message: "id doesn't match the expected format"});
        ProjectsModel.findOne({_id: id})
            .then((project) => {
                res.json({data: project})
            })
            .catch((error) => {
                res.status(500).json({error: error})
            })
    },
    // 2.2) CREATE METHODS
    createProject : (req, res) => {
        let data = req.body;
        ProjectsModel.create(data)
            .then((project) => {
                res.json({data: project})
            })
            .catch((error) => {
                if (error instanceof mongoose.Error.ValidationError){
                    let keys = Object.keys(error.errors);
                    let error_dict = {};
                    keys.map((key) => {
                        error_dict[key] = error.errors[key].message
                    });
                    res.status(500).json({error: error_dict})
                } else {
                    res.status(500).json({error: error})
                }
            })
    },
    // 2.3) UPDATE METHODS
    editProject : (req, res) => {
        let id = req.params.id;
        let data = req.body;
        const updateOptions = {
            new: true, // Return the updated document
            runValidators: true, // Enforce validation during update
        };
        if (!ObjectId.isValid(id))
            return res.status(400).json({message: "id doesn't match the expected format"});
        ProjectsModel.findByIdAndUpdate({_id: id}, data, updateOptions)
            .then(() => {
                res.json({success: true})
            })
            .catch((error) => {
                if (error instanceof mongoose.Error.ValidationError){
                    let keys = Object.keys(error.errors);
                    let error_dict = {};
                    keys.map((key) => {
                        error_dict[key] = error.errors[key].message
                    });
                    res.status(500).json({error: error_dict})
                } else {
                    res.status(500).json({error: error})
                }
            })
    },
    // 2.4) DELETE METHODS
    deleteProject : (req, res) => {
        let id = req.params.id
        if (!ObjectId.isValid(id))
            return res.status(400).json({message: "id doesn't match the expected format"});
        ProjectsModel.deleteOne({_id: id})
            .then(() => {
                res.json({success: true})
            })
            .catch((error) => {
                res.status(500).json({error: error})
            })
    },
};