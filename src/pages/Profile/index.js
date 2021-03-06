import React, { useState, Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
// import moment from 'moment';
import PropTypes from 'prop-types';
import AuthContainer from "../../components/AuthContainer";
import { meProfile, resetProfileData } from "../../_actions/profileActions";
import { setAlert } from "../../_actions/alertActions";
import Modal from '../../components/Modal';
import PersonalDataForm from '../../components/PersonalDataForm';
import NOKDataForm from '../../components/NOKDataForm';
import UnitDataForm from '../../components/UnitDataForm';
import ChurchDataForm from '../../components/ChurchDataForm';
import ShowPersonalData from '../../components/ShowPersonalData';
import ShowNOKData from '../../components/ShowNOKData';
import ShowChurchData from '../../components/ShowChurchData';
import ShowUnitData from '../../components/ShowUnitData';
import ShowAccessData from '../../components/ShowAccessData';
import ShowMemberImage from '../../components/ShowMemberImage';

import AddProfileImage from "../../components/AddProfileImage";
import Alert from '../../components/Alert';
// import Spinner from '../../components/Spinner';
import "./Profile.scss";
import { PERSONAL_DATA_SUCCESS, NOK_DATA_SUCCESS, CHURCH_DATA_SUCCESS, UNIT_DATA_SUCCESS, MEMBER_IMAGE_SUCCESS } from '../../_actions/types';

const Profile = ({
  meProfile,
  meProfileDataRequest,
  meProfileData,
  
  resetProfileData,

  personalData,
  nokData,
  churchData,
  unitData,
  currentMember,
  memberImageData,
  match,
}) => {

  const [personalDataVisibility, setPersonalDataVisibility] = useState(false);
  const [nokDataVisibility, setNOKDataVisibility] = useState(false);
  const [churchDataVisibility, setChurchDatahVisibility] = useState(false);
  const [unitDatakVisibility, setUnitDataVisibility] = useState(false);
  const [imageModalStatus, setImageModalStatus] = useState(false)

  const _meProfile = () => {
    if (currentMember.auth.includes("admin") && match.params._id) {
      meProfile(match.params._id)
    }else{
      meProfile()
    }
  }
  useEffect(_meProfile, [personalData, nokData, churchData, unitData, memberImageData]);

  const dismiss = () => {
    setPersonalDataVisibility(false)
    setNOKDataVisibility(false)
    setChurchDatahVisibility(false)
    setUnitDataVisibility(false)
    setImageModalStatus(false)
    resetProfileData()
  }
  const dismissFunction = () =>{if(nokData || personalData || churchData || unitData || memberImageData) dismiss()}
  useEffect(dismissFunction, [personalData,nokData,churchData, unitData, memberImageData ]);
  const StartProfileButton = () => {
    return(
      <span className="data-cta">
        <span className="btn btn-primary" onClick={() => setPersonalDataVisibility(true)}> { meProfileData ? "Edit Personal Data" : "Create Profile"} </span>
      </span>
    )
  }
  const NoData = () => <div className="no-data-component">  <span> No profile yet...</span> <StartProfileButton />  </div>
  return ( 
    <Fragment>
      <AuthContainer>
          {
            imageModalStatus && (
              <Modal
                visible={imageModalStatus}
                dismiss={() => dismiss()}
                component={<AddProfileImage />}
              />
            )
          }
          <span onClick={() => setImageModalStatus(true)}>open</span>
        
          {
                meProfileDataRequest && !meProfileData ? "processing..." : 
                    !meProfileDataRequest && !meProfileData ? "" : (
                        meProfileData && <ShowMemberImage imageUrl={meProfileData.member.imageUrl} />
                    )
                    
            }
        <Alert origin={MEMBER_IMAGE_SUCCESS} />
        {/* ACCESS DATA */}
          <div className="data-box">
            
            {
                meProfileDataRequest && !meProfileData ? "processing..." : 
                    !meProfileDataRequest && !meProfileData ? "" : (
                        meProfileData && <ShowAccessData member={meProfileData.member} />
                    )
                    
            }
          </div>
        {/* PERSONAL DATA */}
          <div className="data-box">
          < Alert origin={PERSONAL_DATA_SUCCESS} />
            {
                personalDataVisibility && (
                    <Modal
                        visible={personalDataVisibility}
                        dismiss={() => dismiss()}
                        component={<PersonalDataForm  />}

                    />
                )
            }
            {
                meProfileDataRequest && !meProfileData ? "processing..." : 
                    !meProfileDataRequest && !meProfileData ? <NoData /> : (
                        meProfileData && <ShowPersonalData personalData={meProfileData} />
                    )
                    
            }
            {
              meProfileData && <StartProfileButton />
            }
          </div>
        {/* NOK DATA */}
          <div className="data-box">
          < Alert origin={NOK_DATA_SUCCESS} />
            {
                nokDataVisibility && (
                    <Modal
                        visible={nokDataVisibility}
                        dismiss={() => dismiss()}
                        component={<NOKDataForm nok={meProfileData.nok} _id={match.params._id}/>}

                    />
                )
            }
            {
                meProfileDataRequest && !meProfileData ? "processing..." : 
                    !meProfileDataRequest && !meProfileData ? "" : (
                        meProfileData && <ShowNOKData nok={meProfileData.nok} />
                    )
                    
            }
            { meProfileData && (
              <span className="data-cta">
                <span className="btn btn-primary" onClick={() => setNOKDataVisibility(true)}> Edit NOK Data</span>
              </span>
            )}
          </div>
        {/* CHURCH DATA */}
          <div className="data-box">
          < Alert origin={CHURCH_DATA_SUCCESS} />
            {
                churchDataVisibility && (
                    <Modal
                        visible={churchDataVisibility}
                        dismiss={() => dismiss()}
                        component={<ChurchDataForm churchData={meProfileData.church_info}  _id={match.params._id} />}

                    />
                )
            }
            {
                meProfileDataRequest && !meProfileData ? "processing..." : 
                    !meProfileDataRequest && !meProfileData ? "" : (
                        meProfileData && <ShowChurchData churchData={meProfileData.church_info} />
                    )
                    
            }
            {
              meProfileData && (
                <span className="data-cta">
                  <span className="btn btn-primary" onClick={() => setChurchDatahVisibility(true)}> Edit Church Data</span>
                </span>
              )
            }
          </div>
        {/* UNIT DATA */}
          <div className="data-box">
          < Alert origin={UNIT_DATA_SUCCESS} />
            {
                unitDatakVisibility && (
                    <Modal
                        visible={unitDatakVisibility}
                        dismiss={() => dismiss()}
                        component={<UnitDataForm unitData={meProfileData.unit_info}  _id={match.params._id}/>}

                    />
                )
            }
            {
                meProfileDataRequest && !meProfileData ? "processing..." : 
                    !meProfileDataRequest && !meProfileData ? "" : (
                        meProfileData && <ShowUnitData unitData={meProfileData.unit_info} />
                    )
                    
            }
            {
              meProfileData && (
                <span className="data-cta">
                  <span className="btn btn-primary" onClick={() => setUnitDataVisibility(true)}> Edit Unit Data</span>
                </span>
              )
            }
          </div>
       
        
      </AuthContainer>
    </Fragment>
   );
}
 
Profile.propTypes = {
  meProfile: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  resetProfileData: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  meProfileDataRequest: state.profiles.meProfileDataRequest,
  meProfileData: state.profiles.meProfileData,
  personalData: state.profiles.personalData,
  nokData: state.profiles.nokData,
  churchData: state.profiles.churchData,
  unitData: state.profiles.unitData,
  memberImageData: state.members.memberImageData,
  currentMember: state.auth.currentMember,
  
});
export default connect(mapStateToProps, { setAlert, meProfile, resetProfileData })(Profile);

