import { useState } from 'react';
import './Auth.css';
import SignUp from './SignUp';
import LogIn from './Login';

export default function Auth(props) {
    const[view, setView] = useState('Sign Up')

    const toggleView = () => {
        if (view === 'Sign Up') {
            setView('Log In')
        } else {
            setView('Sign Up')
        }
    }

    return (
        <div id='Auth'>
            {view === 'Log In' ?
                <SignUp 
                    setUserId={props.setUserId} 
                    setUsername={props.setUsername} 
                    setInitialTasks={props.setInitialTasks}
                />
            :
                <LogIn 
                    setUserId={props.setUserId} 
                    setUsername={props.setUsername} 
                    setInitialTasks={props.setInitialTasks}
                />
            }
            <div id='ViewToggler'
                onClick={()=> toggleView()}
            >
                {view}
            </div>
        </div>
    )
}