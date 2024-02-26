import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import Header from './Components/Header'
// import Footer from './Components/Footer'
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/login' element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App