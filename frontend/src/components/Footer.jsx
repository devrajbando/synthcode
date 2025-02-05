import React from 'react';

const Footer = () => (
  <footer className="bg-gray-900 text-white py-8 mt-auto">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">synthCode</h3>
          <p className="text-gray-400">
            Revolutionizing code collaboration with real-time AI assistance.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="text-gray-400 hover:text-blue-400">Home</a></li>
            <li><a href="/about" className="text-gray-400 hover:text-blue-400">About Us</a></li>
            <li><a href="/contact" className="text-gray-400 hover:text-blue-400">Contact</a></li>
            <li><a href="/code" className="text-gray-400 hover:text-blue-400">Code</a></li>
            <li><a href="/create" className="text-gray-400 hover:text-blue-400">Create</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <div className="text-gray-400">
            <p>Email: devrajbando@gmail.com</p>
            {/* <p>Phone: (555) 123-4567</p> */}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} synthCode AI. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;