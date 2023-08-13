export default function TextInput({field, fieldName}) {

    return (
        <div className={`${fieldName}Input-div textInput-div`}>
            <label htmlFor={`${fieldName}Input`}>{field}: </label>
            <textarea name={`${fieldName}Input`} placeholder={`${field} goes here`}></textarea>
        </div>
    )
}