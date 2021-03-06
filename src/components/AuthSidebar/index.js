import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../../constants';
import "./AuthSidebar.scss";
const AuthSidebar = ({ currentMember, logout }) => {

    return ( 
        <sidebar className="sidebar">         
            <label htmlFor="sidebar-switcher" className="sidebar-close-btn fa fa-times" />
            <header>
              <Link className="admin-logo" to="/"> 
                <span className="admin-logo-icon fas fa-stream fa-2x" /> 
                <span className="admin-logo-name"> { APP_NAME } </span> 
              </Link>
            </header>
            <div className="sidebar-actions">
              <Link to="/dashboard" className="sidebar-action-link"> <span className="fas fa-paper-plane admin-sidebar-icon"/> Dashboard</Link>
              <Link to="/profile" className="sidebar-action-link"> <span className="fas fa-id-card admin-sidebar-icon"/> Profile </Link>
              <Link to="/members" className="sidebar-action-link"> <span className="fa fa-users admin-sidebar-icon"/> Members </Link>
              <Link to="/profiles-list" className="sidebar-action-link"> <span className="fas fa-id-card admin-sidebar-icon"/> Profiles </Link>
              {
                currentMember && currentMember.auth.includes('admin') && (
                  <Fragment>
                    <Link to="/user-manager" className="sidebar-action-link"> <span className="fa fa-users admin-sidebar-icon"/> User Admin</Link>

                  </Fragment>
                )
              }
              <span onClick={() => logout()} className="sidebar-action-link"> <span className="fa fa-chevron-left admin-sidebar-icon"/> Logout</span>
            
            </div>
          
        </sidebar>
    );
}
 
export default AuthSidebar;