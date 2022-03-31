import React from "react";
import ExitTriviaButton from "../buttons/ExitTriviaButton";
import TriviaTimer from "./TriviaTimer";
import ScoreTracker from "./ScoreTracker";

export default function TriviaHeader(props) {
  return (
    <header className="trivia-header">
      <ExitTriviaButton exitTrivia={props.exitTrivia} />
      {props.displayTimer && (
        <div className="trivia-timer">
          <h2>Timer: </h2>
          <span>
            {props.minutesLeft}:{("0" + props.secondsLeft).slice(-2)}
          </span>
        </div>
      )}
      {props.displayScore && <ScoreTracker score={props.score} />}
    </header>
  );
}
