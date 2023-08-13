import { imageGenerate } from "./fetch/imageGenerate.js"
import { checkGenerate } from "./fetch/checkGenerate.js"
import { statusGenerate } from "./fetch/statusGenerate.js"

const apiKey = "L15qrkaHUZU7qbAUlkIlXA"

$("#generate-button").on("click", generateButtonClicked)

async function generateButtonClicked() {
    let input = $("#prompt-input").val().trim()
    console.log(input)

    if (input) {
        $("#generate-button").attr("disabled", "true")
        let imageData = await imageGenerate(apiKey, input)
        
        let interval, checkData, counter = 0
        interval = setInterval(async () => {
            checkData = await checkGenerate(imageData.id)
            $("#timer span").html(counter++)
    
            try {
                if(checkData.done) {
                    clearInterval(interval)
                    let statusData = await statusGenerate(imageData.id)
                    $("#output-img").attr("src",`${statusData.generations[0].img}`)
                    $("#generate-button").removeAttr("disabled")
                }
            } catch(error) {console.log(error)}
        }, 1000)
    }
    else alert("Please enter a legitimate prompt")
}