import { useState,useRef } from 'react'

import './App.css'
import Edit from './components/Editor'
import { Provider } from "./components/ui/provider"
import React from 'react';
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import FileExplorer from './components/FileExplorer';
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';




function App() {
  
  return (
    <>
    {/* <AuthProvider> */}
      <Router>
          <Provider>
          <Navbar/>
          <div className='h-[100px] bg-black'></div>
        <Routes>
          <Route path="/file" element={<FileExplorer />} />
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Edit />} />
          
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
       
        </Routes>
      <Footer/>
    </Provider>
      </Router>
    {/* </AuthProvider> */}
      
      
      {/* <Edit/> */}
    
    
    </>
  )
}

export default App
