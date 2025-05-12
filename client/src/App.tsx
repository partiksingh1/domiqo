import { useState } from 'react'
import { createBrowserRouter } from "react-router";
import { Navbar } from './components/Navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <Navbar/>
   <h1 className='underline bg-red-400'>hello</h1>
   </>
  )
}

export default App
