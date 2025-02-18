import { useRef } from "react"

let intervalId = useRef()

function startTimer() {
    if (timeMode) {
        setCountDown((latestVal) => {
            if (latestVal <= 1) {

                clearInterval(intervalId.current)
                setTestStart(false)
                setTestEnd(true)
                const { typingSpeed, wrongChar, charAccuracy, } = getUserResult(testTime)
                document.querySelectorAll(".hidden").forEach((item) => {
                    item.classList.remove("hidden")
                })
                setAccuracy(charAccuracy)
                setWPM(typingSpeed)

            }
            return latestVal - 1
        })
    } else if (wordMode) {
        setTimeForWordMode((prev) => {
            return prev + 1
        }
        )
    }

}

const timer = () => {
    intervalId.current = setInterval(startTimer, 1000);

}

export {startTimer, timer}