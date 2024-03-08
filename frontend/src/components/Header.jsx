import React, { useEffect, useState } from 'react'
import './Header.css'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'


const Header = () => {

const[auth, setAuth] = useState(false);

  
  axios.defaults.withCredentials = true;
  
  useEffect(()=> {
    axios.get('http://localhost:8080/')
    .then(res => {
                console.log(res.data.status);
                if(res.data.status === "Authorized") {
                setAuth(true);
                this.forceUpdate()
                } else if(res.data.status === "Unuthorized"){
                  setAuth(false);
                }
                
                })
  },[])

const logout = () => {
  axios.get('http://localhost:8080/logout')
    .then(res => { 
      location.reload(true); 
    })
    .catch(err => console.log(err))
}

  return (
    <div className="navbar">
      <div className="navbar-brand">
        <Link to="/">My Blog</Link>
      </div>
      <div className="navbar-menu">

        {
          (auth) ? 
          <div>
               <button onClick={logout}>Logout </button>
          </div> 
                : 
          <div>
               
               <Link to="/Login">Login</Link>
               <Link to="/register">SignUp</Link>
          </div>
        }
        
      </div>
    </div>
  )
}

export default Header