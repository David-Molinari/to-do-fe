import { useState, useEffect } from 'react';
import './Footer.css';
import axios from 'axios';

export default function Footer(props) {
    const[loggedIn, setLoggedIn] = useState(false)

    useEffect(()=> {
        if (props.user !== '' || props.user !== 'loggedOut') {
            setLoggedIn(true)
        }
    }, [props])

    const logout = () => {
        axios.defaults.headers.common['Authorization'] = ''
        window.localStorage.setItem('todo-token', '')
        document.title = 'To-Do'
        props.setUserId(-1)
        props.setInitialTasks([])
        props.setUsername('loggedOut')
    }

    return (
        <div id='Footer'>
            {loggedIn === true ?
                <h5 id='Logout'
                    onClick={()=> logout()}> 
                    Logout
                </h5>
            : ''
            }
        </div>
    )
}