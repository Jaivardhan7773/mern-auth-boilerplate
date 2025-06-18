import React ,{useState , useEffect} from 'react'
import { MessagesSquare } from "lucide-react";
import { Link , useNavigate } from "react-router-dom";
import "./Navbar.css"
import {useAuthStore } from '../store/useAuthStore.js'
const Navbar = () => {
  const navigate = useNavigate();
   const { logout, authUser } = useAuthStore();
   const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
   <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Left side - Logo with animation */}
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <MessagesSquare className="navbar-icon hover-rotate" />
            <span className="navbar-brand hover-scale">ChatApp</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className={`menu-icon ${mobileMenuOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {/* Right side - Navigation items */}
        <div className={`navbar-right ${mobileMenuOpen ? "open" : ""}`}>
          {authUser ? (
            <>
              <button 
                className="navbar-item hover-underline"
                onClick={() => navigate('/profile')}
              >
                Profile
              </button>
              <button 
                className="navbar-item hover-underline"
                onClick={() => navigate('/settings')}
              >
                Settings
              </button>
              <button 
                className="navbar-button pulse-on-hover" 
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <button 
              className="navbar-item hover-underline"
              onClick={() => navigate('/settings')}
            >
              Settings
            </button>
          )}
        </div>
      </div>
    </nav>

    </>
  )
}

export default Navbar;