import React from "react";

export default function ScoreTracker(props) {
  return (
    <div class="score-tracker">
      <p>Score: {props.score}</p>
    </div>
  );
}
