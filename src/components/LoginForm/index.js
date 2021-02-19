import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loginMember } from '../../_actions/authActions';
import { setAlert } from '../../_actions/alertActions';
import Alert from '../Alert';
import { AUTH_TOKEN } from '../../constants';
import { gql, useMutation } from '@apollo/client';

import './LoginForm.scss'
const LOGIN_USER_MUTATION = gql`
    mutation loginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
      }
    }
`;
const Login = ({ loading, isAuthenticated, loginMember, setAlert }) => {
  const [loginUser, {called, loading: processing, error, data}] = useMutation(LOGIN_USER_MUTATION)
  const [memberLogin, setMemberLogin] = useState({ email: '', password: '' });

  const handleChange = ({ target }) => {
    setMemberLogin(prev => ({...prev, [target.name]: target.value}));
  }
  const handleMemberLogin = e => {
    e.preventDefault();
    // loginMember(memberLogin);
    loginUser({
      variables: memberLogin
    })
  }
  const { email, password } = memberLogin;
  if(isAuthenticated) return <Redirect to='/dashboard'/>
  // if(called && processing ) return <Spinner /> 
  if(called && error ) return <h1>Error ...</h1> 

  if(data){
    const authToken = data.login.token;
    localStorage.setItem(AUTH_TOKEN, authToken);
    return <Redirect to='/dashboard'/>
  }
  console.log('m', error, data )
  return (
    <Fragment>
      <div className='container'>
        <form  className="form" id={"login-form"} onSubmit={handleMemberLogin}>
          <div className="form-logo">
            <img src="./img/ftc-logo.png" alt="Login Form ID" className="form-logo-icon" />
            <span className="form-type"> Login</span>
          </div>
          <span className="field-legend"><sup>*</sup> Required</span>
           <Alert origin='LOGIN' />
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
          <button type="submit" disabled={ processing ? true : false } className="btn btn-primary">
          <i className="fa fa-sign-in" />
            {
              processing ? "processing..." : "Login"
            }
          </button>

         
        </form>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  loginMember: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
  
});
export default connect(mapStateToProps, { loginMember, setAlert})(Login);