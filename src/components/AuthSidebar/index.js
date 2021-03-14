import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { APP_NAME } from "../../constants";
import ftcIcon from "../../assets/images/ftc-logo.png";
import "./AuthSidebar.scss";
const AuthSidebar = ({ currentMember, logout }) => {
  return (
    <div className="sidebar">
      <label
        htmlFor="sidebar-switcher"
        className="sidebar-close-btn fa fa-times"
      />
      <header>
        <Link className="admin-logo" to="/">
          <img
            src={ftcIcon}
            alt="Authenticated account logo"
            className="admin-logo-icon"
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              padding: "0.2rem",
              verticalAlign: "baseline",
            }}
          />
          <span className="admin-logo-name"> {APP_NAME} </span>
        </Link>
      </header>
      <div className="sidebar-actions">
        <Link to="/dashboard" className="sidebar-action-link">
          <span className="fas fa-paper-plane admin-sidebar-icon" /> Dashboard
        </Link>
        <Link to="/profile" className="sidebar-action-link">
          <span className="fas fa-address-book admin-sidebar-icon" /> My Profile{" "}
        </Link>

        <Link to="/activity" className="sidebar-action-link">
          <span className="fas fa-restroom admin-sidebar-icon" /> My Attendance{" "}
        </Link>
        {currentMember && currentMember.auth.includes("admin") && (
          <Fragment>
            <Link to="/members" className="sidebar-action-link">
              <span className="fa fa-users admin-sidebar-icon" /> Members{" "}
            </Link>
            <Link to="/profiles-list" className="sidebar-action-link">
              <span className="fas fa-id-card admin-sidebar-icon" /> Profiles{" "}
            </Link>
            <Link to="/events" className="sidebar-action-link">
              <span className="fas fa-layer-group admin-sidebar-icon" /> Events{" "}
            </Link>
            {/* <Link to="/user-manager" className="sidebar-action-link">
              <span className="fa fa-users admin-sidebar-icon" /> User Admin
            </Link> */}
          </Fragment>
        )}
        <span onClick={() => logout()} className="sidebar-action-link">
          <span className="fa fa-chevron-left admin-sidebar-icon" /> Logout
        </span>
      </div>
    </div>
  );
};

export default AuthSidebar;
