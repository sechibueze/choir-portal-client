import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../Alert';
import { sendPasswordResetToken } from '../../_actions/memberActions';
// import { gql, useMutation } from '@apollo/client';
// const SEND_PASSWORD_RESET_TOKEN_MUTATION = gql`
//   mutation sendPasswordResetLink($email: String!){
//     sendPasswordResetLink(email: $email){
//       status
//       error
//       data
//     }
//   }
// `
const ForgotPassword = ({
  loading,
  sendPasswordResetToken,
  // passwordResetToken,

}) => {
  // const [ errors, setErrors] = useState({});
  const [data, setData] = useState({ email: ''});
  // const [sendPasswordResetLink, {error, loading: processing, data: result}] = useMutation(SEND_PASSWORD_RESET_TOKEN_MUTATION, {
  //   variables: data,
  //   errorPolicy: 'all',
  //   onError(error){
  //     const { graphQLErrors, networkError} = error;
  //     if (networkError) {
  //       console.log('networkError ', networkError)
  //       setErrors({message: "An error has occured"})
  //     }
  //     if (graphQLErrors.length > 0) {
  //       console.log('networkError ', graphQLErrors)
  //       const gqlErrors = graphQLErrors[0].extensions.errors;
  //       setErrors(gqlErrors)
  //     }
  //   },
  //   update(_, result){
  //     console.log('data forgotpasslink', result)
  //     setErrors({message: result.data.sendPasswordResetLink.data})
  //   }
  // })
  const handleChange = ({target}) => {
    setData(prev => ({
      ...prev,
      [target.name]:target.value
    }))
  }
  const handleForgotPassword = (e) => {
    e.preventDefault()
    sendPasswordResetToken(data)
    // sendPasswordResetLink()
    
  }
  
  const { email } = data;
  // console.log('errors to show', errors)
  return (
    <Fragment>
      <div className="container">
         <form className="form" onSubmit={ handleForgotPassword}>
           <Alert origin="SEND_PASSWORD_RESET_TOKEN" />
          <div className="form-group">
            <label htmlFor="email">Email <sup>*</sup></label>
            <input type="email" name="email" value={email} onChange={handleChange} className="form-control" placeholder="jkevin@scott.com" id="email" required />

          </div>
          <button className="btn btn-success btn-md fa fa-check">
            
            Send Password Reset Link
            
          </button>
          
        </form>
      </div>
    
    </Fragment>
  );
}
 
ForgotPassword.propTypes = {
  sendPasswordResetToken: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  // passwordResetToken: state.members.passwordResetToken
});
export default connect(mapStateToProps, { sendPasswordResetToken})(ForgotPassword);
 
