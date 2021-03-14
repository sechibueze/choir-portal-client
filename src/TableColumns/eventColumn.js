import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
export const eventColumn = [
  {
    name: "...",
    selector: "_id",
    cell: (row) => (
      <Link to={`/event-details/${row._id}`} className="fa fa-eye" />
    ),
  },
  {
    name: "Name",
    selector: "name",
    sortable: true,
  },
  {
    name: "Date",
    selector: "event_date",
    cell: (row) => moment(row.event_date).format("DD-MM-YYYY"),
  },
  {
    name: "Attendance",
    selector: "attendance",
    cell: (row) => row.attendance.length,
  },
  {
    name: "Categoty",
    selector: "category",
    sortable: true,
  },
  {
    name: "Created",
    selector: "createdAt",
    cell: (row) => moment(row.createdAt).format("DD-MM-YYYY"),
  },
  {
    name: "Updated",
    selector: "updatedAt",
    cell: (row) => moment(row.updatedAt).format("DD-MM-YYYY"),
  },
];
