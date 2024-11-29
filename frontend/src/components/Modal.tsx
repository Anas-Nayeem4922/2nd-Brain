import { useRef, useState } from "react"
import { CrossIcon } from "../icons/Cross"
import Button from "./Button"
import Input from "./Input"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { Capsule } from "./Capsule"

enum ContentType  { 
    Video = "video",
    Article = "article",
    Image = "image",
    Audio = "audio"
}

const Modal = ({open, onClose} : {open : boolean, onClose : (x : boolean) => void}) => {
    function close () {
        onClose(false)
    }
    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const [type, setType] = useState(ContentType.Video);
    async function addContent() { 
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        await axios.post(`${BACKEND_URL}/content`, {
            link,
            type,
            title
        }, {
            headers : {
                "token" : localStorage.getItem("token")
            }
        });
        alert("Content added");
    }
    return (
        <> 
            {open && (
                <div className="z-10 w-screen h-screen fixed top-0 left-0 bg-purple-200 bg-opacity-70 flex justify-center items-center">
                    <div className="z-20 bg-white p-8 rounded-md">
                        <div className="flex justify-between cursor-pointer" onClick={close}>
                            <p className="text-2xl font-bold">Add your content</p>
                            <CrossIcon />
                        </div>
                        <div>
                            <Input label="Enter your title" inputRef={titleRef} type="text" placeholder="Enter your title" />
                            <Input label="Enter your link" inputRef={linkRef} type="text" placeholder="Enter your link" />
                        </div>
                        <div className="flex flex-col mt-2 mb-6">
                            <div className="text-gray-800 mt-3">Choose type</div>
                            <div className="flex justify-between gap-4 my-4 items-center">
                                <Capsule onClick={() => {
                                    setType(ContentType.Video)
                                }} text="video" variant={`${type === ContentType.Video ? `primary` : `secondary`}`}/>
                                <Capsule onClick={() => {
                                    setType(ContentType.Article)
                                }} text="article" variant={`${type === ContentType.Article ? `primary` : `secondary`}`}/>
                                <Capsule onClick={() => {
                                    setType(ContentType.Image)
                                }} text="image" variant={`${type === ContentType.Image ? `primary` : `secondary`}`}/>
                                <Capsule onClick={() => {
                                    setType(ContentType.Audio)
                                }} text="audio" variant={`${type === ContentType.Audio ? `primary` : `secondary`}`}/>
                            </div>
                            
                        </div>
                        <div className="my-4 flex justify-center">
                            <Button fullWidth={true} onClick={addContent} variant="primary" text="Submit" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal