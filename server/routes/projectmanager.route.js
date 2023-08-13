// ---------------------------------------------------
// ROUTES SETUP - User
// ---------------------------------------------------
// 1) Importing authenticate function for restricting requests
const {authentificate} = require("../config/jwt.config");

// 2) Importing Controller
const { getAllProjects, getOneProject, createProject, deleteProject, editProject} = require("../controllers/projectManager.controller");

// 3) Exporting Routes
module.exports = (app) => {
    app.get('/api/projects/', authentificate, getAllProjects);
    app.get('/api/projects/:id/', authentificate, getOneProject);
    app.post('/api/projects/', authentificate, createProject);
    app.patch('/api/projects/:id/', authentificate, editProject);
    app.delete('/api/projects/:id/', authentificate, deleteProject);
}