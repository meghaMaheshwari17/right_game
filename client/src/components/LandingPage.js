import React from 'react';

const LandingPage = ({ onStart }) => {
  return (
    <div className="landing-page">
      <h1>Hi I made a game for you!</h1>
      <p>you can keep track of Saurabh sir's 'Right' , my 'Haina' and 'Baiscally'.
        I thought it would be fun. lol....
      </p>
      <button onClick={onStart} className="start-button">Start Today's Count</button>
    </div>
  );
};

export default LandingPage;