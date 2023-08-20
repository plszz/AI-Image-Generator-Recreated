import { useState, useEffect } from 'react'
import jQuery from "jquery"
window.$ = window.jQuery = jQuery
import Carousel from 'react-bootstrap/Carousel'

import GenerationDisplay from './components/generationDisplay'
import GenerationSettings from './components/GenerationSettings'
import mainGenerate from "./fetch/mainGenerate"

import promptDataImport from './data/promptData'
import durationDataImport from './data/durationData'

import "./style/index.css"

export default function App() {
  const [imageData, setImageData] = useState()
  const [loading, setLoading] = useState({
    screen:false,
    request:false
  })
  const [durationData, setDurationData] = useState(durationDataImport)
  const [data, setData] = useState(promptDataImport)

  function displayCallBack(checkData) {
    setLoading(prevLoad => {
      return {
        ...prevLoad,
        screen:false
      }
    })
    if (checkData !== durationData) {
      setDurationData({...checkData})
    }
  }

  function cancelGenerationRequestCall() {
    setLoading({
      screen:false,
      request:false
    })
  }

  async function generateButtonClicked() {
    if (!loading.request) {
      if (data.prompt) {
  
        //Image reset and loading animation
        setImageData("")
        setLoading(prevLoad => {
          return {
            ...prevLoad,
            screen:true,
            request:true
          }
        })
  
        //Waiting for image
        let imageLinks = await mainGenerate(data, displayCallBack, cancelGenerationRequestCall)
        
        try {
          setImageData(imageLinks.map(e => {
            return (
              <Carousel.Item>
                <img alt="Generated picture" src={e.img}/>
              </Carousel.Item>
            )
          }))
  
          setLoading(prevLoad => {
            return {
              ...prevLoad,
              request:false
            }
          })
        }
        catch(error){console.log(error)}
      }
      else alert("Please enter a legitimate prompt!")
    }
    else alert("Already making a request! Please wait or refresh the page to cancel.")
  }

  //Settings update on change
  function settingsCallback(value) {
    setData(prevData => {
      return {
        ...prevData,
        ...value
      }
    })
  }

  return (
    <>
    {/* Header */}
      <section id="mainTitle-section">
        <h1>Image Generator</h1>
        <h3>Skyler 2023</h3>
      </section>
      
      {/* Content */}
      <section id="mainContent-section">
        <GenerationSettings data={data} settingsCallback={settingsCallback}/>
        <GenerationDisplay generateButtonClicked={generateButtonClicked} imageData={imageData} durationData={durationData} loading={loading}/>
      </section>
    </>
  )
}

{/* <div id="generationDisplay-div">
    <div className="imageDisplay-div">
      <ControlledCarousel imageData={imageData}/>
      <div>Hello!</div>
    </div>
    <div className="controlDisplay-div">
        <button id="generate-button" onClick={generateButtonClicked}>Generate</button>
        <span id="duration-display">Time left: {durationData.wait_time}</span>
        <span id="queue-display">Queue position: {durationData.queue_position}</span>
    </div>
</div> */}