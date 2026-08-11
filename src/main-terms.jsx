import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import TermsAndConditions from './pages/TermsAndConditions'
import Layout from './components/Layout'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Layout isLegalPage={true}>
      <TermsAndConditions />
    </Layout>
  </React.StrictMode>,
)
