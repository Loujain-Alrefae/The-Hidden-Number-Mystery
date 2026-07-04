import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'

const EntroOfGame = () => {
    const {t , i18n} = useTranslation();
    const toggleLanguage = ()=>{
        let nextLang = i18n.language === "en" ? "ar" : "en";
        i18n.changeLanguage(nextLang)
    }
    return (
        <div className=" flex justify-center items-center flex-col border w-162.5 text-center relative ">
            <h1>{t("game_title")}</h1>
            <p>{t("welcome_message")}</p>
            <div>
                <div>
                    <Link to="/level-easy">{t("levels.easy.name")}</Link>
                    <p>{t("levels.easy.description")}</p>
                </div>
                <div>
                    <Link to="/level-medium">{t("levels.medium.name")}</Link>
                    <p>{t("levels.medium.description")}</p>
                </div>
                <div>
                    <Link to="/level-hard">{t("levels.hard.name")}</Link>
                    <p>{t("levels.hard.description")}</p>
                </div>
            </div>
            <button onClick={toggleLanguage}>{i18n.language === "en" ? "AR" : "EN" }</button>
        </div>
    )
}

export default EntroOfGame
