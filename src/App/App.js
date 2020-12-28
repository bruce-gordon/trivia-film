import './App.css';
import React, { Component } from 'react';
import { getData } from '../apiCalls.js';
import Display from '../Display/Display.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      answers: { 0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false },
      score: ''
    }
  }

  componentDidMount = () => {
    getData()
    .then(data => this.setState({ questions: data.results }))
  }

  updateAnswers = (number, isCorrect) => {
    this.setState(prevState => ({
      answers: {
        ...prevState.answers,
        [number]: isCorrect
      }
    }))
  }

  scoreQuiz = async () => {
    const userAnswers = Object.values(this.state.answers);
    let numCorrect = 0;
    userAnswers.forEach(answer => {
      if (answer === true) {
        numCorrect += 1;
      }
    });
    await this.setState({ score: `${numCorrect} out of ${userAnswers.length}` })
    return `${numCorrect}/${userAnswers.length}`;
  }

  resetApp = async () => {
    this.setState({ answers: { 0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false }, score: '' });
    await getData()
    .then(data => this.setState({ questions: data.results }))
  }

  render() {
    return (
      <div className="App">
        <h1 className='greeting'>Welcome to Film Trivia!</h1>
        <main className="App-main">
          <Display
            questions={ this.state.questions }
            updateAnswers={ this.updateAnswers }
            scoreQuiz={ this.scoreQuiz }
            score={ this.state.score }
            reset={ this.resetApp }
          />
        </main>
      </div>
    );
  }
}

export default App;
