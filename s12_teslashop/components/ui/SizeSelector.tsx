import { Box, Button } from '@mui/material';
import React, { FC } from 'react'
import { ISizes } from '../../interfaces';

interface Props{
    selectorSize?: ISizes;
    sizes: ISizes[];
    onSelectedSize: (size: ISizes) => void;
}

const SizeSelector:FC<Props> = ( {selectorSize, sizes, onSelectedSize }) => {
  return (
    <Box>
        {
            sizes.map( size => (
                <Button
                    key={ size }
                    size='small'
                    color={ selectorSize === size ? 'primary' : 'info'}
                    onClick={() => onSelectedSize(size)}
                >
                    { size }
                </Button>
            ))
        }
    </Box>
  )
}

export default SizeSelector