import './App.css';
import { Profiler, useEffect,  useCallback, useState, useMemo} from 'react';
import { Tab } from '@headlessui/react'
import {PREFERENCE} from './gameRules';
function StartWindow({pref, setPref, newGame}){
    const [selectedIndex, setSelectedIndex] = useState(0)
    useEffect(()=>{
        setPref(Object.keys(PREFERENCE)[selectedIndex])
    }, [selectedIndex])
    
    return(
    <div>
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>      
            <Tab.List>
               {Object.keys(PREFERENCE).map((val)=>{
                    return <Tab className="" key={val}>{val}</Tab>
               })}
            </Tab.List>
            <Tab.Panels>
                {Object.values(PREFERENCE).map((val, index) => {
                    return <Tab.Panel key={index}>{val}</Tab.Panel>
                })}
            </Tab.Panels>
        </Tab.Group>
        <button className="font-bold underline" onClick={newGame}>Далее</button>
    </div>
    )
}

export default StartWindow; 