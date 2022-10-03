import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Chip, Grid } from '@mui/material';
import React from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import useSWR from 'swr';
import AdminLayout from '../../../components/layout/AdminLayout';
import { IOrder, IUser } from '../../../interfaces';

const columns :GridColDef[] = [
    { field: 'id', headerName: 'Orded ID', width: 250},
    { field: 'email', headerName: 'Correo', width: 250},
    { field: 'name', headerName: 'Nombre', width: 250},
    { field: 'total', headerName: 'Monto', width: 250},
    {
        field: 'isPaid',
        headerName:'Pagada',
        renderCell: ({row}: GridValueGetterParams) => {
            return row.isPaid
            ? ( <Chip variant='outlined' label='Pagada' color='success' /> )
            : ( <Chip variant='outlined' label='No pagada' color='error' /> )
        }
    },
    { field: 'noProducts', headerName: 'No.Prods', align:'center'},
    {
        field: 'check',
        headerName:'Ver orden',
        renderCell: ({row}: GridValueGetterParams) => {
            return (
                <a href={`/admin/orders/${row.id}`} target='_blank' rel='noreferrer'>
                    Ver orden
                </a>
            )
        }
    },
]

const OrderPage = () => {

    const { data, error } = useSWR<IOrder[]>('/api/admin/orders');
    if(!data && !error) return (<></>)

    const rows = data!.map( order => ({
        id: order._id,
        email: (order.user as IUser).email,
        name: (order.user as IUser).name,
        total: order.total,
        isPaid: order.isPaid,
        noProducts:  order.numberOfItems
    }));

  return (
    <AdminLayout
        title='Ordenes'
        subtitle='Ordenes'
        icon={ <ConfirmationNumberOutlined /> }
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

export default OrderPage