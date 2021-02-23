import React from 'react';
import TeamCard from '../components/teamCard';
import { useHomeContext } from '../state/contexts';


export default function teamContainer() {
  const { humans } = useHomeContext().homeState;

  const cards = humans.map((human, i) => {
    return <TeamCard key={i} name = {human.name} profilePic = {human.profilePic} github = {human.github} linkedin = {human.linkedin}/>
  });

  return (
    <div className ='teamContainer'>
      {cards}
    </div>
  );
}
