import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent z-50">
      <h1 className="text-3xl font-bold text-red-600">StreamFlix</h1>
      <Link to="/" className="text-white hover:text-red-500">Back to Movies</Link>
    </nav>
  );
};

export default Navbar;
