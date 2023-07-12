import classNames from "classnames";

const MAX_HP = 100;
const MAX_DAMAGE = 15;
const COUNT_BOTS = 2;  
const DISPLAY_ACTIONS_PLAYERS_MAXIMUM_COUNT = 5;
const DISPLAY_ACTIONS_BOT_MAXIMUM_COUNT = 3;
const ACTIONS_BOT = ["Attack", "Defense", "Skip", "Spell"];  
const PREFERENCE = {
    "Легко":"для тех, кто хочет просто расслабиться и наслаждаться игрой. Вы получаете много преимуществ и поддержки.",
    "Средне":"для тех, кто хочет испытать себя и игру. Вы получаете справедливые условия и некоторую поддержку.",
    "Тяжело":"для тех, кто хочет преодолеть себя и игру. Вы получаете минимум преимуществ и поддержки."
} 
const ACTIONS = ({
    Attack:{
        Attack:{
            HP:[-10, -10],
            Score:30
        },
        Defense:{
            HP:[-5, 0],
            Score:-20 
        },
        Spell:{
            HP:[-10, -5],
            Score:30
        },
        Skip:{
            HP:[0, -10],
            Score:70
        }
    },
    Defense:{
        Attack:{
            HP:[0, -5],
            Score:100
        },
        Defense:{
            HP:[0, 0],
            Score:50
        },
        Spell:{
            HP:[-15, 0],
            Score:-50
        },
        Skip:{
            HP:[0, 10],
            Score:50
        } 
    },
    Spell:{
        Attack:{
            HP:[-5, -10],
            Score:30
        },
        Defense:{
            HP:[0, -15],
            Score:150
        },
        Spell:{
            HP:[-15,-15],
            Score:50
         },
        Skip:{
            HP:[0, -5],
            Score:70
        } 
    },
    Skip:{
        Attack:{
            HP:[-10, 0],
            Score:-20
        },
        Defense:{
            HP:[10, 0],
            Score:-25
        },
        Spell:{
            HP:[-5, 0],
            Score:-20
        },
        Skip:{
            HP:[10, 10],
            Score:30
        } 
    },
    none:{
        none:{
            HP:[0, 0],
            Score:0
         }
    }
})

function setDefaultActionsBots(){
    let array = new Array(DISPLAY_ACTIONS_BOT_MAXIMUM_COUNT)
    for(let i = DISPLAY_ACTIONS_BOT_MAXIMUM_COUNT - 1; i >= 0; i--){
        array[i] = null;
    }
    let arr = [];
    for(let i = COUNT_BOTS; i > 0; i--){
        arr = [...arr, array]
    }
    return arr
}
    const calculateHPChange = (current, changeValue) => {
        if(changeValue === 0){
            return current
        }
        return current = current + changeValue >= MAX_HP ? MAX_HP : current + changeValue;
    }
   
    const randomizeAction = (min = 0, max = ACTIONS_BOT.length - 1) => {
        const index = Math.floor((Math.random() - min) * (max + 1));
        return ACTIONS_BOT[index]
    }
 
    function collectActionsBot(countBots, countActions){
       return new Array(countBots, countActions)
    }

    function CharacterStatuses(role, HP, score){
        this.role = role
        this.HP = HP
        this.score = score
        if(HP > 0){
            this.status = "healing"   
        }
        if(HP === 0){
            this.status = "Protected"
        }
        if(HP < 0){
            this.status = "Damage"
        }
       }
      
    function formatTime(time){
        const hours = (time / 3600) > 9 ? parseInt(time / 3600) : "0" + parseInt(time / 3600)
        const minutes = (time % 3600 / 60) > 9 ? parseInt(time % 3600 / 60) : "0" + parseInt(time % 3600 / 60)
        const seconds = (time % 3600 % 60) > 9 ? time % 3600 % 60 : "0" + time % 3600 % 60  
        return String(seconds + ":" + minutes + ":" + hours)
    }

    function updateCombo(countAttak, countDefense){
        const newCombo = {
            Attack:{
                value:MAX_DAMAGE,
                count:countAttak
            },
            Defense:{
                value:0,
                count:countDefense
               }
            }
        return newCombo
    }


    function drawBotsActionHistory(history){  
        return(
            <div className="actionBar">
                {history.map((element, index) =>{      
                    if(element !== null){
                    return(
                    <div key={index}  className="iconsAction">
                        <div>{index + 1}</div>
                        <div className={classNames('imgIcon', element)} ></div>
                    </div>)
                    }
                }
                )}    
            </div>
        )
    }


    function updateBotState(setHistoryAction, botID, botAction){
        if(botID === null) {
            return
        }
        setHistoryAction((prevBotsActionsHIstory)=>{
            const newBotsActionsHIstory = prevBotsActionsHIstory;
            newBotsActionsHIstory[parseInt(botID)] = newBotsActionsHIstory[parseInt(botID)].map((value, index, array)=>{
               
                if(index === (DISPLAY_ACTIONS_BOT_MAXIMUM_COUNT - 1)){
                    return botAction
                 }
                
                return array[index + 1] ? array[index + 1]  : null;
            })
            
            return newBotsActionsHIstory;
            })
    }
    
    function updatePlayerState(setPlayerHistoryAction, playerAction){
        setPlayerHistoryAction((prevActionsHIstory)=>{
           
            const newActionsHIstory = prevActionsHIstory.map((value, index, array)=>{
               
                if(index === (DISPLAY_ACTIONS_PLAYERS_MAXIMUM_COUNT - 1)){
                    return playerAction === 'none' ? null : playerAction
                 }
                
                return array[index + 1] ? array[index + 1]  : null;
            })
            console.log(prevActionsHIstory)
            return newActionsHIstory;
            })
    }
export {PREFERENCE, updatePlayerState, updateBotState, setDefaultActionsBots, collectActionsBot, COUNT_BOTS, DISPLAY_ACTIONS_PLAYERS_MAXIMUM_COUNT, DISPLAY_ACTIONS_BOT_MAXIMUM_COUNT, drawBotsActionHistory, ACTIONS_BOT, ACTIONS, MAX_HP, MAX_DAMAGE, CharacterStatuses, calculateHPChange, randomizeAction, formatTime, updateCombo}