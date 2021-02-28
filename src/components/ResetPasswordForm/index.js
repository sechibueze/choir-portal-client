import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Alert from '../Alert';
import { resetMemberPassword } from '../../_actions/memberActions';
// import { gql, useMutation } from '@apollo/client';

// const RESET_PASSWORD_MUTATION = gql`
//   mutation passwordReset($newPassword: String!, $passwordResetToken: String! ){
//     resetPassword(newPassword: $newPassword passwordResetToken: $passwordResetToken){
//       status
//       error
//       data
//     }
//   }
// `;
const ResetPassword = ({
   match,
   history,
   resetMemberPassword,
   passwordReset
  }) => {
  // const [ errors, setErrors] = useState({});
  const [data, setData] = useState({ 
    password: '', 
    passwordResetToken: match.params.token
  });
  // const [resetPasswordWithToken, { loading: processing, data: result, error }] = useMutation(RESET_PASSWORD_MUTATION, {
  //   variables: {
  //     newPassword: data.password,
  //     passwordResetToken: data.passwordResetToken
  //   },
  //   errorPolicy: 'all',
  //   onError(error){
  //     console.log('errors ---', { error })
  //     const { graphQLErrors, networkError} = error;
  //     if (networkError) {
  //       console.log('networkError ', networkError)
  //       return setErrors({message: "An error has occured"})
  //     }
  //     if (graphQLErrors.length > 0) {
  //       console.log('graphQLErrors ', graphQLErrors)
  //       // const gqlErrors = graphQLErrors[0].extensions.errors;
  //       return setErrors({ message: graphQLErrors[0].message})
  //     }

  //     return setErrors({ message: error.message })
  //   },
  //   update(_, result){
  //     console.log('data forgotpasslink', result)
  //     setErrors({message: result.data.resetPassword.data})
  //   },
  // })
  const handleChange = ({target}) => {
    setData(prev => ({
      ...prev,
      [target.name]:target.value
    }))
  }
  const handleResetPassword = e => {
    e.preventDefault();
    console.log('data forgotpasslink', data)
    return resetMemberPassword(data, history);
    // resetPasswordWithToken()
  }
  const { password } = data;
  // console.log('error forgotpasslink', {error})
  // console.log('result forgotpasslink', result)
  return (
    <Fragment>
      <div className="container">
         <form className="form" onSubmit={handleResetPassword}>
           <Alert origin='RESET_MEMBER_PASSWORD' />
          <div className="form-group">
            <label htmlFor="password">Password <sup>*</sup></label>
            <input type="password" name="password" value={password} onChange={handleChange} className="form-control" id="password" required />

          </div>
          <button className="btn btn-success btn-md fa fa-check" >
            Reset Password
          </button>
          
        </form>
      </div>
    
    </Fragment>
  );
}
 
ResetPassword.propTypes = {
  resetMemberPassword: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  passwordReset: state.members.passwordReset
});
export default connect(mapStateToProps, { resetMemberPassword })(withRouter(ResetPassword));
 
