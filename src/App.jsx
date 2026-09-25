// import React, { useEffect, useState } from 'react'
// import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
// import { Navbar } from './Component/Navbar';
// import Register from './pages/Register';
// import Login from './pages/login';
// import axios from "axios";
// import Calculator from './pages/Calculator';
// const  App = () => {
//   const [ user , setUser] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() =>{
//     const fetchUser = async () => {
//       try {
//       const res = await axios.get("http://localhost:8000/v1/Calculator");
//       setUser(res.data);
//     } catch (error) {
//       setUser(null);
//       setError("Unable to fetch user");
//     }
//     finally{
//       setLoading(false);
//     }
//     };
//     fetchUser()
//   },[]);

//   if(loading){
//     return <div>Loading...</div>
//   }

//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//       <Route path='/calculator' element={< Calculator/>}></Route>
//       <Route path='/login' element={<Login setUser ={setUser}/>}></Route>
//       <Route path='/register' element={< Register setUser={setUser}/>}></Route>
//       </Routes>
//     </Router>
//   )
// }

// export default App;
import React, { useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate
} from "react-router-dom";

import { Navbar } from "./Component/Navbar";
import Register from "./pages/Register";
import Login from "./pages/login";
import Calculator from "./pages/Calculator";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Navbar />

      <Routes>

        {/* App open hote hi Login */}
        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={<Login setUser={setUser} />}
        />

        <Route
          path="/register"
          element={<Register setUser={setUser} />}
        />

        <Route
          path="/calculator"
          element={<Calculator />}
        />

      </Routes>
    </Router>
  );
};

export default App;