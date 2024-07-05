import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

function Playground() {
    const [data, setData] = useState([])
    const [words, setWords] = useState([])
    const [currentInput, setCurrentInput] = useState('');
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
    const [timer, setTimer] = useState(null);
    const [gameStart, setGameStart] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const gameTimer = 30 * 1000;


    const startingGame = () => {
        fetch(`https://random-word-api.herokuapp.com/word?number=100`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                return response.json()
            }).then((responseData) => {
                // console.log(typeof responseData.story)
                setWords(responseData)
                console.log(responseData)
                return words
                // setWords(data.story.split(" "))
            })
            .catch((error)=>{
                throw new Error(`This error happened while fetching data : ${error}`)
            })

    }

    function separatingLetters(str){
        return (
            str.split("").map((char, index) => (
                <p className='inline-block' key={index}>{char}</p>
            ))
        )
        
    }

    const handleKeyDown = (e) =>{
        if(gameOver) return;

        let key = e.key

        let currentWord = words[currentWordIndex]
        let currentLetter = currentWord[currentLetterIndex]

        if(!timer && key.length === 1 && key.match(/[a-zA-Z0-9 ]/)){
            startTimer()
        }

        if(key.length === 1 && key.match(/[a-zA-Z0-9 ]/)){
            if(currentLetterIndex < currentWord.length){
                let isCorrect = key === currentLetter
            }
        }



    }

    
        // useEffect(() => {
        //     const handleKeydown = (e) => {
        //         if(words[0][0] === e.key){
        //             e.target.classList = "text-green"
        //         }
        // }
        // handleKeydown()
        // }, [words]);
    

        

    return (
        <>
            <div className='flex m-auto p-10 rounded-md mt-10 flex-col w-3/5 bg-slate-200'>
            <div>
                {words.map((item, index) => (
                 <div style={{whiteSpace:'pre',fontFamily: '"Merriweather", serif'}} key={index} className='text-lg mr-3 inline-block word'>
                    {separatingLetters(item)}
                </div>
                ))}
            </div>
                <button className='bg-slate-600 mt-10 w-fit m-auto p-2 rounded-lg text-white' onClick={startingGame}>Start test</button>
            </div>
        </>

    )
}

export default Playground