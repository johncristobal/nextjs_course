import { Box, Button, Card, CardContent, Chip, CircularProgress, Divider, Grid, Link, Typography } from '@mui/material'
import React, { useState } from 'react'
import { CartList, OrdenSummary } from '../../components/cart'
import ShopLayout from '../../components/layout/ShopLayout'
import NextLink from "next/link";
import { CreditCardOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { PayPalButtons } from "@paypal/react-paypal-js";

interface Props{ 
    order: IOrder;
}

export type OrderResponseBody = {
    id: string;
    status:
        | "COMPLETED"
        | "SAVED"
        | "APPROVED"
        | "VOIDED"
        | "COMPLETED"
        | "PAYER_ACTION_REQUIRED";
};


const OrderPage: NextPage<Props> = ( {order} ) => {

    const router = useRouter();
    const { shippingAddress } = order;
    const [isPaying, setisPaying] = useState(false);

    const onOrderCompleted = async (details: OrderResponseBody) => {
        if( details.status !== 'COMPLETED'){
            return alert('No pago paypal')
        }
        setisPaying(true);

        try{
            const { data } = await tesloApi.post('/orders/pay',{
                transactionId: details.id,
                orderId: order._id
            })

            router.reload();

        }catch(error){
            setisPaying(false);
            console.log(error);
            alert('Error')
        }
    }

  return (
   <ShopLayout title={'Resumen de la orden'} pageDescription={'Carrito de compras tienda'}>
    <>
        <Typography variant='h1' component='h1'>
            Orden: { order._id }
        </Typography>

        {
            !order.isPaid
            ? (
                <Chip
                    sx={{my:2}}
                    label='Pendiente de pago'
                    variant='outlined'
                    color='error'
                    icon={ <CreditCardOutlined /> }
                />
            )
            : (
                <Chip
                    sx={{my:2}}
                    label='Pagado'
                    variant='outlined'
                    color='success'
                    
                    icon={ <CreditScoreOutlined /> }
                />
            )
        }

        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList editable={false} products={ order.orderItems } />
            </Grid>
            <Grid item xs={12} sm={5}>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen ({ order.numberOfItems} {order.numberOfItems > 1 ? 'productos':'producto'})</Typography>
                        <Divider sx={{my:1}} />

                        <Box display={'flex'} justifyContent='space-between'>
                        <Typography variant='subtitle1'> Dirrecion de entrega</Typography>
                        </Box>
                        {/* <Box display={'flex'} justifyContent='end'>
                            <NextLink href={'/checkout/address'} passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box> */}
                        
                        <Typography> { shippingAddress.firstName } { shippingAddress.lastName }</Typography>
                        <Typography> { shippingAddress.address } </Typography>
                        <Typography> { shippingAddress.city } </Typography>
                        <Typography> { shippingAddress.zip } </Typography>
                        <Typography> { shippingAddress.country } </Typography>
                        <Typography> { shippingAddress.phone } </Typography>

                        <Divider sx={{my:1}} />

                        <OrdenSummary orderValues={{
                            items: order.numberOfItems,
                            subtotal: order.subTotal,
                            total: order.total,
                            tax: order.tax
                         }} 
                        />

                        <Box sx={{mt:3}} display='flex' flexDirection={'column'}>
                           
                            <Box 
                                display={'flex'}
                                justifyContent='center' 
                                className='fadeIn'
                                sx={{display:isPaying ? 'flex' : 'none'}}
                            >
                                <CircularProgress />
                            </Box>

                            <Box flexDirection={'column'} sx={{display:isPaying ? 'none' : 'flex', flex: 1}}>
                                {                                
                                    order.isPaid ?
                                    (
                                        <Chip
                                            sx={{my:2}}
                                            label='Pagado'
                                            variant='outlined'
                                            color='success'
                                            
                                            icon={ <CreditScoreOutlined /> }
                                        />
                                    ) :
                                    (
                                    <PayPalButtons
                                            createOrder={(data, actions) => {
                                                return actions.order.create({
                                                    purchase_units: [
                                                        {
                                                            amount: {
                                                                value: order.total.toString(),
                                                            },
                                                        },
                                                    ],
                                                });
                                            }}
                                            onApprove={(data, actions) => {
                                                return actions.order.capture().then((details) => {
                                                    onOrderCompleted(details);
                                                    // const name = details.payer.name.given_name;
                                                    // console.log(details);
                                                    //alert(`Transaction completed by ${name}`);
                                                });
                                            }}
                                        />
                                    )
                                } 
                            </Box>
                           
                        </Box>
                    </CardContent>
                </Card>
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
import { getOrderById } from '../../database';
import { IOrder } from '../../interfaces';
import { ShippingAddress } from '../../interfaces/order';
import tesloApi from '../../api/tesloApi';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async ( {req, query }) => {
    
    const { id = '' } = query;
    const session: any = await getSession({ req });
    if (!session){
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${id}`,
                permanent: false
            }
        }
    }

    const order = await getOrderById(id.toString());

    if (!order){
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false
            }
        }
    }

    if( order.user !== session.user._id ){
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false
            }
        }
    }

    return {
        props: {
            order
        }
    }
}

export default OrderPage