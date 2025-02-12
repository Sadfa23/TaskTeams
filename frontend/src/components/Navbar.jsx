// src/components/Navbar.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // Import Link and NavLink

function Navbar() {
  const isAuthenticated = () => {
    return !!localStorage.getItem('token'); // Your authentication check
  };

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <Link to="/" className="text-white font-bold text-2xl">TaskTeams</Link> {/* App logo/name */}
      <div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'text-white mr-4 font-bold hover:text-blue-200'
              : 'text-white mr-4 hover:text-blue-200'
          }
        >
          Home
        </NavLink>

        {isAuthenticated() ? ( // Conditionally render links
          <>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive
                  ? 'text-white mr-4 font-bold hover:text-blue-200'
                  : 'text-white mr-4 hover:text-blue-200'
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/logout"
              className={({ isActive }) =>
                isActive
                  ? 'text-white mr-4 font-bold hover:text-blue-200'
                  : 'text-white mr-4 hover:text-blue-200'
              }
            >
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? 'text-white mr-4 font-bold hover:text-blue-200'
                  : 'text-white mr-4 hover:text-blue-200'
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                isActive
                  ? 'text-white mr-4 font-bold hover:text-blue-200'
                  : 'text-white mr-4 hover:text-blue-200'
              }
            >
              Projects
            </NavLink>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive
                  ? 'text-white mr-4 font-bold hover:text-blue-200'
                  : 'text-white mr-4 hover:text-blue-200'
              }
            >
              Users
            </NavLink>
            <NavLink
              to="/signup" // If you have a signup route
              className="bg-white text-blue-500 py-2 px-4 rounded-md hover:bg-blue-200 hover:text-blue-500"
            >
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;