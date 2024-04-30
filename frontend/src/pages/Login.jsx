import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import  axios  from 'axios';
import "./Style.css"
import Header from '../components/Header'

const Login = () => {

    const [user, setUser] = useState({
        email : '',
        password : '' ,
    })
    const [checkpass, setCheckpass] = useState(false);
    const [checkEmail, setCheckEmail] = useState(false);

    const UpdateInput = (evt) => {
        setUser({...user,[evt.target.name] : evt.target.value});
    }

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = async(event) => {
    setCheckpass(false);
    setCheckEmail(false);
    event.preventDefault();

     await axios.post('http://localhost:8080/login',{user})
    .then(res => {
                console.log(res);
                if(res.data.status === "success") {
                navigate("/")
                }else if(res.data.status === "wrongPassword"){
                  setCheckpass(true);
                  alert("plase check pass")
                }else {
                    setCheckEmail(true);
                }
                })
        .catch(err => console.log(err));
    }

  return (
    <>
        <Header />
        
        <div className='main'>
           <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email"><b>Email</b></label>
                    <input id='email' name='email' type='text' className='' onChange={UpdateInput}/>
                </div>
                <div>
                    <label htmlFor="password"><b>Password</b></label>
                    <input id='password' name='password' type='password' className='' onChange={UpdateInput}/>
                </div>
                <button>Login</button>
            </form>
            <Link to='/register'>Create Account</Link>
            {checkpass && <p>Please check password</p>}
            {checkEmail && <p>Email Not Registed!</p>}
        </div>
    </>
  )
}

export default Login