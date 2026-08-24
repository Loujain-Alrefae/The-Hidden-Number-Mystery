import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'

const EntroOfGame = () => {
    const {t , i18n} = useTranslation();
    const [selectedLevel, setSelectedLevel] = useState("medium");    
    const toggleLanguage = ()=>{
        let nextLang = i18n.language === "en" ? "ar" : "en";
        i18n.changeLanguage(nextLang)
    }

    return (
        <div className=" flex justify-center items-center flex-col max-w-245 my-0 mx-auto text-center relative " dir ={i18n.language === "en" ? "ltr" : "rtl"}>
            <div className=' w-full mb-5.5 flex justify-between items-start flex-wrap gap-4' >
                <h1 className="bg-[linear-gradient(90deg,#ff7a3d,#ff5c93_45%,#8b5cf6_75%,#2fa8ff)] bg-clip-text text-transparent font-black text-3xl sm:text-4xl ">{t("game_title")}</h1>
                <button className=' h-9.5 py-0 px-3.5 font-tajawal border-[1.5px] border-solid border-[#e9d2ff] bg-[#ffffff] text-[#6d3fd1] font-extrabold rounded-2xl text-[12.5px] cursor-pointer' onClick={toggleLanguage}>{i18n.language === "en" ? "🌐 عربي" : "English 🌐" }</button>
            </div>
            <div className='px-6.5 py-8.5 bg-[#ffffff] border-[1.5px] border-solid border-[#e9d2ff] rounded-[22px]  '>
                <p className=' mb-4 text-[19px]'>{t("clear_title")}</p>
                <p className='  mt-0 mx-auto mb-6.5 text-[#8b7fa3] '>{t("welcome_message")}</p>
                <div className=' flex justify-center items-center gap-3 flex-wrap pb-6.5 ' >
                    <div onClick={()=>setSelectedLevel("medium")} 
                    className={`cursor-pointer py-3 px-6.5 rounded-full ${selectedLevel === "medium" ?"bg-[linear-gradient(135deg,#8b5cf6,#2fa8ff)] shadow-[0_10px_24px_-8px_#8b5cf680] " : "border-[1.5px] border-solid border-[#e9d2ff] bg-[#ffffff] hover:border-[#8B5CF6]" } transition duration-200`}>
                        <p className={`text-[14px]  font-bold ${selectedLevel === "medium" ? "text-[#ffffff]" : "text-[#2c1b3d]"} transition duration-200`}>{t("levels.level 1.name")}</p>
                        <p className={`mt-0.5 text-[11px]  font-tajawal ${selectedLevel === "medium" ? "text-[#ffffff]" : "text-[#8b7fa3]"} transition duration-200`}>{t("levels.level 1.description")}</p>
                    </div>
                    <div onClick={()=>setSelectedLevel("hard")}
                        className={`cursor-pointer py-3 px-6.5 rounded-full ${selectedLevel ==="hard" ? "bg-[linear-gradient(135deg,#ef4444,#ff7a3d)] shadow-[0_10px_24px_-8px_#ef444480]" : "border-[1.5px] border-solid border-[#e9d2ff] bg-[#ffffff] hover:border-[#8B5CF6]"} transition duration-200`}>
                        <p className={`text-[14px]  font-bold ${selectedLevel === "hard" ? "text-[#ffffff]" : "text-[#2c1b3d]"} transition duration-200`} >{t("levels.level 2.name")}</p>
                        <p className={`mt-0.5 text-[11px]  font-tajawal ${selectedLevel === "hard" ? "text-[#ffffff]" : "text-[#8b7fa3]"} transition duration-200`}>{t("levels.level 2.description")}</p>
                    </div>
                </div>
                <button className=' py-3.5 px-10 rounded-[14px] cursor-pointer bg-[linear-gradient(90deg,#6d3fd1,#ff5c93,#ff7a3d)] shadow-[0_12px_28px_-10px_#ff5c9370] transition-transform duration-150 hover:-translate-y-0.5 hover:scale-[1.02]'>
                    <Link to={`level/${selectedLevel}`} className='text-[#ffffff] font-extrabold text-[16px] '>{t("start-play")}</Link>
                </button>
            </div>

        </div>
    )
}

export default EntroOfGame
