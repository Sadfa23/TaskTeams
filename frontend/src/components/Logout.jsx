import React from 'react';

function Logout() {
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    // Redirect to the login page or home page
    window.location.href = '/'; // Or /login
  };

  return (
    <div className="flex justify-center items-center h-screen"> {/* Center the button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;