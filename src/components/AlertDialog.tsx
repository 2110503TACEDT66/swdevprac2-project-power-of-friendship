// AlertDialog.tsx

import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {format} from 'date-fns'

interface AlertDialogProps {
    open: boolean;
    onClose: () => void;
    onAgree: (sectionItem: SectionItem) => void; // Add prop for handling agree action
    sectionItem: SectionItem | null; // Add prop for the selected section
}

const AlertDialog: React.FC<AlertDialogProps> = ({ open, onClose, onAgree, sectionItem }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
                <DialogTitle id="alert-dialog-title" className='font-serif'>{"Are you sure to make this appointment?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className='font-serif'>
                        <p>you are going to make an appointment on {sectionItem && sectionItem.date ? format(sectionItem.date, 'yyyy-MM-dd HH:mm:ss') : 'Invalid Date'}</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} className='font-serif'>NO</Button>
                    {/* Call onAgree function with sectionItem as argument */}
                    <Button onClick={() => onAgree(sectionItem!)} autoFocus className='font-serif'>
                        YES
                    </Button>
                </DialogActions>
        </Dialog>
    );
};

export default AlertDialog;
