import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StaffProfile = () => {
  const [staff, setStaff] = useState(null);
  const { userId } = useParams();
  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/Hotel/Staff/get/${userId}`);
        setStaff(response.data.data);
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    };

    fetchStaffData();
  }, [userId]);

  if (!staff) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h5 className="mb-4 text-center">Staff Profile</h5>
      <div className="mb-3">
        <label>Email address:</label>
        <p>{staff.email}</p>
      </div>
      <div className="mb-3">
        <label>First Name:</label>
        <p>{staff.firstName}</p>
      </div>
      <div className="mb-3">
        <label>Last Name:</label>
        <p>{staff.lastName}</p>
      </div>
      <div className="mb-3">
        <label>Mobile:</label>
        <p>{staff.mobile}</p>
      </div>
      <div className="mb-3">
        <label>Nic:</label>
        <p>{staff.nic}</p>
      </div>
      <div className="mb-3">
        <label>Role:</label>
        <p>{staff.role}</p>
      </div>

    </div>
  );
};

export default StaffProfile;
