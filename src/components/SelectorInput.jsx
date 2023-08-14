import {useState, useEffect} from 'react'
import getModels from '../fetch/getModels'
import Select from 'react-select';

export default function SelectInput({field, fieldName, apiLink, settingsCallback}) { //Re add APILINK when post-processor
    const [data, setData] = useState()
    
    useEffect(() => {
        (async function getData() {
            //Saving response
            let res = await getModels(), tempArray = []

            //Converting to selector option elements
            for (let i=0;i<res.length;i++) tempArray.push({label: res[i].name, value: res[i].name})

            //Updating selector options
            setData(tempArray)
        })()                
    }, [])
    
    //https://www.digitalocean.com/community/tutorials/react-react-select
    
    return (
        <div className={`${fieldName}Input-div selectorInput-div`}>
            <label htmlFor={`${fieldName}Input`}>{field}:</label>

            <Select //Lacks local useState update!!!
                options={data}
                onChange={e => {
                    let value=e.value
                    settingsCallback({[fieldName]:value})
                    }
                }
            />
        </div>
        )
    }
    
    // const [posts, setPosts] = useState();

    // useEffect(() => {
    //     async function fetchMyAPI() {
    //       let response = await fetch(apiLink)
    //       response = await response.json()
    //       setPosts(response)

    //       console.log(posts)
    //     }
    
    //     fetchMyAPI()
    //   }, []) //Brackets only run this once