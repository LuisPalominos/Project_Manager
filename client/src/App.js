import React, {useState} from "react";
import Main from "./views/Main";
import NewProject from "./views/NewProject";
import Home from "./views/Home";

import {Routes, Route, Navigate} from "react-router-dom";

function App() {
// ---------------------------------------------
// I) VARIABLES & HOOKS
// ---------------------------------------------

const [user, setUser] = useState(null);

// ---------------------------------------------
// II) HANDLERS & AUX FUNCTIONS
// ---------------------------------------------



// ---------------------------------------------
// III) JSX
// ---------------------------------------------
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={!user?<Navigate to="/sign_in" />:<Main />}/>
        <Route path="/sign_in" element={<Home setUser={setUser}/>}/>
        <Route path="/" element={user? <Main />: <Home/>}/>
        <Route path="/projects/new" element={user? <NewProject /> : <Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
