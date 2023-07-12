
import './App.css';
import { Profiler, useEffect,  useCallback, useState, useMemo} from 'react';
import Game from "./Game.js";
import GameOver from "./GameOver.js";
import StartWindow from './StartWindow';
import { MAX_HP, MAX_DAMAGE, formatTime } from './gameRules';
import { useGameStore } from './store/store';


function App7() {
    const [botsHP, setBotsHP] = useState([MAX_HP, MAX_HP]); // botStore
    const [playerHP, setPlayerHP] = useState(MAX_HP) // playerStore
    const resetScore = useGameStore((state) => state.resetScore)
    const [botAction, setBotAction] = useState("none"); //botScore
    const [playerAction, setPlayerAction] = useState("none"); //playerStore
    const [count, setCount] = useState(1); //gameStore
    const [timer, setTimer] = useState(null); //gameStore
    const [time, setTime] = useState(0); //gameStore
    const [pref, setPref] = useState("Легко") //gameRules
    const [stateGame, setStateGame] = useState("StartWindow") //gameStore
    const [combo, setCombo] = useState({
       Attack:{
        value:MAX_DAMAGE,
        count:0
       },
       Defense:{
        value:0,
        count:0
       }
    }) //playerStore
    const newGame = () => {
        setBotsHP([MAX_HP, MAX_HP])
        setPlayerHP(MAX_HP)
        resetScore()
        setStateGame("Game")
        setBotAction("none")
        setPlayerAction("none")
        setCount(1)
        clearInterval(timer)
        setTime(0)
        setCombo({
            Attack:{
                value:MAX_DAMAGE,
                count:0
               },
               Defense:{
                value:0,
                count:0
               }
        })
    }  
   
    useEffect(()=>{
        setTimer((prevTimer)=>{

        if(prevTimer){
            clearInterval(prevTimer) 
        }
        return setInterval(() => {
            setTime((prevTime) =>{
                return prevTime + 1
            })

        }, 1000)
    })

    }, [])

    const stateComponent = ()=>{
        switch(stateGame){  
            case "GameOver": return <GameOver playerHP = {playerHP} botsHP = {botsHP}  newGame = {newGame} setTimer = {setTimer}  count={count}/>;
           
            case "Game": return <Game pref = {pref} setStateGame = {setStateGame} setPlayerHP = {setPlayerHP} playerHP = {playerHP} time = {time} combo = {combo} setCombo = {setCombo}  botsHP = {botsHP} setBotsHP={setBotsHP}  botAction = {botAction} setBotAction = {setBotAction} playerAction = {playerAction} setPlayerAction = {setPlayerAction} count = {count} setCount = {setCount}/>;
          
            default: return <StartWindow pref = {pref} setPref = {setPref} newGame = {newGame}/>;
        }
    }
    return (
        <div className="App">   
           {stateComponent()} 
        </div>
    )

}

export default App7; 