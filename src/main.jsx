import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App />
    <ToastContainer
      position="bottom-right"
      autoClose={2500}
      theme="dark"
      toastStyle={{ background: '#1E1E32', border: '1px solid rgba(255,255,255,0.1)', color: '#F0F0FF' }}
    />
  </>
)