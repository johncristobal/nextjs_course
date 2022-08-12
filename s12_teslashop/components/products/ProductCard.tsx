import { Box, Card, CardActionArea, CardMedia, Grid, Typography, Link } from '@mui/material';
import { FC, useMemo, useState } from "react";
import { IProduct } from "../../interfaces"
import NextLink from "next/link";

interface Props{
    product: IProduct;
}

export const ProductCard:FC<Props> = ({product}) => {
    
    const [isHover, setIsHover] = useState(false)
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const pImage = useMemo(() => {
        return isHover
        ? `/products/${ product.images[1] }`
        : `/products/${ product.images[0] }`

    }, [isHover, product.images])
    return (
    <Grid 
        item xs={6}
        sm={4} 
        onMouseEnter={ () => setIsHover(true) }
        onMouseLeave={ () => setIsHover(false) }
    >
        <Card>
            <NextLink href={`/product/${product.slug}`} passHref >
                <Link>
                    <CardActionArea>
                    <CardMedia 
                        component='img'
                        className='fadeIn'
                        image={pImage}
                        alt={product.title}
                        onLoad={() => setIsImageLoaded(true) }
                    />
                    </CardActionArea>
                </Link>
            </NextLink>
        </Card>

        <Box sx={{mt: 1, display: isImageLoaded ? 'block' : 'none' }} className='fadeIn'>
            <Typography fontWeight={700} >{product.title}</Typography>
            <Typography fontWeight={400}>${product.price}</Typography>
        </Box>
    </Grid>
  )
}
