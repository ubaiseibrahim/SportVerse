import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import MatchRedirect from './pages/MatchRedirect'
import Layout from './components/Layout'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Layout>
      <MatchRedirect />
    </Layout>
  </React.StrictMode>,
)
