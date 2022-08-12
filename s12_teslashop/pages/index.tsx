import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import ShopLayout from '../components/layout/ShopLayout';
import { ProductList } from '../components/products';
import { initialData } from '../database/products';
import { IProduct } from '../interfaces';
import { useProducts } from '../hooks';
import Loading from '../components/ui/Loading';

const Home: NextPage = () => {

  const { products, isLoading } = useProducts('/products');

  return (
    <ShopLayout title={'Testa shop - menu'} pageDescription={'Los mejores productos de tesla'}>
      <>
        <Typography variant='h1' component='h1'>
          Tienda
        </Typography>
        <Typography variant='h2' sx={{ mb: 1}}>
          Todos los productos
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

export default Home
