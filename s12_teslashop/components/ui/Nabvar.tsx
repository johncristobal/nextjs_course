import { AppBar, Toolbar, Typography, Link, Box, Button, IconButton, Badge } from '@mui/material'
import React, { useContext } from 'react'
import NextLink from 'next/link';
import { SearchOutlined, ShoppingBag } from '@mui/icons-material';
import Router, { useRouter } from 'next/router';
import { UiContext } from '../../context';

export const Nabvar = () => {

  const { asPath } =  useRouter();
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
            
            <Box sx={{ display: {xs: 'none', sm: 'block'} }}> 
                <NextLink href='/category/men' passHref>
                    <Link>
                        <Button color={ asPath === '/category/men' ? 'primary' : 'info'}>Hombres</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/women' passHref>
                    <Link>
                        <Button color={ asPath === '/category/women' ? 'primary' : 'info'}>Mujeres</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/kid' passHref>
                    <Link>
                        <Button color={ asPath === '/category/kid' ? 'primary' : 'info'}>Ninos</Button>
                    </Link>
                </NextLink>
            </Box>
            
            <Box flex={ 1 } />

            <IconButton>
                <SearchOutlined />
            </IconButton>

            <NextLink href='/cart' passHref>
                <Link>
                    <IconButton>
                        <Badge badgeContent={2} color='secondary'>
                            <ShoppingBag />
                        </Badge>
                    </IconButton>
                </Link>
            </NextLink>

            <Button
                onClick={toogleSideMenu}
            >
                Menu
            </Button>
            
        </Toolbar>
    </AppBar>
  )
}
