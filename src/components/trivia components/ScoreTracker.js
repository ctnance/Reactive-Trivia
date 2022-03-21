import React from "react";

export default function ScoreTracker(props) {
  return (
    <div className="score-tracker">
      <span className="score-label">Score: </span>
      <span className="score">{props.score}</span>
    </div>
  );
}
