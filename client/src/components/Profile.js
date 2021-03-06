import React, { useState, useEffect } from 'react'
import '../styles/Profile.css';
import Calendar from './Calendar'
import { useParams, useHistory } from "react-router-dom"

function Profile({ theme, setCurrentUser, currentUser, routineCount, exerciseCount}) {
 
  const [bio, setBio] = useState()
  const [name, setName] = useState() 
  const [editProfile, setEditProfile] = useState(false)
  const [calendarDates, setCalendarDates] = useState([])
  const [confirmDelete, setConfirmDelete] = useState(false)
  
  let history = useHistory();

  useEffect(() => {

    setEditProfile(false)

    fetch('/calendar_dates')
    .then(r => r.json())
    .then(data => {
      setCalendarDates(data)
    })
  }, [])

  function handleEditProfile() {
    setEditProfile(!editProfile)
  }

  function saveProfile() {

    fetch(`/users/${currentUser.id}`, { 
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name: name, bio: bio})
    })
    .then(r => r.json())
    .then(data => {
      if (data.errors) {
        console.log(data.errors)
      }
      else {
        setCurrentUser(data)
      }
      setEditProfile(false)
    })
  }

  function handleDeleteProfile() {

    fetch(`/users/${currentUser.id}`, { 
      method: "DELETE"
    })
    setCurrentUser(null)
    history.push("/login") 
  }

  return (
    currentUser ?
    <div className="profile-holder">
      <div id="left-profile-page">
        <img 
          className="main-profile-img"
          src={theme == "light" ? "https://i.ibb.co/0t4gR4Y/Screen-Shot-2022-04-11-at-12-31-51-PM-modified.png" : "https://i.ibb.co/zSX5Ncj/Screen-Shot-2022-04-11-at-12-31-32-PM-modified.png"}
        />
        <div className="profile-details">
          {editProfile ? 
            <input 
              className="profile-input"
              defaultValue={currentUser.name}
              value={name}
              onChange={(e) => setName(e.target.value)}></input> : <h1>{currentUser.name}</h1>}
          {editProfile ? 
            <input 
              className="profile-input"
              defaultValue={currentUser.bio}
              value={bio}
              onChange={(e) => setBio(e.target.value)}></input> : <h3>Bio: {currentUser.bio}</h3>}
          {editProfile ? 
            <button className = "button" id="save-profile" onClick={saveProfile}>Save</button> : null}
        </div>
        <div className="created-details">
          <h2>Routines created:</h2>
          <h2>{routineCount}</h2>
        </div>
        <div className="created-details">
          <h2>Exercises created:</h2>
          <h2>{exerciseCount}</h2>
        </div>
        {confirmDelete ? <p className="error">Account deletion cannot be undone! Are you sure?</p> : null}
        <div className="profile-buttons">
          {confirmDelete ?
          <>
            <button 
              id="confirm-delete" 
              className="button"
              onClick={handleDeleteProfile}>
                Yes, Delete
            </button> 
            <button 
              id="cancel" 
              className="button"
              onClick={() => setConfirmDelete(false)}>
                Cancel
            </button> 
          </> :
          <>
            <button 
            id="edit-account" 
            className="button"
            onClick={handleEditProfile}>
              Edit Profile
            </button> 
            <button 
              onClick={() => setConfirmDelete(true)}
              id="delete-account" 
              className="button">
                Delete Account
            </button>
          </>
          }
        </div>
      </div>
      <div id="right-profile-page">
        <div className="calendar-div">
          <Calendar
            values={calendarDates}
          />
          <i id="cal-note">Your calendar will update when you save a new BPM for at least one of your exercises. Get practicing!</i>
        </div>
      </div>
    </div>
    : null
  )
}

export default Profile