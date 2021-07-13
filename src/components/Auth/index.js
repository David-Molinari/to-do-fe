import { useState } from 'react';
import './Auth.css';
import SignUp from './SignUp';
import LogIn from './Login';

export default function Auth(props) {
    const[view, setView] = useState('sign up')

    const toggleView = () => {
        if (view === 'sign up') {
            setView('log in')
        } else {
            setView('sign up')
        }
    }

    return (
        <div id='Auth'>
            {view === 'log in' ?
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