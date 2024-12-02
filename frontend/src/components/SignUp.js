import React, { useState } from "react";
import axios from "axios";
import "./login.css"; 

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/users/signup", formData);
      alert(response.data.message);
      
    } catch (error) {
      
      if (error.response && error.response.data.errors) {
        
        setError(error.response.data.errors[0].msg || "An unexpected error occurred.");
      } else if (error.response && error.response.data.message) {
        
        setError(error.response.data.message);
      } else {
        
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="login-container">  
      <form className="signup-form" onSubmit={handleSubmit}> 
        <h2>Sign Up</h2>
        {error && <div className="error">{error}</div>}
        
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
        <div className="login-link">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div> 
      </form>
    </div>
  );
};

export default SignUp;
