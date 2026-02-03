import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as ProviderRollBar, ErrorBoundary } from '@rollbar/react';

import './index.css'
import { App } from './app/App.jsx'
import { store } from "./store/index.js";
import './i18n';

const rollbarConfig = {
    accessToken: 'd1aee511f2fb473cb1266cc1b136a39c067432786679afcc8f6e75e5fee0c34af74763a0b61cdc7b512f92fe0587bc1b',
    environment: 'production',
};

createRoot(document.getElementById('root')).render(
    <ProviderRollBar config={rollbarConfig}>
        <ErrorBoundary>
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        </ErrorBoundary>
    </ProviderRollBar>
)
