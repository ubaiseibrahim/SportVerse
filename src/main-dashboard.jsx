import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import PlayerDashboard from './pages/PlayerDashboard'
import Layout from './components/Layout'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Layout>
      <PlayerDashboard />
    </Layout>
  </React.StrictMode>,
)
