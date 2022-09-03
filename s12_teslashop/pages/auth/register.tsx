import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { AuthLayout } from '../../components/layout'
import NextLink from 'next/link';
import { validations } from '../../utils';
import { useForm } from 'react-hook-form';
import { tesloApi } from '../../api';
import { ErrorOutline } from '@mui/icons-material';
import { AuthContext } from '../../context';
import { useRouter } from 'next/router';

type FormData = {
    name: string;
    email: string;
    password: string;
}

const RegisterPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { registerUser } = useContext(AuthContext);
    const router = useRouter();

    const onRegisterForm = async ( {name, email, password}: FormData ) => {
        setShowError(false);
        const {hasError, message} = await registerUser(name, email, password);
        if (hasError){
            setShowError(true);
            setErrorMessage(message!);
            setTimeout(() => {
                setShowError(false);
            }, 3000);
            return;
        }

        const dest = router.query.p?.toString() || '/';
        router.replace(dest);
    }

  return (
    <AuthLayout title={'Registro'}>
        <form onSubmit={ handleSubmit(onRegisterForm) } noValidate>
        <Box sx={{width: 350, padding:'10px 20px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h1' component={'h1'}>Registrarse</Typography>
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
                    label='Nombre' 
                    variant='filled' 
                    fullWidth 
                    { ...register('name', {
                        required: 'Este campo es requerido',
                        minLength: {value: 2, message: 'Minimo 2 caracteres'}
                    })}
                    error={ !!errors.name }
                    helperText={ errors.name?.message }
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
                    <Button type='submit' color='secondary' className='circular-btn' size='large' fullWidth>
                        Registrarse
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <NextLink 
                        href={router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'}
                        passHref
                    >
                        <Link underline='always'>
                            Ya tienes cuenta
                        </Link>
                    </NextLink>
                </Grid>

            </Grid>
        </Box>
        </form>
    </AuthLayout>
  )
}

export default RegisterPage