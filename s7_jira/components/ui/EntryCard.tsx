import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import React, { FC, DragEvent, useContext } from 'react'
import { Entry } from '../../interfaces/entry';
import { UIContext } from '../../context/ui';

interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({entry}) => {

    const { startDrag, endDrag } = useContext(UIContext);

    const onDragStart = (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('text', entry._id);
        startDrag();
    }

    const enDragEnd = () => {
        endDrag();
    }

  return (
    <Card
        sx={{ marginBottom: 1}}
        draggable
        onDragStart={onDragStart}
        onDragEnd={enDragEnd}
    >
        <CardActionArea>
            <CardContent>
                <Typography sx={{ whiteSpace: 'pre-line'}}>
                    { entry.description }
                </Typography>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                <Typography variant='body2'>
                    hace 30 mins
                </Typography>
            </CardActions>
        </CardActionArea>

    </Card>
  )
}
