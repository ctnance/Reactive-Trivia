import React from "react";

export default function CustomizeTriviaModal(props) {
  return (
    <div
      className="modal-wrapper"
      onClick={(e) => {
        e.target === e.currentTarget && props.toggleSelf();
      }}
    >
      <div className="modal">
        <button
          className="modal-close-btn"
          onClick={(e) => {
            e.target === e.currentTarget && props.toggleSelf();
          }}
        >
          ✕
        </button>
        <h2 className="modal-title">Customize Your Trivia!</h2>
        <p>Under Construction!</p>
        <button className="modal-start-trivia-btn" onClick={props.startTrivia}>
          Start Trivia
        </button>
      </div>
    </div>
  );
}
