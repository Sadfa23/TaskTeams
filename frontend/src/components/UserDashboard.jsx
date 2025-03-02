// src/components/UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { jwtDecode } from 'jwt-decode';
//import Cookies from 'js-cookie';

function UserDashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newSkill, setNewSkill] = useState(''); // State for new skill input
  const [availableProjects, setAvailableProjects] = useState([]); // Available projects
  const [applicationStatus, setApplicationStatus] = useState({}); // Application status

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('TOKEN_LOGIN');
        //const decodedToken = jwtDecode(token);
        //Cookies.set("auth-token", token, { expires: 7 });
        //const cookieToken = Cookies.get('auth-token');
        //console.log(cookieToken)
        //console.log(decodedToken)

        //console.log(cookieToken === token)

        console.log('Token from local storage',token)
        if (!token) {
          throw new Error('No token found. Please login.');
        }

        const userResponse = await axios.get('http://localhost:3001/api/auth/login/users/user',{
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log(userResponse)
        /*
        if (!userResponse.ok) {
          const data = await userResponse.json();
          throw new Error(data.message || 'Failed to fetch user data');
        }*/

        const userData = await userResponse.data.user;
        console.log(userData)

        
        setUserData(userData);

        // Fetch available projects
        /*
        const projectsResponse = await fetch('/api/projects', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!projectsResponse.ok) {
          const data = await projectsResponse.json();
          throw new Error(data.message || 'Failed to fetch projects');
        }

        const availableProjectsData = await projectsResponse.json();
        setAvailableProjects(availableProjectsData);

        // Initialize application status (if needed)
        const initialStatus = {};
        availableProjectsData.forEach((project) => {
          initialStatus[project._id] = 'Not Applied'; // Default status
        });
        setApplicationStatus(initialStatus);
      */
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    

    fetchUserData();
  }, []);

/*
  const handleAddSkill = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/user/skills', { // Your API endpoint to add skills
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ skill: newSkill }), // Send the new skill
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to add skill');
      }

      // Update user data after adding skill
      const updatedUserData = { ...userData };
      updatedUserData.skills.push(newSkill);
      setUserData(updatedUserData);

      setNewSkill(''); // Clear the input field
    } catch (err) {
      setError(err.message);
    }
  };

  const handleApply = async (projectId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/projects/${projectId}/apply`, { // Apply API endpoint
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to apply');
      }

      // Update application status
      setApplicationStatus({ ...applicationStatus, [projectId]: 'Applied' });

    } catch (err) {
      setError(err.message);
    }
  };
*/

  if (loading) {
    return <div className="text-center text-gray-500">Loading user data...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!userData) {
    return <div className="text-center text-gray-500">User data not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1>User Dashboard</h1>
      <div>
        <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p>
        <p>Skills: {userData.skills.join(', ')}</p>
        <p>Role: {userData.role}</p>
        <p>Created At: {new Date(userData.createdAt).toLocaleString()}</p>
        <p>Updated At: {new Date(userData.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default UserDashboard;