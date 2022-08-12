import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import React, { FC } from 'react'
import ShopLayout from '../../components/layout/ShopLayout';
import { ProductSlideshow } from '../../components/products';
import ItemCounter from '../../components/ui/ItemCounter';
import SizeSelector from '../../components/ui/SizeSelector';
import { IProduct } from '../../interfaces';
import { GetServerSideProps } from 'next'
import { GetStaticPaths } from 'next'
import { GetStaticProps } from 'next'
import { dbProducts } from '../../database';
import { getProductBySlug } from '../../database/dbProducts';

interface Props{
  product: IProduct
}

const ProductPage:FC<Props> = ({product}) => {

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>

        <Grid item xs={12} sm={7}>
          <ProductSlideshow
            images={product.images}
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display={'flex'} flexDirection='column'>
            <Typography variant='h1' component={'h1'}> {product.title} </Typography>
            <Typography variant='subtitle1' component={'h2'}> ${product.price} </Typography>

            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2' component={'h1'}> Cantidad </Typography>
              <ItemCounter />
              <SizeSelector selectorSize={'XS'} sizes={ product.sizes } />
            </Box>

            <Button color='secondary' className='circular-btn'>
              Agregar carrito
            </Button>

            <Chip label="No disponible" color='error' variant='outlined' />

            <Box sx={{mt: 3}}>
              <Typography variant='subtitle2'> Description </Typography>
              <Typography variant='body2'> {product.description} </Typography>

            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// export const getServerSideProps: GetServerSideProps = async ({params}) => {
//   const { slug = '' } = params as {slug: string};
//   const data = await dbProducts.getProductBySlug(slug);

//   if (!data){
//     return {
//       redirect: {
//           destination: '/',
//           permanent: false
//       }
//     }
//   }

//   return {
//       props: {
//           product: data
//       }
//   }
// }

//getstaticpaths
//blocking
//getstaticprops
//cada 24 horas

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  //devuelve todos los posibles slugs
  //se generan en tiempo de build
  const data = await dbProducts.getAlllProductsSlugs();

  return {
    paths: data.map( (item) => ({
        params: {slug: item.slug}
      })
    ),
    fallback: "blocking"
  }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { slug = '' } = params as {slug: string};
  const data = await dbProducts.getProductBySlug(slug);

  if (!data){
    return {
      redirect: {
          destination: '/',
          permanent: false
      }
    }
  }

  return {
      props: {
          product: data
      },
      revalidate: 60 * 60 * 24
  }
}

export default ProductPage