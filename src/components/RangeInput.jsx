import Form from 'react-bootstrap/Form';

export default function RangeInput({field, fieldName, min, max, step, fieldValue, settingsCallback}) {

    // https://www.npmjs.com/package/react-bootstrap-range-slider/v/1.2.2

    return (
        <div className={`${fieldName}Input-div rangeInput-div`}>
            <label htmlFor={`${fieldName}Input`}>{field}:</label>

            <Form.Range 
                min = {min}
                max = {max}
                step = {step}
                value = {fieldValue}
                name={`${fieldName}Input`}
                id = {`${fieldName}Input-range`}
                onChange={e => {
                    settingsCallback({[fieldName]:e.target.value})
                    }
                }
            />

            <input type='number' value={fieldValue} min={min} max={max} onChange={e => settingsCallback({[fieldName]:e.target.value})}/>
        </div>
    )
}