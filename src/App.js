import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './component/pages/Login/Login';
import Register from './component/pages/Register/Register';
import Home from './component/home/Home';
import './Bo-Re/Bootstrap.scss';
import './Bo-Re/Responsive.scss';
import history from "./history";
import axios from "axios";

function App() {

  const [users, setUsers] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const id = localStorage.getItem('_id');
      if (accessToken) {
        const verified = await axios.get(`http://localhost:8800/server/users/find/${id}`, {
          headers: {Authorization: accessToken}
        })
        setUsers(verified.data)
        if (verified.data === false) {
          return localStorage.clear();
        }
      } else {
        setUsers(false);
      }
    }
    checkLogin()
  })

  return (
    <Router history={history}>
        <Routes>
          <Route path='/'>
            {users? <Route path='/login' element={<Navigate to='/home' />}/> : <Route path='/' element={<Navigate to='/login' />} />
            }
          </Route>
          <Route exact path='/login' element={<Login setUsers={(e) => setUsers(e)} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />}/>
        </Routes>
    </Router>
  );
}

export default App;
