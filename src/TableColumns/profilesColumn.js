import React from 'react';
import { Link } from "react-router-dom";

export const profilesColumnFields = [
    {
        name: "...",
        selector: "_id",
        cell: row => <Link to={`/profile/${row._id}`} className="fa fa-eye" />
    },
    {
        name: "Title",
        selector: "title",
        sortable: true,
    },
    {
        name: "Firstname",
        selector: "member",
        cell: row =>  row.member.firstname,
    },
    {
        name: "Lastname",
        selector: "member",
        cell: row => row.member.lastname,
    },
    {
        name: "Middlename",
        selector: "member",
        cell: row => row.member.middlename,
    },
    {
        name: "Email",
        selector: "member",
        cell: row => row.member.email,
    },
    {
        name: "Access Id",
        selector: "member",
        cell: row => row.member.access,
    },
    {
        name: "Group",
        selector: "group",
        sortable: true,
    },
    {
        name: "Contact address",
        selector: "contact_address",
        sortable: true,
    },
    {
        name: "DOB",
        selector: "dob",
        sortable: true,
    },
    {
        name: "Employer name",
        selector: "employer_name",
        sortable: true,
    },
    {
        name: "Employer address",
        selector: "employer_address",
        sortable: true,
    },
    {
        name: "Gender",
        selector: "gender",
        sortable: true,
    },
    {
        name: "Marital status",
        selector: "marital_status",
        sortable: true,
    },
    {
        name: "Nationality",
        selector: "nationality",
        sortable: true,
    },
    {
        name: "PHA",
        selector: "pha",
        sortable: true,
    },
    {
        name: "Phone",
        selector: "phone",
        sortable: true,
    },
    {
        name: "Professiona",
        selector: "profession",
        sortable: true,
    },
    {
        name: "State origin",
        selector: "state_origin",
        sortable: true,
    },
    {
        name: "State origin",
        selector: "state_origin",
        sortable: true,
    },
    {
        name: "State origin",
        selector: "state_origin",
        sortable: true,
    },
    {
        name: "Work status",
        selector: "work_status",
        sortable: true,
    },
    {
        name: "State origin",
        selector: "wed_data",
        sortable: true,
    },
    {
        name: "Whatsap",
        selector: "whatsapp_phone",
        sortable: true,
    },
    {
        name: "NOK name",
        selector: "nok",
        cell: row => row.nok.nok_name,
    },
    {
        name: "NOK emal",
        selector: "nok",
        cell: row => row.nok.nok_email,
    },
    {
        name: "NOK cooupation",
        selector: "nok",
        cell: row => row.nok.nok_occupation,
    },
    
    {
        name: "Creadted",
        selector: "createdAt",
        sortable: true,
    },
    {
        name: "Update",
        selector: "updatedAt",
        sortable: true,
    },
]