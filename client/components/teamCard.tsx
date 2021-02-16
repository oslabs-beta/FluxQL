import React from 'react';


export default function teamCard({ name, profilePic, github, linkedin }) {
  return (
    <div className ='teamCard'>
      <img className = 'profilePicture' src = {profilePic}  alt = 'profile picture' />
      <h1>{name}</h1>
      <div className='logoContainer'>
        <img src = '../assets/github.png' className='logos' alt = 'clickme' onClick = {() => window.open(github)} />
        <img src = '../assets/linkedin.png' className='logos' alt ='clickme' onClick = {() => window.open(linkedin)} />
      </div>
    </div>
  )
}
