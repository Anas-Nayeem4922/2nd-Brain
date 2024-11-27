import { useRef, useState } from "react"
import { CrossIcon } from "../icons/Cross"
import Button from "./Button"
import Input from "./Input"
import { BACKEND_URL } from "../config"
import axios from "axios"

enum ContentType  { 
    Youtube = "youtube",
    Twitter = "twitter"
}

const Modal = ({open, onClose} : {open : boolean, onClose : (x : boolean) => void}) => {
    function close () {
        onClose(false)
    }
    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const [type, setType] = useState(ContentType.Youtube);
    async function addContent() { 
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        await axios.post(`${BACKEND_URL}/content`, {
            link,
            type : type === ContentType.Youtube ? "video" : "article", 
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
                        <div className="flex justify-end cursor-pointer" onClick={close}>
                            <CrossIcon />
                        </div>
                        <div>
                            <Input inputRef={titleRef} type="text" placeholder="Enter your title" />
                            <Input inputRef={linkRef} type="text" placeholder="Enter your link" />
                        </div>
                        <div className="flex flex-col mt-2 mb-4">
                            <div className="text-gray-500 mb-2">Choose type</div>
                            <div className="flex justify-between items-center">
                                <Button onClick={() => {
                                    setType(ContentType.Youtube)
                                }} text="Youtube" variant={`${type === ContentType.Youtube ? `primary` : `secondary`}`}/>
                                <Button onClick={() => {
                                    setType(ContentType.Twitter)
                                }} text="Twitter" variant={`${type === ContentType.Twitter ? `primary` : `secondary`}`}/>
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