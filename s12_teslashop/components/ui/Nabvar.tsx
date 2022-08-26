import { AppBar, Toolbar, Typography, Link, Box, Button, IconButton, Badge, Input, InputAdornment } from '@mui/material'
import React, { useContext, useState } from 'react'
import NextLink from 'next/link';
import { ClearOutlined, SearchOutlined, ShoppingBag } from '@mui/icons-material';
import Router, { useRouter } from 'next/router';
import { UiContext } from '../../context';
import { CartContext } from '../../context/cart/CartContext';

export const Nabvar = () => {

  const { asPath, push } =  useRouter();
  const { toogleSideMenu } = useContext(UiContext);
  const { items } = useContext(CartContext);
    
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setisSearchVisible] = useState(false);

  const onSearchTerm = () => {
      if(searchTerm.trim().length === 0) return;   
      push(`/search/${searchTerm}`);
  }

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
            
            <Box sx={{ display: isSearchVisible ? 'none' : {xs: 'none', sm: 'block'} }}> 
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

            {
                isSearchVisible
                ? (
                    <Input
                        sx={{ display: {xs: 'none', sm: 'flex'} }}
                        autoFocus
                        type='text'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={ (e) => e.key ==='Enter' ? onSearchTerm() : null }
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={ () => setisSearchVisible(false) }
                                >
                                    <ClearOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                )
                : (
                    <IconButton
                        onClick={() => setisSearchVisible(true)}
                        sx={{ display: {xs: 'none', sm: 'block'} }}
                    >
                        <SearchOutlined />
                    </IconButton>    
                )
            }

            <IconButton
                sx={{display: {xs: 'flex', sm:'none' }}}
                onClick={toogleSideMenu}
            >
                <SearchOutlined />
            </IconButton>

            <NextLink href='/cart' passHref>
                <Link>
                    <IconButton>
                        <Badge badgeContent={ items } color='secondary'>
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
