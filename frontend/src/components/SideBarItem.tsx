import { ReactElement } from "react"

interface SideBarProps {
    icon : ReactElement,
    text : string
}
export const SideBarItem = ({icon, text} : SideBarProps) => {
    return (
        <div className="flex items-center my-3 py-3 cursor-pointer hover:bg-indigo-100
        transition-all ease-in-out delay-100 rounded-md">
            <div className="mx-6">{icon}</div>
            <div>{text}</div>
        </div>
    )
}
