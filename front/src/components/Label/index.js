import { useMemo } from 'react'
import Typography from '@mui/material/Typography'

const Label = ({ text }) => {
    return useMemo(() => {
        return (
            <Typography id={text} gutterBottom>
                {text}
            </Typography>
        )
    }, [text])
}

export default Label
