import { DeleteIcon } from '../icons/Delete'
import { ShareIcon } from '../icons/Share'

interface CardProps {
    title : string,
    link : string,
    type : "youtube" | "twitter"
}

const Card = ({title, link, type} : CardProps) => {
    return (
        <div className='p-8 bg-white rounded-md shadow-md outline-slate-100 max-w-80 border h-full'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                    <div className='text-gray-500 cursor-pointer'><ShareIcon/></div>
                    <h1 className='ml-2 text-md'>{title}</h1>
                </div>
                <div className='flex items-center text-gray-400'>
                    <div className='pr-4 cursor-pointer'><ShareIcon/></div>
                    <div className='cursor-pointer'><DeleteIcon/></div>
                </div>
            </div>
            <div className='mt-4'>
                {type === "youtube" ? <iframe className='w-full h-72 rounded-md'  src={link.replace("watch", "embed").replace("?v=", "/")} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> : <blockquote className="twitter-tweet">
                    <a href={link.replace("x", "twitter")}></a> 
                </blockquote>}
            </div>
            
        </div>
    )
}

export default Card