import React from 'react'
import ReactDOM from 'react-dom/client'
import './navnlanding.css'
import './about.css'
import './products.css'
import './singlepro.css'
import './error.css'
import './cart.css'
import App from './App'
import {AppProvider} from './utilities/Context'
import "bootstrap/dist/css/bootstrap.min.css";
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
            <AppProvider>
                <App />
            </AppProvider>
    </React.StrictMode>
)