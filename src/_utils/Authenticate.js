import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { gql, useQuery } from '@apollo/client';
import checkAuthToken from './checkAuthToken';
const GET_AUTH_MEMBER = gql`
query getAuthUser {
  me {
    firstname
    lastname
    email
  }
}
`;
const Authenticate = ({ component: Component, isAuthenticated, ...rest}) =>  {
    const { called, loading, data, error } = useQuery(GET_AUTH_MEMBER, {
      context: {
        headers: {
          "x-auth-token": checkAuthToken()
        }
      }
    })

    if(called && loading) return <h1> Loading...</h1>
    if(error) return <h1> Error...</h1>
    console.log('Authenticate erro', error)
    console.log('Authenticate data', data)
    if (data) {
      const { firstname, lastname, email } = data.me;
      const auth = {
        isAuthenticated: true,
        me: { firstname, lastname, email }
      }
      return (
        <Route 
          {...rest} 
          render={ props => (<Component {...props} authUser={auth}/>)}
          
        />
      )
    }
    
    };

Authenticate.propTypes = {
  isAuthenticated: PropTypes.bool
};
 const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
 });
export default connect(mapStateToProps)(Authenticate);