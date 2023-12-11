import React from 'react'
import { createBrowserRouter, createHashRouter } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import SetupPage from '../pages/SetupPage'
import PlayPage from '../pages/PlayPage'
import App from '../App'

const router = createHashRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: "/",
                element: <LandingPage />
            },
            {
                path: "/setup",
                element: <SetupPage />
            },
            {
                path: "/play",
                element: <PlayPage />
            }
        ]
    }
    
])

export default router