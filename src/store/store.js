import { create } from 'zustand'
import { MAX_HP } from '../gameRules'
import { MAX_DAMAGE } from '../gameRules'

const useGameStore = create((set) => ({
  score: 0,
  time: 0,
  changeScore: (value) => set(prevState => ({score:prevState.score + value})),  
  resetScore: () => set({score:0}),  

}))

const usePlayerStore = create((set) => ({
  HP: MAX_HP,
  Action:'none',
  Combo: {
   Attack:{
    value:MAX_DAMAGE,
    count:0
   },
   Defense:{
    value:0,
    count:0
   }
  },
  changeHP: (value) => set(prevState => ({HP:prevState.HP + value})),
  resetHP: () => set({HP:MAX_HP}),
}))
export{useGameStore}