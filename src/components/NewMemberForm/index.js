import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addNewMember } from '../../_actions/memberActions';
import { ADD_NEW_MEMBER_FAIL } from '../../_actions/types';
import { setAlert } from '../../_actions/alertActions';
import Alert from '../Alert';
import "./NewMemberForm.scss";

const NewMemberForm = ({ newMember, newMemberRequest, addNewMember, setAlert }) => {
  const [newMemberData, setNewMemberData] = useState({ 
    access: "",
    firstname: "",
    lastname: "",
    email: '', 
    password: '', 
    phone: '', 
  });
  
  const handleChange = ({ target }) => {
    setNewMemberData(prev => ({...prev, [target.name]: target.value}));
  }
  const handleNewMemberSignup = e => {
    e.preventDefault();
    // Validate Admin input
    console.info("[NewMemberForm]: payload", newMemberData)
    addNewMember(newMemberData)
  }
  const { access, firstname, lastname, email, password, phone } = newMemberData;
 
  return (
    <Fragment>
      <div className='container'>
        <form  className="form" id={"new-member-form"} onSubmit={handleNewMemberSignup}>
        
          <div className="form-logo">
            <img src="./img/ftc-logo.png" alt="New member Form ID" className="form-logo-icon" />
            <span className="form-type"> <span className="fa fa-user-plus" /> Add New Member</span>
          </div>

          <span className="field-legend"><sup>*</sup> Required</span>
           <Alert origin={ADD_NEW_MEMBER_FAIL} />

          <div className="form-group">
            <label htmlFor="access">Access ID<sup>*</sup></label>
            <input type="text" name="access" onChange={handleChange} value={access} id="access" className="form-control" required placeholder="Type member access here"/>
          </div>
          <div className="form-group">
            <label htmlFor="firstname">Firstname <sup>*</sup></label>
            <input type="text" name="firstname" onChange={handleChange} value={firstname} id="firstname" className="form-control" required placeholder="Type member access here"/>
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Lastname <sup>*</sup></label>
            <input type="text" name="lastname" onChange={handleChange} value={lastname} id="lastname" className="form-control" required placeholder="Type member access here"/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email<sup>*</sup></label>
            <input type="email" name="email" onChange={handleChange} value={email} id="email" className="form-control" required placeholder="Type your email here"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password<sup>*</sup></label>
            <input type="password" name="password" onChange={handleChange} value={password} id="password" className="form-control" placeholder="Type your password" required /> 
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone <sup>*</sup></label>
            <input type="text" name="phone" onChange={handleChange} value={phone} id="phone" className="form-control" required placeholder="Type member access here"/>
          </div>
          <button type="submit" id="login-btn" className="btn btn-primary" disabled={newMemberRequest ? true: false}>
            <span className="fa fa-user-plus" />
            {
              newMemberRequest ? "processing..." : "Add new member"
            }
          </button>
                 

         
        </form>
      </div>
    </Fragment>
  );
};

NewMemberForm.propTypes = {
  addNewMember: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  newMember: state.members.newMember,
  newMemberRequest: state.members.newMemberRequest,
});
export default connect(mapStateToProps, { addNewMember, setAlert})(withRouter(NewMemberForm));