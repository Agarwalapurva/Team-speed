import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import AddMember from './pages/AddMember';
import ViewMembers from './pages/ViewMembers';
import MemberDetail from './pages/MemberDetail';

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-member" element={<AddMember />} />
          <Route path="/members" element={<ViewMembers />} />
          <Route path="/members/:id" element={<MemberDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;