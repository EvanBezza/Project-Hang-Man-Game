// Student Name: Evan Bezuidenhout
// Student Number:
// Task: 21
// Compulsory Task: 1
// File Name: Help.js

import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap' // import button and modal from bootstrap

const HelpModal = () => {
  // State for controlling the visibility of the help modal
  const [show, setShow] = useState(false)

  // Function to close the modal
  const handleClose = () => setShow(false)
  // Function to show the modal
  const handleShow = () => setShow(true)

  return (
    <>
      {/* Help button that triggers the modal */}
      <Button variant="primary" onClick={handleShow}>
        Help
      </Button>

      {/* Modal component for displaying the help details */}
      <Modal show={show} onHide={handleClose}>
        {/* Header with a title and a close X button */}
        <Modal.Header closeButton>
          <Modal.Title>Hangman Game Rules:</Modal.Title>
        </Modal.Header>
        {/* Body with the game rules of hangman */}
        <Modal.Body>
          <p>
            In the game of Hangman, the player is presented with a secret word
            represented by a series of dashes, representing each letter of the
            word. The player must guess letters one at a time to uncover the
            word. Each incorrect guess results in part of a drawing of a hangman
            being drawn. The game ends when the player correctly guesses the
            word or when the hangman drawing is complete.
          </p>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default HelpModal
