import { useRef } from "react"
import Button from "../components/Button"
import Input from "../components/Input"
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    async function signin() {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        interface Res { 
            data : {
                token : string,
                msg : string
            }
            
        }
        const response : Res = await axios.post(`${BACKEND_URL}/signin`, {
            email,
            password
        });
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        navigate("/dashboard");
    }
    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-md border min-w-48 p-8">
                <Input inputRef={emailRef} placeholder="Enter your email" type="text"/>
                <Input inputRef={passwordRef} placeholder="Enter your password" type="password"/>
                <div className="flex justify-center py-4"><Button onClick={signin} text="Signin" variant="primary" loading={false}/></div>
            </div>

        </div>
    )
}
