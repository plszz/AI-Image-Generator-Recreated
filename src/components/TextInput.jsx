export default function TextInput({field, fieldName, fieldValue, settingsCallback}) {

    return (
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
    )
}