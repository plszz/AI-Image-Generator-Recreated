import Form from 'react-bootstrap/Form';

export default function SwitchInput({field, fieldName, fieldCheck, settingsCallback}) {

    return (
        <div className={`${fieldName}Input-div switchInput-div`}>
            <label htmlFor={`${fieldName}Input`}>{field}:</label>

            <Form.Check // prettier-ignore
                type="switch"
                name={`${fieldName}Input`}
                id={`${fieldName}Input-switch`}
                onChange={e => {
                    settingsCallback({[fieldName]:e.target.checked})
                    }
                }
                checked={fieldCheck}
            />
        </div>
    )
}