import axios from 'axios'
import { DeleteIcon } from '../icons/Delete'
import { ShareIcon } from '../icons/Share'
import { BACKEND_URL } from '../config'
import { ArticleIcon } from '../icons/Article'
import { VideoIcon } from '../icons/Video'
import { ImageIcon } from '../icons/Image'
import { AudioIcon } from '../icons/Audio'
import { LinkSlashIcon } from '../icons/LinkSlash'
import { MicIcon } from '../icons/Mic'

interface CardProps {
    title : string,
    link : string,
    type : "video" | "article",
    contentId : string,
}

const iconClasses = {
    "article" : <ArticleIcon/>,
    "video" : <VideoIcon/>,
    "image" : <ImageIcon/>,
    "audio" : <AudioIcon/>
}

export const Card = ({title, link, type, contentId} : CardProps) => {
    async function deleteContent() {
        axios.delete(`${BACKEND_URL}/content/${contentId}`, {
            headers : {
                "token" : localStorage.getItem("token")
            }
        });
        window.location.reload();
        
    }
    function renderContent () {
        if(type === "video") {
            if(link.includes("watch?v=")) {
                return <iframe className='w-full h-72 rounded-md' src={link.replace("watch?v=", "embed/")} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            }else{
                return <div className='flex justify-center items-center bg-slate-200 h-72 w-60 rounded-md'>
                    <LinkSlashIcon/>
                </div>
            }
        }else if(type === "article") {
            if(link.includes("x.com")) {
                return <blockquote className="twitter-tweet">
                    <a href={link.replace("x", "twitter")}></a> 
                </blockquote>
            }else{
                return <div className='flex justify-center items-center bg-slate-200 h-72 w-60 rounded-md'>
                    <LinkSlashIcon/>
                </div>
            }
        }else if(type === "image") {
            const newLink = link.replace("http://localhost:5173/", " ");
            return <a href={`/${newLink}`}><img src={link} className='h-72 rounded-md cursor-pointer' alt="Content Image" /></a>
        }else{
            return <div className='flex justify-center items-center bg-slate-200 h-72 w-60 rounded-md'>
                    <MicIcon/>
                </div>
        }
    }
    return (
        <div className='p-8 bg-white rounded-md shadow-md outline-slate-100 max-w-80 border h-96 overflow-y-scroll '>
            <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                    <div className='text-gray-500 cursor-pointer'>{iconClasses[type]}</div>
                    <h1 className='ml-2 font-semibold'>{title}</h1>
                </div>
                <div className='flex items-center text-gray-400'>
                    <div className='pr-4 cursor-pointer'><ShareIcon/></div>
                    <div className='cursor-pointer' onClick={deleteContent}><DeleteIcon/></div>
                </div>
            </div>
            <div className='mt-4'>
                {renderContent()}
            </div>
        </div>
    )
}

export default Card