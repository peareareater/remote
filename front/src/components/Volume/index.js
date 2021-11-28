import * as React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Slider from '@mui/material/Slider'
import VolumeDown from '@mui/icons-material/VolumeDown'
import VolumeUp from '@mui/icons-material/VolumeUp'
import axios from 'axios'
import { api_url } from '../../constants'
import requests from '../../requests'
import Label from '../Label'
let tm = null

function Volume() {
    const [value, setValue] = React.useState(30)

    React.useEffect(async () => {
        const volume = await getInitialVolume()
        setValue(volume)
    }, [])

    const getInitialVolume = async () => {
        const response = await axios.get(api_url + requests.getVolume)
        return response.data.volume
    }

    const handleChange = (event, volume) => {
        setValue(volume)

        clearTimeout(tm)

        tm = setTimeout(() => {
            axios.post(api_url + requests.setVolume, { volume })
        }, 500)
    }

    return (
        <Box sx={{ width: 300, margin: '30px auto' }}>
            <Label text={'Volume'} />
            <Stack spacing={2} direction="row" alignItems="center">
                <Slider
                    aria-label="Volume"
                    value={value}
                    onChange={handleChange}
                />
                <VolumeUp />
            </Stack>
        </Box>
    )
}

export default Volume
