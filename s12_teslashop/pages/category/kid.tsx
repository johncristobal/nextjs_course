import { Typography } from '@mui/material';
import React from 'react'
import ShopLayout from '../../components/layout/ShopLayout';
import { ProductList } from '../../components/products';
import Loading from '../../components/ui/Loading';
import { useProducts } from '../../hooks';

const KidPage = () => {
    const { products, isLoading } = useProducts('/products?gender=kid');

    return (
      <ShopLayout title={'Testa shop - ninos'} pageDescription={'Los mejores productos de tesla para ninos'}>
        <>
          <Typography variant='h1' component='h1'>
            Ninos
          </Typography>
          <Typography variant='h2' sx={{ mb: 1}}>
            Productos para ninos 
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

export default KidPage