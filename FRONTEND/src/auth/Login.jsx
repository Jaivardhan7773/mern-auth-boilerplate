import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuthStore } from '../store/useAuthStore';
import toast from "react-hot-toast";
import './login.css';
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { login, isLoggingIng } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) login(formData);
  }
  return (
    <>
      <div className="login-page">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">Welcome Back</h2>

          <div className="input-group">
            <input type="email" value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            <label>Email</label>
          </div>

          <div className="input-group">
            <input type={showPassword ? "text" : "password"} value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
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

          <button type="submit" className="login-btn" disabled={isLoggingIng}>
            {isLoggingIng ? (
              <>
                <span className="flex text-center align-middle">
                  <Loader2 className="size-5 animate-spin" />
                  <span className="loading-text">Loading...</span>
                </span>
              </>
            ) : (
              "Login"
            )}
          </button>
          <p className="already-account">
            Don't have an account ?
            <NavLink to="/Signup" className="login-link">Sign up</NavLink>
          </p>
        </form>
      </div>
    </>
  )
}

export default Login;