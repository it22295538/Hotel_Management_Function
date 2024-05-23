

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GuestRegister from './GuestReg.js';

export default function GuestProfiles() {
  const [guestProfiles, setGuestProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingGuest, setEditingGuest] = useState(null);
  const ApiURL = "http://localhost:8070";

  useEffect(() => {
    axios.get(`${ApiURL}/Hotel/Guest/displayAll`)
      .then((res) => {
        setGuestProfiles(res.data.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Guest?")) {
      axios.delete(`${ApiURL}/Hotel/Guest/deleteGuest/${id}`)
        .then((res) => {
          setGuestProfiles(guestProfiles.filter(guestProfile => guestProfile._id !== id));
          alert("Guest deleted successfully!");
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  const handleEdit = (guest) => {
    setEditingGuest(guest);
  };

  const handleUpdate = (updatedGuest) => {
    axios.put(`${ApiURL}/Hotel/Guest/update/${updatedGuest._id}`, updatedGuest)
      .then((res) => {
        setGuestProfiles(guestProfiles.map(guest => guest._id === updatedGuest._id ? updatedGuest : guest));
        alert("Guest updated successfully!");
        setEditingGuest(null);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const filteredGuests = guestProfiles.filter(guestProfile =>
    (guestProfile.firstName && guestProfile.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (guestProfile.lastName && guestProfile.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (guestProfile.email && guestProfile.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (guestProfile.nic && guestProfile.nic.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (guestProfile.passportNum && guestProfile.passportNum.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (guestProfile.checkout && guestProfile.checkout.includes(searchTerm))
  );

  return (
    <div className="container">
      <h1 align='center'>All Guest Profiles</h1>
      <div className="search-container">
        <input className="form-control"
          type="text"
          placeholder="Search by name, email, NIC..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <br />
      <div style={{ overflowX: 'auto' }}>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Country</th>
              <th>NIC</th>
              <th>Passport Number</th>
              <th>Address</th>
              <th>Children</th>
              <th>Room Details</th>
              <th>Check-in Date</th>
              <th>Check-out Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredGuests.map((guest, index) => (
              <tr key={index}>
                <td>{guest.firstName}</td>
                <td>{guest.lastName}</td>
                <td>{guest.email}</td>
                <td>{guest.mobile}</td>
                <td>{guest.country}</td>
                <td>{guest.nic}</td>
                <td>{guest.passportNum}</td>
                <td>{guest.address}</td>
                <td>{guest.children}</td>
                <td>{guest.roomDetails}</td>
                <td>{guest.checkin}</td>
                <td>{guest.checkout}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(guest._id)}>Remove</button>
                  <button className="btn btn-primary mx-2" onClick={() => handleEdit(guest)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingGuest && (
        <GuestRegister guest={editingGuest} onUpdate={handleUpdate} />
      )}
    </div>
  );
}
