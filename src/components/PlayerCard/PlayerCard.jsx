import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RxPerson } from 'react-icons/rx';

const PlayerCard = ({level, turn, tryUser, timeLeft, winner, playerGuess, setPlayerGuess, evaluateGuess, inputRef, message, playerCardRef}) => {
    const { t } = useTranslation();
    const [lastGuessedValue, setLastGuessedValue] = useState("");
    return (
        <div ref={playerCardRef} className={` w-full md:w-[50%] bg-[#ffffff] p-5.5 rounded-[20px] border-2 border-solid border-[#edbacc]  ${turn === "player" ? " shadow-[0_20px_46px_-20px_#ff5c9360] border-[#ff5c93] -translate-y-0.5": "opacity-50 saturate-[0.55]" }`}>
            <div className=' flex justify-between items-center mb-6'>
                <div className=' flex justify-center items-center gap-2'>
                    <span><RxPerson size={20} /></span>
                    <p className='text-[18px]'>{t("playerCard.playerTurn")} </p>
                </div>
                <p className='py-1 px-2.5 text-[13px] text-[#2fa8ff] font-bold bg-[#fff1e4] border border-solid border-[#e9d2ff] rounded-full  '>{t("playerCard.playerAttempts")} {tryUser}</p>
            </div>
            {level === "hard" && turn === "player" && !winner && (
                <div className="mb-4 text-center rounded-[14px] border-2 border-red-500 bg-[#FEF2F2] text-red-700 p-3 font-extrabold text-[17px] transition-all duration-200 animate-bounce">
                    {t("playerCard.timeLeft")}{timeLeft}s
                </div>
            )}
            <div >
                <p className='pb-3.5 text-[16px] text-[#8b7fa3] text-center font-medium'>{t("playerCard.tryCrackPrompt")}</p>
                <form onSubmit={(e) => {
                    e.preventDefault(); 
                    evaluateGuess();    // دالة التحقق
                    setLastGuessedValue(playerGuess);
                    setPlayerGuess(""); // <--- هذا السطر هو المسؤول عن تفريغ الحقل تلقائياً بعد الإرسال
                }} className='flex gap-2.5 justify-center'>
                    <input 
                        className=' inline-block w-[60%]  p-3 text-center text-[24px] font-bold border border-solid border-[#ffd23f] outline-[#ffd23f] text-3xl rounded-2xl  ' 
                        type="number" 
                        ref={inputRef}
                        placeholder='??'
                        value={playerGuess} // <--- ربط الـ input بالقيمة الحالية للحالة
                        onChange={(event) => { setPlayerGuess(event.target.value) }} 
                        disabled={turn !== "player"} 
                    />
                    
                    <input 
                        type="submit" 
                        value={t("playerCard.guessBtn")} 
                        disabled={turn !== "player"} 
                        className='px-5 text-[13px] bg-[#ff5c93] rounded-[14px] text-[#ffffff] font-extrabold cursor-pointer transition duration-150 hover:-translate-y-0.5'
                    />
                </form>
                <p className=' pt-5.5 text-center'>{t(message, { playerGuess: lastGuessedValue })}</p>
            </div>
        </div>
    )
}

export default PlayerCard
