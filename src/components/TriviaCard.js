import React from "react";

export default function TriviaCard() {
  function submitAnswer(e) {
    e.preventDefault();
    console.log(e);
  }
  return (
    <div className="trivia-card">
      <div className="question-row">
        <h3 className="question-number">Q1:</h3>
        <p className="question-text">What is the best language for web?</p>
      </div>
      <form>
        <div className="answer-choices">
          <div className="answer-choice">
            <input type="radio" id="html" name="fav_language" value="HTML" />
            <label htmlFor="html">HTML</label>
          </div>
          <div className="answer-choice">
            <input type="radio" id="css" name="fav_language" value="CSS" />
            <label htmlFor="css">CSS</label>
          </div>
          <div className="answer-choice">
            <input
              type="radio"
              id="javascript"
              name="fav_language"
              value="JavaScript"
            />
            <label htmlFor="javascript">JavaScript</label>
          </div>
          <div className="answer-choice">
            <input type="radio" id="react" name="fav_language" value="React" />
            <label htmlFor="react">React</label>
          </div>
        </div>
        <button className="submit-answer-btn" onClick={submitAnswer}>
          Submit Answer
        </button>
      </form>
    </div>
  );
}
