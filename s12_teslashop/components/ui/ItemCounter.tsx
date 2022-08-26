import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React, { FC } from 'react'

interface Props{
  currentValue: number;
  onChangeQuantity: (quantity: number) => void;
}

const ItemCounter:FC<Props> = ({ currentValue, onChangeQuantity }) => {
  return (
    <Box display={'flex'} alignItems='center'>
        <IconButton
          onClick={() => onChangeQuantity(-1) }
        >
            <RemoveCircleOutline />
        </IconButton>
        <Typography sx={{width: 40, textAlign:'center'}}> {currentValue} </Typography>
        <IconButton
          onClick={() => onChangeQuantity(+1) }
        >
            <AddCircleOutline />
        </IconButton>
    </Box>
  )
}

export default ItemCounter