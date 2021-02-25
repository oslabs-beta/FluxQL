import React from 'react'

export default function contactContainer() {
  return (
    <div id='contact'>
      <div className ='contactDescription'>
        <hr />
        <h3> Please feel free to submit <br></br>any comments or suggestions! </h3>
      </div>
      <form id='contactForm' className='topBefore' action='https://formspree.io/f/xyybqywd' method='POST'>
        <input id='name' type='text' name='name'placeholder='NAME'/>
        <input id='email' type='email' name='_replyto' placeholder='E-MAIL'/>
        <textarea id='messageBody' type='text' name='message' placeholder='MESSAGE'/>
        <input id="submit" type="submit" value="SUBMIT"/>
      </form>
    </div>
  );
}
