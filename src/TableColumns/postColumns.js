import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
export const postColumns = [
  {
    name: "...",
    selector: "_id",
    cell: (row) => (
      <Link to={`/post-details/${row._id}`} className="fa fa-eye" />
    ),
  },
  {
    name: "Title",
    selector: "title",
    sortable: true,
  },
  {
    name: "Owner",
    selector: "image",
    cell: (row) => (
      <img
        src={row.image}
        alt="Owner admin"
        style={{ width: "32px", height: "32px" }}
      />
    ),
  },
  {
    name: "Comments",
    selector: "comments",
    cell: (row) => row.comments.length,
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
