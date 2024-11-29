import { ArticleIcon } from "../icons/Article"
import { AudioIcon } from "../icons/Audio"
import { ImageIcon } from "../icons/Image"
import { VideoIcon } from "../icons/Video"

interface CapsuleProps {
    text : "article" | "video" | "image" | "audio",
    onClick : () => void,
    variant : "primary" | "secondary",
}

const variantClasses = {
    "primary" : "bg-purple-400 text-white",
    "secondary": "bg-purple-200 text-purple-600"
}

const iconClasses = {
    "article" : <ArticleIcon/>,
    "video" : <VideoIcon/>,
    "image" : <ImageIcon/>,
    "audio" : <AudioIcon/>
}


export const Capsule = ({text, onClick, variant} : CapsuleProps) => {
    return <div onClick={onClick} className={`${variantClasses[variant]} cursor-pointer px-6 py-1 rounded-2xl flex justify-between items-center`}>
        <p className="mr-2">{iconClasses[text]}</p>
        <p>{text}</p>
    </div>
}