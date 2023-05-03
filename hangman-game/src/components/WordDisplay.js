// Student Name: Evan Bezuidenhout
// Student Number:
// Task: 21
// Compulsory Task: 1
// File Name: WordDisplay.js

// Description:
/* The WordDisplay component is responsible for displaying the letters of the word whenever 
a letter is guessed correctly until the word is guessed entirely right. */

import React from 'react'

// Define the WordDisplay component
const WordDisplay = ({ word, correctGuesses }) => {
  // Split the word retrieved from GameLogic into an array of letters
  const letters = word.split('')

  // Define an empty array to hold the letters that will be displayed
  const displayedLetters = []

  // Loop over each letter in the letters array
  for (let i = 0; i < letters.length; i++) {
    // Get the current letter
    const letter = letters[i]

    // Check if the letter has been guessed correctly
    const isLetterGuessed = correctGuesses.includes(letter)

    // If the letter has been guessed correctly, add it to the displayedLetters array
    // Otherwise, add an underscore to the array
    if (isLetterGuessed) {
      console.log("Correct Guess!" + displayedLetters);
      displayedLetters.push(letter)
    } else {
      displayedLetters.push('_')
    }
  }

  // Render the WordDisplay component
  return (
    <div>
      {/* Map over the displayedLetters array and create a span element for each letter */}
      {displayedLetters.map((letter, index) => (
        <span key={index}>{letter}</span>
      ))}
    </div>
  )
}

// Export the WordDisplay component for use in other components
export default WordDisplay
