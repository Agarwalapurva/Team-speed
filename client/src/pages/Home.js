import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Welcome to Student Team Members Management</h2>
        <p style={{ margin: '20px 0', fontSize: '18px' }}>
          This application helps you manage your student team members easily.
          You can add new members, view all members, and see detailed information about each team member.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <Link to="/add-member" className="btn" style={{ marginRight: '20px' }}>
            Add a New Member
          </Link>
          <Link to="/members" className="btn">
            View All Members
          </Link>
        </div>
      </div>
      
      <div className="card" style={{ marginTop: '30px' }}>
        <h3>Features:</h3>
        <ul style={{ listStyleType: 'none', padding: '15px' }}>
          <li style={{ padding: '8px 0' }}>✅ Add new team members with their details and profile image</li>
          <li style={{ padding: '8px 0' }}>✅ View a list of all team members</li>
          <li style={{ padding: '8px 0' }}>✅ See detailed information about each member</li>
          <li style={{ padding: '8px 0' }}>✅ Responsive design that works on all devices</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;