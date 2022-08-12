import { Typography } from '@mui/material';
import React from 'react'
import ShopLayout from '../../components/layout/ShopLayout';
import { ProductList } from '../../components/products';
import Loading from '../../components/ui/Loading';
import { useProducts } from '../../hooks';

const WomenPage = () => {
    const { products, isLoading } = useProducts('/products?gender=women');

    return (
      <ShopLayout title={'Testa shop - hombres'} pageDescription={'Los mejores productos de tesla para hombres'}>
        <>
          <Typography variant='h1' component='h1'>
            Mujeres
          </Typography>
          <Typography variant='h2' sx={{ mb: 1}}>
            Todos los productos para mujeres
          </Typography>
      {
        isLoading
        ? <Loading />
        : <ProductList 
            products={ products }
          />
      }
      </>
          
      </ShopLayout>
    )
}

export default WomenPage