import { Box, Button } from '@mui/material';
import React, { FC } from 'react'
import { ISizes } from '../../interfaces';

interface Props{
    selectorSize: ISizes;
    sizes: ISizes[];
}

const SizeSelector:FC<Props> = ( {selectorSize, sizes }) => {
  return (
    <Box>
        {
            sizes.map( size => (
                <Button
                    key={ size }
                    size='small'
                    color={ selectorSize === size ? 'primary' : 'info'}
                >
                    { size }
                </Button>
            ))
        }
    </Box>
  )
}

export default SizeSelector