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
        //setUserData(userData);

        // Fetch available projects
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

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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
      {/* ... other sections */}

      {/* Skills */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-4">
        <h3 className="text-xl font-semibold mb-2">Skills</h3>
        {/* ... skills list */}
        <div className="mt-4 flex"> {/* Add skill input and button */}
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
            placeholder="Add a skill"
          />
          <button
            onClick={handleAddSkill}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Add Skill
          </button>
        </div>
      </div>

      {/* Available Projects */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">Available Projects</h3>
        {availableProjects.length > 0 ? (
          <ul className="list-disc ml-6">
            {availableProjects.map((project) => (
              <li key={project._id} className="mb-2">
                {project.name} - {project.description}
                <button
                  onClick={() => handleApply(project._id)}
                  className="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-700 ml-4"
                  disabled={applicationStatus[project._id] === 'Applied'} // Disable if applied
                >
                  {applicationStatus[project._id] === 'Applied' ? 'Applied' : 'Apply'}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No projects available.</p>
        )}
      </div>

      {/* ... other sections */}
    </div>
  );
}

export default UserDashboard;