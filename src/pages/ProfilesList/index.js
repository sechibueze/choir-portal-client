import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
// import moment from 'moment';
import PropTypes from 'prop-types';
import AuthContainer from "../../components/AuthContainer";
import { getProfiles, deleteProfiles, resetProfileData } from "../../_actions/profileActions";
import DataTable from "react-data-table-component";
import DataTableExtensions from 'react-data-table-component-extensions';


import { profilesColumnFields } from '../../TableColumns';
import Alert from '../../components/Alert';
import { DELETE_PROFILES_FAIL, DELETE_PROFILES_SUCCESS, GET_PROFILES_SUCCESS } from '../../_actions/types';
import 'react-data-table-component-extensions/dist/index.css';
import Spinner from '../../components/Spinner';


const ProfilesList = ({ 
      getProfiles,
      deleteProfiles,
      profiles,
      profilesRequest,
      noProfileData,
      noProfileDataRequest,
}) => {
    
    
    const [selection, setSelection] = useState({})
    const [toggledClearRows, setToggledClearRows] = useState(false)
    
    const getColumnData = () => profilesColumnFields;
    const columns = useMemo(getColumnData, []);

    useEffect(getProfiles, [noProfileData])

    // const dismissAndResetData = () => {
    //     setNewMemberState(false);
    //     setEditMemberState(false);
    //     setMembersUploadState(false);
    //     resetMemberData()
    // }

    // const closeModalBox = () => {if(newMember !== null || updatedMember !== null || membersUpload !== null) dismissAndResetData()};
    // useEffect(closeModalBox, [newMember, updatedMember, membersUpload]);
    const clearRowSelection = () => {
        if(!noProfileDataRequest) setToggledClearRows(!toggledClearRows)
    }
    useEffect( clearRowSelection, [noProfileDataRequest]);
    
    const handleDelete = (records) => {
        console.log('dispatch method to delete data, ', records);
        if (window.confirm(`You will delete ${records.length} profiles`)) {
            const deleteList = {
                profiles: records.map(r => r._id)
            }
            deleteProfiles(deleteList)
        }
    }
    // const handleRoleUpdate = (records) => {
    //     console.log('dispatch method to update auth data, ', records);
    //     const authList = { members: records.map(r => ({ email: r.email, auth: r.auth})) }
    //     toggleAdminRole(authList);
    // }
    // // ------------------------
    const DeleteProfileButton = ({selection}) => <span className="context-action" onClick={() => handleDelete(selection.selectedRows)}> <span className="fas fa-user-minus"/>Delete</span>
    
    const EditProfileButton = () => {
        return (
            <span className="context-action" onClick={() => {}}>
               <span className="fas fa-user-edit" /> Edit
            </span>
        )
    }
    
    const TableContextComponents = ({ selection, ...props}) => {
        const tableOptions = {
            deleteButton: <DeleteProfileButton key={2} selection={selection} />,
            editButton: <EditProfileButton key={1} />,
        }
        if (selection.selectedCount === 1) {
            // const selectedMemberData = selection.selectedRows[0];
            return [tableOptions.editButton, tableOptions.deleteButton, ]
        }
        return [tableOptions.deleteButton]
    }
    
    return ( 
        <AuthContainer>
            <div>
                <div className="context-box">
                    {/* <span className="context-action" onClick={() => setNewMemberState(true)}> <span className="fa fa-user-plus" /> Add Member </span>
                    <span className="context-action" onClick={() => setMembersUploadState(true)}> <span className="fas fa-paperclip" /> Upload Members </span> */}
                </div>
                {
                    noProfileDataRequest && <span> Deleting profiles...</span>
                }
               
                <Alert origin={GET_PROFILES_SUCCESS} />
                <Alert origin={DELETE_PROFILES_FAIL} />
                <Alert origin={DELETE_PROFILES_SUCCESS} />
            
                {
                    profiles.length === 0 && profilesRequest 
                    ? (<Spinner message={"Fetching members"} /> ):
                    (
                        <DataTableExtensions
                            columns={columns}
                            data={profiles}
                            exportHeaders={true}
                            filterPlaceholder={"Type your search..."}
                        >
                            <DataTable
                                columns={columns}
                                data={profiles}
                                title={`FTC profiles (${profiles.length})`}
                                // noHeader
                                contextMessage={{
                                    singular: "profile",
                                    plural: "profiles",
                                    message: "selected"
                                }}
                                contextActions={<TableContextComponents selection={selection}/>}
                                // contextComponent={true}
                                striped={true}
                                highlightOnHover={true}
                                defaultSortField="firstname"
                                defaultSortAsc={false}
                                pagination
                                selectableRows={true}
                                selectableRowsHighlight={true}
                                onSelectedRowsChange={setSelection}
                                clearSelectedRows={toggledClearRows}

                                noDataComponent={"No member yet"}
                            />
                        </DataTableExtensions>

                    )
                }
            </div>
        </AuthContainer>
     );
}

ProfilesList.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    resetProfileData: PropTypes.func.isRequired,
    deleteProfiles: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    profilesRequest: state.profiles.profilesRequest,
    profiles: state.profiles.profiles,
    noProfileDataRequest: state.profiles.noProfileDataRequest,
    noProfileData: state.profiles.noProfileData,
})
export default connect(mapStateToProps, { getProfiles, deleteProfiles, resetProfileData })(ProfilesList);