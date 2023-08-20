import {useState, useEffect} from 'react'
import getModels from '../fetch/getModels'
import Select from 'react-select';
import TooltipDisplay from './TooltipDisplay';

export default function SelectInput({field, fieldName, apiLink, defaultOption, settingsCallback, tooltipInfo}) { //Re add APILINK when post-processor
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
            <label htmlFor={`${fieldName}Input`}>
                {field}
                {tooltipInfo && <TooltipDisplay tooltipInfo={tooltipInfo}/>}
            </label>

            <Select //Lacks local useState update!!!
                options={data}
                menuPlacement = "auto"
                value = { //Setting default option
                    data && data.filter(option => 
                    option.label === defaultOption)
                 }
                onChange={e => {
                    let value=e.value
                    settingsCallback({[fieldName]:value})
                    }
                }
            />
        </div>
        )
    }