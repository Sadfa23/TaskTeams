import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/projects');
        if (!response) {
            console.log(error)
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = response.data.projects
        console.log(data)
        setProjects(data);
      } catch (err) {
        setError(err);
        console.log('error in projects fetching', err)
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!projects || projects.length === 0) { // Check if projects is null or empty
    return <div>No projects found.</div>; // Handle the case where no projects are returned
  }

  return (
    <div>
      <h1>Available Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project._id}> {/* Use _id from MongoDB */}
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            {/* ... other project properties */}
            {project.status && <p><strong>Status:</strong> {project.status}</p>} {/* Conditional rendering */}
            {project.technologies && <p><strong>Technologies:</strong> {project.technologies.join(', ')}</p>} {/* Conditional rendering */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;