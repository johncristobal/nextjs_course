import { Box, Button, CardContent, Divider, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { CartList, OrdenSummary } from '../../components/cart'
import ShopLayout from '../../components/layout/ShopLayout'
import { CartContext } from '../../context'

const CartPage = () => {

    const { loaded, cart } = useContext(CartContext);
    const router = useRouter();

    useEffect(() => {
      if(loaded && cart.length === 0){
        router.replace('/cart/empty');
      }
    }, [loaded, cart, router])

    if( !loaded || cart.length === 0){
        return (<></>);
    }

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
                        <Button 
                            color='secondary' 
                            className='circular-btn' 
                            fullWidth
                            href='/checkout/address'
                        >
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