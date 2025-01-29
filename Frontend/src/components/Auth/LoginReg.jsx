import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import './style.css';
import viewLogo from './img/log.svg';
import viewLogos from './img/register.svg';

const App = () => {
    const [isSignUpMode, setSignUpMode] = useState(false);
    const [signInFormData, setSignInFormData] = useState({ email: '', password: '' }); // Update field names to match backend
    const [signUpFormData, setSignUpFormData] = useState({ fullName: '', phoneNumber: '', email: '', password: '', bio: '' }); // Update field names to match backend
    const [signInErrors, setSignInErrors] = useState({});
    const [signUpErrors, setSignUpErrors] = useState({});

    const toggleSignUpMode = () => {
        setSignUpMode((prevMode) => !prevMode);
        setSignInErrors({});
        setSignUpErrors({});
    };

    const handleSignInChange = (e) => {
        const { name, value } = e.target;
        setSignInFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSignUpChange = (e) => {
        const { name, value } = e.target;
        setSignUpFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateSignIn = () => {
        let errors = {};
        if (!signInFormData.emailOrPhone.trim()) {
            errors.emailOrPhone = "Email/Phone is required";
        }
        if (!signInFormData.password.trim()) {
            errors.password = "Password is required";
        }
        setSignInErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validateSignUp = () => {
        let errors = {};
        if (!signUpFormData.fullName.trim()) {
            errors.fullName = "Full Name is required";
        }
        if (!signUpFormData.phoneNumber.trim()) {
            errors.phoneNumber = "Phone Number is required";
        }
        if (!signUpFormData.email.trim()) {
            errors.email = "Email is required";
        }
        if (!signUpFormData.password.trim()) {
            errors.password = "Password is required";
        }
        setSignUpErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        if (validateSignIn()) {
            try {
                const response = await axios.post('http://localhost:5000/login', signInFormData);
                const { accessToken, refreshToken, userId, userRole } = response.data;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('userId', userId);
                localStorage.setItem('userRole', userRole)
                alert("Sign in success");
                window.location.reload();
                // Handle success response (e.g., store tokens in local storage, redirect user)
            } catch (error) {
                alert("Sign in failed: " + error.response.data.error);
                // Handle error response (e.g., display error message to user)
            }
        }
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        if (validateSignUp()) {
            try {
                const response = await axios.post('http://localhost:5000/register', signUpFormData);
                alert("Sign up success");
                // Handle success response (e.g., show success message, redirect user)
            } catch (error) {
                alert("Sign up failed: " + error.response.data.error);
                // Handle error response (e.g., display error message to user)
            }
        }
    };

    return (
        <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
            <div className="forms-container">
                <div className="signin-signup">
                    <form onSubmit={handleSignInSubmit} className={`sign-in-form ${isSignUpMode ? '' : 'active'}`}>
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" name="emailOrPhone" value={signInFormData.emailOrPhone} onChange={handleSignInChange} placeholder="Email/Phone" />
                            {signInErrors.emailOrPhone && <span className="error">{signInErrors.emailOrPhone}</span>}
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" name="password" value={signInFormData.password} onChange={handleSignInChange} placeholder="Password" />
                            {signInErrors.password && <span className="error">{signInErrors.password}</span>}
                        </div>
                        <button className="btn solid" type="submit">
                            Login
                        </button>
                        <p className="social-text">Or Sign in with social platforms</p>
                        <div className="social-media">
                            {/* ... social media icons */}
                        </div>
                    </form>

                    <form onSubmit={handleSignUpSubmit} className={`sign-up-form ${isSignUpMode ? 'active' : ''}`}>
                        <h2 className="title">Sign up</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" name="fullName" value={signUpFormData.fullName} onChange={handleSignUpChange} placeholder="Full Name" />
                            {signUpErrors.fullName && <span className="error">{signUpErrors.fullName}</span>}
                        </div>
                        <div className="input-field">
                            <i className="fas fa-phone"></i>
                            <input type="text" name="phoneNumber" value={signUpFormData.phoneNumber} onChange={handleSignUpChange} placeholder="Phone Number" />
                            {signUpErrors.phoneNumber && <span className="error">{signUpErrors.phoneNumber}</span>}
                        </div>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" name="email" value={signUpFormData.email} onChange={handleSignUpChange} placeholder="Email" />
                            {signUpErrors.email && <span className="error">{signUpErrors.email}</span>}
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" name="password" value={signUpFormData.password} onChange={handleSignUpChange} placeholder="Password" />
                            {signUpErrors.password && <span className="error">{signUpErrors.password}</span>}
                        </div>
                        <button className="btn" type="submit">
                            Sign up
                        </button>
                        <p className="social-text">Or Sign up with social platforms</p>
                        <div className="social-media">
                            {/* ... social media icons */}
                        </div>
                    </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>Here for Electricity bill pay?</h3>
                        <p>Here is your website to pay the bill.</p>
                        <button className="btn transparent" id="sign-up-btn" onClick={toggleSignUpMode}>
                            Sign up
                        </button>
                    </div>
                    <img src={viewLogo} className="image" alt="empty" />
                </div>

                <div className="panel right-panel">
                    <div className="content">
                        <h3>One of us?</h3>
                        <p>Are you one of us with a busy schedule?</p>
                        <button className="btn transparent" id="sign-in-btn" onClick={toggleSignUpMode}>
                            Sign in
                        </button>
                    </div>
                    <img src={viewLogos} className="image" alt="empty" />
                </div>
            </div>
        </div>
    );
};

export default App;
