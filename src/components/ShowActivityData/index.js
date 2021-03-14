import React from "react";

import DataTable from "react-data-table-component";
import { eventColumn } from "../../TableColumns/eventColumn";
const ShowActivityData = ({ activity }) => {
  const columns = eventColumn.filter(
    (col) => col.name !== "..." && col.name !== "Attendance"
  );
  return (
    <DataTable
      columns={columns}
      data={activity}
      title={`FTC activity (${activity.length})`}
      // noHeader
      contextMessage={{
        singular: "event",
        plural: "events",
        message: "selected",
      }}
      // contextActions={<TableContextComponents selection={selection} />}
      // contextComponent={true}
      striped={true}
      highlightOnHover={true}
      defaultSortField="name"
      defaultSortAsc={false}
      pagination
      selectableRows={false}
      selectableRowsHighlight={true}
      // onSelectedRowsChange={setSelection}
      // clearSelectedRows={toggledClearRows}
      noDataComponent={"No event yet"}
    />
  );
};

export default ShowActivityData;
