import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import requests from '../../requests'
import { api_url } from '../../constants'
import axios from 'axios'

function Shutdown() {
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const shutDown = async () => {
        try {
            await axios.post(api_url + requests.shutdown)
            handleClose()
        } catch {}
    }
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} color="error">
                SHUTDOWN
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">SHUT DOWN???</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>NO</Button>
                    <Button onClick={shutDown} autoFocus>
                        YES
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default Shutdown
