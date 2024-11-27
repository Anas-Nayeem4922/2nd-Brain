import { ReactElement } from 'react'

interface ButtonProps {
    variant : "primary" | "secondary",
    text : string,
    startIcon ?: ReactElement,
    onClick ?: () => void,
    loading ?: boolean,
    fullWidth ?: boolean
}

const variantClasses = {
    "primary" : "bg-purple-600 text-white",
    "secondary" : "bg-purple-200 text-purple-500"
}

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center"

const Button = ({variant, text, startIcon, onClick, loading, fullWidth} : ButtonProps) => {
    return (
        <button onClick={onClick} className={`${variantClasses[variant]} ${defaultStyles} ${loading ? `cursor-wait opacity-80` : `cursor-pointer`} ${fullWidth ? `px-12` : `px-4`}`}>
            <div className='pr-2'>{startIcon}</div>
            {text}
        </button>
    )
}


export default Button