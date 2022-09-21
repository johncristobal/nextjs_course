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
                <NextLink href={`/orders/${params.row.orderId}`} passHref>
                    <Link underline='always'>
                        Ver orden
                    </Link>
                </NextLink>
            )
        }
    },
];

interface Props {
    orders: IOrder[]
}

const HistoryPage: NextPage<Props> = ( { orders } ) => {

    const rows = orders.map( (order, idx) => ({
        id: idx + 1,
        paid: order.isPaid,
        fullname: `${order.shippingAddress.firstName}`,
        orderId: order._id
    }))

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

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react';
import { getOrderByUser } from '../../database/dbOrders';
import { IOrder } from '../../interfaces/order';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session: any = await getSession({req});
    if(!session){
        return {
            redirect: {
                destination: '/auth/login?p=/orders/history',
                permanent: false
            }
        }
    }

    const orders = await getOrderByUser( session.user._id );

    return {
        props: {
            orders
        }
    }
}

export default HistoryPage
