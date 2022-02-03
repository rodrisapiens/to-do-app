import React, { useContext,useState } from 'react';
import "./main-styles/task.css";
import { DoneContext, ActiveContext,ShowContext } from "./Context";
import {actions} from "./App.js";



function BoxFootComands({dispatch}) {
    const {listDone, setListDone} = useContext(DoneContext);
    const {listActive, setListActive} = useContext(ActiveContext);
    const {showContext,setShowContext}=useContext(ShowContext);

    return <div className='comandLine'>
        <p className="itemsLeft">{listActive.length} items left</p>
        <div className="mid">
            <button className={showContext==="all"?"allOn":"allOff"} onClick={()=>{setShowContext("all")}}>All</button>
            <button className={showContext==="active"?"activeOn":"activeOff"} onClick={()=>{setShowContext("active")}}> Active</button>
            <button className={showContext==="completed"?"completedOn":"completedOff"} onClick={()=>{setShowContext("completed")}}>Completed</button>

        </div>
        <button className="clearCompleted" onClick={()=>
        {
            dispatch({type:actions.clear});
            console.log("pepe");

        }}>Clear Completed</button>

    </div>;
}

export default BoxFootComands;
