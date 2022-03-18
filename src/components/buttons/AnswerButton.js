import React from "react";

export default function Button(props) {
  return (
    <div
      style={props.selectedStyles}
      className={props.isSelected ? "answer-btn selected" : "answer-btn"}
      onClick={props.selectAnswer}
    >
      {props.answerText}
    </div>
  );
}
