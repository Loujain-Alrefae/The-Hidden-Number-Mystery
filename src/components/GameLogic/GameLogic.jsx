import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const GameLogic = () => {
    const {level} = useParams()
    const [turn, setTurn] = useState('computer');
    const [min , setMin] = useState(0)
    const [max , setMax] = useState(100)
    const [history , setHistory] = useState([])
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

    const binarySearchGuess = (currentMin , currentMax)=>{
        let nextCompGusse = Math.floor((currentMin + currentMax)/2)
        setCompGuess(nextCompGusse)
        setTurn("player")
    }

    const edaitRange =(value) => {
        let updatedMin = min
        let updatedMax = max
        if(value === "big"){
            updatedMin = compGuess + 1
            setMin(updatedMin)
        }else if(value === "small"){
            updatedMax = compGuess - 1
            setMax(updatedMax)
        }else{
            setMessage("Amazing I guessed the correct number 🏆")
        }
        setHistory(prev =>[
            {id: prev.length+1 , player : "your divse", guess : compGuess , result: value }, ...prev
        ])
        return{updatedMin , updatedMax};
    }

    const calculateNextGuess = (value)=>{
        const{updatedMin , updatedMax} = edaitRange(value)
        if(level === "medium"){
            binarySearchGuess(updatedMin , updatedMax)
        }
        if(level === "hard"){
            let range = updatedMax - updatedMin
            if(range > 20){
                let randomFactor = Math.random() > 0.5 ? 0.3 : 0.7;
                let nextCompGusse = Math.floor(updatedMin + range * randomFactor)
                setCompGuess(nextCompGusse)
                setTurn("player")
            }
            else{
                binarySearchGuess(updatedMin , updatedMax)
            }
        }
    }

    const evaluateGuess = ()=>{
        let playerNumber = Number(playerGuess)
        let retext = ""
        if(playerNumber > compNumber){
            setMessage("My number is smaller ⬇️")
            retext = "small"
            setTurn("computer")
        }else if(playerNumber < compNumber){
            setMessage("My number is larger ⬆️")
            retext = "big"
            setTurn("computer")
        }else{
            setMessage("Amazing you guessed the correct number 🏆")
            retext = "correct"
            setTurn("computer")
        }
        setHistory(prev => [
            {id : prev.length+1 ,player : "you", guess :playerNumber , result: retext }, ...prev
        ])
    }

    return (
        <div>
            <p>level {level}</p>
            <div className=' w-[60%] my-12 mx-auto flex  flex-col border rounded-2xl'>
                <p className='py-3.5 px-5'>computer</p>
                <p className=' text-center mb-1.5'>My Guess is:</p>
                <p className='w-[10%] my-1.5 mx-auto text-center border rounded-2xl py-2.5 px-2.5'>{turn === "computer" ? compGuess : "--"}</p>
                <div className=' flex justify-center gap-3 mb-8 mt-4'>
                    <button className=' cursor-pointer' disabled={turn !== "computer"} onClick={()=>{calculateNextGuess("big")}}>big</button>
                    <button className=' cursor-pointer' disabled={turn !== "computer"} onClick={()=>{calculateNextGuess("small")}}>small</button>
                    <button className=' cursor-pointer' disabled={turn !== "computer"} onClick={()=>{calculateNextGuess("correct")}}>correct</button>
                </div>
                
            </div>
            <div className=' w-[60%] my-12 pb-5 mx-auto border rounded-2xl'>
                <p className=' py-3.5 px-5'>you </p>
                <div className=' flex gap-2.5 justify-center my-8'>
                    <input className=' border text-3xl rounded-2xl p-2' type="number" onChange={(event)=>{setPlayetGuess(event.target.value)}} disabled={turn !== "player"} />
                    <input type="submit" value="send" onClick={evaluateGuess} disabled={turn !== "player"} className=' cursor-pointer'/>
                </div>
                <p className=' text-center'>{message}</p>
            </div>
            <div className='w-[60%] my-12 mx-auto border border-slate-700 bg-slate-900 rounded-2xl p-4 shadow-xl'>
                <p className='font-bold text-lg mb-4 text-left text-white px-2'>📜 Duel History</p>
                
                <div className='overflow-x-auto'>
                    <table className='w-full text-left border-collapse'>
                        <thead>
                            <tr className='border-b border-slate-700 text-slate-400 text-sm'>
                                <th className='py-3 px-4'>#</th>
                                <th className='py-3 px-4'>Player</th>
                                <th className='py-3 px-4'>Guess</th>
                                <th className='py-3 px-4'>Result</th>
                            </tr>
                        </thead>
                        <tbody className='text-white text-sm'>
                            {history.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className='text-center py-6 text-slate-500'>
                                        No moves yet, start playing!
                                    </td>
                                </tr>
                            ) : (
                                history.map((item, index) => (
                                    <tr key={index} className='border-b border-slate-800 hover:bg-slate-800/50 transition-colors'>
                                        <td className='py-3 px-4 text-slate-400 font-mono'>{item.id}</td>
                                        <td className='py-3 px-4 font-semibold text-emerald-400'>
                                            {item.player}
                                        </td>
                                        <td className='py-3 px-4 font-mono font-bold text-yellow-400'>{item.guess}</td>
                                        <td className='py-3 px-4'>
                                            <span className='px-3 py-1 rounded-full text-xs font-bold bg-slate-800 border border-slate-700 text-slate-200'>
                                                {item.result}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
    )
}

export default GameLogic
