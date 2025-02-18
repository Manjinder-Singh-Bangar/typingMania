import { useContext,createContext, useState } from "react";


const TestModeContext = createContext()

export const TestModeProvider = ({children}) =>{

    const [testTime, setTestTime] = useState(15)
    const [timeMode, setTimeMode] = useState(true)
    const [wordMode, setWordMode] = useState(false)

    const modes = {
        words: {
            name: "Words",
            method: (e) => {
                setTimeMode(false)
                setWordMode(true)
                if(document.querySelector(".active")) document.querySelector(".active").classList.remove("active")
                e.target.classList.add("active")
            },
            values: ["30", "60","120"]
        },
        time:{
            name: "Seconds",
            method: (e) => {
                setTimeMode(true)
                setWordMode(false)
                if(document.querySelector(".active")) document.querySelector(".active").classList.remove("active")
                e.target.classList.add("active")
            },
            values: ["15", "30","60"]
        }
    }
    


    const values = {
        testTime,
        setTestTime,
        timeMode,
        setTimeMode,
        wordMode,
        setWordMode,
        modes
    }


    return <TestModeContext.Provider value={values}>{children}</TestModeContext.Provider>
}

export const useTestMode = () => useContext(TestModeContext)