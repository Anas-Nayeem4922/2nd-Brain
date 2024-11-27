import { useRef } from "react"
import Button from "../components/Button"
import Input from "../components/Input"
import axios from "axios"
import { BACKEND_URL } from "../config"

    export const Signup = () => {
        const usernameRef = useRef<HTMLInputElement>();
        const emailRef = useRef<HTMLInputElement>();
        const passwordRef = useRef<HTMLInputElement>();
        async function signup () {
            const username = usernameRef.current?.value;
            const email = emailRef.current?.value;
            const password = passwordRef.current?.value;
            const response = await axios.post(`${BACKEND_URL}/signup`, {
                username,
                email,
                password
            });
            alert("You have signed up");
        }
    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-md border min-w-48 p-8">
                <Input placeholder="Enter your email" type="text" inputRef={emailRef}/>
                <Input placeholder="Enter your username" type="text" inputRef={usernameRef}/>
                <Input placeholder="Enter your password" type="password" inputRef={passwordRef}/>
                <div className="flex justify-center py-4"><Button onClick={signup} text="Signup" variant="primary" loading={false}/></div>
            </div>

        </div>
    )
}
