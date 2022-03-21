import React from "react";
import TriviaHeader from "./TriviaHeader";

export default function TriviaResults(props) {
  return (
    <div className="trivia-results">
      <h2>Results: </h2>
      <p>Final Score: {props.score}</p>
      <p>Under construction</p>
    </div>
  );
}
