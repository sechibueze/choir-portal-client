import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../components/Spinner'

const Authenticate = ({ component: Component, isAuthenticated, currentMemberRequest, ...rest}) =>  {

  if (currentMemberRequest) {
    return <Spinner />
  }
      return (
        <Route 
          {...rest} 
          render={ props => isAuthenticated ? <Route component={Component} {...props} /> : <Redirect to="/login" />
          }
          
        />
      )
    // }
    
    };

Authenticate.propTypes = {
  isAuthenticated: PropTypes.bool
};
 const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated,
   currentMemberRequest: state.auth.currentMemberRequest,
 });
export default connect(mapStateToProps)(Authenticate);