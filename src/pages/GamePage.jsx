import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header/Header';
import GameContainer from '../components/GameContainer/GameContainer';
import CardsContainer from '../components/CardsContainer/CardsContainer';
import ComputerCard from '../components/ComputerCard/ComputerCard';
import PlayerCard from '../components/PlayerCard/PlayerCard';
import HistoryOfMatch from '../components/HistoryOfMatch/HistoryOfMatch';
import GameOverModal from '../components/GameOverModal/GameOverModal';

const GamePage = () => {
    const {t , i18n} = useTranslation();
    const {level} = useParams()
    const [turn, setTurn] = useState('computer');
    const [min , setMin] = useState(0)
    const [max , setMax] = useState(100)
    const [history , setHistory] = useState([])
    const [compGuess , setCompGuess] = useState(Math.floor(Math.random() * 101))
    const [playerGuess , setPlayerGuess] = useState("")
    const [compNumber , setCompNumber] = useState(0)
    const [message , setMessage] = useState("")
    const [tryComp, setTryComp] = useState(0)
    const [tryUser, setTryUser] = useState(0)
    const [isGameOver , setIsGameOver] = useState(false)
    const [winner , setWinner] = useState("")
    const [timeLeft , setTimeLeft] =useState(5)
    const [tutorialStep , setTutorialStep] = useState(1)
    const [isTutorialActive , setIsTutorialActive] = useState(false)

    const inputRef = useRef(null);

    const toggleLanguage = ()=>{
        let nextLang = i18n.language === "en" ? "ar" : "en";
        i18n.changeLanguage(nextLang)
    }
    
    useEffect(() => {
        resetGame();
    }, []); 

    useEffect(()=>{
        const hasSeenTutorial = localStorage.getItem('hasSeenGameTutorial');
        if(!hasSeenTutorial){
            setIsTutorialActive(true)
        }
    },[])

    const handleNextStep = ()=>{
        if(tutorialStep === 1){
            setTutorialStep(2)
            playerCardRef.current?.scrollIntoView({ behavior: 'smooth' });
        }else if(tutorialStep === 2){
            setTutorialStep(3)
            playerCardRef.current?.scrollIntoView({ behavior: 'smooth' });
        }else{
            finishTutorial();
        }
    }

    const finishTutorial =()=>{
        setIsTutorialActive(false);
        localStorage.setItem('hasSeenGameTutorial','true')
    }

    const tutorialKeys = {
        1: "tutorial.computerCard",
        2: "tutorial.playerCard",
        3: "tutorial.historyLog"
    };

    //Ensure we are in hard level, it's the player's turn, and the round hasn't ended yet
    useEffect(()=>{
        if(level === "hard" && turn === "player" && !winner){
            // Reset the time to 5 seconds at the start of each new turn
            setTimeLeft(5)

            // Create a timer that decreases the value every second (1000 milliseconds)
            const timer = setInterval(()=>{ 
                setTimeLeft((prev)=> {
                    if(prev === 0){
                        clearInterval(timer)
                        setWinner("computer")
                        return 0;
                    }
                    return prev - 1;
                })
            },1000)
            // Clean up the interval on turn change or round end to prevent overlapping timers
            return ()=> clearInterval(timer)
        }
    },[level , turn , winner])

    useEffect(() => {
        if (turn === 'player' && inputRef.current) {
            inputRef.current.focus();
        }
    }, [turn]);

    const binarySearchGuess = (currentMin , currentMax)=>{
        let nextCompGusse = Math.floor((currentMin + currentMax)/2)
        setCompGuess(nextCompGusse)
        setTryComp(prev => prev + 1)
        setTurn("player")
    }

    const edaitRange = (value) => {
        if(value === "correct"){
            setWinner("computer")
            return;
        }
        let updatedMin = min
        let updatedMax = max
        if (max - min === 0) {
            setIsGameOver(true)
            return;
        }
        if(value === "big"){
                if (compGuess >= 100) {
                toast.error(t("messages.invalid") );
                return;
            }
            updatedMin = compGuess + 1
            setMin(updatedMin)
        }else if(value === "small"){
            if (compGuess <= 0) {
                toast.error(t("messages.invalid"));
                return;
            }
            updatedMax = compGuess - 1
            setMax(updatedMax)
        }
        setHistory(prev =>[
            {id: prev.length+1 , player : "your divse", guess : compGuess , result: value },...prev
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
        if(playerGuess === " " || playerGuess === null || playerGuess === undefined || playerGuess > 100 || playerGuess < 0){
            setMessage("messages.invalid")
            return;
        }
        let playerNumber = Number(playerGuess)
        let retext = ""
        if(playerNumber > compNumber){
            setMessage("messages.smaller" ,{playerGuess : playerNumber})
            retext = "small"
            setTurn("computer")
        }else if(playerNumber < compNumber){
            setMessage("messages.larger", {playerGuess : playerNumber})
            retext = "big"
            setTurn("computer")
        }else{
            retext = "correct"
            setWinner("player")
            return;
        }
        setTryUser(prev => prev + 1)
        setHistory(prev => [
            {id : prev.length+1 ,player : "you", guess :playerNumber , result: retext }, ...prev
        ])
        
    }

    const resetGame = () => {
        // 1. Reset the search range and basic states
        setMin(0);
        setMax(100);
        setHistory([]);
        setPlayerGuess("");
        
        // 2. Generate the new secret number and initial computer guess only once
        const newSecretNumber = Math.floor(Math.random() * 101);
        setCompNumber(newSecretNumber);
        setCompGuess(0);
        console.log("New Secret Number:", newSecretNumber);
        
        // 3. Reset counters, messages, and game status
        setMessage("Waiting for your turn...");
        setTryComp(0);
        setTryUser(0);
        setIsGameOver(false);
        setWinner("");
        setTimeLeft(5);
        setTurn('computer');
    };

    return (
        <div className='mt-7 mx-6 mb-15  '>
            <ToastContainer 
                position="top-center" 
                autoClose={3000} 
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={i18n.language === 'ar'} 
                style={{ width: 'auto', maxWidth: '400px', margin: '0 auto' }}
                toastClassName="rounded-2xl shadow-xl border border-purple-100 my-2 mx-4"
            />       
            <Header changeLang={toggleLanguage} level={level} turn={turn} setIsTutorialActive={setIsTutorialActive} setTutorialStep={setTutorialStep} />
            <GameContainer>
                <CardsContainer dir={i18n.language === "en" ? "ltr" : "rtl"}>
                    <ComputerCard   turn={turn} compGuess={compGuess} min={min} max={max} tryComp={tryComp} onEditRange={calculateNextGuess}/>
                    <PlayerCard   level={level} turn={turn} tryUser={tryUser} timeLeft={timeLeft} winner={winner} playerGuess={playerGuess} setPlayerGuess={setPlayerGuess} evaluateGuess={evaluateGuess} inputRef={inputRef} message={message} />
                </CardsContainer>
                <HistoryOfMatch  history={history}/>
            </GameContainer>
            {(isGameOver || winner) && (
                <GameOverModal 
                    isDraw={isGameOver}
                    winner={winner}
                    tryUser={tryUser}
                    tryComp={tryComp}
                    resetGame={resetGame}
            />)}
            {isTutorialActive && (
                <div  className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center pt-1.5 p-4 pointer-events-auto">
                    <div className="bg-white rounded-2xl p-2.5 shadow-2xl max-w-80 w-full border-2 border-purple-200 relative animate-fadeIn z-50">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-bold">
                            {tutorialStep} / 3
                            </span>
                        </div>

                        <p dir ={i18n.language === "en" ? "ltr" : "rtl"} className="text-gray-800 text-lg font-medium mb-6 leading-relaxed">
                            {t(tutorialKeys[tutorialStep])}
                        </p>

                        <div className="flex justify-end">
                            <button onClick={handleNextStep} className="px-6 py-2 rounded-xl bg-purple-800 text-white font-bold hover:bg-purple-700 transition shadow-lg">
                            {tutorialStep === 3 ? t('tutorial.finish') : t('tutorial.next')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GamePage
