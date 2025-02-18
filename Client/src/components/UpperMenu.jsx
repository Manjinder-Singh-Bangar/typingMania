import React from 'react'
import { useTestMode } from '../Context/TextModeContext'
import { red } from '@mui/material/colors'

function UpperMenu({ countdown, classname }) {

    const { testTime, setTestTime, timeMode, setTimeMode, wordMode, setWordMode, modes } = useTestMode()

    
    const updateTime = (e) => {
        setTestTime(Number(e.target.id))
    }
    return (
        <div className=' flex w-3/5 mx-auto justify-between mb-3 font-bold'>
            <div className="counter">
                {wordMode ? (countdown + 1) + " / " + testTime : countdown}
            </div>
            <div className="uppermenu test-mode flex">
                <button onClick={modes.words.method}>{modes.words.name}</button>{" "}/{" "}
                <button className='active' onClick={modes.time.method}>{modes.time.name}</button>
            </div>
            <div className="uppermenu modes flex gap-3">
                {
                    wordMode ? modes.words.values.map((item)=>{
                        return (
                            <div key={item} className="uppermenu time-mode cursor-pointer" id={item} onClick={updateTime}>{item}</div>
                        )
                    }) : modes.time.values.map((item) =>{
                        return(
                            <div key={item} className="uppermenu time-mode cursor-pointer" id={item} onClick={updateTime}>{item}s</div>
                        )
                    })
                }
                
            </div>
        </div>
    )
}

export default UpperMenu