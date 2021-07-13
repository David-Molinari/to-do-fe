import { useState, useEffect } from 'react';
import './App.css';
import Auth from './components/Auth';
import ToDo from './components/ToDo';
import axios from 'axios';

function App() {
  const[userId, setUserId] = useState(-1)
  const[username, setUsername] = useState('')
  const[initialTasks, setInitialTasks] = useState([])
  const[loggedIn, setLoggedIn] = useState(false)

  useEffect(()=> {
    const localToken = window.localStorage.getItem('todo-token')
    if (localToken != undefined && localToken.length != 0) {
      axios.defaults.headers.common['Authorization'] = localToken
      axios
        .get(`${process.env.REACT_APP_API_URL}/auth`)
        .then((response)=> {
          if (response.data.auth === true) {
            let tasksAdj = []
            for (let i = 0; i < response.data.Tasks.length; i++) {
              tasksAdj.push(response.data.Tasks[i].Task)
            }
            setUserId(response.data.UserID)
            setInitialTasks(tasksAdj)
            document.title = `${response.data.Username}'s to-do`
            setUsername(response.data.Username)
          } else {
            setUsername('loggedOut')
          }
        })
        .catch((err)=> console.log(err))
    } else {
      setUsername('loggedOut')
    }
  }, [])

  useEffect(()=> {
    if (username != undefined && username != 'loggedOut') {
        setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [username])

  const logout = () => {
    axios.defaults.headers.common['Authorization'] = ''
    window.localStorage.setItem('todo-token', '')
    document.title = 'To-Do'
    setUserId(-1)
    setInitialTasks([])
    setUsername('loggedOut')
  }

  return (
    <div className="App">
      {username.length > 0 && username !== 'loggedOut' ?
        <>
          <div id="Nav">
            <h1 id='ListUser'>{username}'s</h1>
            <h1 id='Title'
                onClick={()=> window.location.reload()}
            >
                to-do:
            </h1>
          </div>
          <ToDo 
            userId={userId} 
            username={username} 
            initialTasks={initialTasks}
          />
        </>
      : username === 'loggedOut' ?
        <>
          <div id="Nav">
            <h1 id='Title1'
                onClick={()=> window.location.reload()}
            >
                To-Do
            </h1>
          </div>
          <Auth 
            setUserId={setUserId} 
            setUsername={setUsername} 
            setInitialTasks={setInitialTasks}
          />
        </>
      :
        <h5 id="AppLoading">loading...</h5>
      }
      <div id='Footer'>
          {loggedIn === true ?
              <div id='Logout'
                  onClick={()=> logout()}> 
                  log out
              </div>
          : ''
          }
      </div>
    </div>
  );
}

export default App;
