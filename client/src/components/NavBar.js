import React, { useEffect } from 'react'
import { NavLink, useHistory } from "react-router-dom"
import '../styles/Nav.css';

function NavBar( { currentUser, setCurrentUser, theme, setRoutines, setExercises}) {

  let history = useHistory()

  useEffect (() => {
    fetch("/current_user")
    .then(r => r.json())
    .then(data => {
      data.username ? setCurrentUser(data) : setCurrentUser(null)
    })
  }, [setCurrentUser])

  function handleLogout () {
    fetch(`/logout`, {
        method: "DELETE"
    }) 
    .then( r => { 
      history.push("/login") 
      setCurrentUser(null) 
      setRoutines([])
      setExercises([])
    })
  }

  return (

    currentUser 
    ? 
    <div className="nav-bar">
      <div className="nav-text-holder">
        <img 
          id={theme == 'dark' ? "navbar-logo" : "navbar-logo-light"}
          src={theme == 'light' ? "https://i.ibb.co/VvJKVfD/Screen-Shot-2022-04-18-at-1-54-37-PM-removebg.png" : "https://i.ibb.co/R48qFKz/Screen-Shot-2022-04-11-at-1-50-41-PM-removebg.png" }
        />
        <NavLink to={`/${currentUser.id}/profile`} className="nav-text"> 
          <h3 className="nav-text">{currentUser.name}</h3>
        </NavLink>
      </div>
      <div className="nav-text-holder">
        <NavLink to={`/${currentUser.id}/routines`} className="nav-text"> 
          <h3 className="nav-text">Routines</h3>
        </NavLink>
      </div>
      <div className="nav-text-holder">
        <h3 className="nav-text"
            onClick={handleLogout}
        >Log Out</h3>
      </div>
    </div>
    :
    <div className="nav-bar">
      <img 
        id={theme == 'dark' ? "navbar-logo" : "navbar-logo-light"}
        src={theme == 'light' ? "https://i.ibb.co/VvJKVfD/Screen-Shot-2022-04-18-at-1-54-37-PM-removebg.png" : "https://i.ibb.co/R48qFKz/Screen-Shot-2022-04-11-at-1-50-41-PM-removebg.png" } 
      />
    <div className="nav-text-holder">
    </div>
    <div className="nav-text-holder">
    </div>
    <div className="nav-text-holder">
      <NavLink to="/signup" className="nav-text"> 
        <h3 className="nav-text">Sign Up</h3>
      </NavLink> 
      <NavLink to="/login" className="nav-text"> 
        <h3 className="nav-text">Log In</h3>
      </NavLink>
    </div>
  </div>
  )
}

export default NavBar