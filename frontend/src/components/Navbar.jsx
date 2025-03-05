import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext';
import {
  Home,
  Users,
  Code,
  Menu,
  X,
  LogIn,
  User,
  LogOut,
  Settings,
  DiamondPlus
} from 'lucide-react';

// Desktop navigation link component
const NavLink = ({ onClick, icon, text }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 hover:text-blue-400 transition-colors"
  >
    {React.cloneElement(icon, { className: "w-4 h-4" })}
    <span>{text}</span>
  </button>
);

// Mobile navigation link component
const MobileNavLink = ({ onClick, icon, text }) => (
  <button
    onClick={onClick}
    className="flex w-full items-center gap-2 px-4 py-2 hover:text-blue-400 hover:bg-gray-800 transition-colors"
  >
    {React.cloneElement(icon, { className: "w-4 h-4" })}
    <span>{text}</span>
  </button>
);

// Authentication buttons component
const AuthButtons = ({ onLoginClick, onSignupClick }) => (
  <div className="flex items-center gap-4">
    <button
      onClick={onLoginClick}
      className="flex items-center gap-2 hover:text-blue-400 transition-colors"
    >
      <LogIn className="w-4 h-4" />
      <span>Login</span>
    </button>
    <button
      onClick={onSignupClick}
      className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors"
    >
      Sign Up
    </button>
  </div>
);

// User dropdown menu component
const UserDropdown = ({ isOpen, onMouseEnter, onMouseLeave, onProfileClick, onSignOutClick }) => (
  <div className="relative">
    <button 
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="bg-gray-900 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-900 transition-colors"
    >
      <User className="w-6 h-6" />
    </button>

    {isOpen && (
      <div 
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
      >
        <div className="py-1">
          <button 
            onClick={onProfileClick}
            className="flex items-center w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 transition-colors"
          >
            <Settings className="w-5 h-5 mr-3 text-gray-600" />
            Profile
          </button>
          <button 
            onClick={onSignOutClick}
            className="flex items-center w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </div>
    )}
  </div>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const navigationItems = [
    { icon: <Home />, text: "Home", path: "/" },
    { icon: <Users />, text: "About Us", path: "/about" },
    { icon: <Code />, text: "Code", path: "/code" },
    ...(user ? [{ icon: <DiamondPlus />, text: "Create", path: "/create" }] : []),
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gray-900 text-white py-4 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button 
            onClick={() => handleNavigation('/')}
            className="flex items-center gap-2 hover:text-blue-400 transition-colors"
          >
            <Code className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold">synthCode</span>
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigationItems.map((item, index) => (
              <NavLink
                key={index}
                onClick={() => handleNavigation(item.path)}
                icon={item.icon}
                text={item.text}
              />
            ))}

            {!user && (
              <AuthButtons
                onLoginClick={() => handleNavigation('/login')}
                onSignupClick={() => handleNavigation('/signup')}
              />
            )}

            {user && (
              <UserDropdown
                isOpen={isDropdownOpen}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                onProfileClick={() => handleNavigation('/profile')}
                onSignOutClick={() => handleNavigation('/signout')}
              />
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-2 border-t border-gray-800">
            {navigationItems.map((item, index) => (
              <MobileNavLink
                key={index}
                onClick={() => handleNavigation(item.path)}
                icon={item.icon}
                text={item.text}
              />
            ))}

            {!user && (
              <div className="px-4 py-2 space-y-2 border-t border-gray-800 mt-2">
                <button
                  onClick={() => handleNavigation('/login')}
                  className="flex w-full items-center gap-2 hover:text-blue-400 transition-colors py-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => handleNavigation('/signup')}
                  className="w-full bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors text-center"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;