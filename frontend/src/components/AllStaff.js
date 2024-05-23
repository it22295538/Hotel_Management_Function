
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StaffRegister from './StaffRegister'; 

export default function AllStaff() {
    const [staff, setStaff] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [updateData, setUpdateData] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const ApiURL = "http://localhost:8070";

    useEffect(() => {
        axios.get(`${ApiURL}/Hotel/Staff/displayAll`)
            .then((res) => {
                setStaff(res.data.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredStaff = staff.filter(member =>
        (member.firstName && member.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (member.lastName && member.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (member.email && member.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (member.role && member.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (member.nic && member.nic.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this Staff?")) {
            axios.delete(`${ApiURL}/Hotel/Staff/deleteStaff/${id}`)
                .then((res) => {
                    setStaff(staff.filter(member => member._id !== id));
                    alert("Staff member deleted successfully!");
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
    };

    const handleUpdate = (member) => {
        setUpdateData(member);
        setShowForm(true);
        setUpdateSuccess(false);
    };

    const handleFormClose = () => {
        setShowForm(false);
    };

    const handleUpdateSuccess = () => {
        setUpdateSuccess(true);
        setShowForm(false);
    };

    return (
        <div className="container">
            <h1 align='center'>All Staff</h1>
            <br />
            <div className="search-container">
                <input className="form-control"
                    type="text"
                    placeholder="Search by name, email, NIC or role..."
                    value={searchTerm}
                    onChange={handleSearch}
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
                            <th>Address</th>
                            <th>NIC</th>
                            <th>Gender</th>
                            <th>Birth Date</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStaff.map((member, index) => (
                            <tr key={index}>
                                <td>{member.firstName}</td>
                                <td>{member.lastName}</td>
                                <td>{member.email}</td>
                                <td>{member.mobile}</td>
                                <td>{member.address}</td>
                                <td>{member.nic}</td>
                                <td>{member.gender}</td>
                                <td>{member.birthdate}</td>
                                <td>{member.role}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleDelete(member._id)}>Remove</button>
                                    <br />
                                    <button className="btn btn-primary" onClick={() => handleUpdate(member)}>Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showForm && !updateSuccess && updateData && (
                <StaffRegister
                    staff={updateData}
                    setStaff={setStaff}
                    setUpdateData={setUpdateData}
                    onClose={handleFormClose} 
                    onUpdateSuccess={handleUpdateSuccess} 
                />
            )}
            {updateSuccess && (
                <div className="alert alert-success" role="alert">
                    Update successful!
                </div>
            )}
        </div>
    );
}
