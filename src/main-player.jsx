import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import PlayerRedirect from './pages/PlayerRedirect'
import Layout from './components/Layout'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Layout>
      <PlayerRedirect />
    </Layout>
  </React.StrictMode>,
)
