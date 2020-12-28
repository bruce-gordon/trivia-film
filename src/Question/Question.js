import React, { Component } from 'react';
import './Question.css';
import he from 'he';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correct: this.props.correct,
      selected: ''
    }
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

  checkSelected = (index, letter) => {
    if (this.state.selected === this.decodeChoices()[index]) {
      return (
      <div className='selected' onClick={ this.handleClick }>{`${letter}) `}
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

  render() {
    const { q, id } = this.props;
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
