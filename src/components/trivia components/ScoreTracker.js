import React from "react";

export default function ScoreTracker(props) {
  return (
    <div className="score-tracker">
      <p>Score: {props.score}</p>
    </div>
  );
}
