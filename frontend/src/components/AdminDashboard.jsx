// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects', { // Replace with your API endpoint
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token for authentication
          },
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Failed to fetch projects');
        }

        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleDelete = async (projectId) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete project');
      }

      // Update the projects state after successful deletion
      setProjects(projects.filter((project) => project._id !== projectId)); // Assuming you have _id
    } catch (err) {
      setError(err.message);
    }
  };


  if (loading) {
    return <div className="text-center text-gray-500">Loading projects...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-500">Admin Dashboard - Project Monitoring</h2>
      {projects.length === 0 ? (
        <p className="text-center text-gray-500">No projects found.</p>
      ) : (
        <table className="min-w-full border border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="border px-4 py-2">Project Name</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Status</th> {/* Add more columns as needed */}
              <th className="border px-4 py-2">Actions</th> {/* Delete button */}
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id} className="border-b"> {/* Assuming you have _id */}
                <td className="border px-4 py-2">{project.name}</td> {/* Adjust property names */}
                <td className="border px-4 py-2">{project.description}</td>
                <td className="border px-4 py-2">{project.status}</td> {/* Add more data cells */}
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(project._id)} // Pass the ID to delete function
                    className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboard;