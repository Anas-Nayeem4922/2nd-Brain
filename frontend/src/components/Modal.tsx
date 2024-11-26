import { CrossIcon } from "../icons/Cross"
import Button from "./Button"
import Input from "./Input"

const Modal = ({open, onClose} : {open : boolean, onClose : (x : boolean) => void}) => {
    function close () {
        onClose(false)
    }
    return (
        <> 
            {open && <div className="w-screen h-screen fixed top-0 left-0 bg-neutral-950 opacity-50 flex justify-center items-center">
                <div className="flex flex-col justify-evenly">
                    <span className="opacity-100 bg-white p-8 rounded-md ">
                        <div className="flex justify-end cursor-pointer" onClick={close}><CrossIcon/></div>
                        <div>
                            <Input type="text" placeholder="Enter your title"/>
                            <Input type="text" placeholder="Enter your link"/>
                        </div>
                        <div className="my-4 flex justify-center"><Button variant="primary" text="Submit"/></div>
                    </span>
                    
                </div>
            </div>}
        </>
        
    )
}

export default Modal