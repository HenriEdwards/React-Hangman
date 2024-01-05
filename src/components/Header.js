import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";

function Header(props, ref) {

  // Win text state
  const [winState, setWinState] = useState('');
  
  // Update win state with props 
  const updateStatus = (text) => {
    setWinState(text);
  };

  // Expose functions to Game component
  useImperativeHandle(ref, () => ({
    updateStatus: updateStatus
  }));

  return (
    <div className="row">
      <div className="col-12 text-center p-0 m-0">
        <h1 style={{
          letterSpacing: '21px',
          marginLeft: '45px',
          fontSize: '42px',
        }}>
            HANGMAN
        </h1>
        {/* Conditional rendering */}
        <h2 style={{
          color: winState === "You Win" ? "green" : "red",
          backgroundColor: winState === "You Win" ? "rgba(0, 255, 60, 0.1)" : "rgba(255, 0, 0, 0.1)",
          fontWeight: 'bold',
        }}>
          {winState}
        </h2>
      </div>
    </div>
  );
};

export default forwardRef(Header);