export async function statusGenerate(id) {
    try {
        const options = {
            method: "GET"
        }

        const response = await fetch(`https://aihorde.net/api/v2/generate/status/${id}`, options)
        let data = await response.json()
        console.log(data)

        return data
    }
    catch (error) {console.log(error)}
}