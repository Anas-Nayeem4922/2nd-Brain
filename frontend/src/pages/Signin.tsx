import { useRef } from "react"
import Button from "../components/Button"
import Input from "../components/Input"
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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
            <div className="bg-white rounded-md border min-w-48 p-8 flex flex-col items-center">
                <p className="text-2xl font-bold text-gray-900 my-4">Signin to your 2nd Brain</p>
                <Input label="Enter your email" inputRef={emailRef} placeholder="Enter your email" type="text"/>
                <Input label="Enter your password" inputRef={passwordRef} placeholder="Enter your password" type="password"/>
                <div className="flex justify-center py-4"><Button onClick={signin} text="Signin" fullWidth={true} variant="primary" loading={false}/></div>
                <div className="text-gray-600">Don't have an account? <Link to="/signup"><span className="text-purple-600 underline">Signup</span></Link></div>
            </div>

        </div>
    )
}
