import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../../components/data-table/DataTable';
import './users.scss';
import { useState } from 'react';
import Add from '../../components/add/Add';
import { useQuery } from 'react-query';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
      field: 'img',
      headerName: 'Avatar',
      width: 100,
      renderCell: (params) => {
          return <img src={params.row.img || "/noavatar.png"} alt="" />
      }
  },
  {
    field: 'firstName',
    type: "string",
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    type: "string",
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    type: "string",
    headerName: 'Email',
    width: 300,
    editable: false,
  },
  {
    field: 'phone',
    type: "string",
    headerName: 'Phone',
    width: 150,
    editable: false,
  },
  {
    field: 'createdAt',
    type: "string",
    headerName: 'Created At',
    width: 150,
    editable: false,
  },
  {
      field: 'verified',
      headerName: 'Verified',
      width: 100,
      type: 'boolean',
  },
];


const Users = () => {
  const [open, setOpen] = useState(false);

  //Request Data from Server
  const { isLoading, data } = useQuery('repoData', () =>
    fetch('http://localhost:8000/api/users').then(res =>
      res.json()
    )
  )
  return (
    <div className='users'>
      <div className='info'>
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>
      {isLoading ? (
        " Loading..." 
      ): (
        <DataTable slug="users" columns={columns} rows={data} />
      )}
      {open && <Add slug="user" columns={columns} setOpen={setOpen}/>}
    </div>
  )
}

export default Users
