import React from "react";

export default function NextQuestionButton(props) {
  return (
    <div className="btn-wrapper">
      <button
        className="next-question-btn"
        type="submit"
        onClick={props.getNextTriviaCard}
      >
        {props.text}
      </button>
    </div>
  );
}
