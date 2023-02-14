import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AlertDialog = ({ state, heading, bodyText, alertResult }) => {
    const [open, setOpen] = React.useState(state);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (result) => {
        setOpen(false);
        alertResult(result);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" style={{ fontWeight: 'bold', fontSize: '13pt' }}>
                    {heading}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{bodyText}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(false)}>Not now</Button>
                    <Button onClick={() => handleClose(true)} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AlertDialog;
