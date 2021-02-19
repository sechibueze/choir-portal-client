import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../../constants';
import './Navbar.scss';

const Navbar = () => {
  const [navbarFixedPosition, fixNavbarOnScroll] = useState(false);
  const handleNavbarPosition = e => {
    const offset = window.scrollY;
    if (offset > 70) {
      fixNavbarOnScroll(true)
    }else{
      fixNavbarOnScroll(false)
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleNavbarPosition);
  });
  return ( 
    
      <nav className={`navbar ${ navbarFixedPosition ? 'fixed' : ''}`}>
        <input type="checkbox" id="toggle-nav-menu" />
        <div className="navbar-container">
          <Link className="logo" to="/">
            <img src={'./img/ftc-logo.png'} className="logo-icon" alt="FTC ID"/>
            <span className="logo-name"> { APP_NAME } </span>
          </Link>

          <label htmlFor="toggle-nav-menu" className="menu-icon">
            <span className="fa fa-bars fa-2x" />
          </label>
          <div className="navlinks">
            {/* <Link to="/showcase" className="nav-item"> Showcase </Link>
            <Link to="/login" className="nav-item"> Login </Link> */}

            <Link to="/login" className="nav-item navbar-cta"> Login </Link>

          </div>
        </div>
      </nav>
   );
//   return (
//     <Fragment>
//         <nav className="navbar ">
//             <div className="container clearfix">
//                 <input type="checkbox" id="menu-toggler-control" />
//                 <Link className="logo" to="/">
//                     <img src="/img/ftc-logo.png" alt="Ft Choir Logo" className="logo-icon fa-connectdevelop fa-2x" />
//                     <div className="logo-name">FTC Portal</div>
//                 </Link>
//                 <label htmlFor="menu-toggler-control" className="menu-toggler fa fa-bars fa-2x"></label>
//                 <ul className="navlinks">
//                     {/* <li className="navlink-item"><Link to="/dashboard"> <i className="fa fa-dashboard"></i> Dashboard</Link></li>
//                     <li className="navlink-item"><Link to="/profile-edit"> <i className="fa fa-edit"></i> Manage Profile</Link></li>
//                     <li className="navlink-item"><Link to="/profile-info"> <i className="fa fa-microphone"></i> Profile Info</Link></li>
//                     <li className="navlink-item"><Link to="/member-list"> <i className="fa fa-users"></i> Members</Link></li> */}
//                     {/* <li className="navlink-item"><Link to="/auth"> <i className="fa fa-users"></i> Signup</Link></li> */}
//                     <li className="navlink-item"><Link to="/login"><i className="fa fa-sign-in"></i>Login</Link></li>
//                 </ul>
//             </div>
//         </nav>
//     </Fragment>
//   );
}
 
export default Navbar;