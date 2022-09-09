import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AuthLayout } from '../../components/layout'
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { validations } from '../../utils';
import { ErrorOutline } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { getSession, signIn, getProviders } from 'next-auth/react';

type FormData = {
    email: string;
    password: string;
}

const LoginPage = () => {

    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false); 

    const [provider, setProvider] = useState<any>({});

    useEffect(() => {
      
        getProviders().then( prov => {
            setProvider(prov);
        });
      
    }, [])
    

    const onLoginUser = async ({email, password}: FormData) => {
        
        setShowError(false);
        await signIn('credentials', { email, password});

        // const isvalid = await loginUser(email, password);
        // if(!isvalid){
        //     setShowError(true);
        //     setTimeout(() => {
        //         setShowError(false);
        //     }, 3000);
        //     return;
        // }
       
        // const dest = router.query.p?.toString() || '/';
        // router.replace(dest);
    }

  return (
    <AuthLayout title={'Ingresar'}>
        <form onSubmit={ handleSubmit(onLoginUser) } noValidate>
            <Box sx={{width: 350, padding:'10px 20px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component={'h1'}>Iniciar sesion</Typography>
                        <Chip
                            label='No reconocemos el usuario'
                            color='error'
                            icon ={<ErrorOutline />}
                            className='fadeIn'
                            sx={{ display: showError ? 'flex' : 'none'}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                        type='email' 
                        label='Correo' 
                        variant='filled' 
                        fullWidth 
                        { ...register('email', {
                            required: 'Este campo es requerido',
                            validate: validations.isEmail
                        })}
                        error={ !!errors.email }
                        helperText={ errors.email?.message }
                    />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                        label='Password' 
                        type={'password'} 
                        variant='filled' 
                        fullWidth 
                        { ...register('password', {
                            required: 'Este campo es requerido',
                            minLength: {value: 6, message: 'Minimo 6 caracteres'}
                        })}
                        error={ !!errors.password }
                        helperText={ errors.password?.message }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                        type='submit'
                        color='secondary' 
                        className='circular-btn' 
                        size='large' 
                        fullWidth
                        >
                            Ingresar
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <NextLink 
                            href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'}
                            passHref
                        >
                            <Link underline='always'>
                                Registrarse
                            </Link>
                        </NextLink>
                    </Grid>

                    <Grid item xs={12} display='flex' flexDirection={'column'} justifyContent={'end'}>
                       <Divider sx={{width: '100%', mb:2}} />
                       {
                         Object.values(provider).map( (prov: any) => {
                            if (prov.id === 'credentials') return (<div key='credentiakls'></div>)
                            return (
                                <Button
                                    key={prov.id}
                                    variant='outlined'
                                    fullWidth
                                    color='primary'
                                    sx={{ mb: 1 }}
                                    onClick={() => signIn(prov.id)}
                                >
                                    {prov.name}
                                </Button>
                            )
                         })
                       }
                    </Grid>

                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const session = await getSession({ req });

    const { p = '/' } = query;
    
    if(session){
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }

    return {
        props: {   }
    }
}

export default LoginPage
