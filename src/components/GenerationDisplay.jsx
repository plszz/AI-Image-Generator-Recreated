// import { useState, useEffect } from "react"
// import mainGenerate from "../fetch/mainGenerate"

// export default function GenerationDisplay({data, getData}) {
//     const [displayData, setDisplayData] = useState()
//     const [inputData, setInputData] = useState()
    
//     // function displayCallBack(checkData) {
//     //     console.log(checkData)
//     // }
    
//     async function generateButtonClicked() {
//         console.log(getData())
//         // let imageLink = mainGenerate(data, displayCallBack)
//         // setDisplayData(<img src={imageLink}/>)
//     }

//     useEffect(() => {$("#generate-button").on("click", () => {generateButtonClicked()})},[])

//     return(
//         <div id="generationDisplay-div">
//             <div className="imageDisplay-div">{displayData}</div>
//             <div className="controlDisplay-div">
//                 <button id="generate-button">Generate</button>
                
//             </div>
//         </div>
//     )
// }