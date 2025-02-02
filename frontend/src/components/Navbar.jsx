import React, { useState } from 'react';
import { Home, Users, Mail, Code, Menu, X, LogIn } from 'lucide-react';

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
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white py-4 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Code className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold">CodeCollab AI</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/" icon={<Home className="w-4 h-4" />} text="Home" />
            <NavLink href="/about" icon={<Users className="w-4 h-4" />} text="About Us" />
            <NavLink href="/contact" icon={<Mail className="w-4 h-4" />} text="Contact" />
            <NavLink href="/create" icon={<Code className="w-4 h-4" />} text="Create" />
            <AuthButtons />
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
            <MobileNavLink href="/contact" icon={<Mail className="w-4 h-4" />} text="Contact" />
            <MobileNavLink href="/create" icon={<Code className="w-4 h-4" />} text="Create" />
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
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;