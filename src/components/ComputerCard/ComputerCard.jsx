import { FaAngleUp, FaChevronDown } from 'react-icons/fa';
import { MdOutlineDone } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

const ComputerCard = ({turn, max, min, tryComp, compGuess, onEditRange}) => {
    const { t } = useTranslation();

    return (
        <div  className={`w-[50%] flex  flex-col  p-5.5 border-2 border-solid border-[#e9d2ff] rounded-[20px] bg-[#ffffff] transition-all duration-300 ${turn === "computer" ? " shadow-[0_20px_46px_-20px_#8b5cf660] -translate-y-0.5 border-[#8b5cf6]" : "opacity-50 saturate-[0.55]"}`}>
            <div className=' flex justify-between items-center mb-4'>
                <p className=' text-[18px] '>🖥️ {t("compCard.computerTurn")}</p>
                <p className=' py-1 px-2.5 text-[13px] text-[#2fa8ff] font-bold rounded-full bg-[#fff1e4] border border-solid border-[#e9d2ff] '>{t("compCard.attempts")} {tryComp}</p>
            </div>
            <p className=' text-center mb-1.5 text-[16px] text-[#8b7fa3] font-semibold'>{t("compCard.computerGuessPrompt")}</p>
            <p className='w-[10%] mx-auto text-center text-[42px] text-[#2fa8ff] font-semibold '>{turn === "computer" ? compGuess : "--"}</p>
            {/* Interactive search range bar */}
            <div className='w-full  mt-3.5 mb-4.5' dir="rtl">
                <div className='flex justify-between text-[14px] text-slate-500 mb-1'>
                    <span>0</span>
                    <span>{t("compCard.currentRange")}</span>
                    <span>100</span>
                </div>
                {/* Full background of the bar */}
                <div className='relative w-full h-6 px-1.5 bg-orange-100 rounded-full  border border-orange-200'>
                    
                    {/* The colored part is precisely determined based on min and max */}
                    <div className=' absolute top-[8%] bottom-[12%] rounded-full bg-linear-to-l from-orange-400 to-yellow-400 transition-all duration-500'
                        style={{
                            left: `${min}%`,
                            width: `${max - min}%`
                        }}
                    ></div>

                    {/* The moving ball (takes the actual computer guess position as a percentage from 0 to 100) */}
                    <div 
                        className='absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-3 border-purple-600 rounded-full shadow-md transition-all duration-500 z-10'
                        style={{
                            left: `${compGuess}%`
                        }}
                    ></div>
                </div>
                {/* Display values numerically under the bar */}
                <div className='flex justify-between text-xs font-mono font-bold text-red-600 mt-2'>
                    <span>{t("compCard.minLabel")} {min}</span>
                    <span>{t("compCard.maxLabel")} {max}</span>
                </div>
            </div>
            <div className=' flex gap-3 justify-between items-center'>
                <button className=' flex justify-center items-center gap-1.5 w-[30%] py-3 px-2 border-2 border-solid border-[#e9d2ff] rounded-2xl  text-[15px] font-extrabold cursor-pointer transition duration-150 hover:border-[#FF7A3D] hover:text-[#E5591C] hover:-translate-y-0.5 hover:bg-[#FFF1E4]' disabled={turn !== "computer"} onClick={()=>{onEditRange("big")}}>{t("compCard.btnBig")} <FaAngleUp /></button>
                <button className=' flex justify-center items-center gap-1.5 w-[30%] py-3 px-2 border-2 border-solid border-[#e9d2ff] rounded-2xl  text-[15px] font-extrabold cursor-pointer transition duration-150 hover:text-[#1381DE] hover:border-[#2FA8FF] hover:-translate-y-0.5 hover:bg-[#EAF6FF]' disabled={turn !== "computer"} onClick={()=>{onEditRange("small")}}>{t("compCard.btnSmall")} <FaChevronDown /></button>
                <button className=' flex justify-center items-center gap-1.5 w-[30%] py-3 px-2 border-2 border-solid border-[#e9d2ff] rounded-2xl text-[15px] font-extrabold cursor-pointer transition duration-150 hover:border-[#149A5D] hover:bg-[#E9FBF2] hover:text-[#22c77a] hover:-translate-y-0.5' disabled={turn !== "computer"} onClick={()=>{onEditRange("correct")}}>{t("compCard.btnCorrect")}<MdOutlineDone  /> </button>
            </div>
        </div>
    )
}

export default ComputerCard
