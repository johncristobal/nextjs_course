import { Box, Button, TextField } from '@mui/material'
import React, { ChangeEvent, useContext, useState } from 'react'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {

    const { addNewEntry } = useContext(EntriesContext);
    const { isAdding, setIsAdding } = useContext(UIContext);

    //const [isAdding, setisAdding] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [touched, setTouched] = useState(false)

    const onTextChanged = (event: ChangeEvent<HTMLInputElement> ) => {
        setInputValue( event.target.value )
    }

    const onSaved = () => {
        if (inputValue.length === 0) return;
        addNewEntry(inputValue);
        setIsAdding(false);
        setTouched(false);
        setInputValue('');
    }

  return (
    <Box sx={{marginBottom: 2, paddingX: 2}}>
        
        { isAdding 
            ? (
                <>
                <TextField
                    fullWidth
                    sx={{marginTop: 2, marginBottom: 1}}
                    placeholder='New entry'
                    autoFocus
                    multiline
                    label='Agregando...'
                    helperText
                    error={ inputValue.length <= 0 && touched }
                    value={ inputValue }
                    onChange={ onTextChanged }
                    onBlur={ () => setTouched(true) }
                >

                </TextField>
                <Box display='flex' justifyContent='space-between'>
                    <Button
                        variant='text'
                        onClick={() => setIsAdding( false )}
                    >
                        Cancelar
                    </Button>

                    <Button
                        variant='outlined'
                        color='secondary'
                        endIcon={ <SaveOutlinedIcon /> }
                        onClick={ onSaved }
                    >
                        Guardar
                    </Button>
                </Box>
                </>
            )
            : (
                <Button
                    startIcon={ <AddCircleOutlineIcon/> }
                    fullWidth
                    variant='outlined'
                    onClick={() => setIsAdding( true )}
                >
                    Agregar tarea
                </Button>
            )
        }
    </Box>
  )
}
