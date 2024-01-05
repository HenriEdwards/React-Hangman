import { useEffect , useImperativeHandle , forwardRef} from "react";
import dictionary from '../dictionary.txt';

function RandomWord({ onRandomWord }, ref) {
  // Fetch the random word once
  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    // Fetch the dictionary file
    fetch(dictionary)
      .then(resp => resp.text())
      .then(final => {
        const startWord = 'START';
        // Find the index of the startWord
        const startIndex = final.indexOf(startWord);
        // Extract avaiable list of words
        const output = final.substring(startIndex + startWord.length);
        // Split output into an array of words and remove empty lines
        const outputArray = output.split('\n').filter(line => line.trim() !== '');
        const totalWords = outputArray.length;
        // Generate a random index within the range of the outputArray length
        const finalWord = Math.floor(Math.random() * totalWords);
        // Retrieve the randomly chosen word from the outputArray and convert to uppercase
        const word = outputArray[finalWord].toUpperCase();
        if (onRandomWord) {
          // Call onRandomWord callback with generated word
          onRandomWord(word);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  // Expose function to Game component
  useImperativeHandle(ref, () => ({
    fetchData
  }));

  // Return null, nothing to render
  return null;
};

export default forwardRef(RandomWord);