import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';

export default function RangeInput({field, fieldName, base, min, max}) {
    const [value, setValue] = useState(base)

    // https://www.npmjs.com/package/react-bootstrap-range-slider/v/1.2.2

    return (
        <div className={`${fieldName}Input-div rangeInput-div`}>
            <label htmlFor={`${fieldName}Input`}>{field}:</label>

            <Form.Range 
                min = {min}
                max = {max}
                value = {value}
                name={`${fieldName}Input`}
                id = {`${fieldName}Input-range`}
                onChange = {e => setValue(e.target.value)}
            />

            <input type='number' value={value} min={min} max={max} onChange={e => setValue(e.target.value)}/>
        </div>
    )
}