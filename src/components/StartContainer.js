import React from "react";

export default function StartContainer() {
  return (
    <div className="start-container">
      <h1 className="title">Reactive Trivia</h1>
      <div className="description">
        <p>Answer trivia questions quickly!</p>
        <p>Are you up to the challenge?</p>
      </div>
      <button className="customize-trivia-btn">Customize Trivia</button>
      <button className="quick-trivia-btn">Quick Trivia</button>
    </div>
  );
}
