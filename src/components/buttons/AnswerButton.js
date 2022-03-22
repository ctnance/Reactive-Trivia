import React from "react";

export default function Button(props) {
  return (
    <div
      style={props.selectedStyles}
      className={props.isSelected ? "answer-option selected" : "answer-option"}
      onClick={props.selectAnswer}
    >
      {props.answerText}
    </div>
  );
}
