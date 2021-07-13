import { useState } from 'react'
import './SignUp.css';
import axios from 'axios';


export default function SignUp(props) {
    const[signupInput, setSignupInput] = useState({
        username: '',
        password: ''
    })
    const[attemptingSignup, setAttemptingSignup] = useState(false)

    const handleChange = (e) => {
        if (e.target.name == 'username' && e.target.value.length > 7) {
            return
        }
        setSignupInput({...signupInput, [e.target.name]: e.target.value})
    }

    const attemptSignup = (e) => {
        e.preventDefault()
        setAttemptingSignup(true)
        axios
        .post(`${process.env.REACT_APP_API_URL}/users/add-user`, signupInput)
        .then((response)=> {
            console.log(response)
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
                setAttemptingSignup(false)
            } else {
                setAttemptingSignup(false)
                alert('Sign up attempt failed. Username may not be available.')
            }
        })
        .catch((err)=> {
            setAttemptingSignup(false)
            alert('Failed to sign up')
        })
    }

    return (
        <div id='SignUp'>
            <h2 id='SignupTitle'>Sign Up</h2>
            <form id='SignupForm'
                onSubmit={(e)=> attemptSignup(e)}
            >
                <input id='SignupUsername'
                    type='username'
                    name='username'
                    placeholder='enter username'
                    value={signupInput.username}
                    onChange={(e)=> handleChange(e)}
                />
                <input id='SignupPassword'
                    type='password'
                    name='password'
                    placeholder='enter password'
                    value={signupInput.password}
                    onChange={(e)=> handleChange(e)}
                />
                <button id='SignupButton'
                    className={attemptingSignup ? 'Hide' : ''}
                    disabled={
                        signupInput.username === '' ||
                        signupInput.password === ''
                    }
                >
                    sign up
                </button>
                <div id='AttemptingSignup'
                    className={!attemptingSignup ? 'Hide' : ''}    
                >
                    attempting sign up
                </div>
            </form>
        </div>
    )
}