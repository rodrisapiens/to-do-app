import './main-styles/app.css';
import { useState, useRef, useEffect, useReducer } from 'react';
import { ReactComponent as Sun } from "./images/icon-sun.svg";
import { ReactComponent as Moon } from "./images/icon-moon.svg";
import ToDoList from './ToDoList';
import Task from "./Task"
import { DoneContext, ActiveContext, ShowContext,ActiveTask, contexFromIndex} from "./Context";
import BoxFootComands from "./BoxFootComands"
export const actions = {
  pushTask: "pushTask",
  toggle: "toggle",
  delete: "delete",
  clear: "clear",
  copy:"copy"
}
function reducer(listTasks, action) {
  switch (action.type) {
    case actions.pushTask:
      return [...listTasks, newTask(action.payLoad.task,listTasks)]
    case actions.toggle:
      return listTasks.map(task => {
        if (task.id === action.payLoad.id) {
          return { ...task, complete: !task.complete }
        }
        return task;
      })
    case actions.delete:
      console.log("borrar");
      return listTasks.filter(task => task.id !== action.payLoad.id);

    case actions.clear:
      console.log("clear");
      return listTasks.filter(task => task.complete === false);
      case actions.copy:
        console.log("copy");
        return[...action.payLoad];
    default:
      return listTasks;
  }
}
function newTask(task) {
  return { id:Date.now(), task: task, complete: false }
}
function App() {
  const [mode, setMode] = useState("ligth");
  const [task, setTask] = useState("");//en vez de name, task
  const [listTasks, dispatch] = useReducer(reducer, []);
  const [listDone, setListDone] = useState([]);
  const [listActive, setListActive] = useState([]);
  const [showContext, setShowContext] = useState("all");
  const [active,setActive]=useState(false);
  const [fromIndex,setFromIndex]=useState(0);

  useEffect(() => {
    setListDone([...listTasks.filter(task => task.complete === true)]);
    setListActive([...listTasks.filter(task => task.complete === false)]);
  }, [showContext,listTasks.length,active]);

  function handleMode() {
    if (mode === "ligth") {
      setMode("dark");
    }
    else {
      setMode("ligth");
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: actions.pushTask, payLoad: { task: task } });
    setTask("");
  }
  function handleShow() {
    if (showContext === "all") {
      return listTasks.map((task) => {
        return <Task key={task.id} task={task} dispatch={dispatch} mode={mode} listTasks={listTasks} />;
      })
    }
    if (showContext === "active") {
      console.log("active");

      return listActive.map((task) => {
        return <Task key={task.id + "active"} task={task} dispatch={dispatch} mode={mode} listTasks={listTasks} />;
      })
    }
    if (showContext === "completed") {
      console.log("completed");
      return listDone.map((task) => {
        return <Task key={task.id + "done"} task={task} dispatch={dispatch} mode={mode} listTasks={listTasks}/>;
      })

    }

  }


  return (
    <>
      <DoneContext.Provider value={{ listDone, setListDone }}>
        <ActiveContext.Provider value={{ listActive, setListActive }}>
          <ShowContext.Provider value={{ showContext, setShowContext }}>
            <ActiveTask.Provider value={{active,setActive}}>
            <contexFromIndex.Provider value={{ fromIndex, setFromIndex }}>
            <div className={mode === "ligth" ? "backGroundLigth" : "backGroundDark"}>
              <div className='app'>
                <div className="titleAndMode">
                  <h1 className="title">TODO</h1>
                  <button className="mode" onClick={handleMode}>{mode === "ligth" ? <Sun /> : <Moon />}</button>
                </div>
                <div className="inputbox">
                  <form onSubmit={handleSubmit}>
                    <input type="text" value={task} required placeholder='Create a new todo...' onChange={e => { setTask(e.target.value) }} />
                  </form>
                </div>
                <div className={mode === "dark" ? "taskBoxesDark" : "taskBoxesLigth"}>
                  {
                    handleShow()
                /* listTasks.map((task) => {
                  return <Task key={task.id} task={task} dispatch={dispatch} mode={mode} />;
                }) */}
                  <BoxFootComands  dispatch={dispatch} listTasks={listTasks} />
                </div>
              </div>
              <p className="footer">Drag and drop to reoder list</p>
            </div>
            </contexFromIndex.Provider>
            </ActiveTask.Provider>
          </ShowContext.Provider>
        </ActiveContext.Provider>
      </DoneContext.Provider>

    </>
  );
}

export default App;
