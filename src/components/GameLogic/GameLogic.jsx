import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const GameLogic = () => {
    const {level} = useParams()
    const [turn, setTurn] = useState('computer');
    const [min , setMin] = useState(0)
    const [max , setMax] = useState(100)
    const [sum , setSum] = useState()
    const [history , setHistory] = useState([])
    //useState(Math.floor(Math.random() * (max - min + 1)) + 0) 
    const [compGuess , setCompGuess] = useState(Math.floor(Math.random() * 101))
    const [playerGuess , setPlayetGuess] = useState()
    const [compNumber , setCompNumber] = useState(0)
    const [message , setMessage] = useState("")
    const [tryComp, setTryComp] = useState(0)
    const [tryUser, setTryUser] = useState(0)
    const [isGameOver , setIsGameOver] = useState(false)

    useEffect(()=>{
        let randomNumberForComp = Math.floor(Math.random() * 101)
        setCompNumber(randomNumberForComp)
        console.log(randomNumberForComp)
        setMessage("Waiting for your turn...")
    },[])

    const binarySearchGuess = (currentMin , currentMax)=>{
        let nextCompGusse = Math.floor((currentMin + currentMax)/2)
        setCompGuess(nextCompGusse)
        setTryComp(prev => prev + 1)
        setTurn("player")
    }

    const edaitRange =(value) => {
        let updatedMin = min
        let updatedMax = max
        if (max - min === 0) {
            setIsGameOver(true)
            return;
        }
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
                setTryComp(prev => prev + 1)
                setTurn("player")
            }
            else{
                binarySearchGuess(updatedMin , updatedMax)
            }
        }
    }

    const evaluateGuess = ()=>{
        if(playerGuess === " " || playerGuess === null || playerGuess === undefined){
            setMessage("Enter a valid number between 0 and 100")
            return;
        }
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
            // setMessage("Amazing you guessed the correct number 🏆")
            retext = "correct"
            setTurn("computer")
        }
        setTryUser(prev => prev + 1)
        setHistory(prev => [
            {id : prev.length+1 ,player : "you", guess :playerNumber , result: retext }, ...prev
        ])
    }

    return (
        <div className=' max-w-245 my-0 mx-auto relative'>
            <div>
                <p>level {level}</p>
            </div>
            <div className=' flex gap-4.5 '>
                <div className=' w-[60%] my-12 mx-auto flex  flex-col border rounded-2xl'>
                    <p className='py-3.5 px-5'>🖥️ Computer's Turn</p>
                    <p>Attempts: {tryComp}</p>
                    <p className=' text-center mb-1.5'>Computer's guess for your number:</p>
                    <p className='w-[10%] my-1.5 mx-auto text-center border rounded-2xl py-2.5 px-2.5'>{turn === "computer" ? compGuess : "--"}</p>
                    {/* شريط نطاق البحث التفاعلي */}
                    <div className='w-full p-6 my-6' dir="rtl">
                        <div className='flex justify-between text-xs text-slate-500 mb-1'>
                            <span>0</span>
                            <span>نطاق البحث الحالي</span>
                            <span>100</span>
                        </div>
                        {/* الخلفية الكاملة للبار */}
                        <div className='relative w-full h-6 px-1.5 bg-orange-100 rounded-full overflow-hidden border border-orange-200'>
                            
                            {/* الجزء الملون يتحدد بدقة بناءً على الـ min والـ max */}
                            <div className=' absolute top-[8%] bottom-[12%] rounded-full bg-linear-to-l from-orange-400 to-yellow-400 transition-all duration-500'
                                style={{
                                    left: `${min}%`,
                                    width: `${max - min}%`
                                }}
                            ></div>

                            {/* الطابة المتحركة (تأخذ موقع تخمين الكمبيوتر الفعلي كنسبة مئوية من 0 إلى 100) */}
                            <div 
                                className='absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-3 border-purple-600 rounded-full shadow-md transition-all duration-500 z-10'
                                style={{
                                    left: `${compGuess}%`
                                }}
                            ></div>
                        </div>
                        {/* إظهار القيم بالأرقام تحت البار */}
                        <div className='flex justify-between text-xs font-mono font-bold text-red-600 mt-2'>
                            <span>min: {min}</span>
                            <span>max: {max}</span>
                        </div>
                    </div>
                    <div className=' flex justify-center gap-3 mb-8 mt-4'>
                        <button className=' cursor-pointer' disabled={turn !== "computer"} onClick={()=>{calculateNextGuess("big")}}>big</button>
                        <button className=' cursor-pointer' disabled={turn !== "computer"} onClick={()=>{calculateNextGuess("small")}}>small</button>
                        <button className=' cursor-pointer' disabled={turn !== "computer"} onClick={()=>{calculateNextGuess("correct")}}>correct</button>
                    </div>
                </div>
                <div className=' w-[60%] my-12 pb-5 mx-auto border rounded-2xl'>
                    <div>
                        <p className=' py-3.5 px-5'>🙋 Your Turn to Guess </p>
                        <p>Attempts: {tryUser}</p>
                    </div>
                    <p>Try to crack the computer's secret number (0–100)</p>
                    <div className=' flex gap-2.5 justify-center my-8'>
                        <input className=' border text-3xl rounded-2xl p-2' type="number" onChange={(event)=>{ setPlayetGuess(event.target.value)}} disabled={turn !== "player"} />
                        <input type="submit" value="guess" onClick={evaluateGuess} disabled={turn !== "player"} className=' cursor-pointer'/>
                    </div>
                    <p className=' text-center'>{message}</p>
                </div>
            </div>
            <div>
                {isGameOver && (
                    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
                        <div className=' w-[40%] flex justify-center items-center flex-col gap-3 p-6 bg-linear-to-r from-[#FFF1E4] via-[#FFE8F1] to-[#F3E1FF] border-2 border-solid border-[#E9D2FF] rounded-[18px] z-70'>
                            <p>🤝</p>
                            <p>Draw Looks like we hit a dead end</p>
                            <p>Your attempts: {tryUser} — Computer attempts : {tryComp}</p>
                            <div className=' flex gap-2.5 z-75'> 
                                <Link to="/level/medium" className="py-2.75 px-5.5 rounded-[14px] font-extrabold text-[13px] bg-linear-to-r from-(--#22c77a) to-(--#2fa8ff)">new round</Link>
                                <Link to="/" className=' py-2.75 px-5.5 rounded-[14px] font-extrabold text-[13px] border-2 border-solid border-[#e9d2ff] text-[#2c1b3d]'>change level</Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            {/* سجل المبارزة */}
            <div className='w-full my-12 mx-auto border-2 border-[#e9d5ff] bg-white rounded-3xl p-6 shadow-sm' dir="rtl">
                <div className='flex justify-end items-center gap-2 mb-6 px-2'>
                    <p className='font-bold text-lg text-slate-800'>سجل المبارزة</p>
                    <span>📜</span>
                </div>
                
                <div className='overflow-x-auto'>
                    <table className='w-full text-right border-collapse'>
                        <thead>
                            <tr className='border-b border-[#f3e8ff] text-slate-400 text-sm'>
                                <th className='py-3 px-4 font-medium'>#</th>
                                <th className='py-3 px-4 font-medium'>الطرف</th>
                                <th className='py-3 px-4 font-medium'>التخمين</th>
                                <th className='py-3 px-4 font-medium'>النتيجة</th>
                            </tr>
                        </thead>
                        <tbody className='text-slate-700 text-sm'>
                            {history.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className='text-center py-6 text-slate-400'>
                                        لا توجد حركات حتى الآن، ابدأ اللعب!
                                    </td>
                                </tr>
                            ) : (
                                history.map((item, index) => (
                                    <tr key={index} className='border-b border-[#f3e8ff]/60 hover:bg-slate-50/50 transition-colors'>
                                        <td className='py-4 px-4 text-slate-500 font-mono'>{item.id}</td>
                                        <td className='py-4 px-4 font-semibold text-slate-800 flex items-center gap-2'>
                                            {item.player === "You" || item.player === "you" ? "you 🎨" : "computer 💻"}
                                        </td>
                                        <td className='py-4 px-4 font-mono font-bold text-slate-800'>{item.guess}</td>
                                        <td className='py-4 px-4'>
                                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                                                item.result === "big" || item.result === "أكبر" 
                                                    ? "bg-[#ffedd5] text-[#c2410c]" 
                                                    : item.result === "small" || item.result === "أصغر"
                                                    ? "bg-[#e0f2fe] text-[#0369a1]"
                                                    : "bg-[#dcfce7] text-[#15803d]"
                                            }`}>
                                                {item.result === "big" ? "أكبر" : item.result === "small" ? "أصغر" : item.result}
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
