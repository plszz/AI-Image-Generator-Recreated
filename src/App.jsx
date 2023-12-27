import { useState, useEffect } from 'react'
import { Carousel } from '@headlessui/react'

import GenerationDisplay from './components/generationDisplay'
import GenerationSettings from './components/GenerationSettings'

import mainGenerate from "./fetch/mainGenerate"
import { imageGenerate } from "./fetch/imageGenerate.js"

import promptDataImport from './data/promptData'
import durationDataImport from './data/durationData'

import "./style/index.css"
import { cancelGenerate } from './fetch/cancelGenerate'

export default function App() {
  const [imageData, setImageData] = useState()
  const [loading, setLoading] = useState({
    showLoadScreen:false,
    makingRequest:false
  })
  const [id, setId] = useState()
  const [durationData, setDurationData] = useState(durationDataImport)
  const [data, setData] = useState(promptDataImport)

  async function generateButtonClicked() {
    // Already loading? If not, check prompt
    if (!loading.makingRequest) {
      if (data.prompt) {

        //Image reset and loading animation
        setImageData("")
        setLoading(prevLoad => {
          return {
            ...prevLoad,
            showLoadScreen:true,
            makingRequest:true
          }
        })
        
        try {
          //Making initial call
          const tempImageData = await imageGenerate("L15qrkaHUZU7qbAUlkIlXA", data)
          console.log(tempImageData)
          
          //Saving ID
          if (tempImageData.id) setId(tempImageData.id)
          else throw new Error (tempImageData.message)
          
        }
        catch (error) {
          alert(error)
          resetRequestDisplay()
        }
      }
      else alert("Please enter a legitimate prompt!")
    }
    //Call cancelation
    else if (confirm("This will cancel your request. Are you sure?")) {
      cancelGenerate(id)
      resetRequestDisplay()
    }
  }

  //Repeat when ID changes
  useEffect(() => {
    console.log(id)
    async function startCheckProcess() {
      let tempImageData
      try {
        tempImageData = await mainGenerate(id, displayCallBack)
        if (tempImageData) {
          setImageData(tempImageData.map(e => {
            return (
              <Carousel.Slide key="">
                <img alt="Generated picture" src={e.img} className="w-full h-full object-cover"/>
              </Carousel.Slide>
            )
          }))
        }
      }
      catch (error) {
        console.log(error)
        if (tempImageData.message) alert(tempImageData.message)
      }
  
      //Loading screen reset
      setLoading(prevLoad => {return {...prevLoad, makingRequest:false}})
    }
    if (id) startCheckProcess()
  }, [id])

  function resetRequestDisplay() {
    setLoading(prevLoading => {return {...prevLoading, makingRequest:false, showLoadScreen:false}})
    setDurationData(durationDataImport)
  }

  // Duration update
  function displayCallBack(checkData) {
    if (loading.showLoadScreen) {
      setLoading(prevLoad => {
        return {
          ...prevLoad,
          showLoadScreen:false
        }
      })
    }
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
      <section id="mainTitle-section" className="bg-gray-100 dark:bg-gray-800 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100">Image Generator</h1>
      </section>
      
      {/* Content */}
      <section id="mainContent-section" className="flex flex-col md:flex-row gap-4 p-4">
        <GenerationSettings data={data} settingsCallback={settingsCallback} className="w-full md:w-1/3"/>
        <GenerationDisplay resetButtonClicked={resetButtonClicked} generateButtonClicked={generateButtonClicked} imageData={imageData} durationData={durationData} loading={loading} className="w-full md:w-2/3"/>
      </section>
    </>
  )
}
