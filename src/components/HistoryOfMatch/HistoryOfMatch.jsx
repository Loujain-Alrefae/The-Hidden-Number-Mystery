import { useTranslation } from 'react-i18next';
import { HiMiniComputerDesktop } from 'react-icons/hi2';
import { RxPerson } from 'react-icons/rx';

const HistoryOfMatch = ({history, historyRef}) => {
    const { t, i18n } = useTranslation();

    return (
        <div ref={historyRef} className='w-full mx-auto border-2 border-[#e9d5ff] bg-white rounded-3xl px-2 py-2 sm:px-6 shadow-sm' dir ={i18n.language === "en" ? "ltr" : "rtl"}>
            <div className='flex justify-start items-center gap-2 mb-4 px-2'>
                <p className='font-bold text-[18px] '>{t("history.title")}</p>
                <span></span>
            </div>
            <div className='overflow-x-auto'>
                <table className='w-full text-right border-collapse'>
                    <thead>
                        <tr className='border-b border-[#f3e8ff] text-slate-400 text-sm'>
                            <th className='py-3 px-2 sm:px-4 font-medium'>{t("history.thId")}</th>
                            <th className='py-3 px-2 sm:px-4 font-medium '>{t("history.thPlayer")}</th>
                            <th className='py-3 px-2 sm:px-4 font-medium'>{t("history.thGuess")}</th>
                            <th className='py-3 px-2 sm:px-4 font-medium'>{t("history.thResult")}</th>
                        </tr>
                    </thead>
                    <tbody className='text-slate-700 text-sm'>
                        {history.length === 0 ? (
                            <tr>
                                <td colSpan="4" className='text-center py-3 px-2 sm:px-4 text-slate-400'>
                                    {t("history.empty")}
                                </td>
                            </tr>
                        ) : (
                            history.map((item, index) => (
                                <tr key={index} className='border-b border-[#f3e8ff]/60 hover:bg-slate-50/50 transition-colors'>
                                    <td className='py-3 px-2 sm:px-4 text-slate-500 font-mono'>{item.id}</td>
                                    <td className='py-3 px-2 sm:px-4 font-semibold text-slate-800'>
                                        <div className='inline-flex items-center gap-2'>
                                            {item.player === "You" || item.player === "you" || item.player === "أنت" ? (
                                                <>
                                                    <span>{t("history.you")}</span>
                                                    <RxPerson className="text-lg" />
                                                </>
                                            ) : (
                                                <>
                                                    <span>{t("history.computer")}</span>
                                                    <HiMiniComputerDesktop className="text-lg" />
                                                </>
                                            )}
                                        </div>
                                    </td>
                                    <td className='py-3 px-2 sm:px-4 font-mono font-bold text-slate-800'>{item.guess}</td>
                                    <td className='py-3 px-2 sm:px-4'>
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                                            item.result === "big" || item.result === "أكبر" 
                                                ? "bg-[#ffedd5] text-[#c2410c]" 
                                                : item.result === "small" || item.result === "أصغر"
                                                ? "bg-[#e0f2fe] text-[#0369a1]"
                                                : "bg-[#dcfce7] text-[#15803d]"
                                        }`}>
                                            {item.result === "big" || item.result === "أكبر" ? t("history.resBig") : item.result === "small" || item.result === "أصغر" ? t("history.resSmall") : t("history.resCorrect")}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default HistoryOfMatch
