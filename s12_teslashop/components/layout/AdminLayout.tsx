import Head from 'next/head';
import { FC } from 'react';
import { Nabvar, SideMenu } from '../ui';
import { AdminNabvar } from '../admin/AdminNavbar';
import { Box, Typography } from '@mui/material';

interface Props {
    children: JSX.Element;
    title: string;
    subtitle: string;
    icon?: JSX.Element;
}

const AdminLayout: FC<Props> = ({ children, title, subtitle, icon }) => {
  return (
    <>
        <nav>
            <AdminNabvar />
        </nav>

        <SideMenu />
        
        <main style={{
            margin: '80px auto',
            maxWidth: '1440px',
            padding: '0px 30px'
        }}>
            <Box display='flex' flexDirection={'column'}>
                <Typography variant='h1' component='h1' >
                    { icon }
                    { title }
                </Typography>
            </Box>

            <Box className='fadeIn'>
                {children}
            </Box>        
        </main>
    </>
  )
}

export default AdminLayout;