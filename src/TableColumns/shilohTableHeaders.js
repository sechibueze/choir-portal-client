// import { Link } from "react-router-dom";
export const shilohTableHeaders = [
  // {
  //   name: "...",
  //   selector: "_id",
  //   cell: (row) => <Link to={`/profile/${row._id}`} className="fa fa-eye" />,
  // },
  {
    name: "access",
    selector: "access",
    sortable: true,
  },
  {
    name: "OTP",
    selector: "otp",
    sortable: true,
  },
  {
    name: "accomodation",
    selector: "accomodation",
    sortable: true,
  },
  {
    name: "availability",
    selector: "availability",
    cell: (row) => <span> {row.availability.join()} </span>,
  },
];
