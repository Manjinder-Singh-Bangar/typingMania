import React, { useEffect, useState } from 'react'

function Countdown({time}){
    let [seconds, setSeconds] = useState(time)
    useEffect(() => {
        if (seconds <= 0) return;
    
        const countdown = setInterval(() => {
          setSeconds((prev) => prev - 1);
        //   console.log(seconds)
        }, 1000);

        return () => clearInterval(countdown);
      }, [seconds]);
    
  return (
    <div className='w-2/4 text-black'>
        <p>seconds: {seconds}</p>
    </div>
  )
}


const SelectTimeButton = ({time}) =>{
    return (
        <>
        <button onClick={() => Countdown(time)}>
            {time}</button>
        </>
    )
}
export {Countdown, SelectTimeButton}