import React from 'react'

export default function contactContainer() {
  return (
    <div id='contact'>
      <div className ='contactDescription'>


      </div>



      <form id='contactForm' className='topBefore'>
        <input id='name' type='text' placeholder='NAME'/>
        <input id='email' type='text' placeholder='E-MAIL'/>
        <textarea id='messageBody' type='text' placeholder='MESSAGE'/>
        <input id="submit" type="submit" value="SUBMIT"/>
      </form>
    </div>
  );
}
