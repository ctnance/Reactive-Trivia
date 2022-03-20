import { nanoid } from "nanoid";
import React from "react";
import AnswerButton from "./buttons/AnswerButton";
import SubmitAnswerButton from "./buttons/SubmitAnswerButton";
import NextTriviaButton from "./buttons/NextQuestionButton";

export default function TriviaCard(props) {
  let [cardData, setCardData] = React.useState({
    answerSubmitted: false,
  });
  let [answerBtns, setAnswerBtns] = React.useState(createButtons());

  React.useEffect(() => {}, [answerBtns]);
  function createButtons() {
    let buttons = [];
    let answers = shuffleAnswers([
      props.cardData.correct_answer,
      ...props.cardData.incorrect_answers,
    ]);
    for (let i = 0; i < answers.length; i++) {
      buttons.push(createButton(answers[i]));
    }
    return buttons;
  }

  function shuffleAnswers(answers) {
    return answers.sort(() => Math.random() - 0.5);
  }

  function createButton(text) {
    return {
      id: nanoid(),
      isSelected: false,
      answerText: text,
      selectedStyles: {},
    };
  }

  function selectAnswer(id) {
    if (cardData.answerSubmitted) return;

    setAnswerBtns((prevBtns) => {
      return prevBtns.map((prevBtn) => {
        return prevBtn.id === id
          ? { ...prevBtn, isSelected: true }
          : { ...prevBtn, isSelected: false };
      });
    });
  }

  function submitAnswer(e) {
    e.preventDefault();
    setCardData((prevData) => {
      return {
        ...prevData,
        answerSubmitted: true,
      };
    });
    setAnswerBtns((prevBtns) => {
      return prevBtns.map((prevBtn) => {
        let result = prevBtn.answerText === props.cardData.correct_answer;
        if (result) {
          return {
            ...prevBtn,
            isSelected: false,
            selectedStyles: {
              backgroundColor: "green",
              color: "white",
            },
          };
        } else {
          return {
            ...prevBtn,
            selectedStyles: {
              backgroundColor: prevBtn.isSelected ? "red" : "",
              color: prevBtn.isSelected ? "white" : "",
              opacity: 0.5,
            },
          };
        }
      });
    });
  }

  let btns = answerBtns.map((btn) => {
    return (
      <AnswerButton
        key={btn.id}
        id={btn.id}
        isSelected={btn.isSelected}
        selectAnswer={() => selectAnswer(btn.id)}
        answerText={btn.answerText}
        selectedStyles={btn.selectedStyles}
      />
    );
  });

  return (
    <div className="trivia-card">
      <div className="question-row">
        <h3 className="question-number">Q{props.questionNum}:</h3>
        <p className="question-text">{props.cardData.question}</p>
      </div>
      <div className="question-data">
        <p className="question-category">Category: {props.cardData.category}</p>
        <p className="question-difficulty">Difficulty: {props.cardData.difficulty}</p>
      </div>
      <div className="answer-choices">{btns}</div>
      {cardData.answerSubmitted ? (
        <NextTriviaButton getNextTriviaCard={props.getNextTriviaCard} />
      ) : (
        <SubmitAnswerButton submitAnswer={submitAnswer} />
      )}
    </div>
  );
}
