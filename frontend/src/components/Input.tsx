
const Input = ({placeholder, type, inputRef, label} : {placeholder : string, type : string, inputRef ?: any, label ?: string}) => {
    return (
        <div className="flex flex-col">
            <label className="mt-6">{label}</label>
            <input type={type} className="px-4 py-2 border rounded-md my-2 min-w-80" placeholder={placeholder} ref={inputRef}/>
        </div>
    )
}

export default Input