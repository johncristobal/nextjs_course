import { Typography, Box } from '@mui/material';
import type { NextPage } from 'next'
import ShopLayout from '../../components/layout/ShopLayout';
import { ProductList } from '../../components/products';
import { IProduct } from '../../interfaces';
import { GetServerSideProps } from 'next'
import { dbProducts } from '../../database';

interface Props{
    products: IProduct[];
    foundProducts: boolean;
    query: string;
}

const Search: NextPage<Props> = ({products, foundProducts, query}) => {

  return (
    <ShopLayout title={'Testa shop - search'} pageDescription={'Los mejores productos de tesla'}>
      <>
        <Typography variant='h1' component='h1'>
          Buscar producto
        </Typography>
        {
            foundProducts
            ? <Typography variant='h2' sx={{ mb: 1}}> Termino: {query} </Typography>
            :(
                <Box display='flex'>
                    <Typography variant='h2' sx={{ mb: 1}}> No encontramos productos </Typography>
                    <Typography variant='h2' sx={{ ml: 1}} color='secondary'> {query} </Typography>
                </Box>
            )
        }        

        <ProductList 
          products={ products }
        />
    </>
        
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({params}) => {

    const { query = '' } = params as {query: string};
    let ps = await dbProducts.getProductsTerm(query);
    const foundProducts = ps.length > 0;

    if(!foundProducts){
        ps = await dbProducts.getAlllProducts();
    }

    return {
        props: {
            products: ps,
            foundProducts: foundProducts,
            query: query
        }
    }
}

export default Search
