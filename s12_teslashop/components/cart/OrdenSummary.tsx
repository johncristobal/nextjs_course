import { Grid, Typography } from '@mui/material'
import React, { FC, useContext } from 'react'
import { CartContext } from '../../context/cart/CartContext';
import { currency } from '../../utils';

interface Props {
    orderValues?: {
        items: number; 
        subtotal: number;
        total: number; 
        tax: number;    }
}

export const OrdenSummary: FC<Props> = ({ orderValues }) => {

    const { items, subtotal, total, tax } = useContext(CartContext);

    const summaryValues = orderValues ? orderValues : {items, subtotal, total, tax};  

  return (
    <Grid container>
        <Grid item xs={6}>
            <Typography> No. productos </Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent={'end'}>
            <Typography> {summaryValues.items} {summaryValues.items > 1 ? 'productos ': 'producto'}</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography> Subtotal </Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent={'end'}>
            <Typography> { currency.format(summaryValues.subtotal) } </Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography> Impuestos ({ Number(process.env.NEXT_PUBLIC_TAX) * 100 })% </Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent={'end'}>
            <Typography> { currency.format(summaryValues.tax) } </Typography>
        </Grid>

        <Grid item xs={6} sx={{mt:2}}>
            <Typography variant='subtitle1'> Total: </Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent={'end'}>
            <Typography> { currency.format(summaryValues.total) } </Typography>
        </Grid>

    </Grid>
  )
}
