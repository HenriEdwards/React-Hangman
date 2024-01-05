import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import state1 from './images/hangmandrawings/state1.GIF';
import state2 from './images/hangmandrawings/state2.GIF';
import state3 from './images/hangmandrawings/state3.GIF';
import state4 from './images/hangmandrawings/state4.GIF';
import state5 from './images/hangmandrawings/state5.GIF';
import state6 from './images/hangmandrawings/state6.GIF';
import state7 from './images/hangmandrawings/state7.GIF';
import state8 from './images/hangmandrawings/state8.GIF';
import state9 from './images/hangmandrawings/state9.GIF';
import state10 from './images/hangmandrawings/state10.gif';
import state11 from './images/hangmandrawings/state11.GIF';

function Image(props, ref) {
  // List of image states
  const hangmanStates = [
    state1,
    state2,
    state3,
    state4,
    state5,
    state6,
    state7,
    state8,
    state9,
    state10,
    state11,
  ];

  // State for index for the current image
  const [imageState, setImageState] = useState(1);
  // State to set current image using index
  const [hangMan, setHangman] = useState(hangmanStates[imageState]);

  // Update the hangman image based on the imageState
  useEffect(() => {
    setHangman(hangmanStates[imageState]);
  }, [imageState]);

  // Expose changeImage & resetImage method to the Game component
  useImperativeHandle(ref, () => ({
    changeImage() {
      if (imageState === 10) {
        // Prevent going out of index
        return;
      }
      setImageState((prevCount) => prevCount + 1);
    },
    resetImage() {
      setImageState(1);
    },
  }));

  return (
    <div className="row">
      <div className="col-12 text-center p-0 m-0">
        {/* Display hangman image */}
        <img src={hangMan} alt="Hangman" />
      </div>
    </div>
  );
};


export default forwardRef(Image);