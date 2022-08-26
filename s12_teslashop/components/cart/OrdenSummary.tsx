import { Grid, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { CartContext } from '../../context/cart/CartContext';
import { currency } from '../../utils';

export const OrdenSummary = () => {

    const { items, subtotal, total, tax } = useContext(CartContext);

  return (
    <Grid container>
        <Grid item xs={6}>
            <Typography> No. productos </Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent={'end'}>
            <Typography> {items} {items > 1 ? 'productos ': 'producto'}</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography> Subtotal </Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent={'end'}>
            <Typography> { currency.format(subtotal) } </Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography> Impuestos ({ Number(process.env.NEXT_PUBLIC_TAX) * 100 })% </Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent={'end'}>
            <Typography> { currency.format(tax) } </Typography>
        </Grid>

        <Grid item xs={6} sx={{mt:2}}>
            <Typography variant='subtitle1'> Total: </Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent={'end'}>
            <Typography> { currency.format(total) } </Typography>
        </Grid>

    </Grid>
  )
}
