import { useState, useEffect } from 'react'
import jQuery from "jquery"
window.$ = window.jQuery = jQuery
import Carousel from 'react-bootstrap/Carousel';

// import GenerationDisplay from './components/generationDisplay'
import ControlledCarousel from './components/carouselDisplay'
import GenerationSettings from './components/generationSettings'
import mainGenerate from "./fetch/mainGenerate"

import "./style/index.css"

export default function App() {
  const [displayData, setDisplayData] = useState()
  const [durationDisplay, setDurationDisplay] = useState({
    wait_time:0,
    queue_position:0
  })
  const [data, setData] = useState({
    prompt:"",
    negativePrompt:"",
    seed:"",
    batchSize:"1",
    steps:"30",
    width:"512",
    height:"512",
    guidance:"7",
    clipSkip:"1",
    model:"",
    hiResFix:false,
    karras:false,
    trustedWorkers:false,
    createVideo:false,
    tiling:false,
    nsfw:false
  })

  function displayCallBack(checkData) {
    if (checkData.wait_time !== durationDisplay.wait_time) {
      setDurationDisplay(checkData)
    }
  }

  async function generateButtonClicked() {
      console.log(data)
      let imageLinks = await mainGenerate(data, displayCallBack)
      setDisplayData(imageLinks.map(e => {
        return (
          <Carousel.Item>
            <img alt="Generated picture" src={e.img}/>
          </Carousel.Item>
        )
      }))
  }

  // useEffect(() => {$("#generate-button").on("click", () => {generateButtonClicked()})},[])

  //Settings update on change
  function settingsCallback(value) {
    setData(prevData => {
      return {
        ...prevData,
        ...value
      }
    })
  }
  // useEffect(() => console.log(data))

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

        <div id="generationDisplay-div">
            <div className="imageDisplay-div">
              <ControlledCarousel displayData={displayData}/>
            </div>
            <div className="controlDisplay-div">
                <button id="generate-button" onClick={generateButtonClicked}>Generate</button>
                <span id="duration-display">Time left: {durationDisplay.wait_time}</span>
                <span id="queue-display">Queue position: {durationDisplay.queue_position}</span>
            </div>
        </div>
      </section>
    </>
  )
}