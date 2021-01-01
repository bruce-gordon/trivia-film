import React, { Component } from 'react';
import './Question.css';
import he from 'he';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correct: he.decode(this.props.correct).trim(),
      selected: ''
    }
  }

  componentDidMount = () => {
    this.setState({ correct: he.decode(this.props.correct).trim(), selected: '' })
  }

  sortChoices = () => {
    let wrong = this.props.incorrect;
    let right = [this.props.correct];
    let allAnswers = wrong.concat(right)
    return allAnswers.sort();
  }

  decodeChoices = () => {
    const decodedChoices = this.sortChoices().map(answer => he.decode(answer));
    return decodedChoices;
  }

  handleClick = (event) => {
    const answer = event.target.closest('div').children[0].innerText;
    this.setState({ selected: answer });
    this.props.updateAnswers(this.props.id, this.checkAnswer(answer))
  }

  checkAnswer= (answer) => {
    return (answer === this.state.correct) ? true : false;
  }

  checkSubmitted = (index, letter) => {
    if (this.state.correct === this.decodeChoices()[index]) {
      return (
        <div className='correct' onClick={ this.handleClick }>{`${letter}) `}
        <p style={{display: 'inline'}}>
        { `${this.decodeChoices()[index]}` }
        </p>
        </div> )
      } else {
        return (
          <div className='choice' onClick={ this.handleClick }>{`${letter}) `}
          <p style={{display: 'inline'}}>
          { `${this.decodeChoices()[index]}` }
          </p>
          </div>)
        }
      }

  checkSelected = (index, letter) => {
    const correct = this.state.correct;
    const gameOver = this.props.gameOver;
    if (this.state.selected === this.decodeChoices()[index] && gameOver === false) {
      return (
        <div className='selected' onClick={ this.handleClick }>{`${letter}) `}
          <p style={{display: 'inline'}}>
            { `${this.decodeChoices()[index]}` }
          </p>
        </div>
      )
    } else if (this.state.selected === this.decodeChoices()[index] && gameOver === true) {
      return (
        <div className={ `selected ${ correct === this.decodeChoices()[index] ? 'correct' : 'incorrect'}` } onClick={ this.handleClick }>{`${letter}) `}
          <p style={{display: 'inline'}}>
            { `${this.decodeChoices()[index]}` }
          </p>
        </div>
      )
    } else if (this.state.selected !== this.decodeChoices()[index] && gameOver === true) {
      return (
        <div className={`choice ${ correct === this.decodeChoices()[index] ? 'correct' : ''}` } onClick={ this.handleClick }>{`${letter}) `}
          <p style={{display: 'inline'}}>
            { `${this.decodeChoices()[index]}` }
          </p>
        </div>
      )
    } else {
      return (
        <div className='choice' onClick={ this.handleClick }>{`${letter}) `}
          <p style={{display: 'inline'}}>
            { `${this.decodeChoices()[index]}` }
          </p>
        </div>
      )
    }
  }


  render() {
    const { q, id, gameOver } = this.props;
    return (
      <article className='question-and-answers'>
        <h4 className='question'>{ `${ id+1 }. ${ he.decode(q) }` }</h4>
        <div className='mult-choices'>
          { this.checkSelected(0, 'a') }
          { this.checkSelected(1, 'b') }
          { this.checkSelected(2, 'c') }
          { this.checkSelected(3, 'd') }
        </div>
      </article>
    )
  }
}

export default Question
