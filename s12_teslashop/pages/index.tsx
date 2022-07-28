import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import ShopLayout from '../components/layout/ShopLayout';
import { ProductList } from '../components/products';
import { initialData } from '../database/products';
import { IProduct } from '../interfaces';

const Home: NextPage = () => {
  return (
    <ShopLayout title={'Testa shop - menu'} pageDescription={'Los mejores prpductops de tesla'}>
      <>
        <Typography variant='h1' component='h1'>
          Tienda
        </Typography>
        <Typography variant='h2' sx={{ mb: 1}}>
          Todos los productos
        </Typography>

        <ProductList products={ initialData.products as any } />
      </>
    </ShopLayout>
  )
}

export default Home
