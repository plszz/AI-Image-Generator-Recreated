import Form from 'react-bootstrap/Form'

export default function TextInput({field, fieldName, fieldValue, settingsCallback}) {
    return (
        
        <Form.Group className={`${fieldName}Input-div textInput-div`}>
            <Form.Label htmlFor={`${fieldName}Input`}>{field}:</Form.Label>
            <Form.Control 
                as="textarea" 
                name={`${fieldName}Input`} 
                onChange={e => {settingsCallback({[fieldName]:e.target.value})}}
                placeholder={`${field} goes here`}
                value={fieldValue}
            />
        </Form.Group>
    )
}

{/* 
    <div className={`${fieldName}Input-div textInput-div`}>
        <label htmlFor={`${fieldName}Input`}>{field}:</label>
        <textarea 
        name={`${fieldName}Input`} 
        onChange={e => {
            settingsCallback({[fieldName]:e.target.value})
            }
        }
        placeholder={`${field} goes here`}
        value={fieldValue}
        >                
        </textarea>
    </div> 
*/}