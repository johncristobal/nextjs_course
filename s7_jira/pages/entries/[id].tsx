import { Button, capitalize, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from '@mui/material';
import React, { ChangeEvent, FC, useContext, useMemo, useState } from 'react'
import { Layout } from '../../components/layouts';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Entry, EntryStatus } from '../../interfaces';
import { GetServerSideProps } from 'next'
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';
import { getFormat } from '../../utils/dateFunctions';

const statusOpts:EntryStatus[] = ['pending', 'inprogress', 'finished']

interface Props {
    entry: Entry
}

export const EntryPage: FC<Props> = ( {entry} ) => {

    const [inputValue, setInputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState(false);

    const { updateEntry } = useContext(EntriesContext);

    const onTextChanged = (event: ChangeEvent<HTMLInputElement> ) => {
        setInputValue( event.target.value )
    }

    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus( event.target.value as EntryStatus)
    }

    const onSaved = () => {
        if (inputValue.trim().length === 0) return

        const updated : Entry = {
            ...entry,
            status,
            description: inputValue
        }
        updateEntry( updated, true );
    }

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

  return (
    <Layout title={inputValue.substring(0,10)}>
        <Grid
            container
            justifyContent='center'
            sx={{margintTop: 2}}
        >
            <Grid item xs={12} sm={8} md={6}>
                <Card>
                    <CardHeader
                        title={ `Entrada: ${inputValue}`}
                        subheader={`Creado hace: ${getFormat(entry.createdAt)}`}
                    />
                    <CardContent>
                        <TextField 
                            sx={{marginTop: 2, marginBottom: 1}}
                            fullWidth
                            placeholder='Nueva entrada'
                            autoFocus
                            multiline
                            label='Nueva entrada'
                            value={inputValue}
                            onChange={onTextChanged}
                            onBlur={ () => setTouched(true) }
                            helperText={ isNotValid && 'Ingrese valor' }
                            error={ isNotValid }
                        />

                        <FormControl>
                            <FormLabel>Estado</FormLabel>
                            <RadioGroup
                                row
                                value={status}
                                onChange={onStatusChanged}
                            >
                                {
                                    statusOpts.map( opt => (
                                        <FormControlLabel 
                                            key={opt}
                                            value={opt}
                                            control={ <Radio/> }
                                            label={ capitalize(opt)}
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                    </CardContent>

                    <CardActions>
                        <Button
                            startIcon={ <SaveOutlinedIcon/> }
                            variant='contained'
                            fullWidth
                            onClick={ onSaved }
                            disabled={ inputValue.length <= 0 }
                        >
                            Save
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
            <IconButton
                sx={{
                    position: 'fixed',
                    bottom: 30,
                    right: 30,
                    backgroundColor: 'error.dark' 
                }}
            >
                <DeleteOutlinedIcon/>
            </IconButton>
        </Grid>
    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({params}) => {
    
    const {id} = params as {id: string};

    const entry = await dbEntries.getEnrtyById( id );
    if (!entry){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}

export default EntryPage;