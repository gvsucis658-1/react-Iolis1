
import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div>
      <nav className="bg-gray-800 text-white p-4">
        <Link to="/" className="hover:text-green-400 font-bold py-2 px-4">Home</Link> / 
        <Link to="/play-character" className="hover:text-green-400 font-bold py-2 px-4">Selected Classes</Link>
      </nav>
      <div className="App">
        {children}
      </div>
    </div>
  );
};

export default Layout;
