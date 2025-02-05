import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"
import { Home, Users, Mail, Code, Menu, X, LogIn,User, LogOut, Settings,Workflow, DiamondPlus } from 'lucide-react';
import { useAuthContext } from '../hooks/useAuthContext'
const NavLink = ({ href, icon, text }) => (
  <a
    href={href}
    className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
  >
    {icon}
    <span>{text}</span>
  </a>
);

const MobileNavLink = ({ href, icon, text }) => (
  <a
    href={href}
    className="flex items-center space-x-2 hover:text-blue-400 transition-colors px-4 py-2"
  >
    {icon}
    <span>{text}</span>
  </a>
);

const AuthButtons = () => (
  <>
  
  <div className="flex items-center space-x-4">
    <a
      href="/login"
      className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
      >
      <LogIn className="w-4 h-4" />
      <span>Login</span>
    </a>
    <a
      href="/signup"
      className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors"
      >
      Sign Up
    </a>
  </div>
  
      </>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuthContext()
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <nav className="bg-gray-900 text-white py-4 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <button onClick={()=>navigate('/')}>

          <div className="flex items-center space-x-2">
            <Code className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold">synthCode</span>
          </div>
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/" icon={<Home className="w-4 h-4" />} text="Home" />
            <NavLink href="/about" icon={<Users className="w-4 h-4" />} text="About Us" />
            
            <NavLink href="/code" icon={<Code className="w-4 h-4" />} text="Code" />
{user && <NavLink href="/create" icon={<DiamondPlus className="w-4 h-4" />} text="Create" />}
            {!user &&

            <AuthButtons />
            }
            {user &&
             <div className="relative">
             <button 
               onMouseEnter={() => setIsDropdownOpen(true)}
               onMouseLeave={() => setIsDropdownOpen(false)}
               className="bg-gray-900 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-900 transition-colors"
             >
               <User className="w-6 h-6" />
             </button>
   
             {isDropdownOpen && (
               <div 
                 onMouseEnter={() => setIsDropdownOpen(true)}
                 onMouseLeave={() => setIsDropdownOpen(false)}
                 className="absolute right-0 top-full w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
               >
                 <div className="py-1">
                   <button 
                     onClick={()=>{navigate('/profile')}}
                     className="flex text-gray-800 items-center w-full px-4 py-2 text-left hover:bg-gray-400 transition-colors"
                   >
                     <Settings className="w-5 h-5 mr-3 text-gray-600" />
                     Profile
                   </button>
                   <button 
                     onClick={() => {navigate('/signout')}}
                     className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-400 transition-colors text-red-600"
                   >
                     <LogOut className="w-5 h-5 mr-3" />
                     Sign Out
                   </button>
                 </div>
               </div>
             )}
           </div>
            }
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <MobileNavLink href="/" icon={<Home className="w-4 h-4" />} text="Home" />
            <MobileNavLink href="/about" icon={<Users className="w-4 h-4" />} text="About Us" />
            
            <MobileNavLink href="/create" icon={<Code className="w-4 h-4" />} text="Create" />
            {!user &&
            <div className="px-4 py-2 space-y-2">
              <a
                href="/login"
                className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </a>
              <a
                href="/signup"
                className="block bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors text-center"
              >
                Sign Up
              </a>
            </div>
            }
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;