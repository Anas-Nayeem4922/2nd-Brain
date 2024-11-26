import { BrainIcon } from "../icons/Brain"
import { TwitterIcon } from "../icons/Twitter"
import { YoutubeIcon } from "../icons/Youtube"
import { SideBarItem } from "./SideBarItem"

const SideBar = () => {
    return (
        <div className="h-screen border-r bg-white w-72 fixed left-0 top-0">
            <h1 className="text-3xl font-bold mx-3 my-4 mb-6 flex items-center">
                <div className="mr-3 text-purple-600"><BrainIcon/></div>
                <p className="text-slate-800">Brainly</p>
            </h1>
            <SideBarItem icon={<TwitterIcon/>} text="Tweets"></SideBarItem>
            <SideBarItem icon={<YoutubeIcon/>} text="Videos"></SideBarItem>
        </div>
    )
}

export default SideBar