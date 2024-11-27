
const Input = ({placeholder, type, inputRef} : {placeholder : string, type : string, inputRef ?: any}) => {
    return (
        <div>
            <input type={type} className="px-4 py-2 border rounded-md my-2" placeholder={placeholder} ref={inputRef}/>
        </div>
    )
}

export default Input