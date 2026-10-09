import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'

const EntroOfGame = () => {
    const {t , i18n} = useTranslation();
    const toggleLanguage = ()=>{
        let nextLang = i18n.language === "en" ? "ar" : "en";
        i18n.changeLanguage(nextLang)
    }

    return (
        <div className=" flex justify-center items-center flex-col gap-4 max-w-245 my-0 mx-auto text-center relative">
            <div className=' w-full mb-5.5 flex justify-between items-start flex-wrap gap-4' dir ={i18n.language === "en" ? "ltr" : "rtl"}>
                <h1 className=" font-black text-[#6f37f1] text-4xl sm:text-[38px] ">{t("game_title")}</h1>
                <button className=' h-9.5 py-0 px-3.5 font-tajawal border-[1.5px] border-solid border-[#e9d2ff] bg-[#ffffff] text-[#6d3fd1] font-extrabold rounded-2xl text-[12.5px] cursor-pointer hover:bg-[#FFF1E4] hover:border-[#FF7A3D] hover:text-[#E5591C] transition duration-200'
                        onClick={toggleLanguage}>{i18n.language === "en" ? "🌐 عربي" : "English 🌐" }
                </button>
            </div>
            <div className='flex justify-center items-center flex-col px-6.5 py-8.5 bg-[#ffffff] border-[1.5px] border-solid border-[#e9d2ff] rounded-[22px]  shadow-[0_24px_60px_-24px_#8b5cf640]'>
                <h2 className=' mb-4 text-[24px] font-bold'>{t("clear_title")}</h2>
                <p className='  mt-0 mx-auto mb-6.5 text-[#8b7fa3] leading-[1.7]'>{t("welcome_message")}</p>
                <div className=' flex justify-center items-center gap-3 flex-wrap pb-6.5 ' >
                    {/* level medium */}
                    <Link to="level/medium"
                        className={`cursor-pointer py-3 px-6.5 rounded-full border-[1.5px] border-solid   border-[#2fa8ff] bg-[#2fa8ff] text-white transition duration-200 hover:-translate-y-0.5`}>
                        <p className="text-[14px]  font-bold  transition duration-200 ">
                            {t("levels.level 1.name")}
                        </p>
                        <p className={`mt-0.5 text-[11px]  font-tajawal  transition duration-200`}>
                            {t("levels.level 1.description")}
                        </p>
                    </Link>
                    {/* level hard */}
                    <Link to="level/hard"
                        className="cursor-pointer py-3 px-6.5 rounded-full border-[1.5px] border-solid border-[#ef4444] bg-[#ef4444] text-white transition duration-200 hover:-translate-y-0.5  ">
                        <p
                            className={`text-[14px]  font-bold `} >
                            {t("levels.level 2.name")}
                        </p>
                        <p className={`mt-0.5 text-[11px]  font-tajawal`}>
                            {t("levels.level 2.description")}
                        </p>
                    </Link>
                </div>
            </div>
            
        </div>
        
    )
}
export default EntroOfGame



