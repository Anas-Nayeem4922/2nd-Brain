import Button from "./components/Button"
import Card from "./components/Card"
import { PlusIcon } from "./icons/Plus"
import { ShareIcon } from "./icons/Share"

function App() {

  return (
    <>
      <Button variant="primary" text="Add Content" startIcon={<PlusIcon></PlusIcon>}></Button>
      <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon></ShareIcon>}></Button>
      <div className="flex gap-6">
        <Card type="twitter" link="https://x.com/anas_nayeem6205/status/1846478731834994784" title="ALLEN"></Card>
        <Card type="youtube" link="https://www.youtube.com/watch?v=cvla0I-8EYQ" title="IPL AUCTION"></Card>
      </div>
      
    </>
  )
}

export default App
