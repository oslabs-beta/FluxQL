import React from 'react';

export default function URILink ({ databaseName, handleURIModal }){
  //const [url, setUrl] = useState('')
  
  return (
    <div className='URILinkBox'>
      <p>{databaseName} Link</p>
      <input 
      type="text" 
      className="linkInput" 
      id={`${databaseName}Input`}
      // value = ''
      placeholder="paste your database link"></input>

      <button onClick={() => {
        // to change remove the blur affect
        const fullAppPage = document.getElementById('AppPage');
        fullAppPage.style.filter = 'none';

        handleURIModal();
        
        // send POST request to server
        const url = document.getElementById(`${databaseName}Input`).value;
        console.log('url', url);

        fetch(`/${databaseName.toLowerCase()}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'Application/JSON',
          },
          body: JSON.stringify({
            [`${databaseName.toLowerCase()}URI`]: url,
          }),
        })
          .then(data => data.json())
          .then((data) => {
            console.log('successfully sent to server');
            //console.log(data);
          })
          .catch(e => console.log('error: ', e));

  
      }}>Submit</button>
    </div>
  )
};