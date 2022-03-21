import React from "react";
import { nanoid } from "nanoid";

export default function CustomizeTriviaModal(props) {
  let categoryOptions = props.triviaConstraints.categories.map((category) => {
    return (
      <option key={nanoid()} value={category.id}>
        {category.subCategory}
      </option>
    );
  });

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
        <form className="cusomization-form">
          <ul className="customization-options">
            {/* QUESTION COUNT OPTION */}
            <li className="customization-item">
              <label htmlFor="numOfQuestions">Number of Questions:</label>
              <input
                name="numOfQuestions"
                type="number"
                min="1"
                max={props.triviaConstraints.maxQuestions}
                value={props.numOfQuestions}
                onChange={props.handleFormChange}
              />
            </li>
            {/* QUESTION COUNT OPTION */}
            <li className="customization-item">
              <label htmlFor="secondsPerQuestion">Seconds Per Question:</label>
              <input
                name="secondsPerQuestion"
                type="number"
                min="1"
                max={props.triviaConstraints.maxSecondsPerQuestion}
                value={props.secondsPerQuestion}
                onChange={props.handleFormChange}
              />
            </li>
            {/* CATEGORY OPTIONS */}
            <li className="customization-item">
              <label htmlFor="categoryId">Category: </label>
              <select
                id="categoryId"
                name="categoryId"
                value={props.categoryId}
                onChange={props.handleFormChange}
              >
                {categoryOptions}
              </select>
            </li>
            {/* DIFFICULTY OPTIONS */}
            <li className="customization-item">
              <label htmlFor="difficulty">Difficulty:</label>
              <fieldset id="difficulty">
                <legend>Difficulty</legend>
                <ul className="radio-list">
                  <li>
                    <label className="selectable">
                      <input
                        type="radio"
                        name="difficulty"
                        value="easy"
                        checked={props.difficulty === "easy"}
                        onChange={props.handleFormChange}
                      />{" "}
                      Easy
                    </label>
                  </li>
                  <li>
                    <label className="selectable">
                      <input
                        type="radio"
                        name="difficulty"
                        value="medium"
                        checked={props.difficulty === "medium"}
                        onChange={props.handleFormChange}
                      />{" "}
                      Medium
                    </label>
                  </li>
                  <li>
                    <label className="selectable">
                      <input
                        type="radio"
                        name="difficulty"
                        value="hard"
                        checked={props.difficulty === "hard"}
                        onChange={props.handleFormChange}
                      />{" "}
                      Hard
                    </label>
                  </li>
                </ul>
              </fieldset>
            </li>
            {/* MULTIPLE CHOICE OR TRUE OR FALSE OPTION */}
            <li className="customization-item">
              <label htmlFor="quizType">Quiz Type: </label>
              <fieldset id="quizType">
                <legend>Quiz Type</legend>
                <ul className="radio-list">
                  <li>
                    <label className="selectable">
                      <input
                        type="radio"
                        name="quizType"
                        value=""
                        checked={props.quizType === ""}
                        onChange={props.handleFormChange}
                      />{" "}
                      Any
                    </label>
                  </li>
                  <li>
                    <label className="selectable">
                      <input
                        type="radio"
                        name="quizType"
                        value="multiple"
                        checked={props.quizType === "multiple"}
                        onChange={props.handleFormChange}
                      />{" "}
                      Multiple Choice
                    </label>
                  </li>
                  <li>
                    <label className="selectable">
                      <input
                        type="radio"
                        name="quizType"
                        value="boolean"
                        checked={props.quizType === "boolean"}
                        onChange={props.handleFormChange}
                      />{" "}
                      True / False
                    </label>
                  </li>
                </ul>
              </fieldset>
            </li>

            {/* <li>
				<label for="sizes">Size:</label>
				<select name="size" id="sizes">
					<option>5</option>
					<option>6</option>
					<option>7</option>
					<option>8</option>
					<option>9</option>
					<option>10</option>
					<option>11</option>
					<option>12</option>
					<option>13</option>
				</select> <em>Sizes reflect standard US men's sizes</em>
			</li> */}
          </ul>
          <button className="modal-start-trivia-btn" onClick={props.handleFormSubmit}>
            Start Trivia
          </button>
        </form>
      </div>
    </div>
  );
}
