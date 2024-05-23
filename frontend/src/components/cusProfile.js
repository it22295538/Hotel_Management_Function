import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CusRegister from './CusRegisters.js'; 

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/Hotel/Customer/get/${userId}`);
        setUser(response.data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  if (editMode) {
    return (
      <div className="container">
        <h5 className="mb-4 text-center">Edit User Profile</h5>
        <CusRegister userData={user} onCancel={handleCancelEdit} />
      </div>
    );
  }

  return (
    <div className="container">
      <h5 className="mb-4 text-center">User Profile</h5>
      <div className="card">
        <div className="card-body">
          <div className="mb-3">
            <strong>Email address:</strong>
            <p>{user.email}</p>
          </div>
          <div className="mb-3">
            <strong>First Name:</strong>
            <p>{user.firstName}</p>
          </div>
          <div className="mb-3">
            <strong>Last Name:</strong>
            <p>{user.lastName}</p>
          </div>
          <div className="mb-3">
            <strong>Mobile:</strong>
            <p>{user.mobile}</p>
          </div>
          <div className="mb-3">
            <strong>Country:</strong>
            <p>{user.country}</p>
          </div>
          <div className="d-grid gap-2">
            <button type="button" className="btn btn-primary" onClick={handleEdit}>Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
