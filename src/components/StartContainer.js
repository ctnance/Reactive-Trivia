import React from "react";
import CustomizeTriviaModal from "./CustomizeTriviaModal";

export default function StartContainer(props) {
  const [showModal, setShowModal] = React.useState(false);
  function toggleModal() {
    setShowModal((prevValue) => !prevValue);
  }
  return (
    <div className="start-container">
      <h1 className="title">Reactive Trivia</h1>
      <div className="description">
        <p>Answer trivia questions quickly!</p>
        <p>Are you up to the challenge?</p>
      </div>
      <button className="customize-trivia-btn" onClick={toggleModal}>
        Customize Trivia
      </button>
      <button className="quick-trivia-btn" onClick={props.startTrivia}>
        Quick Trivia
      </button>
      {showModal && (
        <CustomizeTriviaModal
          toggleSelf={toggleModal}
          secondsPerQuestion={props.secondsPerQuestion}
          numOfQuestions={props.numOfQuestions}
          categoryId={props.categoryId}
          difficulty={props.difficulty}
          quizType={props.quizType}
          triviaConstraints={props.triviaConstraints}
          handleFormChange={props.handleFormChange}
          handleFormSubmit={props.handleFormSubmit}
          startTrivia={props.startTrivia}
        />
      )}
    </div>
  );
}
