import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { StoreProvider } from './Store';
ReactDOM.render(
    <StoreProvider>
        <HelmetProvider>
            <PayPalScriptProvider deferLoading={true}>
                <App />
            </PayPalScriptProvider>
        </HelmetProvider></StoreProvider>, document.getElementById('root'));
