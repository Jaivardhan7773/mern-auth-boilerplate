import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import React from 'react'
import { Eye, EyeOff, Loader2 } from "lucide-react";
import './signup.css';
import { useAuthStore } from '../store/useAuthStore';
import toast from "react-hot-toast";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigningUp } = useAuthStore();
  const validateForm = () => {
if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  }

  return (

    <>
      <div className="signup-page">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2 className="signup-title">Sign Up</h2>

          <div className="input-group">
            <input type="text" value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required />
            <label>Username</label>
          </div>

          <div className="input-group">
            <input type="email" value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required />
            <label>Email</label>
          </div>

          <div className="input-group">
            <input type={showPassword ? "text" : "password"} value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required />
            <label>Password</label>
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="size-5 text-base-content/40" />
              ) : (
                <Eye className="size-5 text-base-content/40" />
              )}
            </button>

          </div>

          <button className="signup-btn" type="submit" disabled={isSigningUp}>
            {isSigningUp ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Create Account"
            )}</button>
          <p className="already-account">
            Already have an account?
            <NavLink to="/login" className="login-link">Log in</NavLink>
          </p>
        </form>

      </div>


    </>
  )
}

export default SignUp;