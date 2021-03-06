import React, { useState} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Alert from '../Alert';
import { createProfile } from '../../_actions/profileActions'
import { setAlert } from '../../_actions/alertActions';
import { PERSONAL_DATA_FAIL } from '../../_actions/types';
import { WORK_STATUS, MARITAL_STATUS, TITLES, STATES, COUNTRIES, PHONE_NUMBER_PATTERN,  TEXT_WITH_SPACE } from '../../constants';

const PersonalDataForm = ({ dismiss, 
  currentMember,
  personalData, personalDataRequest,
  createProfile, }) => {

  const [data, setData] = useState({ 
    title:  '',
    gender:  '',
    phone:'',
    whatsapp_phone: '',
    contact_address:  '',
    pha: '',
    dob: '',
    wed_date: '',
    work_status:  '',
    profession: '',
    employer_name:  '',
    employer_address:  '',
    state_origin:  '',
    nationality:  '',
  });
  const [proxyState, setProxyState] = useState(false)
  // const dismissFunction = () => {if(personalData) dismiss()};
  // useEffect(dismissFunction [personalData])

  const handleChange = ({ target}) => {
    setData(prev => ({
      ...prev,
      [target.name]:target.value
    }))
  }
   const updateData = e => {
    e.preventDefault();
    data.proxyState = proxyState;
    createProfile(data)
  }
  const { 
    phone, whatsapp_phone, contact_address,pha,
    wed_date,  profession, employer_name,
    employer_address } = data;

  return ( 

       <section className="section">
        <header className="section-header">
          <h3 className="title">Personal Data </h3>
        </header>
        <form name="personal" onSubmit={updateData} className="form">
            <Alert origin={PERSONAL_DATA_FAIL} />
            <div className="form-group">
            <label htmlFor="title">Title</label>
            <select name="title"  onChange={handleChange} id="title" className="form-control" >
              <option value=''>--select--</option>
              {
                TITLES.map((title, idx) => (
                  <option value={title} key={idx}> { `${ title }` } </option>
                ))
              }
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender </label>
            <select name="gender"  onChange={handleChange} id="gender" className="form-control" >
              <option value=''>--select--</option>
              <option value="Male" > Male  </option>
              <option value="Female" > Female  </option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Telephone number</label>
            <input type="tel" pattern={PHONE_NUMBER_PATTERN} placeholder="08123456789" name="phone" value={phone} onChange={handleChange} id="phone" className="form-control"
               />
          </div>

          <div className="form-group">
            <label htmlFor="whatsapp_phone">Whatsapp phone</label>
            <input type="tel" pattern={PHONE_NUMBER_PATTERN}  placeholder="08123456789"  name="whatsapp_phone" value={whatsapp_phone}  onChange={handleChange}  id="whatsapp_phone" className="form-control"
              />
          </div>

          <div className="form-group">
            <label htmlFor="contact_address">Contact address</label>
            <input type="text" name="contact_address" value={contact_address}  onChange={handleChange}  id="contact_address" className="form-control"
              />

          </div>

          <div className="form-group">
            <label htmlFor="pha">Permanent House Address</label>
            <input type="text" name="pha" value={pha}  onChange={handleChange}   className="form-control" id="pha"   />
          </div>

          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" name="dob"   onChange={handleChange}   id="dob" className="form-control"  />
          </div>
           <div className="form-group">
            <label htmlFor="marital_status">Marital status</label>
            <select name="marital_status"  onChange={handleChange}   id="marital_status" className="form-control" >
              <option selected value=''>--select--</option>
              {
                MARITAL_STATUS.map((status, idx) => (
                  <option value={status} key={idx}> { `${ status }` } </option>
                ))
              }
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="wed_date"> Wedding date</label>
            <input type="date" name="wed_date" value={wed_date}  onChange={handleChange}   id="wed_date" className="form-control"  />
          </div>

         

          <div className="form-group">
            <label htmlFor="work_status">Work status</label>
            <select name="work_status" onChange={handleChange}   className="form-control" required>
              <option selected value=''>--select--</option>
              {
                WORK_STATUS.map((status, idx) => (
                  <option value={status} key={idx}> { `${ status }` } </option>
                ))
              }
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="profession">Profession</label>
            <input type="text" pattern={TEXT_WITH_SPACE} name="profession" value={profession}  onChange={handleChange}   id="profession" className="form-control" 
               />
          
          </div>

          <div className="form-group">
            <label htmlFor="employer_name">Name of your employer</label>
            <input 
                type="text" 
                pattern={TEXT_WITH_SPACE}
                name="employer_name"  
                value={employer_name}
                onChange={handleChange}  
                id="employer_name" 
                className="form-control"
               />
          </div>

          <div className="form-group">
            <label htmlFor="employer_address">Employer address</label>
            <input type="text" className="form-control"
              value={employer_address}
              onChange={handleChange}  
              id="employer_address" name="employer_address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="state_origin"> State of origin</label>
            <select name="state_origin"  onChange={handleChange}   className="form-control" >
              <option selected value=''>--select--</option>
              {
                STATES.map((state, idx) => (
                  <option value={state} key={idx}> { `${ state }` } </option>
                ))
              }
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="nationality" > Nationality</label>
            <select name="nationality" className="form-control" onChange={handleChange} >
              <option selected value=''>--select--</option>
              {
                COUNTRIES.map((country, idx) => (
                  <option value={country} key={idx}> { `${ country }` } </option>
                ))
              }
            </select>
          </div>

          {
            currentMember.auth.includes("admin") && (
              <label htmlFor="proxy"> Proxy
                <input type="checkbox" name="proxy" defaultChecked={proxyState} onChange={() => setProxyState(!proxyState)} />
              </label>
            )
          }

          <button type="submit" className="btn btn-primary btn-sm"> 
            <span className="fa fa-check" /> 
            {
              personalDataRequest ? "processing...": "Update Personal Profile"
            }
          </button>
        </form>
      </section>
   
   );
}
 
PersonalDataForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  personalData: state.profiles.personalData,
  currentMember: state.auth.currentMember,
  personalDataRequest: state.profiles.personalDataRequest,
});
export default connect(mapStateToProps, { setAlert, createProfile })(PersonalDataForm);
