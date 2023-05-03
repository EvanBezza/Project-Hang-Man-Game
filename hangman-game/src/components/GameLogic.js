// Student Name: Evan Bezuidenhout
// Student Number:
// Task: 21
// Compulsory Task: 1
// File Name: GameLogic.js

import React, { useState, useEffect } from 'react'
import HangmanDrawing from './HangmanDrawing'
import WordDisplay from './WordDisplay'
import GatherLetter from './GatherGuessLetter'
import HelpModal from './Help'
import '../style/GameLogic.css'

// Define the Game component
const Game = () => {
  // Define state variables for the word to guess, correct and incorrect guesses, and the game status
  // these keep track of the current word to be guessed, correct and incorrect guessed as well as the status of the game

  const [word, setWord] = useState('')
  const [correctGuesses, setCorrectGuesses] = useState([])
  const [incorrectGuesses, setIncorrectGuesses] = useState([])
  const [gameStatus, setGameStatus] = useState('playing')

  function fetchAndSetRandomWord() {
    // Make a request to the dictionary.txt file
    fetch('/dictionary.txt')
      .then(function (response) {
        // Check if the response is ok
        if (!response.ok) {
          // If not, throw an error with a message
          throw new Error('Failed to fetch words')
        }
        // Return the response body as text
        return response.text()
      })
      .then(function (text) {
        // Split the text into an array of words, remove any white space, and filter out any words that are too short or too long
        const words = text
          .split('\n')
          .map(function (word) {
            return word.trim()
          })
          .filter(function (word) {
            return word.length >= 5 && word.length <= 12
          })

        // Pick a random word from the array of words
        const randomWord = words[
          Math.floor(Math.random() * words.length)
        ].toLowerCase()

        // set the 'word' to that random word
        setWord(randomWord)
      })
      .catch(function (error) {
        // Log any errors to the console
        console.error(error)
      })
  }

  // Use a useEffect method containing an empty array and a call to the function to ensure a random word is picked once
  useEffect(() => {
    fetchAndSetRandomWord()
  }, [])

  // useEffect hook to monitor any changes to the state of correctGuesses and incorrectGuesses and call the checkGameStatus
  useEffect(() => {
    checkGameStatus()
  }, [correctGuesses, incorrectGuesses])

  // Function to handle a user's guess and update the state accordingly
  const handleGuess = (letter) => {
    // Check if the letter has already been guessed
    if (correctGuesses.includes(letter) || incorrectGuesses.includes(letter)) {
      console.log('Letter has already been guessed')
      return
    }

    // If the guessed letter is in the word, add the letter to the Correct Guesses array / state else do the same but for incorrectGuesses
    if (word.includes(letter)) {
      setCorrectGuesses((prevCorrectGuesses) => {
        const newCorrectGuesses = prevCorrectGuesses.concat(letter)
        return newCorrectGuesses
      })
    } else {
      setIncorrectGuesses((prevIncorrectGuesses) => {
        const newIncorrectGuesses = prevIncorrectGuesses.concat(letter)
        return newIncorrectGuesses
      })
    }
  }

  // Function to check the game status and update the gameStatus state accordingly
  const checkGameStatus = () => {
    const wordLetters = new Set(word.split(''))
    const correctLetters = new Set(correctGuesses)
    const isWon = [...wordLetters].every((letter) => correctLetters.has(letter))
    const isLost = incorrectGuesses.length >= 11

    if (isWon) {
      setGameStatus('won')
    } else if (isLost) {
      setGameStatus('lost')
    } else {
      setGameStatus('playing')
    }
  }

  // Define a function named restartGame using an arrow function expression
  const restartGame = () => {
    // Reset the game state by setting the arrays correctGuesses and incorrectGuesses to empty arrays and the game status to "playing"
    setCorrectGuesses([])
    setIncorrectGuesses([])
    setGameStatus('playing')

    // Fetch a text file named "dictionary.txt" from the server
    fetch('/dictionary.txt')
      // When the response is received, convert it to plain text
      .then((response) => response.text())
      // When the text is received, process it to select a random word
      .then((text) => {
        // Split the text into an array of words by splitting at each newline character, then remove whitespace from each word
        const words = text.split('\n').map((word) => word.trim())
        // Filter out words that are less than 5 or greater than 12 characters in length
        const filteredWords = words.filter(
          (word) => word.length >= 5 && word.length <= 12,
        )
        // Select a random word from the filteredWords array by generating a random index and using it to index into the array
        const randomWord = filteredWords[
          Math.floor(Math.random() * filteredWords.length)
        ].toLowerCase()
        // Set the selected random word as the new "word" state of the game
        setWord(randomWord)
      })
  }

  // Render components to display the game interface
  return (
    <div>
      <h1>Ha_gma_</h1>
      {/* Render a HangmanDrawing component that displays the image of the hangman depending on the number of incorrect guesses */}
      <HangmanDrawing incorrectGuessesCount={incorrectGuesses.length} />
      {/* Render a WordDisplay component that displays the word to guess, with letters filled in if they have been correctly guessed */}
      <WordDisplay word={word} correctGuesses={correctGuesses} />
      {/* Render a GuessForm component that allows the user to make a guess and updates the game state accordingly */}
      <GatherLetter handleGuess={handleGuess} gameStatus={gameStatus} />
      {/* Render a button that restarts the game when clicked */}
      <button onClick={restartGame}>Restart Game</button>
      {/* Render a HelpModal component that provides information about how to play the game */}
      <span className="spacer"></span>
      <HelpModal />
      {/* Conditionally render a message depending on the game status */}
      {gameStatus === 'won' && <h2>Congratulations, you've won!</h2>}
      {gameStatus === 'lost' && (
        <h2>Sorry, you've lost! The correct word was {word}.</h2>
      )}
    </div>
  )
}

export default Game

// === Refferences ===
// https://legacy.reactjs.org/docs/hooks-effect.html
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
// https://legacy.reactjs.org/docs/hooks-reference.html#functional-updates
