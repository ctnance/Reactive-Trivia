import React from "react";

export default function SubmitAnswerButton(props) {
  return (
    <div className="btn-wrapper">
      <button
        className="submit-answer-btn"
        type="submit"
        onClick={props.submitAnswer}
      >
        Submit Answer
      </button>
    </div>
  );
}
