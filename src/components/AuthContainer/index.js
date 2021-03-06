import React, { Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { logout } from '../../_actions/authActions';

import AuthSidebar from '../AuthSidebar'
import Footer from '../Footer'
import './AuthContainer.scss';

const AuthContainer = ({ children, currentMember, logout }) => {
  console.log('[AuthContainer]: currentUser', currentMember)
  return ( 
    <Fragment>
      <div className="admin-page">
        <input type="checkbox" name="" id="sidebar-switcher" />
        <label htmlFor="sidebar-switcher" className="sidebar-outer"/>
            <AuthSidebar currentMember={currentMember} logout={logout}/>

          <div className="admin-navbar">
            <label htmlFor="sidebar-switcher" className="fa fa-bars fa-2x toggle-sidebar" />

            <ul className="admin-navbar-actions">
              {/* <li>
                <Link to="/business-manager"> <span className="admin-navbar-item-icon fa fa-database" title="Tables"/> <span className="sm-hide">Business Admin</span> </Link>
              </li>
              <li>
                <Link to="/investment-manager"> <span className="admin-navbar-item-icon fa fa-grip-vertical" title="Tables"/> <span className="sm-hide">Invest Admin</span> </Link>
              </li>
              <li>
                <Link to="http://"> <span className="admin-navbar-item-icon fa fa-location-arrow" title="Tables"/> <span className="sm-hide">User Admin</span> </Link>
              </li>
              <li>
                <Link to="http://"> <span className="admin-navbar-item-icon fa fa-signature" title="Tables"/> <span className="sm-hide">Tables</span> </Link>
              </li>
              <li>
                <Link to="http://"> <span className="admin-navbar-item-icon fa fa-comment-dots" title="Tables"/> <span className="sm-hide">Tables</span> </Link>
              </li> */}
              
              <li className="drop-down">
                <Link href="http://" > 
                    {
                        currentMember.imageUrl ? (
                            <img src={currentMember.imageUrl} className="admin-navbar-item-image" alt='currenly logged in user' style={{ verticalAlign: 'middle'}} />
                        ) : (
                            <span className="admin-navbar-item-icon fa fa-user" title="Tables"/> 

                        )
                    }
                    
                    {/* <span className="sm-hide">User</span>  */}
                    <span className="fa fa-ellipsis-v three-dots" /> 
                </Link>
                <div className="drop-down-menu">
                  <span className="drop-down-menu-link"> <span className="link-icon fa fa-user-alt"/> Hi, { currentMember.firstname } </span>
                  <Link to="/profile" className="drop-down-menu-link"> <span className="link-icon fas fa-user-circle"/> Profile</Link>
                  {/* <Link to="http://" className="drop-down-menu-link"> <span className="link-icon fa fa-bookmark"/> Archive</Link>
                  <Link to="http://" className="drop-down-menu-link"> <span className="link-icon fa fa-cogs"/> Settings</Link> */}
                  <span onClick={() => logout()} className="drop-down-menu-link"> <span className="link-icon fa fa-chevron-left"/> Logout</span>
                  
                </div>
              </li>
                        
            </ul>
          </div>
          <div className="page-body"> 
            { children && children }
            <Footer />
          </div>
      </div>
    </Fragment>
   );
}
AuthContainer.propTypes = {
  logout: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    currentMember: state.auth.currentMember
})
export default connect(mapStateToProps , { logout })(AuthContainer);