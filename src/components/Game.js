import React, { useState, useEffect, useRef, forwardRef } from "react";
import RandomWord from './RandomWord';
import Image from './Image';
import Header from './Header';

function Game() {

  // State for the random word
  const [randomWord, setRandomWord] = useState('');
  // State for the displayed word
  const [wordCopy, setWordCopy] = useState([]);
  // State to keep track of wrong guesses
  const [imageCount, setImageCount] = useState(1);

  // Create ref to access resetImage in Image component
  const imageRef = useRef(null);
  // Create ref to access fetchData in RandomWord component
  const wordRef = useRef(null);
  // Create ref to access updateStatus in Header component
  const statusRef = useRef(null);

  // Callback function to handle the random word from RandomWord component
  const handleRandomWord = (word) => {
    setRandomWord(word);

    // Remove winning/losing text
    statusRef.current.updateStatus('');
    // Reset wordCopy to underscores
    setWordCopy(Array(word.length).fill('_')); 
  };

  useEffect(() => {
    // Fill wordCopy with '_' as per randomWord length
    setWordCopy(Array(randomWord.length).fill('_'));
  }, [randomWord]);

  // Functionality to determine win status
  useEffect(() => {
    let winTimeoutId;
    let loseTimeoutId;
  
    if (wordCopy.length > 0 && randomWord.length > 0) {
      const updatedWord = wordCopy.join('');
  
      // Check if player won
      if (updatedWord === randomWord) {
        // Clear any existing timeout
        clearTimeout(winTimeoutId);
  
        // Set a new timeout to update the status
        winTimeoutId = setTimeout(() => {
          statusRef.current.updateStatus('You Win');
        }, 0);
      } 
  
      // Check if player lost
      if (imageCount > 9) {
        // Clear any existing timeout
        clearTimeout(loseTimeoutId);
  
        // Set a new timeout to update the status and reveal the word
        loseTimeoutId = setTimeout(() => {
          statusRef.current.updateStatus('You Lose');
          setWordCopy(randomWord.split(''));
        }, 0);
      }
    }
  
    // Cleanup function to cancel the timeouts
    return () => {
      clearTimeout(winTimeoutId);
      clearTimeout(loseTimeoutId);
    };
  }, [wordCopy, randomWord, imageCount]);

  // Handles functionality for when a char is clicked
  function charClicked(char) {
    // Track whether a correct char was clicked or not
    let isCorrect = false;
  
    // Create a new array by mapping over the wordCopy array
    const updatedWordCopy = wordCopy.map((letter, index) => {
      /* If the letter at the current index in randomWord matches the clicked char,
         replace the corresponding letter in displayWord with the correct letter */
      if (randomWord[index] === char) {
        isCorrect = true;
        return randomWord[index];
      } else {
        return letter;
      }
    });
  
    if (!isCorrect) {
      // Check if imageRef.current is defined before calling changeImage()
      imageRef.current && imageRef.current.changeImage();
      setImageCount((prevCount) => prevCount + 1);
    }

    // Update the state with the new wordCopy array
    setWordCopy(updatedWordCopy);
  }

  // Empty array to hold the alphabet
  let alphabet = [];

  /* Loop through the ASCII uppercase alphabet.
     Save to alphabet array */
  function alpha(){
    for (let i = 65; i <= 90; i++){
      alphabet.push(String.fromCharCode(i));
    }
  }

  // Call alpha 
  alpha();

  // Restart functionality
  function restartGame() {

    // Remove winning/losing text
    statusRef.current.updateStatus('');

    // Re-generate word
    wordRef.current.fetchData();

    // Reset wordCopy to underscores
    setWordCopy(Array(randomWord.length).fill("_"));

    // Change image back
    imageRef.current.resetImage();

    // Reset image count
    setImageCount(1); 
  }

  // Help alert
  function help() {
    alert("Objectives:\n\n 1: Reveal the word by selecting letters. \n 2: Restart when needed.")
  }

  return (
    <>
      {/* Header component*/}
      <Header ref={statusRef}/>

      {/* RandomWord component*/}
      <RandomWord onRandomWord={handleRandomWord} ref={wordRef} />

      {/* Image component */}
      <Image ref={imageRef} />

      {/* Hangman Word */}
      <div className="word-group d-flex justify-content-center">
        {wordCopy.map((char, index) => (
          <h1 className="m-2" key={index}>
            {char}
          </h1>
        ))}
      </div>

      {/* Alphabet buttons */}
      <div className='alphabet-group mt-4'>
        {alphabet.map((char, index) => (
          <button onClick={() => charClicked(char)} key={index} className="btn btn-primary">{char}</button>
        ))}
      </div>

      {/* Restart Game button */}
      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-dark"onClick = { restartGame }>Restart</button>
      </div>
      
      {/* Help button */}
      <div className="d-flex justify-content-center mt-0">
        <button className="btn btn-dark" onClick={ help }>Help</button>
      </div>
    </>
  );
};

export default Game;

