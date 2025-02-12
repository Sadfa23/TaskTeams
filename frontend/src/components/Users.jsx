import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/auth/login/users');
        const UserObject = response.data
        const users =UserObject['users']
        setUsers(users);
      } catch (err) {
        setError(err);
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!users || users.length === 0) {
    return <div>No users found.</div>;
  }
  console.log(typeof(users.users))

  return (
    <div>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Skills</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.skills && user.skills.length > 0 ? (  // Check if skills exist and are not empty
                  user.skills.join(', ') // Display skills as a comma-separated list
                ) : (
                  "No skills listed" // Or display a message if no skills
                )}
              </td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;