import { AppBar, Toolbar, Typography, Link, Box, Button } from '@mui/material'
import React, { useContext, useState } from 'react'
import NextLink from 'next/link';
import { UiContext } from '../../context';

export const AdminNabvar = () => {

  const { toogleSideMenu } = useContext(UiContext);

  return (
    <AppBar>
        <Toolbar>
            <NextLink href='/' passHref>
                <Link display='flex' alignItems='center'>
                    <Typography variant='h6'>Teslo |</Typography>
                    <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                </Link>
            </NextLink>

            <Box flex={ 1 } />

            <Button
                onClick={toogleSideMenu}
            >
                Menu
            </Button>
            
        </Toolbar>
    </AppBar>
  )
}
