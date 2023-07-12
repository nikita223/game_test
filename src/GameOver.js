import { useEffect, useState, memo } from "react";
import './App.css';
import { useGameStore } from "./store/store";

function GameOver({botsHP, newGame, setTimer, count}){
  const score = useGameStore((state) => state.score)
  let index = botsHP.findIndex((x) => x === 0)
  useEffect(()=>{
    setTimer((prevTime)=>{
      clearInterval(prevTime)
      return null
    })
  }, [])
 
    return(
        <div className='content2'> 
        <div className="Score">SCORE: {parseInt(score/count)}</div>
        <div className="result">{index === 1 ? "Победил игрок" : "Победил бот"}</div>  
        <div className="over" onClick={newGame}>Новая игра</div>
        </div>
    )
}

export default GameOver