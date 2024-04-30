import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import  axios  from 'axios';
import Header from '../components/Header'

const Register = () => {
    const [user, setUser] = useState({
        name : '',
        email : '',
        pass : '' ,
        conpass : '',
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

        if(user.password === user.conpass){
           await axios.post('http://localhost:8080/register',{user})
        .then(res => {
                    console.log(res);
                    if(res.data.status === "success") {
                    navigate("/login")
                    }
                    else if(res.data.status === "emailAlreadyExist"){
                        setCheckEmail(true);
                    }
                    else {
                        alert("error")
                    }
                    })
        .then(err => console.log(err));
        }
        else {
            setCheckpass(true);
        }
    }

  return (
    <>  
            <Header />

            <div className='main'>
            <h2>SignUp</h2>
            <form onSubmit={handleSubmit}>
                <div >
                    <label htmlFor="name" className='form-label'><b>Name</b></label>
                    <input id='name' name='name' type='text' className='form-control' onChange={UpdateInput} required/>
                </div>
                <div >
                    <label htmlFor="email" className='form-label'><b>Email</b></label>
                    <input id='email' name='email' type='text' className='form-control' onChange={UpdateInput} required/>
                </div>
                <div>
                    <label htmlFor="password" className='form-label'><b>Password</b></label>
                    <input id='password' name='password' type='password' className='form-control'onChange={UpdateInput} required/>
                </div>
                <div>
                    <label htmlFor="conpass" className='form-label'><b>Conform password</b></label>
                    <input id='conpass' name='conpass' type='password' className='form-control'  onChange={UpdateInput} required/>
                </div>
                <button className='btn btn-primary'>Sign Up</button>
            </form>
            <Link to='/login'>Login</Link>
            {checkpass && <p>Please check password or conform passsword</p>}
            {checkEmail && <p>Email Already Exist!</p>}
            </div>
    </> 
   
  )
}

export default Register