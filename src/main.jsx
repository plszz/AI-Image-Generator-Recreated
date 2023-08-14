import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // https://stackoverflow.com/questions/58603209/react-hooks-render-twice
  // "React.StrictMode" causes components to render twice for development purposes, but once in production
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,

  // Uncomment to render once
  <>
  <App />
  </>
)
