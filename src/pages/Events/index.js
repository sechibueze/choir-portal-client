import React, { useState, Fragment, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";

// import moment from 'moment';
import AuthContainer from "../../components/AuthContainer";
import { getEvents, deleteEvents } from "../../_actions/eventsActions";
import { setAlert } from "../../_actions/alertActions";
import Modal from "../../components/Modal";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";
import AddEventForm from "../../components/AddEventForm";
import AttendanceUploadForm from "../../components/AttendanceUploadForm";

import { eventColumn } from "../../TableColumns";

import "./Events.scss";
import { GET_EVENTS_FAIL, GET_EVENTS_SUCCESS } from "../../_actions/types";

const Events = ({
  events,
  eventsRequest,
  getEvents,
  deleteEvents,
  noEventData,
  newEvent,
  noEventDataRequest,
  newAttendance,
  newAttendanceRequest,
  match,
}) => {
  const columns = useMemo(() => eventColumn, []);
  const [selection, setSelection] = useState({});
  const [toggledClearRows, setToggledClearRows] = useState(false);
  const [newEventModal, setNewEventModal] = useState(false);
  const [newAttendanceModal, setNewAttendanceModal] = useState(false);
  useEffect(getEvents, [newEvent, getEvents, noEventData, newAttendance]);
  const clearRowSelection = () => {
    if (!noEventDataRequest) setToggledClearRows(!toggledClearRows);
  };
  useEffect(clearRowSelection, [noEventDataRequest, clearRowSelection]);

  const dismiss = () => {
    setNewEventModal(false);
    setNewAttendanceModal(false);
  };
  const dismissEffect = () => {
    if (newEvent || newAttendanceRequest) dismiss();
  };
  useEffect(dismissEffect, [newEvent, newAttendanceRequest]);

  const handleDelete = (records) => {
    console.log("dispatch method to delete data, ", records);
    if (window.confirm(`You will delete ${records.length} events`)) {
      const deleteList = {
        events: records.map((r) => r._id),
      };
      deleteEvents(deleteList);
    }
  };

  const DeleteEventButton = ({ selection }) => (
    <span
      className="context-action"
      onClick={() => handleDelete(selection.selectedRows)}
    >
      {" "}
      <span className="fas fa-user-minus" />
      Delete
    </span>
  );

  const UploadAttendanceButton = () => {
    return (
      <span
        className="context-action"
        onClick={() => setNewAttendanceModal(true)}
      >
        <span className="fas fa-user-edit" /> Upload Att
      </span>
    );
  };
  const TableContextComponents = ({ selection, ...props }) => {
    const tableOptions = {
      deleteButton: <DeleteEventButton key={2} selection={selection} />,
      uploadButton: <UploadAttendanceButton key={1} />,
    };
    if (selection.selectedCount === 1) {
      // const selectedMemberData = selection.selectedRows[0];
      return [tableOptions.uploadButton, tableOptions.deleteButton];
    }
    return [tableOptions.deleteButton];
  };
  return (
    <Fragment>
      <AuthContainer>
        <div className="context-box">
          <span
            className="context-action"
            onClick={() => setNewEventModal(true)}
          >
            {" "}
            <span className="fa fa-user-plus" /> Add Event{" "}
          </span>
          {/* <span className="context-action" onClick={() => setMembersUploadState(true)}> <span className="fas fa-paperclip" /> Upload Members </span> */}
        </div>
        <Alert origin={GET_EVENTS_FAIL} />
        <Alert origin={GET_EVENTS_SUCCESS} />

        {newEventModal && (
          <Modal
            visible={newEventModal}
            dismiss={() => dismiss()}
            component={<AddEventForm />}
          />
        )}
        {newAttendanceModal && (
          <Modal
            visible={newAttendanceModal}
            dismiss={() => dismiss()}
            component={
              <AttendanceUploadForm event={selection.selectedRows[0]} />
            }
          />
        )}

        {/* EVENTS TABLE*/}
        {events.length === 0 && eventsRequest ? (
          <Spinner message={"Fetching events..."} />
        ) : (
          <DataTableExtensions
            columns={columns}
            data={events}
            exportHeaders={true}
            filterPlaceholder={"Type your search..."}
          >
            <DataTable
              columns={columns}
              data={events}
              title={`FTC events (${events.length})`}
              // noHeader
              contextMessage={{
                singular: "event",
                plural: "events",
                message: "selected",
              }}
              contextActions={<TableContextComponents selection={selection} />}
              // contextComponent={true}
              striped={true}
              highlightOnHover={true}
              defaultSortField="name"
              defaultSortAsc={false}
              pagination
              selectableRows={true}
              selectableRowsHighlight={true}
              onSelectedRowsChange={setSelection}
              clearSelectedRows={toggledClearRows}
              noDataComponent={"No event yet"}
            />
          </DataTableExtensions>
        )}
      </AuthContainer>
    </Fragment>
  );
};

Events.propTypes = {
  getEvents: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  currentMember: state.auth.currentMember,
  events: state.events.events,
  newEvent: state.events.newEvent,
  noEventData: state.events.noEventData,
  noEventDataRequest: state.events.noEventDataRequest,
  newAttendance: state.events.newAttendance,
  newAttendanceRequest: state.events.newAttendanceRequest,
});
export default connect(mapStateToProps, {
  setAlert,
  getEvents,
  deleteEvents,
})(Events);
