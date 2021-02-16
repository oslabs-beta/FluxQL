import React from 'react';
import TeamCard from '../components/teamCard';


export default function teamContainer() {
  const humans = [ 
    {name: 'Emily Krebs', profilePic: '../assets/emily.jpg', github: 'https://github.com/emilykrebs', linkedin: 'https://www.linkedin.com/in/emilyrkrebs/'}, 
    {name: 'Ross Sarcona', profilePic: '../assets/ross.jpg', github: 'https://github.com/RossRSarc', linkedin: 'https://www.linkedin.com/in/rosssarcona/'}, 
    {name: 'Daniel Dolich', profilePic: '../assets/daniel.jpg', github: 'https://github.com/danieldolich', linkedin: 'https://www.linkedin.com/in/daniel-dolich-2a5a97206/'},
    {name: 'Heidi Kim', profilePic: '../assets/heidi.jpg', github: 'https://github.com/heidiyoora', linkedin: 'https://www.linkedin.com/in/heidiykim/'},
    {name: 'Tommy Liang', profilePic: '../assets/tommy.jpg', github: 'https://github.com/mrtommyliang', linkedin: 'https://www.linkedin.com/in/mrtommyliang/'}  
  ];

  const cards = humans.map((human, i) => {
    return <TeamCard key={i} name = {human.name} profilePic = {human.profilePic} github = {human.github} linkedin = {human.linkedin}/>
  })

  return (
    <div className ='teamContainer'>
      {cards}
    </div>
  )
}
