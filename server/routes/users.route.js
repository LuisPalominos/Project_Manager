// ---------------------------------------------------
// ROUTES SETUP - User
// ---------------------------------------------------

// 1) Importing Controller
const {registerUser, loginUser} = require("../controllers/users.controller");

// 2) Exporting Routes
module.exports = (app) => {
    app.post('/api/users/register/', registerUser);
    app.post('/api/users/login/', loginUser);
}