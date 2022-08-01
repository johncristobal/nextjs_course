import { Box, Button, CardContent, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { CartList, OrdenSummary } from '../../components/cart'
import ShopLayout from '../../components/layout/ShopLayout'

const CartPage = () => {
  return (
   <ShopLayout title={'Carrito - 3'} pageDescription={'Carrito de compras tienda'}>
    <>
        <Typography variant='h1' component='h1'>
            Carrito
        </Typography>

        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList editable />
            </Grid>
            <Grid item xs={12} sm={5}>
                <CardContent>
                    <Typography variant='h2'>Orden</Typography>
                    <Divider sx={{my:1}} />

                    <OrdenSummary />
                    <Box sx={{mt:3}}>
                        <Button color='secondary' className='circular-btn' fullWidth>
                            Checkout
                        </Button>
                    </Box>
                </CardContent>
            </Grid>

        </Grid>
    </>
   </ShopLayout>
  )
}

export default CartPage