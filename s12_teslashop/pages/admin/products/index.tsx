import React from 'react'
import AdminLayout from '../../../components/layout/AdminLayout'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Box, Button, CardMedia, Grid, Link } from '@mui/material';
import { IProduct } from '../../../interfaces';
import useSWR from 'swr';
import { CategoryOutlined } from '@mui/icons-material';
import NextLink from 'next/link';

const columns :GridColDef[] = [
    {
        field: 'img',
        headerName: 'Foto',
        renderCell: ({row}: GridValueGetterParams) => {
            return (
                <a href={`/product/${row.slug}`} target='_blank' rel='noreferrer'>
                    <CardMedia 
                    component={'img'}
                    className='fadeIn'
                    image={ row.img }
                    />
                </a>
            )
        }
    },
    { 
        field: 
        'title',
        headerName: 'Titulo', 
        width: 250,
        renderCell: ({row}: GridValueGetterParams) => {
            return (
                <NextLink href={`/admin/products/${ row.slug }`} passHref>
                    <Link underline='always'>
                        { row.title}
                    </Link>
                </NextLink>
            )
        }
    },
    { field: 'gender', headerName: 'Genero'},
    { field: 'type', headerName: 'Tipo'},
    { field: 'inStock', headerName: 'Inventario'},
    { field: 'price', headerName: 'Precio'},
    { field: 'sizes', headerName: 'Tallas', width: 250},
]

const ProductsPage = () => {

    const { data, error } = useSWR<IProduct[]>('/api/admin/products');
    if(!data && !error) return (<></>)

    const rows = data!.map( product => ({
        id: product._id,
        img: product.images[0],
        title: product.title,
        gender: product.gender,
        type: product.type,
        inStock: product.inStock,
        price: product.price,
        sizes: product.sizes,
        slug: product.slug,
    }));

  return (
    <AdminLayout 
        title={'Productos'}
        subtitle={'Mantenimiento productos'}
        icon={ <CategoryOutlined />}
    >
        <>
            <Box display='flex' justifyContent={'end'} sx={{smb:2}}>
                <Button
                    color='secondary'
                    href='/admin/products/new'
                >
                    Crear producto
                </Button>
            </Box>
            
            <Grid container> 
                <Grid item xs={12} sx={{height:650, width:'100%'}}>
                    <DataGrid 
                        rows={ rows }
                        columns={ columns }
                        pageSize={10}
                        rowsPerPageOptions={ [10] }                        
                    />
                </Grid>

            </Grid>
        </>
    </AdminLayout>
  )
}

export default ProductsPage