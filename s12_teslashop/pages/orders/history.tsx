import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React from 'react'
import ShopLayout from '../../components/layout/ShopLayout';
import NextLink from "next/link";
const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width:100},
    { field: 'fullname', headerName: 'Nombre', width:300},
    { 
        field: 'paid', 
        headerName: 'Pagado',
        width:200,
        renderCell: (params: GridValueGetterParams) => {
            return(
                params.row.paid
                ? <Chip color='success' label='Pagado' variant='outlined' />
                : <Chip color='error' label='No pagado' variant='outlined' />
            )
        }
    },
    { 
        field: 'orden', 
        headerName: 'Ver orden',
        width:200,
        renderCell: (params: GridValueGetterParams) => {
            return(
                <NextLink href={`/orders/${params.row.id}`} passHref>
                    <Link underline='always'>
                        Ver orden
                    </Link>
                </NextLink>
            )
        }
    },
];

const rows = [
    { id: 1, paid: true, fullname: 'Alex cirs'},
    { id: 2, paid: false, fullname: 'Alex cirs'},
    { id: 3, paid: true, fullname: 'Alex cirs'},
    { id: 4, paid: true, fullname: 'Alex cirs'},
]

const HistoryPage = () => {
  return (
    <ShopLayout title={''} pageDescription={''}>
        <>
            <Typography variant='h1'> Historial de ordenes</Typography>
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
        </>
    </ShopLayout>
  )
}

export default HistoryPage