
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function StaffRegister({ staff, onClose, onUpdateSuccess }) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [nic, setNic] = useState('');
  const [gender, setGender] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  
  const ApiURL = "http://localhost:8070";

  useEffect(() => {
    if (staff) {
      setEmail(staff.email || '');
      setFirstName(staff.firstName || '');
      setLastName(staff.lastName || '');
      setMobile(staff.mobile || '');
      setAddress(staff.address || '');
      setNic(staff.nic || '');
      setGender(staff.gender || '');
      setRole(staff.role || '');
      setPassword(staff.password || '');
      setIsUpdate(true);
      setBirthdate(staff.birthdate || '');
    }
  }, [staff]);

  useEffect(() => {
    if (email.trim() !== '' && !isUpdate) {
      axios
        .get(`${ApiURL}/Hotel/emailCheck/${email}`)
        .then((response) => {
          setEmailExists(response.data.exists);
        })
        .catch((error) => {
          console.error('Error checking email:', error);
        });
    }
  }, [email, isUpdate]);

  function sendData(e) {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email is valid
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    // Check if the email already exists
    if (emailExists) {
      alert('Email already exists. Please use a different email.');
      return;
    }
    // Validate mobile number format
    if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
      alert('Mobile number should contain exactly 10 digits.');
      return;
    }

    //validate nic
    if (!(/^\d{9}([Vv])?$/.test(nic) || /^\d{12}$/.test(nic))) {
      alert('Invalid NIC format. It should be either a 12-digit number or a 9-digit number followed by "V" or "v".');
      return;
    }

    const updatedStaff = {
      firstName,
      lastName,
      email,
      mobile,
      address,
      nic,
      gender,
      birthdate,
      password,
      role,
    };
// Check if email is being updated and if it already exists
if (staff && staff.email !== email) {
  axios
    .get(`${ApiURL}/Hotel/emailCheck/${email}`)
    .then((response) => {
      if (response.data.exists) {
        alert('Email already exists. Please use a different email.');
      } else {
        updateStaff(updatedStaff);
      }
    })
    .catch((error) => {
      console.error('Error checking email:', error);
    });
} else {
  updateStaff(updatedStaff);
}
}

function updateStaff(updatedStaff) {
const url = isUpdate
  ? `${ApiURL}/Hotel/Staff/register/${staff._id}`
  : `${ApiURL}/Hotel/Staff/register`;
const requestMethod = isUpdate ? axios.put : axios.post;

requestMethod(url, updatedStaff)
  .then(() => {
    if (isUpdate) {
      alert('Staff updated successfully!');
    } else {
      alert('Registration successful!');
    }
    clearForm();
    if (onUpdateSuccess) {
      onUpdateSuccess(); // Notify the parent component about update success
    }
  })
  .catch((err) => {
    alert('Error occurred: ' + err.message);
  });
}

  const clearForm = () => {
    setEmail('');
    setFirstName('');
    setLastName('');
    setMobile('');
    setAddress('');
    setNic('');
    setGender('');
    setBirthdate('');
    setPassword('');
    setRole('');
    setIsUpdate(false);
    if (onClose) {
      onClose(); 
    }
  };

  return (
    <div className="container">
      <h5 className="text-center">{isUpdate ? 'Update Staff' : 'Staff Registration Form'}</h5>
      <form onSubmit={sendData}>
      <div className="mb-3">
          <label htmlFor="staff_email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="staff_email" placeholder="Enter email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="staff_firstName" className="form-label">First Name</label>
          <input type="text" className="form-control" id="staff_firstName" placeholder="Enter first name" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="staff_lastName" className="form-label">Last Name</label>
          <input type="text" className="form-control" id="staff_lastName" placeholder="Enter last name" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="staff_mobile" className="form-label">Mobile</label>
          <input type="tel" className="form-control" id="staff_mobile" placeholder="Enter mobile number" required value={mobile} onChange={(e) => setMobile(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="staff_address" className="form-label">Address</label>
          <input type="text" className="form-control" id="staff_address" placeholder="Enter address" required value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="staff_nic" className="form-label">NIC</label>
          <input type="text" className="form-control" id="staff_nic" placeholder="Enter NIC number" required value={nic} onChange={(e) => setNic(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="staff_gender" className="form-label">Gender</label>
          <select className="form-select" id="staff_gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="staff_birthdate" className="form-label">Birthdate</label>
          <input type="date" className="form-control" id="staff_birthdate" required value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="staff_role" className="form-label">Role</label>
          <select className="form-select" id="staff_role" value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Select role</option>
            <option value="Manager">Manager</option>
            <option value="FrontDesk">Front Desk</option>
            <option value="HouseKeeper">HouseKeeper</option>
            <option value="PackageManager">Package Manager</option>
          </select>
        </div>
        
        {!isUpdate && (
          <div className="mb-3">
            <label htmlFor="staff_password" className="form-label">Password</label>
            <input type="password" className="form-control" id="staff_password" placeholder="Enter password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <div id="passwordHelpBlock" className="form-text">
              Your password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.
            </div>
          </div>
        )}
        <button type="submit" className="btn btn-primary">{isUpdate ? 'Update' : 'Register'}</button>
      </form>
    </div>
  );
}
