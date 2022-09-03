import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext } from 'react'
import ShopLayout from '../../components/layout/ShopLayout';

type FormData = {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    zip: string;
    city: string;
    country: string;
    phone: string;
}

const getAddressCookie = () : FormData => {

    return {
        firstName: Cookies.get('firstName') || '',
        lastName: Cookies.get('lastName') || '',
        address: Cookies.get('address') || '',
        address2: Cookies.get('address2') || '',
        zip: Cookies.get('zip') || '',
        city: Cookies.get('city') || '',
        country: Cookies.get('country') || '',
        phone: Cookies.get('phone') || '',
    }
}

const AddressPage = () => {

    const {updateAddres} = useContext(CartContext);
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: getAddressCookie()
    });

    const onSubmitAddress = (data: FormData) => {
    
        Cookies.set('firstName', data.firstName);
        Cookies.set('lastName', data.lastName);
        Cookies.set('address', data.address);
        Cookies.set('address2', data.address2 || '');
        Cookies.set('zip', data.zip);
        Cookies.set('city', data.city);
        Cookies.set('country', data.country);
        Cookies.set('phone', data.phone);

        updateAddres(data);
        router.push('/checkout/summary');
    }

  return (

    <ShopLayout title={''} pageDescription={''}>
        <form onSubmit={ handleSubmit(onSubmitAddress) }>
            <Typography variant='h1' component={'h1'}> Direccion </Typography>
            <Grid container spacing={2} sx={{mt:2}}>
                <Grid item xs={12} sm={6}>
                    <TextField label="Nombre" variant='filled' fullWidth
                    { ...register('firstName', {
                        required: 'Este campo es requerido',                       
                    })}
                    error={ !!errors.firstName }
                    helperText={ errors.firstName?.message }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Apellido" variant='filled' fullWidth
                    { ...register('lastName', {
                        required: 'Este campo es requerido',                       
                    })}
                    error={ !!errors.lastName }
                    helperText={ errors.lastName?.message }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Direccion" variant='filled' fullWidth
                    { ...register('address', {
                        required: 'Este campo es requerido',                       
                    })}
                    error={ !!errors.address }
                    helperText={ errors.address?.message }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Direccion 2" variant='filled' fullWidth
                    { ...register('address2') }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="C.P." variant='filled' fullWidth
                    { ...register('zip', {
                        required: 'Este campo es requerido',                       
                    })}
                    error={ !!errors.zip }
                    helperText={ errors.zip?.message }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Ciudad" variant='filled' fullWidth
                    { ...register('city', {
                        required: 'Este campo es requerido',                       
                    })}
                    error={ !!errors.city }
                    helperText={ errors.city?.message }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth> 
                        <TextField
                            select
                            variant='filled'
                            label='Pais'
                            defaultValue={ countries.countries[0].code }
                            { ...register('country', {
                                required: 'Este campo es requerido',                       
                            })}
                            error={ !!errors.country }
                            helperText={ errors.country?.message }
                        >
                            {
                                countries.countries.map( country => (
                                    <MenuItem key={country.code} value={country.code}> {country.name }</MenuItem>
                                ))
                            }
                        </TextField>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Telefono" variant='filled' fullWidth
                    { ...register('phone', {
                        required: 'Este campo es requerido',                       
                    })}
                    error={ !!errors.phone }
                    helperText={ errors.phone?.message }
                    />
                </Grid>
            </Grid>

            <Box sx={{mt:5}} display='flex' alignItems={'center'} justifyContent='center'>
                <Button type='submit' color='secondary' className='circular-btn' size='large'>Revisar pedido</Button>
            </Box>
        </form>
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next'
import { countries, jwt } from '../../utils';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { CartContext } from '../../context';

export const getServerSideProps: GetServerSideProps = async ({req}) => {

    const { token = '' } = req.cookies;
    let userid = '';
    let validtoken = false;

    try{
        userid = await jwt.isValidToken( token );
        validtoken = true;
    }catch(error){
        validtoken = false;
    }

    if (!validtoken){
        return {
            redirect: {
                destination: '/auth/login?p=/checkout/address',
                permanent: false
            }
        }
    }
    return {
        props: {
            
        }
    }
}

export default AddressPage