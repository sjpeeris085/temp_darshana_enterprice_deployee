import React, { forwardRef, useImperativeHandle, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import SuccessSound from '../../assets/sounds/success.mp3';
import ErrorSound from '../../assets/sounds/error.mp3';
import InfoSound from '../../assets/sounds/info.mp3';
import { ALERT } from 'constants/commonConstants.js';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomizedSnackbars = forwardRef((props, ref) => {
    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState('success');
    const [message, setMessage] = React.useState('successsful');
    const [autoHideDuration, setAutoHideDuration] = React.useState(2500);
    const [audio] = useState(new Audio(SuccessSound));
    const [playing, setPlaying] = useState(false);
    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    }, [playing]);

    //avoid playing at render
    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    React.useEffect(() => {
        switch (type) {
            case ALERT.SUCCESS:
                if (audio.src !== SuccessSound) audio.src = SuccessSound;
                break;
            case ALERT.ERROR:
                if (audio.src !== ErrorSound) audio.src = ErrorSound;
                break;
            case ALERT.WARNING:
                if (audio.src !== InfoSound) audio.src = InfoSound;
                break;
            case ALERT.INFO:
                if (audio.src !== InfoSound) audio.src = InfoSound;
                break;
            default:
                break;
        }
        if (open) toggle();
    }, [open]);

    // const play = () => {
    //     new Audio(SuccessSound).play();
    // };

    useImperativeHandle(ref, () => ({
        showAlert({ type, message, autoHideDuration }) {
            setOpen(true);
            setType(type);
            setMessage(message);
            if (autoHideDuration) setAutoHideDuration(autoHideDuration);
        }
    }));

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
                {/* <Alert severity="error">This is an error message!</Alert>
            <Alert severity="warning">This is a warning message!</Alert>
            <Alert severity="info">This is an information message!</Alert>
            <Alert severity="success">This is a success message!</Alert> */}
            </Stack>
        </>
    );
});

export default CustomizedSnackbars;
