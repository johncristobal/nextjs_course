import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { AuthLayout } from '../../components/layout'
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { validations } from '../../utils';
import { ErrorOutline } from '@mui/icons-material';
import { AuthContext } from '../../context';
import { useRouter } from 'next/router';

type FormData = {
    email: string;
    password: string;
}

const LoginPage = () => {

    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);    
    const { loginUser } = useContext(AuthContext);

    const onLoginUser = async ({email, password}: FormData) => {
        
        setShowError(false);
        const isvalid = await loginUser(email, password);
        if(!isvalid){
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000);
            return;
        }

        router.replace('/');
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
                        <NextLink href={'/auth/register'} passHref>
                            <Link underline='always'>
                                Registrarse
                            </Link>
                        </NextLink>
                    </Grid>

                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}

export default LoginPage
