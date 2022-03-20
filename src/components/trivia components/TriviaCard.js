import { nanoid } from "nanoid";
import React from "react";
import AnswerButton from "../buttons/AnswerButton";
import SubmitAnswerButton from "../buttons/SubmitAnswerButton";
import NextTriviaButton from "../buttons/NextQuestionButton";

export default function TriviaCard(props) {
  let [cardData, setCardData] = React.useState({
    selectedAnswer: "",
    answerSubmitted: false,
  });
  let [answerBtns, setAnswerBtns] = React.useState(createButtons());

  React.useEffect(() => {
    console.log("ANSWER SUBMITTED");
  }, [props.triviaData.answerSubmitted]);

  function createButtons() {
    let buttons = [];
    let answers = shuffleAnswers([
      props.triviaData.correct_answer,
      ...props.triviaData.incorrect_answers,
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
        let selected = prevBtn.id === id;
        if (prevBtn.id === id) {
          setCardData((prevData) => {
            return { ...prevData, selectedAnswer: prevBtn.answerText };
          });
        }
        return { ...prevBtn, isSelected: selected };
      });
    });
  }

  function handleSubmit() {
    let selectedAnswer = "";
    // Set answer submitted to true
    setCardData((prevData) => {
      return {
        ...prevData,
        answerSubmitted: true,
      };
    });
    // Send selected answer to TriviaContainer's submitAnswer function
    props.submitAnswer(cardData.selectedAnswer);
    // Set answer button styles to display correct feedback
    setAnswerBtns((prevBtns) => {
      console.log("SEARCHING THROUGH ANSWER BUTTONS");
      return prevBtns.map((prevBtn) => {
        if (prevBtn.isSelected) {
          console.log("SELECTED ANSWER = " + prevBtn.answerText);
          selectedAnswer = prevBtn.answerText;
        }
        let result = prevBtn.answerText === props.triviaData.correct_answer;
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
        <p className="question-text">{props.triviaData.question}</p>
      </div>
      <div className="question-data">
        <p className="question-category">Category: {props.triviaData.category}</p>
        <p className="question-difficulty">
          Difficulty: {props.triviaData.difficulty}
        </p>
      </div>
      <div className="answer-choices">{btns}</div>
      {cardData.answerSubmitted ? (
        <NextTriviaButton
          text={props.isLastCard ? "Get Results" : "Next Question"}
          getNextTriviaCard={props.getNextTriviaCard}
        />
      ) : (
        <SubmitAnswerButton submitAnswer={handleSubmit} />
      )}
    </div>
  );
}