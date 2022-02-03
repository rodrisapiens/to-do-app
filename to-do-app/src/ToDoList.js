import React, { useState, useEffect } from 'react';
import { ReactComponent as IconCheck } from "./images/icon-check.svg";
import { ReactComponent as IconCross } from "./images/icon-cross.svg";

function ToDoList(props) {
    const [listTasks, setListTask] = useState([]);
    const [reload, setReload] = useState(false);
    const [cross,setCross]=useState(false);
    function handleCross(e,listTasks) {
        console.log("esto lo imprimo en handleCross:")
        const id = e.currentTarget.id;
        console.log("el id que estoy apuntando es:"+id);
        let i = 0;
        console.log(listTasks);
        while(listTasks[i].key!=id)
        {
            i++;
        }
        listTasks.splice(i,1);
    }
    useEffect(() => {
      if(cross)
      {
         setCross(false)
      }
    
     
    }, [cross]);
    
   
    
    useEffect(() => {
        if (props.task != null) {
            console.log("estuve pusheando...");
            const element=<div key={props.task} className='taskRaw'>
            <button id={"check" + props.task}><IconCheck className="done" /></button>
            <li key={"li" + props.task}>{props.task}</li>
            <button id={props.task} onClick={(e)=>{const id = e.currentTarget.id;
            console.log(listTasks.map((item) => { return item }));}}><IconCross className="cross" /></button>
        </div>;
            setListTask([...listTasks,element])
           /*  now.push(
                <div key={props.task} className='taskRaw'>
                    <button id={"check" + props.task}><IconCheck className="done" /></button>
                    <li key={"li" + props.task}>{props.task}</li>
                    <button id={props.task} onClick={handleCross}><IconCross className="cross" /></button>
                </div>
            ); */
           /*  setListTask(now);
            console.log("new render " + listTasks[listTasks.length - 1].key)
            setReload(!reload) */

        }
    }, [props.task]);

    function handleList() {
        console.log("esto lo imprimo en handleList:")
        console.log(listTasks);
        return listTasks.map((item) => { return item });
    }

    return (
        <div className='controlBox'>
            <ul className="listBox">
                {handleList()}
            </ul>
        </div>
    );
}

export default ToDoList;
