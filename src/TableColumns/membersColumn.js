
export const membersColumnData = [
        
	// {
	//     cell: () => <button raised primary onClick={handleDelete}>Del</button>,
	//     ignoreRowClick: true,
	//     allowOverflow: true,
	//     button: true,
	// },
	{
		name: "AccessID",
		selector: "access",
		sortable: true
	},
	{
		name: "Firstname",
		selector: "firstname",
		sortable: true
	},
	{
		name: "Lastname",
		selector: "lastname",
		sortable: true
	},
	{
		name: "Email",
		selector: "email",
		sortable: true
	},
	{
		name: "Phone",
		selector: "phone",
		sortable: true
	},
	{
		name: "Status",
		selector: "status",
		sortable: true
	},
	{
		name: "Levels",
		selector: "auth",
		sortable: true,
		cell: d =>  d.auth.join(", "),
		// cellExport: row => <span>{ row.join(", ")}</span> ,
	},
	{
		name: "Created",
		selector: "createdAt",
		sortable: true,
		cell: row =>  row.createdAt 
		
	},
	{
		name: "Updated",
		selector: "updatedAt",
		sortable: true,
		cell: row =>  row.updatedAt
	},
]