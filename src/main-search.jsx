import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import SearchPage from './pages/SearchPage'
import Layout from './components/Layout'
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Layout>
        <SearchPage />
      </Layout>
    </HelmetProvider>
  </React.StrictMode>,
)
