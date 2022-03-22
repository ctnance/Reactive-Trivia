import React from "react";

export default function ResultCard(props) {
  let answerElements = props.answers.map((answer) => {
    let className = "answer-option";
    if (answer === props.selectedAnswer) {
      className += answer === props.correct_answer ? " correct" : " incorrect";
    } else if (answer === props.correct_answer) {
      className += " correct";
    }
    return <div className={className}>{answer}</div>;
  });
  return (
    <div className="result-card">
      <div className="question-details">
        <p className="question-number">
          Q{props.questionNum}: {props.question}
        </p>
        <div className="question-data">
          <p className="question-category">Category: {props.category}</p>
          <p className="question-difficulty">Difficulty: {props.difficulty}</p>
        </div>
      </div>
      <div className="answers-container">{answerElements}</div>
    </div>
  );
}
