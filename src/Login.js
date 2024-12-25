import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Ensure you import the updated CSS file

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const validate = () => {
        const errors = {};

        // Email validation
        if (!values.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Email address is invalid";
        }

        // Password validation
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        return errors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post('http://localhost:3000/login', values);
                console.log("Response from server:", response.data);

                if (response.data === "Success") {
                    alert("Login Successful");
                    navigate('/home'); // Navigate to home page
                } else {
                    alert("Login Failed");
                }
            } catch (error) {
                console.error("Error during login:", error);
                alert("An error occurred during login. Please try again.");
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-form-container">
                <h3 className="login-title">Log In</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="input-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email Address"
                            value={values.email}
                            onChange={handleInput}
                            className="form-control input-field"
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="input-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={values.password}
                            onChange={handleInput}
                            className="form-control input-field"
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        <strong>Log In</strong>
                    </button>
                    <p className="signup-link">
                        Don't have an account? <Link to="/signup" className="signup-link-text">Create Account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
