export default async function getInfo(apiLink) {

  console.log("Getting data from " + apiLink)

  let response = await fetch(apiLink)
  response = await response.json()

  console.log(response)
  return response
}

// import {useState, useEffect} from 'react'

// export default async function getInfo(apiLink) {
//     const [posts, setPosts] = useState();

//     useEffect(() => {
//         async function fetchMyAPI() {
//           let response = await fetch(apiLink)
//           response = await response.json()
//           setPosts(response)

//           console.log(posts)
//         }
    
//         fetchMyAPI()
//       }, []) //Brackets only run this once

//       return
// }