// Student Name: Evan Bezuidenhout
// Student Number:
// Task: 21
// Compulsory Task: 1
// File Name: HangmanDrawings.js

// Description:
/* The HangmanDrawing script is used to display the various images of the hangman 
depending on the amount of incorrect guesses the player makes */

import React from 'react'
// import all images from hangmandrawings folder
import state1 from '../hangmandrawings/state1.GIF'
import state2 from '../hangmandrawings/state2.GIF'
import state3 from '../hangmandrawings/state3.GIF'
import state4 from '../hangmandrawings/state4.GIF'
import state5 from '../hangmandrawings/state5.GIF'
import state6 from '../hangmandrawings/state6.GIF'
import state7 from '../hangmandrawings/state7.GIF'
import state8 from '../hangmandrawings/state8.GIF'
import state9 from '../hangmandrawings/state9.GIF'
import state10 from '../hangmandrawings/state10.GIF'
import state11 from '../hangmandrawings/state11.GIF'

function HangmanDrawing({ incorrectGuessesCount }) {
  // An array of all states at which the hangman image can be
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
  ]

  // Display the hangman image depending on the count of incorrect guesses
  return (
    <div>
      <img src={hangmanStates[incorrectGuessesCount]}></img>
    </div>
  )
}

export default HangmanDrawing
