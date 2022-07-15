import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { Layout } from '../components/layouts'
import Cookies from 'js-cookie';
import { GetServerSideProps } from 'next'
import axios from 'axios';

interface Props {
    theme: string;
}

const ThemeChangerPage: FC<Props> = ( {theme} ) => {

    const [currenttheme, setCurrenttheme] = useState(theme);

    const onThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrenttheme(event.target.value);

        // 4 k de info
        Cookies.set('theme', event.target.value);
    }

    const onChangeTheme = async () => {
        const { data } = await axios.get('/api/hello');
        
    }

    useEffect(() => {      
      console.log(Cookies.get('theme'));
    }, [])

  return (
    <Layout>
        <Card>
            <CardContent>
                <FormControl>
                    <FormLabel>Tema</FormLabel>
                    <RadioGroup 
                        value={currenttheme}
                        onChange={onThemeChange}
                    >
                        <FormControlLabel value='light' control={<Radio />} label="Light" />
                        <FormControlLabel value='dark' control={<Radio />} label="Dark" />
                        <FormControlLabel value='custom' control={<Radio />} label="Custom" />
                    </RadioGroup>
                </FormControl>

                <Button
                onClick={onChangeTheme}
                >
                    Solicitud
                </Button>
            </CardContent>
        </Card>
    </Layout>
    
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const {theme = 'light', name='no name'} = req.cookies;
    const validT = ['light', 'dark', 'custom'];

    return {
        props: {
            theme: validT.includes (theme) ? theme : 'custom',
            name
        }
    }
}

export default ThemeChangerPage