import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const MemberDetail = () => {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { id } = useParams();

  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        setLoading(true);
        // Ensure the correct API URL is used
        const res = await axios.get(`http://localhost:5000/api/members/${id}`);
        setMember(res.data);
        setError('');
      } catch (err) {
        console.error('Error fetching member details:', err);
        if (err.response && err.response.status === 404) {
          setError('Member not found. The member may have been removed.');
        } else {
          setError('Failed to load member details. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMemberDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '50px 20px' }}>
        <h3>Loading member details...</h3>
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
        <Link to="/members" className="btn" style={{ marginTop: '20px' }}>
          Back to Members
        </Link>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '50px 20px' }}>
        <h3>Member not found</h3>
        <Link to="/members" className="btn" style={{ marginTop: '20px' }}>
          Back to Members
        </Link>
      </div>
    );
  }

  return (
    <div className="card">
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center' 
      }}>
        <h2 style={{ marginBottom: '20px' }}>Member Details</h2>
        
        <img
          src={`http://localhost:5000/${member.image.replace(/\\/g, '/')}`}
          alt={member.name}
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '4px solid #3498db',
            marginBottom: '20px'
          }}
        />
        
        <h2>{member.name}</h2>
        <h3 style={{ 
          color: '#666',
          marginBottom: '25px',
          backgroundColor: '#f0f0f0',
          padding: '5px 15px',
          borderRadius: '20px',
          display: 'inline-block'
        }}>
          {member.role}
        </h3>
        
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <p style={{ fontSize: '18px' }}>
            <strong>Email: </strong>
            <a 
              href={`mailto:${member.email}`}
              style={{ color: '#3498db', textDecoration: 'none' }}
            >
              {member.email}
            </a>
          </p>
          
          <p style={{ fontSize: '14px', color: '#888', marginTop: '10px' }}>
            Member since: {new Date(member.createdAt).toLocaleDateString()}
          </p>
        </div>
        
        <Link to="/members" className="btn">
          Back to All Members
        </Link>
      </div>
    </div>
  );
};

export default MemberDetail;
