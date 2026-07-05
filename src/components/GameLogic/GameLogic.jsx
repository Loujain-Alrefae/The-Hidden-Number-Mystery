import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const GameLogic = () => {
    const {level} = useParams()
    const [turn, setTurn] = useState('computer');
    const [min , setMin] = useState(0)
    const [max , setMax] = useState(100)
    //useState(Math.floor(Math.random() * (max - min + 1)) + 0) 
    const [compGuess , setCompGuess] = useState(Math.floor(Math.random() * 101))
    const [playerGuess , setPlayetGuess] = useState(0)
    const [compNumber , setCompNumber] = useState(0)
    const [message , setMessage] = useState("")

    useEffect(()=>{
        let randomNumberForComp = Math.floor(Math.random() * 101)
        setCompNumber(randomNumberForComp)
        console.log(randomNumberForComp)
    },[])


const calculateNextGuess = (value)=>{
    if (level === "easy"){
        let nextCompGuess = Math.floor(Math.random()*101)
        setCompGuess(nextCompGuess)
    }else if(level === "medium"){
        let newMin = min
        let newMax = max
        if(value === "big"){
            newMin = compGuess + 1
            setMin(newMin)
        }else if(value === "small"){
            newMax = compGuess - 1
            setMax(newMax)
        }else{
            setMessage("Amazing you guessed the correct number 🏆")
            return;
        }
        let nextCompGusse = Math.floor((newMax + newMin)/2)
        setCompGuess(nextCompGusse)
        
    }
}

    const evaluateGuess = ()=>{
            let playerNumber = Number(playerGuess)
            if(playerNumber > compNumber){
                setMessage("My number is larger ⬆️")
            }else if(playerNumber < compNumber){
                setMessage("My number is smaller ⬇️")
            }else{
                setMessage("Amazing you guessed the correct number 🏆")
            }
        }

    return (
        <div>
            <p>level {level}</p>
            <div className=' w-[60%] my-12 mx-auto flex  flex-col border rounded-2xl'>
                <p className='py-3.5 px-5'>computer</p>
                <p className=' text-center mb-1.5'>My Guess is:</p>
                <p className='w-[10%] my-1.5 mx-auto text-center border rounded-2xl py-2.5 px-2.5'>{compGuess}</p>
                <div className=' flex justify-center gap-3 mb-8 mt-4'>
                    <button className='' onClick={()=>{calculateNextGuess("big")}}>big</button>
                    <button className='' onClick={()=>{calculateNextGuess("small")}}>small</button>
                    <button className='' onClick={()=>{calculateNextGuess("correct")}}>correct</button>
                </div>
                
            </div>
            <p className=' text-center'>{message}</p>
            <div className=' w-[60%] my-12 mx-auto border rounded-2xl'>
                <p className=' py-3.5 px-5'>you </p>
                <div className=' flex gap-2.5 justify-center my-8'>
                    <input className=' border text-3xl rounded-2xl p-2' type="number" onChange={(event)=>{setPlayetGuess(event.target.value)}} />
                    <input type="submit" value="send" onClick={evaluateGuess}/>
                </div>
            </div>
        </div>
    )
}

export default GameLogic
