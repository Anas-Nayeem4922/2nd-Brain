import { useRef } from "react"
import Button from "../components/Button"
import Input from "../components/Input"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { Link, useNavigate } from "react-router-dom"

    export const Signup = () => {
        const usernameRef = useRef<HTMLInputElement>();
        const emailRef = useRef<HTMLInputElement>();
        const passwordRef = useRef<HTMLInputElement>();
        const navigate = useNavigate();
        async function signup () {
            const username = usernameRef.current?.value;
            const email = emailRef.current?.value;
            const password = passwordRef.current?.value;
            interface Res {
                data : {
                    token : string
                }
            }
            let response : Res = await axios.post(`${BACKEND_URL}/signup`, {
                username,
                email,
                password
            });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        }
    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white flex flex-col items-center rounded-xl border min-w-48 p-8">
                <p className="text-2xl font-bold text-gray-900 my-4">Signup to your 2nd Brain</p>
                <Input label="Enter your email" placeholder="Enter your email" type="text" inputRef={emailRef}/>
                <Input label="Enter your username" placeholder="Enter your username" type="text" inputRef={usernameRef}/>
                <Input label="Enter your password" placeholder="Enter your password" type="password" inputRef={passwordRef}/>
                <div className="flex justify-center my-6"><Button onClick={signup} text="Signup" variant="primary" fullWidth={true} loading={false}/></div>
                <div className="text-gray-600">Already have an account? <Link to="/signin"><span className="text-purple-600 underline">Signin</span></Link></div>
            </div>

        </div>
    )
}
