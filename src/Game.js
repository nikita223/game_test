import classNames from "classnames";
import { useEffect, useState, memo } from "react";
import './App.css';
import {updatePlayerState, DISPLAY_ACTIONS_BOT_MAXIMUM_COUNT, setDefaultActionsBots, COUNT_BOTS, collectActionsBot, updateBotState, DISPLAY_ACTIONS_PLAYERS_MAXIMUM_COUNT, drawBotsActionHistory, ACTIONS, calculateHPChange, randomizeAction, CharacterStatuses, MAX_DAMAGE, updateCombo, formatTime} from './gameRules';
import { useGameStore } from './store/store.js';

function Game({pref, setStateGame, playerHP, setPlayerHP, time, combo, setCombo, botsHP, setBotsHP, botAction, setBotAction, playerAction, setPlayerAction, count, setCount}){
    const score = useGameStore((state) => state.score)
    const setScore = useGameStore((state) => state.changeScore)
    const [buttonActive, setButtonActive] = useState({button:'none', status:'deactive'});
    const [botID, setBotID] = useState(null)
    const [botsActionsHIstory, setBotsHistoryAction] = useState(setDefaultActionsBots())
    const [playerActionsHistory, setPlayerHistoryAction] = useState([null, null, null, null, null])
    useEffect(() => {
        console.log(pref)    
        setBotAction(()=>{   
            return randomizeAction()
        })

        const statusPlayer = new CharacterStatuses("player", ACTIONS[playerAction][botAction].HP[0], ACTIONS[playerAction][botAction].Score)
        const statusBot = new CharacterStatuses("bot", ACTIONS[playerAction][botAction].HP[1], null)

        updateBotState(setBotsHistoryAction, botID, botAction)
        updatePlayerState(setPlayerHistoryAction, playerAction)
       
        setBotsHP((prevbotsHP) =>{
            let newbotsHP = [...prevbotsHP]
            newbotsHP[botID] = calculateHPChange(prevbotsHP[botID], statusBot.HP)
            return newbotsHP
        }        
           )
        setPlayerHP((prevPlayerHP)=>{
          return calculateHPChange(prevPlayerHP, statusPlayer.HP)
        })
        setCombo((prevCombo) =>{   
            if(statusBot.HP === -MAX_DAMAGE){
                if(statusPlayer.HP < 0){
                    return updateCombo(prevCombo.Attack.count + 1, 0)   
                }
                return updateCombo(prevCombo.Attack.count + 1, prevCombo.Defense.count)
            }
            if(statusPlayer.status === "Protected"){
                return updateCombo(0, prevCombo.Defense.count + 1)
            }
                return updateCombo(0, 0)
        })
        let nextScore = score
        if(statusBot.HP === -MAX_DAMAGE){
            nextScore = nextScore + (combo.Attack.count * statusPlayer.score)   
        }
        else if(statusPlayer.status === "Protected"){
            nextScore = nextScore + (combo.Defense.count * statusPlayer.score)   
        }
        else {
            nextScore = nextScore + statusPlayer.score
        }
        setScore(nextScore)
        
        }, [count])

        useEffect(()=>{
            if(playerHP <= 0 || botsHP.some((x) => (x <= 0))){
                setStateGame(()=>
                ("GameOver"))
            }
        }, [count])

    const handleAction = (action) =>{
        if(action === "Fail") {
            setPlayerHP(0)
            setCount((prevCount)=>{
            return prevCount + 1
            })
        }
        if(buttonActive.button === action && buttonActive.status === 'Active' && botID){
            setPlayerAction(action) 
            setCount((prevCount)=>{
            return prevCount + 1
        })
    }
        setButtonActive({
                button:action,
                status:'Active'
    })
    }
    const handleСhoice = (id) =>{
        setBotID(id)
    }
    return(
        <div className="conteyner">
        <div className="infoPanel">
            <div className="combo">
                <div className="attack_combo">12</div>
                <div>0</div>
            </div>
            <div className="calc">
                <div className="time">{formatTime(time)}</div>  
                <div className="Score">SCORE: {score}</div>
            </div>
            <div className="room">Комната 1</div>
        </div>
        <div className='content2'>
            <div className="characters">
                <div className="botsHPBar">
                    <div className="icons"></div>
                    <div> {playerHP}</div>
                </div>
                <div className='player'>
                    <div className="img_player"></div>
                    {drawBotsActionHistory(playerActionsHistory)}
                </div>
            </div>  
            <div className="characters">
                <div className="enemies">
                <div className="botsHPBar">
                    <div>{botsHP[0]}</div>
                    <div className="icons"></div>
                    </div>
                <div className='bot'>
                {drawBotsActionHistory(botsActionsHIstory[0])}
                    <div className={classNames("img_bot", {"active_bot":botID === "0"})} id="1"  onClick={() => handleСhoice("0")}></div> 
                </div>
                </div>
                <div className="enemies">
                <div className="botsHPBar">
                    <div className="icons"></div>
                    <div>{botsHP[1]}</div>
                    </div>
                <div className='bot'>
                {drawBotsActionHistory(botsActionsHIstory[1])}
                    <div className={classNames("img_bot", {"active_bot":botID === "1"})} id="2" onClick={() => handleСhoice("1")}></div>    
                </div>
                </div>   
            </div>   
        </div>
         <div className='form'>
            <div className="buttonsGroup">
         <div className={classNames('Attack', {'active': buttonActive.status === 'Active' &&  buttonActive.button === 'Attack'})}  onClick={() => handleAction("Attack")}></div>
         <div className={classNames('Defense', {'active': buttonActive.status === 'Active' &&  buttonActive.button === 'Defense'})}  onClick={() => handleAction("Defense")}></div>
         <div className={classNames('Skip', {'active': buttonActive.status === 'Active' &&  buttonActive.button === 'Skip'})}  onClick={() => handleAction("Skip")}></div>
         <div className={classNames('Spell', {'active': buttonActive.status === 'Active' &&  buttonActive.button === 'Spell'})}   onClick={() => handleAction("Spell")}></div>
         <div className='fail' onClick={() => handleAction("Fail")}></div>
            </div>
     </div>   
     </div> 
    )
}

export default Game 