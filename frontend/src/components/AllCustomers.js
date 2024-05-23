
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AllCustomers() {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const ApiURL = "http://localhost:8070";
    
    useEffect(() => {
        axios.get(`${ApiURL}/Hotel/Customer/displayAll`)
            .then((res) => {
                setCustomers(res.data.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredCustomers = customers.filter(customer =>
        (customer.firstName && customer.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (customer.lastName && customer.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (customer.nic && customer.nic.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            axios.delete(`${ApiURL}/Hotel/Customer/deleteCustomer/${id}`)
                .then((res) => {
                    // Filter out the deleted customer from the state
                    setCustomers(customers.filter(customer => customer._id !== id));
                    alert("Customer deleted successfully!");
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
    };

    return (
        <div className="container">
            <h1 align='center'>All Customers</h1>
           <br></br>
           <div className="search-container">
                <input className="form-control"
                    type="text"
                    placeholder="Search by name, email, NIC..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <br></br>
            <div style={{ overflowX: 'auto' }}>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Country</th>
                        <th>Actions</th> {/* New column for actions */}
                       
                        
                    </tr>
                </thead>
                <tbody>
                {filteredCustomers.map((customer, index) => (
                        <tr key={index}>
                            <td>{customer.firstName}</td>
                            <td>{customer.lastName}</td>
                            <td>{customer.email}</td>
                            <td>{customer.mobile}</td>
                            <td>{customer.country}</td>
                            <td>
                            <button className="btn btn-danger" onClick={() => handleDelete(customer._id)}>Remove</button>
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}

