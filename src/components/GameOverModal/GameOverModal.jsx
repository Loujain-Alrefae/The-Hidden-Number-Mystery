import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const GameOverModal = ({resetGame, tryComp, tryUser, winner, isDraw}) => {
    const { t, i18n } = useTranslation();

    // Do not render anything if neither game over (draw) nor winner state is active
    if (!isDraw && !winner) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
            {isDraw ? (
                /* Game over card (Draw) */
                <div className='w-[40%] flex justify-center items-center flex-col gap-3 p-6 bg-linear-to-r from-[#FFF1E4] via-[#FFE8F1] to-[#F3E1FF] border-2 border-solid border-[#E9D2FF] rounded-[18px] z-70'>
                    <p className='text-[24px] font-bold'>{t("modal.drawTitle")}</p>
                    <div className='flex gap-4'>
                        <p className='text-[16px]'>{t("modal.userAttempts", { count: tryUser })}</p>
                        <p className='text-[16px]'>{t("modal.compAttempts", { count: tryComp })}</p>
                    </div>
                    <div className='flex gap-2.5 z-75'> 
                        <button onClick={resetGame} 
                            className="py-2.75 px-5.5 border-2 border-solid text-white bg-[#2fa8ff] border-[#2fa8ff] rounded-[14px] font-extrabold text-[14px] cursor-pointer transition duration-150 hover:-translate-y-0.5">
                            {t("modal.newRound")}
                        </button>
                        <Link to="/" className='py-2.75 px-5.5 rounded-[14px] font-extrabold bg-[#8b5cf6] text-white text-[14px] border-2 border-solid border-[#8b5cf6] transition duration-150 hover:-translate-y-0.5'>
                            {t("modal.changeLevel")}
                        </Link>
                    </div>
                </div>
            ) : (
                /* Winner card */
                <div className='py-8.5 px-7 w-[40%] flex justify-center items-center flex-col gap-3 bg-white border-2 border-solid border-[#FCA5A5] rounded-[26px] z-70'>
                    <p className='text-[24px] font-bold'>
                        {t("modal.winnerTitle", { winner: winner === "player" || winner === "You" || winner === "you" || winner === "أنت" ? (i18n.language === 'ar' ? 'أنت' : 'You') : (i18n.language === 'ar' ? 'الكمبيوتر' : 'Computer') })}
                    </p>
                    <div className='flex gap-4'>
                        <p className='text-[16px]'>{t("modal.userAttempts", { count: tryUser })}</p>
                        <p className='text-[16px]'>{t("modal.compAttempts", { count: tryComp })}</p>
                    </div>
                    <div className='flex gap-2.5 z-75'> 
                        <button onClick={resetGame} 
                            className="py-2.75 px-5.5 border-2 border-solid text-white bg-[#2fa8ff] border-[#2fa8ff] rounded-[14px] font-extrabold text-[14px] cursor-pointer transition duration-150 hover:-translate-y-0.5">
                            {t("modal.newRound")}
                        </button>
                        <Link to="/" className='py-2.75 px-5.5 rounded-[14px] font-extrabold bg-[#8b5cf6] text-white text-[14px] border-2 border-solid border-[#8b5cf6] transition duration-150 hover:-translate-y-0.5'>
                            {t("modal.changeLevel")}
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GameOverModal
