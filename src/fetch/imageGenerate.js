export async function imageGenerate(apiKey, prompt) {
    const options = {
        method: "POST",
        headers: {
            "apikey": apiKey,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "prompt": `${prompt}`,
        })
    }
    try {
        const response = await fetch(`https://aihorde.net/api/v2/generate/async`, options)
        let data = await response.json()
        console.log(data)

        return data
    }
    catch(error) {console.log(error)}
}