import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import App from './App.jsx'
import './index.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from './components/LoadingSpinner.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* Suspense used for lazy loaded pages */}
        <Suspense fallback={<div style={{ padding: 20 }}><LoadingSpinner /></div>}>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            pauseOnHover
            theme="colored"
          />
        </Suspense>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
