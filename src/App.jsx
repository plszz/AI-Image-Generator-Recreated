import { useState } from 'react'
import GenerationDisplay from './components/generationDisplay'
import GenerationSettings from './components/generationSettings'
import "./style/index.css"

function App() {
  return (
    <>
      <section id="mainTitle-section">
        <h1>Image Generator</h1>
        <h3>Skyler 2023</h3>
      </section>

      <section id="mainContent-section">
        <GenerationSettings/>
        <GenerationDisplay/>
      </section>
    </>
  )
}

export default App
