import { imageGenerate } from "./imageGenerate.js"
import { checkGenerate } from "./checkGenerate.js"
import { statusGenerate } from "./statusGenerate.js"

const apiKey = "L15qrkaHUZU7qbAUlkIlXA" //L15qrkaHUZU7qbAUlkIlXA

export default async function mainGenerate(inputData, displayCallback, cancelGenerationRequestCall) {
    console.log(inputData)

    try {
        //Making initial call
        const imageData = await imageGenerate(apiKey, inputData)
        if (imageData.id) {
            let checkData
            do {
                //Updating display while waiting
                checkData = await checkGenerate(imageData.id)
                if (!checkData.message) displayCallback(checkData)
                else throw new Error(checkData.message)
                    
                //Outputting image if complete
                if(checkData.done) {
                    let statusData = await statusGenerate(imageData.id)
                    if (!statusData.message) return statusData.generations
                    else throw new Error(statusData.message)
                }

            } while(true)
        }
        else throw new Error (imageData.message)

    } catch(error) {
        return error
    }
}