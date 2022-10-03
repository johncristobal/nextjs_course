import { PeopleAltOutlined } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Grid, MenuItem, Select } from '@mui/material';
import useSWR from 'swr';
import { IUser } from '../../interfaces';
import tesloApi from '../../api/tesloApi';

const UsersPage = () => {

    const { data, error } = useSWR<IUser[]>('/api/admin/users');
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
      if(data){
        setUsers(data);
      }      
    }, [data])
    

    if(!data && !error) return (<></>)

    const onRolUpdated = async (userId: string, newRol: string) => {

        const updatedUsers = users.map( user => ({
            ...user,
            role: userId === user._id ? newRol : user.role
        }));

        setUsers(updatedUsers);

        try{

            await tesloApi.put('admin/users', { userId, role: newRol });
            
        }catch(error){
            console.log(error);
            alert('No se pudo actualizar')
        }
    }

    const columns : GridColDef[] = [
        { field: 'email', headerName: 'Correo', width: 250},
        { field: 'name', headerName: 'Nombre', width: 300},
        { 
            field: 'role', 
            headerName: 'Rol',
            width: 300,
            renderCell: ( {row}: GridValueGetterParams) => {
                return (
                    <Select
                        value={ row.role }
                        label='Rol'
                        onChange={( { target }) => onRolUpdated( row.id, target.value) }
                        sx={{ width: '300px'}}
                    >
                        <MenuItem value='admin'> Admin </MenuItem>
                        <MenuItem value='client'> Client </MenuItem>
                    </Select>
                )
            }
        },
    ];

    const rows = users.map( user => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
    }));

  return (
    <AdminLayout
        title='Usuarios'
        subtitle='Usuarios'
        icon={ <PeopleAltOutlined />}
    >

        <Grid container> 
            <Grid item xs={12} sx={{height:650, width:'100%'}}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    pageSize={10}
                    rowsPerPageOptions={ [10] }                        
                />
            </Grid>

        </Grid>

    </AdminLayout>
  )
}

export default UsersPage;