import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const validate = () => {
        const errors = {};

        if (!values.name) {
            errors.name = "Name is required";
        }

        if (!values.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Email address is invalid";
        }

        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        return errors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            axios.post('http://localhost:3000/signup', values)
                .then((res) => {
                    console.log("Server Response:", res.data);
                    if (res.data === "Success") {
                        alert('User registered successfully');
                    } else {
                        alert('Failed to register user');
                    }
                })
                .catch((err) => {
                    console.error("Axios Error:", err);
                    alert('An error occurred. Please try again.');
                });
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-form-container">
                <h3 className="signup-title">Sign Up</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="input-label"><strong>Name</strong></label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                            value={values.name}
                            onChange={handleInput}
                            className="form-control input-field"
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="input-label"><strong>Email</strong></label>
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
                        <label htmlFor="password" className="input-label"><strong>Password</strong></label>
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
                        <strong>Sign Up</strong>
                    </button>
                    <p className="login-link">
                        Already have an account? <Link to="/" className="login-link-text">Log In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
