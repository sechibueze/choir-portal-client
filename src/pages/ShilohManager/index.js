import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AuthContainer from "../../components/AuthContainer";
import {
  getShilohRegistration,
  removeShilohRegistration,
} from "../../_actions/shilohActions";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";

import { shilohTableHeaders } from "../../TableColumns";
import Alert from "../../components/Alert";
import {
  DELETE_SHILOH_FAIL,
  DELETE_SHILOH_SUCCESS,
} from "../../_actions/types";
import "react-data-table-component-extensions/dist/index.css";
import Spinner from "../../components/Spinner";

const ShilohManager = ({
  getShilohRegistration,
  removeShilohRegistration,
  shilohList,
  shilohListRequest,
  deleteShilohDataRequest,
  shilohDataDelta,
}) => {
  const [selection, setSelection] = useState({});
  const [toggledClearRows, setToggledClearRows] = useState(false);

  const getColumnData = () => shilohTableHeaders;
  const columns = useMemo(getColumnData, []);

  useEffect(getShilohRegistration, [shilohDataDelta, getShilohRegistration]);

  const clearRowSelection = () => {
    if (!deleteShilohDataRequest) setToggledClearRows(!toggledClearRows);
  };
  useEffect(clearRowSelection, [deleteShilohDataRequest, clearRowSelection]);

  const handleDelete = (records) => {
    if (window.confirm(`You will delete ${records.length} attendees`)) {
      const deleteList = {
        registrations: records.map((r) => r.access),
      };
      removeShilohRegistration(deleteList);
    }
  };

  const DeleteProfileButton = ({ selection }) => (
    <span
      className="context-action"
      onClick={() => handleDelete(selection.selectedRows)}
    >
      <span className="fas fa-user-minus" />
      Delete
    </span>
  );

  const TableContextComponents = ({ selection, ...props }) => {
    const tableOptions = {
      deleteButton: <DeleteProfileButton key={2} selection={selection} />,
    };
    if (selection.selectedCount === 1) {
      // const selectedMemberData = selection.selectedRows[0];
      return [tableOptions.deleteButton];
    }
    return [tableOptions.deleteButton];
  };

  return (
    <AuthContainer>
      <div>
        <div className="context-box">
          {/* <span className="context-action" onClick={() => setNewMemberState(true)}> <span className="fa fa-user-plus" /> Add Member </span>
                    <span className="context-action" onClick={() => setMembersUploadState(true)}> <span className="fas fa-paperclip" /> Upload Members </span> */}
        </div>
        {deleteShilohDataRequest && (
          <span> Deleting shiloh registration...</span>
        )}

        <Alert origin={DELETE_SHILOH_FAIL} />
        <Alert origin={DELETE_SHILOH_SUCCESS} />

        {shilohList.length === 0 && shilohListRequest ? (
          <Spinner message={"Fetching list"} />
        ) : (
          <DataTableExtensions
            columns={columns}
            data={shilohList}
            exportHeaders={true}
            filterPlaceholder={"Type your search..."}
          >
            <DataTable
              columns={columns}
              data={shilohList}
              title={`FTC list (${shilohList.length})`}
              // noHeader
              contextMessage={{
                singular: "attendee",
                plural: "attendees",
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
              noDataComponent={"No shiloh yet"}
            />
          </DataTableExtensions>
        )}
      </div>
    </AuthContainer>
  );
};

ShilohManager.propTypes = {
  getShilohRegistration: PropTypes.func.isRequired,
  removeShilohRegistration: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  shilohList: state.shiloh.shilohList,
  shilohListRequest: state.shiloh.shilohListRequest,
  shilohDataDelta: state.shiloh.shilohDataDelta,
  deleteShilohDataRequest: state.shiloh.deleteShilohDataRequest,
});
export default connect(mapStateToProps, {
  getShilohRegistration,
  removeShilohRegistration,
})(ShilohManager);
