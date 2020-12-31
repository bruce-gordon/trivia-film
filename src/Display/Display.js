import React from 'react';
import './Display.css';
import Question from '../Question/Question.js';

const Display = ({ questions, updateAnswers, scoreQuiz, score, reset, gameOver }) => {
  const questionList = questions.map((question, index) => {
    const randomNum = Date.now();
    return (
      <Question
        key={ `${index}${question.correct_answer}`  }
        id = { index }
        q={ question.question }
        correct={ question.correct_answer }
        incorrect={ question.incorrect_answers }
        updateAnswers={ updateAnswers }
        gameOver={ gameOver }
      />
    )
  })

  const showScore = () => {
    scoreQuiz();
    window.scrollTo(0, 0)
  }

  const restartGame = () => {
    reset();
    window.scrollTo(0, 0)
  }

  return (
    <section className='question-display'>
      { score === '' &&
        <h2>Choose the correct answer for each question.</h2>
      }
      { score !== '' &&
        <div className='results'>
          <h3 className='user-score'>You answered { score } questions correctly!</h3>
          <button className='restart' onClick={ restartGame }><b>Play again</b></button>
        </div>
      }
      { questionList }
      <button className="submit" onClick={ showScore }><b>What's my score?</b>
      </button>
    </section>
  )
}

export default Display;
