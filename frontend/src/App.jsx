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
          <Route path="/code" element={<Edit />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          
          <Route path="/project" element={<ProtectedRoute><Project /></ProtectedRoute>} />
        <Route path="/signout" element={<ProtectedRoute><SignOut /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><Create /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      <Footer/>
    </Provider>
      </Router>
    </AuthProvider>
      
      
      
    
    
    </>
  )
}

export default App
