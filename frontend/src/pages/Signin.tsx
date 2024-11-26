import Button from "../components/Button"
import Input from "../components/Input"

export const Signin = () => {
    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-md border min-w-48 p-8">
                <Input placeholder="Enter your email" type="text"/>
                <Input placeholder="Enter your password" type="password"/>
                <div className="flex justify-center py-4"><Button text="Signin" variant="primary" loading={false}/></div>
            </div>

        </div>
    )
}
