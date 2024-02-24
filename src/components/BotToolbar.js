import React from 'react'
import { Box, Button } from '@mui/material'


export default function BotToolbar() {

    const handleButtonClick = (e) => {
        console.log("clicked Red")
    }

    return (
        <Box className='BotToolbar'>
            {/*
                bot setup turn
                bot normal turn
                bot search
                bot solve board
            */}
            <Button
                onClick={handleButtonClick}
            >
                Red
            </Button>
        </Box>
    )
}