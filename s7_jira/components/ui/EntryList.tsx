import { List, Paper } from '@mui/material'
import React, { FC, useMemo, DragEvent } from 'react'
import { EntryStatus } from '../../interfaces'
import { EntryCard } from './EntryCard'
import { useContext } from 'react';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

import styles from './EntryList.module.css';

interface Props {
    status: EntryStatus;
}

export const EntryList:FC<Props> = ({status}) => {

    const { entries, updateEntry } = useContext(EntriesContext);
    const { isDragging, endDrag } = useContext(UIContext);

    const entriesByStatus = useMemo(() => entries.filter( item => (
        item.status === status
    )), [entries])
    

    const onDropEentry = (event: DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('text');
        const entry = entries.find(e => e._id === id)!;
        entry.status = status;
        updateEntry(entry);
        endDrag();
    }

    const allowdrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

  return (
    <div
        onDrop={onDropEentry}
        onDragOver={ allowdrop }
        className={ isDragging ? styles.dragging : '' }
    >
        <Paper sx={{
            height: 'calc(100vh -250px',
            overflow: 'scroll', 
            padding: '1px 5px',
            backgroundColor: 'transparent'}}
        >

            <List sx={{ opacity: isDragging ? 0.5 : 1.0, transition: 'all 0.3s' }}>
                {
                    entriesByStatus.map( item => (
                        <EntryCard key={item._id} entry={item} />
                    ))
                }                
            </List>
        </Paper>
    </div>
  )
}
