import React, { Fragment, useState } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { uploadMembers } from "../../_actions/memberActions";
import {  MEMBERS_UPLOAD_FAIL } from "../../_actions/types";
import'./MembersUploadForm.scss';
import Alert from '../Alert';

const MembersUploadForm = ({ uploadMembers, membersUploadRequest}) => {
    const [data, setData] = useState({members_upload: ''});
    const handleChange = ({ target }) => {
        const { name, files } = target;
        setData(prev => ({
            ...prev,
          [name]: files[0]
        }))
    };
    const handleSubmit = e => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('members_upload', data.members_upload);
        uploadMembers(fd);
    };
    
    return ( 
        <Fragment>
            <h1> Upload Members </h1>
            <form className='form' onSubmit={handleSubmit} encType='multipart/form-data'>
                <Alert origin={MEMBERS_UPLOAD_FAIL} />
                <div className='form-group'>
                    <label htmlFor='members_upload'> Upload Members List</label>
                    <input type='file' required name='members_upload' id='members_upload' onChange={handleChange} className='form-control'/>
                </div>
                <button type='submit' className='btn btn-primary'> 
                <span className="fas fa-paperclip" />
                    {
                        membersUploadRequest ? "processing..." : "Upload Members"
                    } 
                </button>
            </form>
        </Fragment>
    );
}
MembersUploadForm.propTypes = {
    uploadMembers: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    
    membersUploadRequest: state.members.membersUploadRequest,
})
export default connect(mapStateToProps, { uploadMembers })(MembersUploadForm);