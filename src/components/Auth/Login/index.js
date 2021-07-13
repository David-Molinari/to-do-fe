import { useState } from 'react';
import './Login.css';
import axios from 'axios';

export default function Login(props) {
    const[loginInput, setLoginInput] = useState({
        username: '',
        password: ''
    })
    const[attemptingLogin, setAttemptingLogin] = useState(false)

    const handleChange = (e) => {
        setLoginInput({...loginInput, [e.target.name]: e.target.value})
    }

    const attemptLogin = (e) => {
        e.preventDefault()
        setAttemptingLogin(true)
        console.log(attemptingLogin)
        axios
        .post(`${process.env.REACT_APP_API_URL}/users/check-auth`, loginInput)
        .then((response)=> {
            if (response.data.auth === true) {
                let tasksAdj = []
                for (let i = 0; i < response.data.tasks.length; i++) {
                    tasksAdj.push(response.data.tasks[i].Task)
                }
                axios.defaults.headers.common['Authorization'] = response.data.token
                window.localStorage.setItem('todo-token', response.data.token)
                props.setInitialTasks(tasksAdj)
                props.setUserId(response.data.userId)
                document.title = `${response.data.username}'s to-do`
                props.setUsername(response.data.username)
                setAttemptingLogin(false)
            } else {
                setAttemptingLogin(false)
                alert('Log in attempt failed')
            }
        })
        .catch(()=> {
            setAttemptingLogin(false)
            alert('Failed to log in')
        })
    }

    return (
        <div id='Login'>
            <h2 id='LoginTitle'>Log In</h2>
            <form id='LoginForm'
                onSubmit={(e)=> attemptLogin(e)}
            >
                <input id='LoginUsername'
                    type='username'
                    name='username'
                    placeholder='enter username'
                    value={loginInput.username}
                    onChange={(e)=> handleChange(e)}
                />
                <input id='LoginPassword'
                    type='password'
                    name='password'
                    placeholder='enter password'
                    value={loginInput.password}
                    onChange={(e)=> handleChange(e)}
                />
                <button id='LoginButton'
                    className={attemptingLogin ? 'Hide' : ''}
                    disabled={
                        loginInput.username === '' ||
                        loginInput.password === ''
                    }
                >
                    log In
                </button>
                <div id='AttemptingLogin'
                    className={!attemptingLogin ? 'Hide' : ''}    
                >
                    attempting log in
                </div>
            </form>
        </div>
    )

}