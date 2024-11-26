import { useState } from "react"
import Button from "../components/Button"
import Card from "../components/Card"
import Modal from "../components/Modal"
import { PlusIcon } from "../icons/Plus"
import { ShareIcon } from "../icons/Share"
import SideBar from "../components/SideBar"

function DashBoard() {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <>
        <Modal open={modalOpen} onClose={setModalOpen}></Modal>
        <SideBar></SideBar>
        <div className="ml-72 pl-8 min-h-screen bg-slate-100 py-4">
            <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">All Notes</h1>
            <div className="flex justify-end items-center">
                <div className="m-2"><Button onClick={() => {
                    setModalOpen(true);
                }} variant="primary" text="Add Content" startIcon={<PlusIcon></PlusIcon>}></Button></div>
                <div className="m-2 mr-4">
                    <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon></ShareIcon>}></Button>
                </div>
                
            </div>
            </div>
            
            <div className="flex gap-6">
            <Card type="twitter" link="https://x.com/anas_nayeem6205/status/1846478731834994784" title="ALLEN"></Card>
            <Card type="youtube" link="https://www.youtube.com/watch?v=cvla0I-8EYQ" title="IPL AUCTION"></Card>
            </div>      
        </div>
        
        </>
    )
}

export default DashBoard
