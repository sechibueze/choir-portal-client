import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loginMember } from '../../_actions/authActions';
import { LOGIN_FAIL } from '../../_actions/types';
import { setAlert } from '../../_actions/alertActions';
import Alert from '../Alert';
import "./LoginForm.scss";

const LoginForm = ({ loginRequest, isAuthenticated, loginMember, setAlert }) => {
  const [memberLogin, setMemberLogin] = useState({ email: '', password: '' });
  
  const handleChange = ({ target }) => {
    setMemberLogin(prev => ({...prev, [target.name]: target.value}));
  }
  const handleMemberLogin = e => {
    e.preventDefault();
    if (memberLogin.password.length < 6) {
      return setAlert("Invalid Input", LOGIN_FAIL)
    }
    if (!memberLogin.email || !memberLogin.password) {
      return setAlert("All fields are required", LOGIN_FAIL)
    }
    loginMember(memberLogin)
  }
  const { email, password } = memberLogin;
 
  if(isAuthenticated) return <Redirect to={"/dashboard"} />
  return (
    <Fragment>
      <div className='container'>
        <form  className="form" id={"login-form"} onSubmit={handleMemberLogin}>
        
          <div className="form-logo">
            <img src="./img/ftc-logo.png" alt="Login Form ID" className="form-logo-icon" />
            <span className="form-type"> Login</span>
          </div>

          <span className="field-legend"><sup>*</sup> Required</span>
           <Alert origin={LOGIN_FAIL} />
           <Alert origin='RESET_MEMBER_PASSWORD' />

          <div className="form-group">
            <label htmlFor="email">Email<sup>*</sup></label>
            <input type="email" name="email" onChange={handleChange} value={email} id="email" className="form-control" required placeholder="Type your email here"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password<sup>*</sup></label>
            <input type="password" name="password" onChange={handleChange} value={password} id="password" className="form-control" placeholder="Type your password" required />
            <Link to='/forgot-password' className='forgot-password-link tip'> Forgot Password</Link>
          </div>
          <button type="submit" id="login-btn" className="btn btn-primary" disabled={loginRequest ? true: false}>
            <i className="fa fa-sign-in" />
            {
              loginRequest ? "processing..." : "Login"
            }
          </button>
                 

         
        </form>
      </div>
    </Fragment>
  );
};

LoginForm.propTypes = {
  loginMember: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loginRequest: state.auth.loginRequest
});
export default connect(mapStateToProps, { loginMember, setAlert})(withRouter(LoginForm));