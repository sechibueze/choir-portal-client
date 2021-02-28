import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
// import moment from 'moment';
import PropTypes from 'prop-types';
import AuthContainer from "../../components/AuthContainer";
import { getMembers, deleteMembers, toggleAdminRole, resetMemberData } from "../../_actions/memberActions";
import DataTable from "react-data-table-component";
import DataTableExtensions from 'react-data-table-component-extensions';
import Modal from '../../components/Modal';
import NewMemberForm from '../../components/NewMemberForm';
import EditMemberForm from '../../components/EditMemberForm';
import { columnData } from '../../constants';
import Alert from '../../components/Alert';
import { ADD_NEW_MEMBER_SUCCESS, EDIT_MEMBER_SUCCESS, DELETE_MEMBER_SUCCESS, DELETE_MEMBER_FAIL } from '../../_actions/types';
import 'react-data-table-component-extensions/dist/index.css';
import Spinner from '../../components/Spinner';


const Members = ({ membersRequest, deleteMemberRequest, removedMember, 
    toggleAdminRole, toggleAdminRequest, roleStatus, updatedMember,
    deleteMembers, members, newMember, getMembers, resetMemberData }) => {
    console.log('[Members] component',members)
    const [newMemberState, setNewMemberState] = useState(false)
    const [editMemberState, setEditMemberState] = useState(false)
    const [selection, setSelection] = useState({})
    
    const getColumnData = () => columnData;
    const columns = useMemo(getColumnData, []);
    useEffect(getMembers, [newMember, updatedMember, removedMember, roleStatus])

    const dismissAndResetData = () => {
        setNewMemberState(false);
        setEditMemberState(false);
        resetMemberData()
    }
    const closeModalBox = () => {if(newMember !== null || updatedMember !== null) dismissAndResetData()};
    useEffect(closeModalBox, [newMember, updatedMember])
    
    const handleDelete = (records) => {
        if (window.confirm(`You will delete ${records.length}`)) {
            console.log('dispatch method to delete data, ', records);
            const deleteList = {
                members: records.map(r => r.email)
            }

            deleteMembers(deleteList)
        }
    }
    // ------------------------

    
    
    const DeleteMembersButton = ({selection}) => <h5 onClick={() => handleDelete(selection.selectedRows)}>Delete</h5>
    // const EditMemberForm = ({ memberData }) => <h1> hello { memberData.firstname } </h1>
    const EditMemberButton = () => {

        return (
            <div onClick={() => setEditMemberState(true)}>
                Edit
            </div>
        )
    }
    // const ToggleAdminRole = () => {

    //     return (
    //         <div onClick={() => updateAdminRole()}>
    //             Change role
    //         </div>
    //     )
    // }
    const TableContextComponents = ({ selection, ...props}) => {
        console.log('Context Component', props)
        if (selection.selectedCount === 1) {
            // const selectedMemberData = selection.selectedRows[0];
            return [<EditMemberButton />, <DeleteMembersButton selection={selection} />]
        }
        return <DeleteMembersButton selection={selection}/>
    }
    
    return ( 
        <AuthContainer>

            {
                newMemberState && (
                    <Modal 
                        visible={newMemberState} 
                        dismiss={() => dismissAndResetData()}
                        component={<NewMemberForm />}
                    />
                )
            }
            {
                editMemberState && (
                    <Modal 
                        visible={editMemberState} 
                        dismiss={() => dismissAndResetData()}
                        component={<EditMemberForm memberData={selection.selectedRows[0]} />}
                    />
                )
            }
            <div>
                <div className="context-box">
                    <span className="context-action" onClick={() => setNewMemberState(true)}> <span className="fa fa-user-plus" /> Add Member </span>
                </div>
                {
                    deleteMemberRequest && <span className=""> Deleting members...</span>
                }
                {
                    toggleAdminRequest && <span className=""> Updating member role...</span>
                }
                <Alert origin={ADD_NEW_MEMBER_SUCCESS} />
                <Alert origin={DELETE_MEMBER_FAIL} />
                <Alert origin={DELETE_MEMBER_SUCCESS} />
                <Alert origin={EDIT_MEMBER_SUCCESS} />
                {
                    members.length === 0 && membersRequest 
                    ? (<Spinner message={"Fetching members"} /> ):
                    (
                        <DataTableExtensions
                            columns={columns}
                            data={members}
                            exportHeaders={true}
                            filterPlaceholder={"Type your search..."}
                        >
                            <DataTable
                                columns={columns}
                                data={members}
                                title={"FTC Members"}
                                // noHeader
                                contextMessage={{
                                    singular: "member",
                                    plural: "members",
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

                                // noDataComponent={"No member yet"}
                            />
                        </DataTableExtensions>

                    )
                }
            </div>
            {/* <Footer /> */}
        </AuthContainer>
     );
}

Members.propTypes = {
    getMembers: PropTypes.func.isRequired,
    deleteMembers: PropTypes.func.isRequired,
    toggleAdminRole: PropTypes.func.isRequired,
    resetMemberData: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    membersRequest: state.members.membersRequest,
    newMember: state.members.newMember,
    members: state.members.members,
    removedMember: state.members.removedMember,
    updatedMember: state.members.updatedMember,
    deleteMemberRequest: state.members.deleteMemberRequest,
    toggleAdminRequest: state.members.toggleAdminRequest,
    roleStatus: state.members.roleStatus,
})
export default connect(mapStateToProps, { getMembers, deleteMembers, toggleAdminRole, resetMemberData })(Members);