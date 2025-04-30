import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ViewMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        // Use full URL if no proxy is set
        const res = await axios.get('http://localhost:5000/api/members');
        setMembers(res.data);
        setError('');
      } catch (err) {
        console.error('Error fetching members:', err);
        setError('Failed to load team members. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '50px 20px' }}>
        <h3>Loading members...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card" style={{ 
        textAlign: 'center', 
        padding: '50px 20px',
        backgroundColor: '#ffcccc',
        color: '#cc0000' 
      }}>
        <h3>Error</h3>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="btn"
          style={{ marginTop: '20px' }}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '50px 20px' }}>
        <h3>No team members found</h3>
        <p style={{ margin: '20px 0' }}>Add some team members to get started.</p>
        <Link to="/add-member" className="btn">
          Add New Member
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Team Members</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {members.map((member) => (
          <div key={member._id} className="card">
            <div style={{ textAlign: 'center' }}>
              <img
                src={`http://localhost:5000/${member.image.replace(/\\\\/g, '/')}`} // Fixed path
                alt={member.name}
                style={{ 
                  width: '150px', 
                  height: '150px', 
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid #3498db',
                  marginBottom: '15px'
                }}
              />
              <h3>{member.name}</h3>
              <p style={{ color: '#666', marginBottom: '10px' }}>{member.role}</p>
              
              <Link to={`/members/${member._id}`} className="btn">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewMembers;
