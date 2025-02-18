import React, { createRef, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { generate, count } from 'random-words'
import UpperMenu from './UpperMenu';
import { useTestMode } from '../Context/TextModeContext.jsx';




function TypingBox() {
    const { testTime, setTestTime, timeMode, wordMode, modes } = useTestMode()
    const [words, setWords] = useState(() => generate(wordMode ? testTime : 120));
    console.log(words)
    const [countdown, setCountDown] = useState(15)
    const [testStart, setTestStart] = useState(false)
    const [testEnd, setTestEnd] = useState(false)
    const [currCharIndex, setCurrCharIndex] = useState(0);
    const [currWordIndex, setCurrWordIndex] = useState(0);
    const [mouseMoved, setMouseMoved] = useState("")
    const [accuracy, setAccuracy] = useState(0)
    const [timeForWordMode, setTimeForWordMode] = useState(0)
    const [wpm, setWPM] = useState(0)
    let intervalId = useRef()

    const wordSpanRef = useMemo(() => {
        return Array(words.length).fill(0).map(i => createRef(null))
    }, [words])

    const getUserResult = (time) => {
        const correct = document.querySelectorAll(".correct")
        const wrongChar = document.querySelectorAll(".red")
        const correctChar = document.querySelectorAll(".green")
        const totalTypedChar = wrongChar.length + correctChar.length
        const error = document.querySelectorAll(".error")
        const typed = document.querySelectorAll(".typed")
        const skippedChar = document.querySelectorAll(".skipped")
        const charAccuracy = Math.round((correctChar.length / totalTypedChar) * 100)
        const timeInMinutes = time / 60;
        const typingSpeed = Math.ceil(correct.length / timeInMinutes);

        let resultDetails = {
            typingSpeed: typingSpeed,
            charAccuracy: charAccuracy,
            error: error.length,
            wrongChar: wrongChar.length,
            skippedChar: skippedChar.length,
            totalWordsTyped: typed
        }

        return resultDetails
    }

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

    useEffect(() => {
        if (timeMode) {
            setCountDown(testTime)
            setWords(() => generate(120))
            setTestEnd(true)
            setTestStart(false)

        } else if (wordMode) {
            // setTestTime(30)
            setCountDown(testTime)
            setTestEnd(true)
            setTimeForWordMode(0)
            setTestStart(false)
            setWords(() => generate(testTime))

        }

    }, [testTime])



    // this code is setting changing the countdown for words test as the test mode changes
    useEffect(() => {
        if (wordMode) {
            setCountDown(currWordIndex)
        } else {
            return
        }
    }, [currWordIndex])


    const inputRef = useRef(null)

    const handleKeyDown = (e) => {
        const allCurrChar = wordSpanRef[currWordIndex].current.childNodes
        let upperMenuElem = document.querySelectorAll(".uppermenu")

        if (testStart) {
            upperMenuElem.forEach((item) => item.classList.add("hidden"))
            document.addEventListener("mousemove", () => {
                setMouseMoved("Keep Typing")
            })
        } else if (testEnd) {
            upperMenuElem.forEach((item) => item.classList.remove("hidden"))
        }


        // Ending the test when the testMode is wordMode and it's on the last word and last Letter
        if (wordMode && currWordIndex === testTime - 1 && currCharIndex === wordSpanRef[currWordIndex].current.childNodes.length - 1) {
            setCountDown((prev) => prev + 1)
            setTestEnd(true)
            clearInterval(intervalId.current)
            setTestStart(false)
            setTestEnd(true)
            const { typingSpeed, totalWordsTyped, wrongChar, charAccuracy, } = getUserResult(timeForWordMode)
            setAccuracy(charAccuracy)
            setWPM(typingSpeed)
            return
        }

        // timer function will be called when the teststart is false and then we will set the teststart to true so it cannot start the timer again
        if (!testStart) {
            timer();
            setTestStart(true)
        }


        // Here I am handling the spacebar
        if (e.keyCode === 32) {

            if (currCharIndex === 0) {
                return;
            }

            if (allCurrChar.length <= currCharIndex) {
                allCurrChar[currCharIndex - 1].classList.remove("current-right")
            } else if (allCurrChar[currCharIndex - 1]) {
                wordSpanRef[currWordIndex].current.classList.add("word-underline")
                allCurrChar.forEach((item, index) => {
                    if (index >= currCharIndex) {
                        item.classList.add("skipped")
                    }
                })
                allCurrChar[currCharIndex - 1].classList.remove('current')
                allCurrChar[currCharIndex].classList.remove('current')
            }

            if (wordSpanRef[currWordIndex + 1]) {
                wordSpanRef[currWordIndex + 1].current.childNodes[0].classList.add("current")
            }

            allCurrChar.forEach((item, index) => {
                if (item.classList.contains("skipped")) {
                    wordSpanRef[currWordIndex].current.classList.add("error", "typed")
                    wordSpanRef[currWordIndex].current.classList.remove("correct")
                } else if (item.classList.contains("red")) {
                    wordSpanRef[currWordIndex].current.classList.add("error", "typed")
                } else {
                    wordSpanRef[currWordIndex].current.classList.add("correct", "typed")

                }

            })

            if (
                wordSpanRef[currWordIndex + 1].current.offsetLeft <
                wordSpanRef[currWordIndex].current.offsetLeft
              ) {
                wordSpanRef[currWordIndex].current.scrollIntoView();
                console.log(wordSpanRef[currWordIndex].current.offsetLeft)
              }

            setCurrWordIndex((prev) => prev + 1)
            setCurrCharIndex(0)

            return;
        }

        // Here I am handling the backspace
        if (e.keyCode === 8) {

            if (currCharIndex === 0) {

                return (
                    <h1>Keep typing</h1>
                );
            }

            allCurrChar[currCharIndex - 1].classList.remove("green")
            allCurrChar[currCharIndex - 1].classList.remove("red")

            if (currCharIndex !== 0) {
                if (currCharIndex === allCurrChar.length) {

                    if (allCurrChar[currCharIndex - 1].className.includes("extra")) {
                        allCurrChar[currCharIndex - 1].remove()
                        allCurrChar[currCharIndex - 2].classList.add("current-right")
                    } else {
                        allCurrChar[currCharIndex - 1].classList.remove("current-right")
                        allCurrChar[currCharIndex - 1].classList.add("current")
                    }

                    setCurrCharIndex((prev) => prev - 1)
                    return

                }

                allCurrChar[currCharIndex].classList.remove("current")
                allCurrChar[currCharIndex - 1].classList.add("current")
                setCurrCharIndex((prev) => prev - 1)
            }
            return
        }

        // Adding extra letters at the end of the word if user is still typing
        if (currCharIndex === allCurrChar.length) {
            let newSpan = document.createElement("span");
            newSpan.innerText = e.key;
            newSpan.className = "text-2xl font-bold text-gray-400 letter inline-block extra red current-right"
            allCurrChar[currCharIndex - 1].classList.remove("current-right")
            wordSpanRef[currWordIndex].current.append(newSpan);
            setCurrCharIndex((prev) => prev + 1)
            return
        }

        if (e.key === allCurrChar[currCharIndex].innerText) {
            allCurrChar[currCharIndex].classList.add("green")
        } else {
            allCurrChar[currCharIndex].classList.add("red")
        }
        if (currCharIndex + 1 === allCurrChar.length) {
            allCurrChar[currCharIndex].classList.add("current-right")
        }

        if (allCurrChar[currCharIndex + 1]) allCurrChar[currCharIndex + 1].classList.add("current")
        allCurrChar[currCharIndex].classList.remove("current")
        setCurrCharIndex((prev) => prev + 1)

    }

    const focusInput = () => {
        inputRef.current.focus()
    }

    // this is function for to restart the game
    const handleRestartButton = () => {
        clearInterval(intervalId.current)
        let redChar = document.querySelectorAll(".red")
        let greenChar = document.querySelectorAll(".green")

        redChar.forEach((item) => {
            item.classList.remove("red")
        })
        greenChar.forEach((item) => {
            item.classList.remove("green")
        })

        // clearInterval(intervalId)
        setTestEnd(false)
        setTestStart(false)
        setCurrWordIndex(0)
        setCurrCharIndex(0)
        
        setTimeForWordMode(0)
        // setWords(() => generate(wordMode ? 30 : 120))
        setCountDown(testTime)

        document.querySelectorAll(".hidden").forEach((item) => {
            item.classList.remove("hidden")
        })



    }

    useEffect(() => {
        handleRestartButton();
        wordSpanRef[0].current.childNodes[0].classList.add("current")

    }, [testTime, wordMode, timeMode])




    useEffect(() => {
        focusInput();
        wordSpanRef[0].current.childNodes[0].classList.add("current");
    }, [words]);

    return (
        <>
            <UpperMenu countdown={wordMode ? currWordIndex : countdown} />
            {testStart ? (<h2>{mouseMoved}</h2>) : (<h2></h2>)}
            {testEnd ? (
                <div>
                    <h1>Game Over</h1>
                    <h2>WPM {wpm}</h2>
                    <h2>ACC {accuracy}</h2>
                    <button onClick={handleRestartButton}>Restart</button>
                </div>

            ) : (

                <div className='game w-3/5 h-[7rem] border-solid overflow-y-hidden '>
                    <div className="words w-12/12">
                        {words.map((item, index) => {
                            return (
                                <span className='word whitespace-nowrap' ref={wordSpanRef[index]} onClick={focusInput} key={index}>{item.split("").map((letter, letterIndex) => {
                                    return (<span key={letterIndex + letter} className='text-3xl font-bold text-gray-400 letter inline-block'>{letter}</span>)
                                })}
                                </span>
                            )
                        })}
                    </div>
                </div>)}
            <input type="text" ref={inputRef} className='opacity-0' onKeyDown={handleKeyDown} />
        </>
    )
}

export default TypingBox