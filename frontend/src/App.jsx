import { useState,useRef,useEffect } from 'react'

import './App.css'
import Edit from './components/Editor'
import { Provider } from "./components/ui/provider"
import React from 'react';
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import FileExplorer from './components/FileExplorer.jsx';
import Login from './components/Login';
import Signup from './components/Signup';
import About from './components/About';
import ProtectedRoute from './components/ProtectedRoute';
import Create from './components/Create';
import Profile from './components/Profile';
import SignOut from './components/Signout';
import Project from './components/Project';
import { GamepadIcon } from 'lucide-react';
import { gapi } from 'gapi-script';
import { GoogleOAuthProvider } from '@react-oauth/google';

// const clientId= import.meta.env.GOOGLE_CLIENT_ID
// const clientId=process.env.GOOGLE_CLIENT_ID
const clientId="835547240076-qbijsp891agocavb756edtacml670i2k.apps.googleusercontent.com"
// console.log(clientId)
function App() {
  // useEffect(()=>{
  //   function Start(){
  //     gapi.client.init({
  //       client_id:clientId,
  //       scope: "email profile",
  //       // plugin_name: "login"  // Add this
  //     })
  //   }

  //   gapi.load('client:auth2',() => {
  //     Start();
  //   })
  // },[])

  // var accessToken=gapi.auth.getToken().access_token
  return (
    <>
    <GoogleOAuthProvider
    clientId={clientId}
    >

    <AuthProvider>
      <Router>
          <Provider>
          <Navbar/>
          <div className='h-[70px] bg-blue-950'></div>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/files" element={<FileExplorer />} />
          
          <Route path="/" element={<Home />} />
          <Route path="/code" element={<Edit />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/files" element={<FileExplorer/>} />
          
          <Route path="/project" element={<ProtectedRoute><Project /></ProtectedRoute>} />
        <Route path="/signout" element={<ProtectedRoute><SignOut /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><Create /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      <Footer/>
    </Provider>
      </Router>
    </AuthProvider>
      
    </GoogleOAuthProvider>
      
      
    
    
    </>
  )
}

export default App
