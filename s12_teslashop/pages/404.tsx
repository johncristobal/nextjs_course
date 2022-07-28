import { Box, Typography } from "@mui/material"
import ShopLayout from "../components/layout/ShopLayout"

const Custom404 = () => {
  return (
    <ShopLayout title={"Page not found"} pageDescription={"Nada que mostrar"}>
        <>
            <Box 
                sx={{ flexDirection: { xs: 'column', sm: 'row' }}}
                display='flex' 
                justifyContent='center' 
                alignItems='center' height='calc(100vh - 200px)'>
                <Typography variant="h1" component='h1' fontSize={100} fontWeight={200}> 404 | </Typography>
                <Typography marginLeft={2} > No encontramos pagina </Typography>
            </Box>
        </>
    </ShopLayout>
  )
}

export default Custom404