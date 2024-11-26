
const Input = ({placeholder, type, onChange} : {placeholder : string, type : string, onChange ?: () => void}) => {
    return (
        <div>
            <input type={type} className="px-4 py-2 border rounded-md my-2" onChange={onChange} placeholder={placeholder}/>
        </div>
    )
}

export default Input