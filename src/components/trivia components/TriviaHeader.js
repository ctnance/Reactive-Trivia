import React from "react";
import ExitTriviaButton from "../buttons/ExitTriviaButton";
import TriviaTimer from "./TriviaTimer";
import ScoreTracker from "./ScoreTracker";

export default function TriviaHeader(props) {
  return (
    <header className="trivia-header">
      <ExitTriviaButton exitTrivia={props.exitTrivia} />
      {props.displayTimer && (
        <TriviaTimer
          timerActive={props.timerActive}
          secondsPerQuestion={props.secondsPerQuestion}
          toggleTimerReset={props.toggleTimerReset}
          timerEnded={props.timerEnded}
          timerShouldReset={props.timerShouldReset}
        />
      )}
      {props.displayScore && <ScoreTracker score={props.score} />}
    </header>
  );
}
