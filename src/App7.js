import logo from './logo.svg';
import './App.css';
import { Profiler, useEffect,  useCallback, useState, useMemo } from 'react';
import Game from "./Game.js";
import GameOver from "./GameOver.js";
import { maxHP, maxDamage, formatTime } from './gameRules';
function App7() {
    const [HP, setHP] = useState([maxHP, maxHP, maxHP]);
    //qffwf
    const [score, setScore] = useState(0);
    const [botAction, setBotAction] = useState("none");
    const [playerAction, setPlayerAction] = useState("none");
    const [count, setCount] = useState(1);
    const [timer, setTimer] = useState(null);
    const [time, setTime] = useState(0);
    const [combo, setCombo] = useState({
       Attack:{
        value:maxDamage,
        count:0
       },
       Defense:{
        value:0,
        count:0
       }
    })


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

   
    const isGameOver = useMemo(() => {
        
        return HP[0] <= 0 || HP.some((x, i) => (i > 0) && (x <= 0))
    
    }, [HP]) 

    const newGame = () => {
        setHP([maxHP, maxHP, maxHP])
        setScore(0)
        setBotAction("none")
        setPlayerAction("none")
        setCount(1)
        clearInterval(timer)
        setTime(0)
        setCombo({
            Attack:{
                value:maxDamage,
                count:0
               },
               Defense:{
                value:0,
                count:0
               }
        })
    }  

    const gameOrOver = () =>{
        if(isGameOver){
            return <GameOver HP = {HP} Score = {score} newGame = {newGame} setTimer = {setTimer}  count={count}/> 
        }
        else{
            return <Game time = {time} combo = {combo} setCombo = {setCombo}  HP = {HP} setHP={setHP} Score = {score} setScore={setScore} botAction = {botAction} setBotAction = {setBotAction} playerAction = {playerAction} setPlayerAction = {setPlayerAction} count = {count} setCount = {setCount}/> 
        }
        
    }

    return (
        <div className="App">   
            {gameOrOver()}      
        </div>

    )

}

export default App7; 