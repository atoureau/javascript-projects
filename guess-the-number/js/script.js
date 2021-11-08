'use strict'
const backgroundColor = document.body.style.backgroundColor
const message = document.querySelector('.message').textContent
const score = document.querySelector('.score').textContent
let userScore = score
let userHighscore = 0
let guessedNumber = 0
let randomNumber = Math.ceil(Math.random() * 50)

const setBackgroundColor = newBackgroundColor =>
  (document.body.style.backgroundColor = newBackgroundColor)

const setMessage = newMessage =>
  (document.querySelector('.message').textContent = newMessage)

const setScore = newScore =>
  (document.querySelector('.score').textContent = newScore)

const showRandNumber = () =>
  (document.querySelector('.number').textContent = randomNumber)

const hideRandNumber = () =>
  (document.querySelector('.number').textContent = '?')

/**
 * Checks the score after winning the game.
 * @param {Number} highscore The final score.
 */
const checkHighscore = highscore => {
  if (highscore > userHighscore) {
    userHighscore = highscore
    document.querySelector('.highscore').textContent = userHighscore
  }
}

/**
 * Checks the number entered by the player after each move.
 * @param {Number} number The guessed number.
 */
const checkNumber = number => {
  if (number > 0) {
    if (number == randomNumber) {
      setBackgroundColor('#60b347')
      setMessage('You won the game!🎉')
      showRandNumber()
      checkHighscore(userScore)
    } else {
      setMessage(number < randomNumber ? 'Too low!👇' : 'Too high!☝️')
      setScore(--userScore)
    }
  } else setMessage('Please enter a number greater than zero.')
}

/**
 * Checks if the game is over.
 * @param {Number} actualScore The score after each move.
 */
const checkScore = actualScore => {
  if (actualScore < 1) {
    setBackgroundColor('#db2323')
    setMessage('You lost the game!👎')
    showRandNumber()
  }
}

/**
 * Starts the game logic.
 */
const play = () => {
  if (userScore > 0) {
    if (guessedNumber != randomNumber) {
      guessedNumber = document.querySelector('.guess').value
      checkNumber(guessedNumber)
      checkScore(userScore)
    } else alert('You already won the game! Please play again.')
  } else alert('You already lost the game! Please play again.')
}

document.querySelector('.check').addEventListener('click', play)

/**
 * Resets the elements to its initial values and generates a new random number.
 */
const resetGame = () => {
  hideRandNumber()
  setBackgroundColor(backgroundColor)
  setMessage(message)
  setScore(score)

  do {
    randomNumber = Math.ceil(Math.random() * 50)
  } while (randomNumber == guessedNumber)

  guessedNumber = undefined
  userScore = score
}

document.querySelector('.again').addEventListener('click', resetGame)
