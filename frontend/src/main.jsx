import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Provider as ProviderRollBar, ErrorBoundary } from '@rollbar/react'

import './index.css'
import { App } from './app/App.jsx'
import { store } from './store/index.js'
import './i18n'

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_TOKEN,
  environment: 'production',
}

createRoot(document.getElementById('root')).render(
  <ProviderRollBar config={rollbarConfig}>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </ProviderRollBar>,
)
