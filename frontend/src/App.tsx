import Button from "./components/Button"
import { PlusIcon } from "./icons/Plus"
import { ShareIcon } from "./icons/Share"

function App() {

  return (
    <>
      <Button variant="primary" text="Add Content" startIcon={<PlusIcon></PlusIcon>}></Button>
      <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon></ShareIcon>}></Button>
    </>
  )
}

export default App
