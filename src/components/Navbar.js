import React from 'react';
import {Link} from "react-router-dom";
import { useLocation } from "react-router-dom";
  const Navbar = ()=> {
    let location = useLocation()

    React.useEffect(() => {
      // Google Analytics
      console.log(location.pathname)
    }, [location]);
  
    return (
      <div>
        <nav className="navbar  navbar-expand-lg fixed-top bg-dark  text-danger">
          <div className="container-fluid">
            <Link className="navbar-brand fw-25 color-yellow" to="/general">News-Monkey</Link>
            <button className="navbar-toggler bg-white " type="button"  data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation"><i className="fa-solid fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse "  id="navbarNavDropdown">         
                      <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className={`nav-link text-white ${location.pathname === "/general" ? "active border-bottom border-primary" : ""}`}  to="/general">General</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/business" ? "active border-bottom border-primary" : ""} text-white`}  to="/business">Business</Link>
                </li>
               
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/entertainment" ? "active border-bottom border-primary" : ""} text-white `} to="/entertainment">Entertainment</Link>
                </li>
                
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname==="/health" ? "active border-bottom border-primary" :""} text-white`} to="/health">Health</Link>
                </li>

                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname==="/politics" ? "active border-bottom border-primary" :""} text-white`}  to="/politics">Politics</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname==="/sports" ? "active border-bottom border-primary" :""} text-white`}  to="/sports">Sports</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname==="/technology" ? "active border-bottom border-primary" :""} text-white`}  to="/technology">Technology</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname==="/science" ? "active border-bottom border-primary" :""} text-white`} to="/science">Science</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  
}

export default Navbar;
