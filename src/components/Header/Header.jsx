import {MdOutlineLanguage } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';


const Header = ({changeLang, level, turn, setTutorialStep, setIsTutorialActive}) => {
const { t, i18n } = useTranslation();
    return (
        <div className='max-w-245 my-0 mx-auto flex justify-between items-center flex-wrap gap-5' dir ={i18n.language === "en" ? "ltr" : "rtl"}> 
            <div>
                <h1 className=" mb-1.5 text-[#6f37f1] font-black text-4xl sm:text-4xl ">{t("game_title")}</h1>
                <p className=' font-tajawal text-[#8b7fa3] text-[14px] font-semibold '>{t("level-line")} <span className={` font-extrabold ${level === "hard" ? "text-[#ef4444]" : "text-[#1381de]"}`}>{level === "medium" ?  t("levels.level 1.name"): t("levels.level 2.name")}</span></p>
            </div>
            <div className=' flex items-center gap-2'>
                <button className='flex justify-center items-center gap-1.5 h-9.5 py-0 px-3.5 font-tajawal border-[1.5px] border-solid border-[#e9d2ff] bg-[#ffffff] text-[#6d3fd1] font-extrabold rounded-2xl text-[16px] cursor-pointer hover:bg-[#FFF1E4] hover:border-[#FF7A3D] hover:text-[#E5591C] transition duration-200'
                    onClick={changeLang}>{i18n.language === "en" ? " عربي" : "English" }<MdOutlineLanguage size={20}  className='text-[#2fa8ff] '/>
                </button>
                <button 
                    onClick={() => { setTutorialStep(1); setIsTutorialActive(true); }}
                    className=" cursor-pointer border-[1.5px]  border-solid border-[#e9d2ff] bg-[#ffffff]  px-4 py-2 rounded-lg shadow  "
                    >
                    {t('helpButton')}
                </button>
                {/* <div className=' py-2 px-3.5 flex items-center gap-2 border-[1.5px]  border-solid border-[#e9d2ff] bg-[#ffffff] text-[#2c1b3d] rounded-full text-[13px] font-extrabold shadow-[0_4_14_-6_#8b5cf630]'>
                    <span className={` block w-2.25 h-2.25 rounded-[50%] ${turn === "computer" ? "bg-[#8b5cf6] shadow-[0_0_10px_#8b5cf6]"  : "bg-[#ff5c93] shadow-[0_0_10px_#ff5c93]" }`}></span>
                    <p className=' font-tajawal'>{turn === "computer" ? t("turn-computer") : t("turn-player")}</p>
                </div> */}
                <Link  className=' w-9.5 h-9.5 flex justify-center items-center rounded-xl border-[1.5px] border-solid border-[#e9d2ff] bg-[#ffffff] text-[#6d3fd1] cursor-pointer hover:bg-[#FFF1E4] hover:border-[#FF7A3D] hover:text-[#E5591C] hover:rotate-90 transition duration-200 ' to="/">⟳</Link>
            </div>
        </div>
    )
}

export default Header
