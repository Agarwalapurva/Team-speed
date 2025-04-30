import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddMember = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      setImage(file);
      
      // Create preview for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !role || !email || !image) {
      setError('Please fill in all fields and upload an image');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Create form data
      const formData = new FormData();
      formData.append('name', name);
      formData.append('role', role);
      formData.append('email', email);
      formData.append('image', image);
      
      // Send request to API
      await axios.post('http://localhost:5000/api/members', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Redirect to members page
      navigate('/members');
    } catch (err) {
      console.error('Error adding member:', err);
      
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError('Failed to add member. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Add New Team Member</h2>
      
      {error && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#ffcccc', 
          color: '#cc0000', 
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </div>
        
        <div className="form-control">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter role (e.g., Developer, Designer)"
          />
        </div>
        
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
          />
        </div>
        
        <div className="form-control">
          <label htmlFor="image">Profile Image</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
        
        {imagePreview && (
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <h4>Image Preview:</h4>
            <img 
              src={imagePreview} 
              alt="Preview" 
              style={{ 
                maxWidth: '200px', 
                maxHeight: '200px', 
                borderRadius: '5px',
                border: '1px solid #ddd' 
              }} 
            />
          </div>
        )}
        
        <button 
          type="submit" 
          className="btn btn-block"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Member'}
        </button>
      </form>
    </div>
  );
};

export default AddMember;