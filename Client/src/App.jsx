import { useState } from 'react'
import TypingBox from './components/TypingBox.jsx'
import "./index.css"
import UpperMenu from './components/UpperMenu.jsx'


function App() {

  return (

    <div className='bg-gray-800 flex w-5/5 flex-col justify-center items-center h-full'>
      <TypingBox />
    </div>

  )
}

export default App
