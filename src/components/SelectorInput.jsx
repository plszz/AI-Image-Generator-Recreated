import {useState, useEffect} from 'react'
import getInfo from '../fetch/getInfo'
import Form from 'react-bootstrap/Form';
import Select from 'react-select';

export default function SelectInput({field, fieldName, apiLink}) {
    const [data, setData] = useState()
    const [selection, setSelection] = useState()
    
    useEffect(() => {
        (async function getData() {
            let tempData = await getInfo(apiLink)

            let tempArray = []
            for (let i=0;i<tempData.length;i++) tempArray.push({label: tempData[i].name, value: tempData[i].name})

            setData(tempArray)
        })()                
    }, [])
    
    //https://www.digitalocean.com/community/tutorials/react-react-select
    
    return (
        <div className={`${fieldName}Input-div selectorInput-div`}>
            <label htmlFor={`${fieldName}Input`}>{field}:</label>

            <Select
                options={data}
                onChange={opt => {setSelection(opt.value); console.log(opt.value)}}
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