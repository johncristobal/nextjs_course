import { AttachMoneyOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, CategoryOutlined, CancelPresentationOutlined, ProductionQuantityLimitsOutlined, AccessTimeOutlined } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout';
import { Grid, Typography } from '@mui/material';
import { SummaryCard } from '../../components/admin/SummaryCard';
import useSWR from 'swr';
import { DashboardResponse } from '../../interfaces';

const DashboardPage = () => {

    const { data, error } = useSWR<DashboardResponse>('/api/admin/dashboard', {
        refreshInterval: 30 * 1000
    })

    const [refreshIn, setRefreshIn] = useState(30);
    useEffect(() => {
      
        const interval = setInterval( () => {
            setRefreshIn( refreshIn =>  refreshIn > 0 ? refreshIn - 1 : 30)
        }, 1000)
    
      return () => clearInterval(interval)
    }, [])
    

    if (!error && !data){
        return <></>
    }

    if (error){
        console.log(error);
        return <Typography> Error al cargar info</Typography>
    }

    const {
        numberOrders,
        paidOrders,
        numberClients,
        numberProducts,
        noInventory,
        lowInventory,
        noPaidOrders
    } = data!;

  return (
    <AdminLayout
        title='Dashboard'
        subtitle='Generales'
        icon={ <DashboardOutlined /> }
    >
        <Grid container spacing={2}>
            <SummaryCard 
                title={numberOrders} 
                subtitle={'Ordenes totales'} 
                icon={ <CreditCardOutlined color='secondary' sx={{ fontSize: 40 }} /> }            
            />

            <SummaryCard 
                title={paidOrders} 
                subtitle={'Ordenes pagadas'} 
                icon={ <AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} /> }            
            />

            <SummaryCard 
                title={noPaidOrders} 
                subtitle={'Ordenes pendientes'} 
                icon={ <CreditCardOutlined color='error' sx={{ fontSize: 40 }} /> }            
            />

            <SummaryCard 
                title={numberClients} 
                subtitle={'Clientes'} 
                icon={ <GroupOutlined color='primary' sx={{ fontSize: 40 }} /> }            
            />

            <SummaryCard 
                title={numberProducts} 
                subtitle={'Productos'} 
                icon={ <CategoryOutlined color='warning' sx={{ fontSize: 40 }} /> }            
            />

            <SummaryCard 
                title={noInventory} 
                subtitle={'Sin existencias'} 
                icon={ <CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} /> }            
            />

            <SummaryCard 
                title={lowInventory} 
                subtitle={'Bajo inventarios'} 
                icon={ <ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} /> }            
            />

            <SummaryCard 
                title={refreshIn} 
                subtitle={'Updating...'} 
                icon={ <AccessTimeOutlined color='primary' sx={{ fontSize: 40 }} /> }            
            />

        </Grid>

    </AdminLayout>
  )
}

export default DashboardPage