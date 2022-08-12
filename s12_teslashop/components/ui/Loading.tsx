import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

const Loading = () => {
    return (
        <>
            <Box 
                sx={{ flexDirection: { xs: 'column', sm: 'row' }}}
                flexDirection='column'
                display='flex' 
                justifyContent='center' 
                alignItems='center' height='calc(100vh - 200px)'>

                    <Typography>Cargando...</Typography>
                    <CircularProgress thickness={2} />
            </Box>
        </>
      )
}

export default Loading