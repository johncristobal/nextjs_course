import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import React, { FC, DragEvent, useContext } from 'react'
import { Entry } from '../../interfaces/entry';
import { UIContext } from '../../context/ui';
import { useRouter } from 'next/router';
import { getFormat } from '../../utils/dateFunctions';

interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({entry}) => {

    const { startDrag, endDrag } = useContext(UIContext);
    const router = useRouter();

    const onDragStart = (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('text', entry._id);
        startDrag();
    }

    const enDragEnd = () => {
        endDrag();
    }

    const onClick = () => {
        router.push(`entries/${entry._id}`)
    }

  return (
    <Card
        sx={{ marginBottom: 1}}
        draggable
        onDragStart={onDragStart}
        onDragEnd={enDragEnd}
        onClick={onClick}
    >
        <CardActionArea>
            <CardContent>
                <Typography sx={{ whiteSpace: 'pre-line'}}>
                    { entry.description }
                </Typography>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                <Typography variant='body2'>
                    {
                        getFormat(entry.createdAt)
                    }
                </Typography>
            </CardActions>
        </CardActionArea>

    </Card>
  )
}
