

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const ApiURL = "http://localhost:8070";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${ApiURL}/Hotel/User/login`, { email, password });
      if (response && response.data) {
        console.log('Login Successful:', response.data);
        window.location.href = '/Hotel/Customer/register'; 
      } else {
        console.error('Login Failed: Response or data is undefined');
        setErrorMessage('Login failed. Please check your email and password.');
      }
    } catch (error) {
      console.error('Login Failed:', error.response ? error.response.data.error : error.message);
      setErrorMessage('Login failed. Please check your email and password.');
    }
  };
  

  return (
    <div>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid" alt="Phone" /> 
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form onSubmit={handleLogin}>
                <h4 align='center'>Log in Here</h4>
                <br></br>
                {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                <div className="form-outline mb-4">
                  <input type="email" id="form1Example13" className="form-control form-control-lg"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                  <label className="form-label" htmlFor="form1Example13">Email address</label>
                </div>
                <div className="form-outline mb-4">
                  <input type="password" id="form1Example23" className="form-control form-control-lg"
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                  <label className="form-label" htmlFor="form1Example23">Password</label>
                </div>
                <div className="d-flex justify-content-around align-items-center mb-4">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                    <label className="form-check-label" htmlFor="form1Example3"> Remember me </label>
                  </div>
                  <Link to="/Hotel/passwordReset">Forgot password?</Link>
                </div >
                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-lg btn-block">Sign in</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
