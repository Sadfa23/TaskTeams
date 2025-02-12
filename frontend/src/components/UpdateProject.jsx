// src/components/UpdateProject.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate

function UpdateProject() {
  const { projectId } = useParams(); // Get the project ID from the URL
  const navigate = useNavigate(); // For navigation after update
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: '', // Add other fields as needed
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${projectId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Failed to fetch project');
        }

        const data = await response.json();
        setProject(data);
        setFormData(data); // Initialize form data with existing project data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]); // Add projectId to dependency array

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT', // Use PUT method for updates
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update project');
      }

      // Redirect or show success message
      navigate('/admin/dashboard'); // Go back to the dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading project...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!project) {
    return <div className="text-center text-gray-500">Project not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-500">Update Project</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700 font-medium mb-2">Status</label>
          <input
            type="text" // Or a select dropdown if you have predefined statuses
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Add other fields as needed */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 w-full"
        >
          Update Project
        </button>
      </form>
    </div>
  );
}

export default UpdateProject;