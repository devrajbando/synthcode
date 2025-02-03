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
import About from './components/About';
import ProtectedRoute from './components/ProtectedRoute';
import Create from './components/Create';
import Profile from './components/Profile';
import SignOut from './components/Signout';
import Project from './components/Project';




function App() {
  
  return (
    <>
    <AuthProvider>
      <Router>
          <Provider>
          <Navbar/>
          <div className='h-[70px] bg-blue-950'></div>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/file" element={<FileExplorer />} />
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Edit />} />
          <Route path="/new-project" element={<Project />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signout" element={<SignOut/>} />
          <Route path="/project" element={<Create/>} />
          <Route path="/profile" element={<Profile/>} />
          
        </Routes>
      <Footer/>
    </Provider>
      </Router>
    </AuthProvider>
      
      
      {/* <Edit/> */}
    
    
    </>
  )
}

export default App
