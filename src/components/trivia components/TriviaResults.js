import React from "react";
import { nanoid } from "nanoid";
import ResultCard from "./ResultCard";

export default function TriviaResults(props) {
  console.log("PROPS:");
  console.log(props);
  let resultElements = props.triviaData.map((triviaItem, index) => {
    return (
      <ResultCard
        key={nanoid()}
        questionNum={props.cardData[index].questionNum}
        question={triviaItem.question}
        difficulty={props.triviaData[index].difficulty}
        category={props.triviaData[index].category}
        selectedAnswer={props.cardData[index].selectedAnswer}
        correct_answer={props.triviaData[index].correct_answer}
        answers={[
          props.triviaData[index].correct_answer,
          ...props.triviaData[index].incorrect_answers,
        ]}
      />
    );
  });
  return (
    <div className="trivia-results">
      <h2>Results: </h2>
      <p>
        Final Score: <span className="score">{props.score}</span>
      </p>
      <div className="questions-container">{resultElements}</div>
      <button onClick={props.exitTrivia}>Main Menu</button>
    </div>
  );
}
