import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
// import moment from 'moment';
import PropTypes from "prop-types";
import AuthContainer from "../../components/AuthContainer";
import {
  getMembers,
  deleteMembers,
  toggleAdminRole,
  resetMemberData,
} from "../../_actions/memberActions";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Modal from "../../components/Modal";
import NewMemberForm from "../../components/NewMemberForm";
import EditMemberForm from "../../components/EditMemberForm";
import MembersUploadForm from "../../components/MembersUploadForm";

import { membersColumnData } from "../../TableColumns";
import Alert from "../../components/Alert";
import {
  ADD_NEW_MEMBER_SUCCESS,
  EDIT_MEMBER_SUCCESS,
  DELETE_MEMBER_SUCCESS,
  DELETE_MEMBER_FAIL,
  MEMBERS_UPLOAD_SUCCESS,
  TOGGLE_ADMIN_SUCCESS,
  TOGGLE_ADMIN_FAIL,
} from "../../_actions/types";
import "react-data-table-component-extensions/dist/index.css";
import Spinner from "../../components/Spinner";

const Members = ({
  membersRequest,
  deleteMemberRequest,
  toggleAdminRequest,
  editMemberRequest,
  removedMember,
  members,
  roleStatus,
  updatedMember,
  membersUpload,
  newMember,
  deleteMembers,
  toggleAdminRole,
  getMembers,
  resetMemberData,
}) => {
  const [newMemberState, setNewMemberState] = useState(false);
  const [membersUploadState, setMembersUploadState] = useState(false);
  const [editMemberState, setEditMemberState] = useState(false);
  const [selection, setSelection] = useState({});
  const [toggledClearRows, setToggledClearRows] = useState(false);

  const getColumnData = () => membersColumnData;
  const columns = useMemo(getColumnData, []);

  useEffect(getMembers, [
    newMember,
    getMembers,
    updatedMember,
    removedMember,
    membersUpload,
    roleStatus,
  ]);

  const dismissAndResetData = () => {
    setNewMemberState(false);
    setEditMemberState(false);
    setMembersUploadState(false);
    resetMemberData();
  };

  const closeModalBox = () => {
    if (newMember !== null || updatedMember !== null || membersUpload !== null)
      dismissAndResetData();
  };

  const _closeModalBox = () => closeModalBox();
  useEffect(_closeModalBox, [
    newMember,
    updatedMember,
    _closeModalBox,
    membersUpload,
  ]);
  const clearRowSelection = () => {
    if (
      deleteMemberRequest === false ||
      editMemberRequest === false ||
      toggleAdminRequest === false
    )
      setToggledClearRows(!toggledClearRows);
  };
  const _clearRowSelection = () => clearRowSelection();
  useEffect(_clearRowSelection, [
    deleteMemberRequest,
    _clearRowSelection,
    editMemberRequest,
    toggleAdminRequest,
  ]);

  const handleDelete = (records) => {
    console.log("dispatch method to delete data, ", records);
    if (window.confirm(`You will delete ${records.length} members`)) {
      const deleteList = {
        members: records.map((r) => r.email),
      };
      deleteMembers(deleteList);
    }
  };
  const handleRoleUpdate = (records) => {
    console.log("dispatch method to update auth data, ", records);
    const authList = {
      members: records.map((r) => ({ email: r.email, auth: r.auth })),
    };
    toggleAdminRole(authList);
  };
  // ------------------------
  const DeleteMembersButton = ({ selection }) => (
    <span
      className="context-action"
      onClick={() => handleDelete(selection.selectedRows)}
    >
      {" "}
      <span className="fas fa-user-minus" />
      Delete
    </span>
  );
  const ManageAuthButton = ({ selection }) => {
    return (
      <span
        className="context-action"
        onClick={() => handleRoleUpdate(selection.selectedRows)}
      >
        {" "}
        <span className="fas fa-user-shield" />
        Update Role
      </span>
    );
  };
  const EditMemberButton = () => {
    return (
      <span className="context-action" onClick={() => setEditMemberState(true)}>
        <span className="fas fa-user-edit" /> Edit
      </span>
    );
  };

  const TableContextComponents = ({ selection, ...props }) => {
    console.log("Context Component", props);
    const tableOptions = {
      deleteButton: <DeleteMembersButton key={2} selection={selection} />,
      editButton: <EditMemberButton key={1} />,
      manageAuthButton: <ManageAuthButton key={3} selection={selection} />,
    };
    if (selection.selectedCount === 1) {
      // const selectedMemberData = selection.selectedRows[0];
      return [
        tableOptions.editButton,
        tableOptions.manageAuthButton,
        tableOptions.deleteButton,
      ];
    }
    return [tableOptions.deleteButton];
  };

  return (
    <AuthContainer>
      {newMemberState && (
        <Modal
          visible={newMemberState}
          dismiss={() => dismissAndResetData()}
          component={<NewMemberForm />}
        />
      )}
      {membersUploadState && (
        <Modal
          visible={membersUploadState}
          dismiss={() => dismissAndResetData()}
          component={<MembersUploadForm />}
        />
      )}
      {editMemberState && (
        <Modal
          visible={editMemberState}
          dismiss={() => dismissAndResetData()}
          component={<EditMemberForm memberData={selection.selectedRows[0]} />}
        />
      )}
      <div>
        <div className="context-box">
          <span
            className="context-action"
            onClick={() => setNewMemberState(true)}
          >
            {" "}
            <span className="fa fa-user-plus" /> Add Member{" "}
          </span>
          <span
            className="context-action"
            onClick={() => setMembersUploadState(true)}
          >
            {" "}
            <span className="fas fa-paperclip" /> Upload Members{" "}
          </span>
        </div>
        {deleteMemberRequest && <span className=""> Deleting members...</span>}
        {toggleAdminRequest && (
          <span className=""> Updating member role...</span>
        )}
        <Alert origin={ADD_NEW_MEMBER_SUCCESS} />
        <Alert origin={DELETE_MEMBER_FAIL} />
        <Alert origin={DELETE_MEMBER_SUCCESS} />
        <Alert origin={EDIT_MEMBER_SUCCESS} />
        <Alert origin={MEMBERS_UPLOAD_SUCCESS} />
        <Alert origin={TOGGLE_ADMIN_FAIL} />
        <Alert origin={TOGGLE_ADMIN_SUCCESS} />
        {members.length === 0 && membersRequest ? (
          <Spinner message={"Fetching members"} />
        ) : (
          <DataTableExtensions
            columns={columns}
            data={members}
            exportHeaders={true}
            filterPlaceholder={"Type your search..."}
          >
            <DataTable
              columns={columns}
              data={members}
              title={`FTC Members (${members.length})`}
              // noHeader
              contextMessage={{
                singular: "member",
                plural: "members",
                message: "selected",
              }}
              contextActions={<TableContextComponents selection={selection} />}
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

              // noDataComponent={"No member yet"}
            />
          </DataTableExtensions>
        )}
      </div>
      {/* <Footer /> */}
    </AuthContainer>
  );
};

Members.propTypes = {
  getMembers: PropTypes.func.isRequired,
  deleteMembers: PropTypes.func.isRequired,
  toggleAdminRole: PropTypes.func.isRequired,
  resetMemberData: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  membersRequest: state.members.membersRequest,
  editMemberRequest: state.members.editMemberRequest,
  // toggleAdminRequest: state.members.toggleAdminRequest,
  newMember: state.members.newMember,
  membersUpload: state.members.membersUpload,
  members: state.members.members,
  removedMember: state.members.removedMember,
  updatedMember: state.members.updatedMember,
  deleteMemberRequest: state.members.deleteMemberRequest,
  toggleAdminRequest: state.members.toggleAdminRequest,
  roleStatus: state.members.roleStatus,
});
export default connect(mapStateToProps, {
  getMembers,
  deleteMembers,
  toggleAdminRole,
  resetMemberData,
})(Members);
