import { useState, useEffect } from 'react'
import jQuery from "jquery"
window.$ = window.jQuery = jQuery
import Carousel from 'react-bootstrap/Carousel'

import GenerationDisplay from './components/generationDisplay'
import GenerationSettings from './components/generationSettings'

import mainGenerate from "./fetch/mainGenerate"
import { imageGenerate } from "./fetch/imageGenerate.js"

import promptDataImport from './data/promptData'
import durationDataImport from './data/durationData'

import "./style/index.css"
import { cancelGenerate } from './fetch/cancelGenerate'

export default function App() {
  const [imageData, setImageData] = useState()
  const [loading, setLoading] = useState({
    screen:false,
    request:false,
    cancel:false
  })
  const [id, setId] = useState()
  const [durationData, setDurationData] = useState(durationDataImport)
  const [data, setData] = useState(promptDataImport)

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

      //Making initial call
      const tempImageData = await imageGenerate("L15qrkaHUZU7qbAUlkIlXA", data)
      console.log(tempImageData)
      if (tempImageData.id) updateIdCallback(tempImageData.id)
      else throw new Error (tempImageData.message)

      //Waiting for image
      let imageLinks = await mainGenerate(data, displayCallBack, updateIdCallback)
      
      try {
        if (imageLinks.message) throw new Error
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
            request:false,
            cancel:false
          }
        })
      }
      catch(error){
        console.log(id)
        console.log(error)
        console.log(imageLinks)
        alert("Error! " + imageLinks.message)
      }
    }
    else alert("Please enter a legitimate prompt!")
  }
  //Call cancelation
  else if (confirm("This will cancel your request. Are you sure?")) {
    setLoading(prevLoading => {return {...prevLoading, request:false}})
    setDurationData(() => {return {...durationDataImport, faulted:true}})
    cancelGenerate(id)
  }
}

  function updateIdCallback(newId) {
    setId(newId)
  }

  // Duration update
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

  //Settings reset
  function resetButtonClicked() {
    setData(promptDataImport)
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
      </section>
      
      {/* Content */}
      <section id="mainContent-section">
        <GenerationSettings data={data} settingsCallback={settingsCallback}/>
        <GenerationDisplay resetButtonClicked={resetButtonClicked} generateButtonClicked={generateButtonClicked} imageData={imageData} durationData={durationData} loading={loading}/>
      </section>

      {/* Footer */}
      <section id="mainFooter-section" className='d-flex align-items-center gap-1'>
        <h6>Skyler 2023</h6> 
        <a href="https://github.com/Vonglory176/ImageGenerator" className="navbar-imageLink" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">
            <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"/>
          </svg>
        </a>
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

// async function generateButtonClicked() {
//   if (!loading.request) {
//     if (data.prompt) {

//       //Image reset and loading animation
//       setImageData("")
//       setLoading(prevLoad => {
//         return {
//           ...prevLoad,
//           screen:true,
//           request:true
//         }
//       })

//       //Waiting for image
//       let imageLinks = await mainGenerate(data, displayCallBack)
      
//       try {
//         if (imageLinks.message) throw new Error
//         setImageData(imageLinks.map(e => {
//           return (
//             <Carousel.Item>
//               <img alt="Generated picture" src={e.img}/>
//             </Carousel.Item>
//           )
//         }))

//         setLoading(prevLoad => {
//           return {
//             ...prevLoad,
//             request:false,
//             cancel:false
//           }
//         })
//       }
//       catch(error){
//         console.log(error)
//         cancelGenerationRequestCall()
//         alert("Error! " + imageLinks.message)
//       }
//     }
//     else alert("Please enter a legitimate prompt!")
//   }
//   else if (confirm("This will cancel your request. Are you sure?")) {
//     setLoading(prevLoading => {return {...prevLoading, cancel:true}})
//   }
// }

// import { imageGenerate } from "./fetch/imageGenerate.js"
// import { checkGenerate } from "./fetch/checkGenerate.js"
// import { statusGenerate } from "./fetch/statusGenerate.js"
// import { cancelGenerate } from "./fetch/cancelGenerate.js"

// const apiKey = "L15qrkaHUZU7qbAUlkIlXA" //L15qrkaHUZU7qbAUlkIlXA

//   function generateButtonClicked() {
//     setLoading(() => {return {screen:true, request:true}})
//     console.log(loading)
//     if (!loading.request) {
//       if (data.prompt) {
  
//         // Image reset and loading animation
//         setImageData("")

//         // Load icon until response
//         console.log(loading)

        
//         setLoading(prevLoad => {
//           return {
//             ...prevLoad,
//             request:false,
//             cancel:false
//           }
//         })
//         console.log(loading)


//         fetchGenerationRequestLoop()
    
//         Reseting load visuals
//         setLoading({
//           screen:false,
//           request:false,
//           cancel:false
//         })
//       }
//       else alert("Please enter a legitimate prompt!")
//     }
//     else if (confirm("This will cancel your request. Are you sure?")) {
//       setLoading(prevLoading => {return {...prevLoading, cancel:true}})
//     }
//   }