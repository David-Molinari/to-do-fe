import { useState } from 'react';
import './ToDo.css';
import axios from 'axios';
import { AiOutlineDelete } from 'react-icons/ai';
import Loader from "react-loader-spinner";

export default function ToDo(props) {
    const[tasks, setTasks] = useState(props.initialTasks)
    const[taskInput, setTaskInput] = useState('')
    const[addingTask, setAddingTask] = useState(false)

    const handleChange = (e) => {
        if (e.target.value.length > 25) {
            return
        }
        setTaskInput(e.target.value)
    }
    
    const deleteTask = (task) => {
        axios
        .delete(`${process.env.REACT_APP_API_URL}/tasks`, {data: {
            task: task,
            userId: props.userId
        }})
        .then(()=> {
            let newTasks = []
            tasks.forEach((e)=> {
                if (e !== task) {
                    newTasks.push(e)
                }
            })
            setTasks(newTasks)
        })
        .catch(()=> alert('Failed to delete task'))
    }

    const addTask = (e) => {
        e.preventDefault()
        // setAddingTask(true)
        let duplicate = false
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i] === taskInput) {
                duplicate = true
            }
        }
        if (duplicate === false) {
            axios
            .post(`${process.env.REACT_APP_API_URL}/tasks`, {
                task: taskInput,
                userId: props.userId
            })
            .then(()=> {
                let newTasks = tasks
                newTasks.push(taskInput)
                setTasks(newTasks)
                setTaskInput('')
                // setAddingTask(false)
            })
            .catch(()=> {
                // setAddingTask(false)
                alert('Failed to add task')
            })
        } else {
            // setAddingTask(false)
            alert('Task is a duplicate')
        }
    }

    return (
        <div id='ToDo'>
            <div id='TasksList'>
                {tasks.map((e)=> {
                    return (
                        <div className='TaskContainer' key={`task${e}`}>
                            <div className='Task'>
                                {e}
                            </div>
                            <div 
                                className='Delete'
                                onClick={()=> deleteTask(e)}
                            >
                                <AiOutlineDelete/>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div id='AddTask'>
                <form id='AddTaskForm'
                    onSubmit={(e)=> addTask(e)}
                >
                    <input id='AddTaskInput'
                        type='textarea'
                        placeholder='enter task'
                        value={taskInput}
                        onChange={(e)=> handleChange(e)}
                    />
                    <button id='AddTaskButton'
                        className={addingTask ? 'Hide' : ''}
                        disabled={taskInput === ''}    
                    >
                        add task
                    </button>
                    <Loader id='AddingTask'
                        className={!addingTask ? 'Hide' : ''} 
                        type='Circles'
                        color='#000000'
                        height={25}
                        width={25}
                    />
                </form>
            </div>
        </div>
    )
}