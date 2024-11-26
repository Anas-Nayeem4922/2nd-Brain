
const Input = ({placeholder, type} : {placeholder : string, type : string}) => {
    return (
        <div>
            <input type={type} className="px-4 py-2 border rounded-md my-2"  placeholder={placeholder}/>
        </div>
    )
}

export default Input