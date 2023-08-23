import { imageGenerate } from "./imageGenerate.js"
import { checkGenerate } from "./checkGenerate.js"
import { statusGenerate } from "./statusGenerate.js"
import { cancelGenerate } from "./cancelGenerate.js"

// const apiKey = "L15qrkaHUZU7qbAUlkIlXA" //L15qrkaHUZU7qbAUlkIlXA

export default async function mainGenerate(id, displayCallback) {
    console.log(id)

    try {
        let checkData
        do {
            //Updating display while waiting
            checkData = await checkGenerate(id)
            if (!checkData.message) displayCallback(checkData)
            else throw new Error(checkData.message)
                
            //Outputting image if complete
            if(checkData.done) {
                let statusData = await statusGenerate(id)
                if (!statusData.message) return statusData.generations
                else throw new Error(statusData.message)
            }
        } while(true)

    } catch(error) {
        return error
    }
}