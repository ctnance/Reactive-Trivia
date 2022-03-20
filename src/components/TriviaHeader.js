import React from "react";
import ExitTriviaButton from "./buttons/ExitTriviaButton";
import TriviaTimer from "./TriviaTimer";
import ScoreTracker from "./ScoreTracker";

export default function TriviaHeader(props) {
  return (
    <header className="trivia-header">
      <ExitTriviaButton exitTrivia={props.exitTrivia} />
      <TriviaTimer secondsPerQuestion={props.secondsPerQuestion} />
      <ScoreTracker score={0} />
    </header>
  );
}
