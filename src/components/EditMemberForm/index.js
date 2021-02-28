import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { editMember } from '../../_actions/memberActions';
import { EDIT_MEMBER_FAIL } from '../../_actions/types';
import { setAlert } from '../../_actions/alertActions';
import Alert from '../Alert';
import "./EditMemberForm.scss";

const EditMemberForm = ({ memberData, editMember, editMemberRequest, updatedMember, setAlert }) => {
  const [editMemberData, setEditMemberData] = useState({ 
    access: memberData.access ? memberData.access : "",
    firstname: "",
    lastname: "",
    email: '', 
    password: '', 
    phone: '', 
  });
  
  const handleChange = ({ target }) => {
    setEditMemberData(prev => ({...prev, [target.name]: target.value}));
  }
  const handleMemberUpdate = e => {
    e.preventDefault();
    // Validate Admin input
    console.info("[EditMemberForm]: payload", editMemberData)
    editMember(editMemberData)
  }
  const { access, firstname, lastname, email, password, phone } = editMemberData;
 
  return (
    <Fragment>
      <div className='container'>
        <form  className="form" id={"new-member-form"} onSubmit={handleMemberUpdate}>
        
          <div className="form-logo">
            <img src="./img/ftc-logo.png" alt="New member Form ID" className="form-logo-icon" />
            <span className="form-type"> <span className="fas fa-user-edit" /> Update Member</span>
          </div>

          <span className="field-legend"> Required</span>
           <Alert origin={EDIT_MEMBER_FAIL} />

          <div className="form-group">
            <label htmlFor="access">Access ID</label>
            <input type="text" name="access" onChange={handleChange} value={access} id="access" className="form-control"  placeholder="Type member access here"/>
          </div>
          <div className="form-group">
            <label htmlFor="firstname">Firstname </label>
            <input type="text" name="firstname" onChange={handleChange} value={firstname} id="firstname" className="form-control"  placeholder="Type member access here"/>
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Lastname </label>
            <input type="text" name="lastname" onChange={handleChange} value={lastname} id="lastname" className="form-control"  placeholder="Type member access here"/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" onChange={handleChange} value={email} id="email" className="form-control"  placeholder="Type your email here"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={handleChange} value={password} id="password" className="form-control" placeholder="Type your password" required /> 
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone </label>
            <input type="text" name="phone" onChange={handleChange} value={phone} id="phone" className="form-control"  placeholder="Type member access here"/>
          </div>
          <button type="submit" id="login-btn" className="btn btn-primary" disabled={editMemberRequest ? true: false}>
            <span className="fas fa-user-edit" />
            {
              editMemberRequest ? "processing..." : "Update member"
            }
          </button>
                 

         
        </form>
      </div>
    </Fragment>
  );
};

EditMemberForm.propTypes = {
  editMember: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  editMemberRequest: state.members.editMemberRequest,
  updatedMember: state.members.updatedMember,
});
export default connect(mapStateToProps, { editMember, setAlert})(withRouter(EditMemberForm));