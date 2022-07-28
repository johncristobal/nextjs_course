import { Box, Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';
import { FC, useMemo, useState } from "react";
import { IProduct } from "../../interfaces"

interface Props{
    product: IProduct;
}

export const ProductCard:FC<Props> = ({product}) => {
    
    const [isHover, setIsHover] = useState(false)
    const pImage = useMemo(() => {
        return isHover
        ? `products/${ product.images[1] }`
        : `products/${ product.images[0] }`

    }, [isHover, product.images])
    return (
    <Grid 
        item xs={6}
        sm={4} 
        onMouseEnter={ () => setIsHover(true) }
        onMouseLeave={ () => setIsHover(false) }
    >
        <Card>
            <CardActionArea>
            <CardMedia 
                component='img'
                className='fadeIn'
                image={pImage}
                alt={product.title}
            />
            </CardActionArea>
        </Card>

        <Box sx={{mt: 1}} className='fadeIn'>
            <Typography fontWeight={700} >{product.title}</Typography>
            <Typography fontWeight={400}>${product.price}</Typography>
        </Box>
    </Grid>
  )
}
