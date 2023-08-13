import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';

export default function SwitchInput({field, fieldName, baseCheck}) {
    const [check, setCheck] = useState(!baseCheck? true : false)

    // https://www.npmjs.com/package/react-bootstrap-range-slider/v/1.2.2

    return (
        <div className={`${fieldName}Input-div switchInput-div`}>
            <label htmlFor={`${fieldName}Input`}>{field}:</label>

            <Form.Check // prettier-ignore
                type="switch"
                name={`${fieldName}Input`}
                id={`${fieldName}Input-switch`}
                onChange = {(e) => {setCheck(!check); console.log(check)}}
            />
        </div>
    )
}