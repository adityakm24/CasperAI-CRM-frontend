import React from 'react';
import { Link } from 'react-router-dom';
import casperLogo from "../assets/logo.png"; // Casper AI logo

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {/* Casper AI Logo */}
      <div className="text-center mb-6">
        <img src={casperLogo} alt="Casper AI Logo" className="w-20 mx-auto" />
      </div>

      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-8">Page Not Found</h2>
        <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out

"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;