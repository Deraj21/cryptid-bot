import React, { useState } from 'react'
import { Box, Button, Menu, MenuItem } from '@mui/material'
import { useSelector } from 'react-redux'


export default function BotToolbar() {

    let [menuAnchor, setMenuAnchor] = useState(null)
    let [currentbot, setCurrentBot] = useState('')
    let players = useSelector(s => s.player.players)
    

    const handleSolveBoard = (e) => {
        console.log('solving board...')
    }

    const openBotMenu = (e, id) => {
        setMenuAnchor(e.currentTarget)
        setCurrentBot(id)
    }
    const closeMenu = () => {
        setMenuAnchor(null)
        setCurrentBot('')
    }

    const takeSetupTurn = (e) => {
        // TODO take setup turn
        closeMenu()
    }

    const takeTurn = (e) => {
        // TODO take turn
        closeMenu()
    }
    
    const menuIsOpen = menuAnchor !== null
    

    let botList = []
    for (let key in players){
        if (players[key].type === 'bot') {
            botList.push({ ...players[key], id: key })
        }
    }
    let botButtons = botList.map(bot => {
        return (
            <Button key={bot.id}
                sx={{ color: bot.id, backgroundColor: 'white' }}
                variant='contained'
                onClick={(e) => openBotMenu(e, bot.id)}
            >
                {bot.name}
            </Button>
        )
    })

    return (
        <Box className='BotToolbar'>
            <Button
                sx={{backgroundColor: 'white', color: 'black'}}
                variant='contained'
                onClick={handleSolveBoard}
            >
                Solve Board
            </Button>

            { botButtons }
            
            <Menu
                open={menuIsOpen}
                onClose={closeMenu}
                anchorEl={menuAnchor}
            >
                <MenuItem
                    onClick={takeSetupTurn}
                >
                    Take Setup Turn
                </MenuItem>
                <MenuItem
                    onClick={takeTurn}
                >
                    Take Turn
                </MenuItem>
            </Menu>
        </Box>
    )
}