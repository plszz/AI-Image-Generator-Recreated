import { imageGenerate } from "./imageGenerate.js"
import { checkGenerate } from "./checkGenerate.js"
import { statusGenerate } from "./statusGenerate.js"

const apiKey = "L15qrkaHUZU7qbAUlkIlXA"

export default async function mainGenerate(inputData, displayCallback) {
    // const [status, setStatus] = useState()
    console.log(inputData)

    if (inputData.prompt && inputData.model) {
        //Making initial call
        const imageData = await imageGenerate(apiKey, inputData)
        if (imageData.id) {
            let checkData = true
            do {
                //Updating display while waiting
                displayCallback(checkData = await checkGenerate(imageData.id))
                try {
                    //Outputting image if complete
                    if(checkData.done) {
                        let statusData = await statusGenerate(imageData.id)
                        return statusData.generations
                    }
                } catch(error) {
                    console.log(error)
                    checkData = false
                }
            }while(checkData)
        }
        else alert("Error! Check logs.")
    }
    else alert("Please enter a legitimate prompt and model!")
}

// $("#generate-button").on("click", generateButtonClicked)

// async function generateButtonClicked() {
//     let input = $("#prompt-input").val().trim()
//     console.log(input)

//     if (input) {
//         $("#generate-button").attr("disabled", "true")
//         let imageData = await imageGenerate(apiKey, input)
        
//         let interval, checkData, counter = 0
//         interval = setInterval(async () => {
//             checkData = await checkGenerate(imageData.id)
//             $("#timer span").html(counter++)
    
//             try {
//                 if(checkData.done) {
//                     clearInterval(interval)
//                     let statusData = await statusGenerate(imageData.id)
//                     $("#output-img").attr("src",`${statusData.generations[0].img}`)
//                     $("#generate-button").removeAttr("disabled")
//                 }
//             } catch(error) {console.log(error)}
//         }, 1000)
//     }
//     else alert("Please enter a legitimate prompt")
// }