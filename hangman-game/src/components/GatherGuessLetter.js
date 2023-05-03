// Student Name: Evan Bezuidenhout
// Student Number:
// Task: 21
// Compulsory Task: 1
// File Name: GuessLetter.js

// Description:
/* The GuessLetter component is used to handle gathering a users input of letters they 
think are in the word and determine if the game is playable or not meaning it'll disable 
the input or not. */

import React, { useState } from 'react'

const GuessForm = ({ handleGuess, gameStatus }) => {
  const [guess, setGuess] = useState('')

  // This function handles changes to the input field
  const handleChange = (event) => {
    setGuess(event.target.value) // set to the letter currently in the input field 
  }

  // This function is called when the form is submitted
  const handleSubmit = (event) => {
    event.preventDefault()
    handleGuess(guess.toLowerCase()) // pass the guess to GameLogic.js
    setGuess('') // set back to empty for next guess
  }

  // This component renders a form with a label, text input field, and a submit button
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="guess">Guess a letter:</label>
      <input
        type="text"
        id="guess"
        name="guess"
        maxLength="1"
        pattern="[A-Za-z]"
        autoComplete="off"
        value={guess}
        onChange={handleChange} // Disable the input field and the button if the game is not in "playing" state
        disabled={gameStatus !== 'playing'}
        required
      />
      <button
        type="submit"
        // Disable the button if the game is not in "playing" state
        disabled={gameStatus !== 'playing'}
      >
        Guess
      </button>
    </form>
  )
}

export default GuessForm
