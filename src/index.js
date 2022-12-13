import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom"
import './index.css';
import router from './config/router';
import store from './config/store'
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);

