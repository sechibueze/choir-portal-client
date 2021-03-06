import React, { Fragment, useState} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Alert from '../Alert';
import { updateUnitData } from '../../_actions/profileActions'
import { setAlert } from '../../_actions/alertActions';
import {VOCAL_PARTS, GROUPS, REHEARSAL_LOCATION, MEMBERSHIP_STATUS, LEADERSHIP_STATUS, SUB_GROUP} from '../../constants';
import { UNIT_DATA_FAIL } from '../../_actions/types';

const UnitDataForm = ({_id, currentMember, unitData, unitDataRequest, setAlert, updateUnitData}) => {
  const [data, setData] = useState({
    _id: _id && currentMember.auth.includes("admin") ? _id : "",
    group: unitData.group ? unitData.group : '', 
    rehearsal_location: unitData.rehearsal_location ? unitData.rehearsal_location : '', 
    vocal_part: unitData.vocal_part ? unitData.vocal_part : '', 
    membership_status: unitData.membership_status ? unitData.membership_status : '', 
    leadership_status: unitData.leadership_status ? unitData.leadership_status : '', 
    sub_group: unitData.sub_group ? unitData.sub_group : ''
    })

  const handleChange = ({ target}) => {
    setData(prev => ({
      ...prev,
      [target.name]:target.value
    }))
  
  }
   const updateData = e => {
    e.preventDefault();
    updateUnitData(data)
  }
  // const {group, rehearsal_location, vocal_part, membership_status, leadership_status, sub_group } = data;
  return ( 
    <Fragment>
       <section className="section">
        <header className="section-header">
          <h3 className="title">
            Choir Roles
          </h3>
        </header>
        <form onSubmit={updateData} className="form">
          <Alert origin={UNIT_DATA_FAIL}/>
          <div className="form-group">
            <label htmlFor="group"> Group</label>
            <select name="group"  onChange={handleChange} id="group" className="form-control" >
              <option selected value=''>--select--</option>
              {
                GROUPS.map((group, idx) => (
                  <option value={group} key={idx}> { `Group ${ group }` } </option>
                ))
              }
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="rehearsal_location">Rehearsal Location</label>
            <select name="rehearsal_location"  onChange={handleChange} id="rehearsal_location" className="form-control" >
              <option selected value=''>--select--</option>
              {
                REHEARSAL_LOCATION.map((location, idx) => (
                  <option value={location} key={idx}> { `${ location }` } </option>
                ))
              }
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="vocal_part">Part </label>
            <select name="vocal_part"  onChange={handleChange} id="vocal_part" className="form-control" >
              <option selected value=''>--select--</option>
              {
                VOCAL_PARTS.map((part, idx) => (
                  <option value={part} key={idx}> { `${ part }` } </option>
                ))
              }
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="membership_status">Membership status</label>
            <select name="membership_status"  onChange={handleChange} id="membership_status" className="form-control" >
              <option selected value=''>--select--</option>
              {
                MEMBERSHIP_STATUS.map((status, idx) => (
                  <option value={status} key={idx}> { `${ status }` } </option>
                ))
              }
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="leadership_status">Leadership status</label>
            <select name="leadership_status"  onChange={handleChange}  id="leadership_status" className="form-control" >
              <option selected value=''>--select--</option>
              {
                LEADERSHIP_STATUS.map((status, idx) => (
                  <option value={status} key={idx}> { `${ status }` } </option>
                ))
              }
            </select>
          </div>

          <div className="form-group">
            <label for="sub_group"> Sub group</label>
            <select name="sub_group"  onChange={handleChange}  id="sub_group" className="form-control" >
              <option selected value=''>--select--</option>
              {
                SUB_GROUP.map((group, idx) => (
                  <option value={group} key={idx}> { `${ group }` } </option>
                ))
              }
            </select>
          </div>
          <button type="submit" className="btn btn-sm btn-primary fa fa-check"> 
            {
              unitDataRequest ? "processing..." : "Update Choir Roles Data"
            }
          </button>
        </form>
      </section>
    </Fragment>
   );
}
 
UnitDataForm.propTypes = {
  updateUnitData: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  unitDataRequest: state.profiles.unitDataRequest,
  currentMember: state.auth.currentMember,
});
export default connect(mapStateToProps, { setAlert, updateUnitData })(UnitDataForm);

