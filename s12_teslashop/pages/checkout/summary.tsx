import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { CartList, OrdenSummary } from '../../components/cart'
import ShopLayout from '../../components/layout/ShopLayout'
import NextLink from "next/link";
import { CartContext } from '../../context';

const SuumaryPage = () => {

    const { shippingAddres, items } = useContext(CartContext);
    if (!shippingAddres) {
        return  (<></>);
    }

    const { 
        firstName,
        lastName,
        address,
        address2,
        zip,
        city,
        country,
        phone } = shippingAddres;

  return (
   <ShopLayout title={'Resumen de la orden'} pageDescription={'Carrito de compras tienda'}>
    <>
        <Typography variant='h1' component='h1'>
            Resumen de la orden
        </Typography>

        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList editable={false} />
            </Grid>
            <Grid item xs={12} sm={5}>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen ({items} { items === 1 ? 'producto' : 'producrtos'})</Typography>
                        <Divider sx={{my:1}} />

                        <Typography variant='subtitle1'> Dirrecion de entrega</Typography>
                        <Box display={'flex'} justifyContent='end'>
                            <NextLink href={'/checkout/address'} passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>
                        
                        <Typography> {firstName} { lastName } </Typography>
                        <Typography> { address } { address2 ? address2 : '' } </Typography>
                        <Typography> { city } </Typography>
                        <Typography> { zip } </Typography>
                        <Typography> { country } </Typography>
                        <Typography> { phone } </Typography>

                        <Divider sx={{my:1}} />

                        <Typography variant='subtitle1'> Resumen de la orden </Typography>
                        <Box display={'flex'} justifyContent='end'>
                            <NextLink href={'/cart'} passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        <OrdenSummary />
                        <Box sx={{mt:3}}>
                            <Button color='secondary' className='circular-btn' fullWidth>
                                Confirmar orden
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

        </Grid>
    </>
   </ShopLayout>
  )
}

export default SuumaryPage