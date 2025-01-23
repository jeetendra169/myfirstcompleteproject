import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { FaEdit, FaTrash } from 'react-icons/fa';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [editingUserId, setEditingUserId] = useState(null);

  const API_URL = 'http://localhost:5000/api/users';

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/getuser`);
      console.log("res",response);
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Create or Update user
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingUserId) {
        // Update user
        await axios.put(`${API_URL}/${editingUserId}`, formData);
        alert('User updated successfully');
      } else {
        // Create user
        await axios.post(`${API_URL}/register`, formData);
        alert('User created successfully');
      }
      setFormData({ name: '', email: '', password: '' });
      setEditingUserId(null);
      fetchUsers();
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert('User deleted successfully');
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error.message);
      }
    }
  };

  // Set user for editing
  const handleEdit = (user) => {
    setFormData(user);
    setEditingUserId(user._id);
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Management</h1>
      <div className="flex space-x-6">
        {/* Form Section */}
        <div className="w-1/3 bg-white p-6 shadow-md rounded-md">
          <h3 className="text-2xl mb-4">{editingUserId ? 'Update User' : 'Create User'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              {editingUserId ? 'Update User' : 'Create User'}
            </button>
            {editingUserId && (
              <button
                type="button"
                className="w-full py-2 mt-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                onClick={() => {
                  setFormData({ name: '', email: '', password: '' });
                  setEditingUserId(null);
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* User List Section */}
        <div className="w-2/3 bg-white p-6 shadow-md rounded-md">
          <h3 className="text-2xl mb-4">User List</h3>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4 flex space-x-2">
                    <button
                      className="text-yellow-500 hover:text-yellow-600"
                      onClick={() => handleEdit(user)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDelete(user._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
