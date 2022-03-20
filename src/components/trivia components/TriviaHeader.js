import React from "react";
import ExitTriviaButton from "../buttons/ExitTriviaButton";
import TriviaTimer from "./TriviaTimer";
import ScoreTracker from "./ScoreTracker";

export default function TriviaHeader(props) {
  return (
    <header className="trivia-header">
      <ExitTriviaButton exitTrivia={props.exitTrivia} />
      {props.displayTimer && (
        <TriviaTimer secondsPerQuestion={props.secondsPerQuestion} />
      )}
      {props.displayScore && <ScoreTracker score={props.score} />}
    </header>
  );
}
