import React from 'react'

const Results = (
    typedWords,
    correctTypedWords,
    wrongTypedWords,
    missedChars,
    timeInMinutes,
    wrongTypedChar,
    correctTypedChar,
    totalTypedChar,
    restartFunction
) => {
    const charAccuracy = Math.round((wrongTypedChar.length / totalTypedChar) * 100)
    const typingSpeed = Math.ceil(correctTypedWords.length / timeInMinutes);
  return (
    <>
        <h1>Game Over</h1>
        <div>Results</div>
        <button>Restart the Test</button>
    </>
    
  )
}

export default Results