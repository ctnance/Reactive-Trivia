import { nanoid } from "nanoid";
import React from "react";
import TriviaHeader from "./TriviaHeader";
import TriviaCard from "./TriviaCard";
import TriviaResults from "./TriviaResults";
import TriviaTimer from "./TriviaTimer";

export default function TriviaContainer(props) {
  const [triviaSessionData, setTriviaSessionData] = React.useState({
    score: 0,
    questionsLeft: 0,
    allQuestionsAnswered: false,
    showTimer: true,
    showScoreInHeader: true,
    triviaCards: [],
  });

  const [currentCardIndex, setCurrentCardIndex] = React.useState(0);
  const [
    secondsElapsed,
    secondsLeft,
    minutesLeft,
    timerEnded,
    startTimer,
    pauseTimer,
    resetTimer,
  ] = TriviaTimer(props.secondsPerQuestion);

  React.useEffect(() => {
    console.log(props);
    // If any trivia data comes through, initialize trivia session
    if (props.triviaData.length) {
      setTriviaSessionData(initializeTriviaSession());
      startTimer();
    }
  }, [props.triviaData]);

  function initializeTriviaSession() {
    let obj = {
      ...triviaSessionData,
      questionsLeft: props.triviaData.length,
      triviaCards: generateTriviaCards(),
    };
    return obj;
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // TRIVIA CARD FUNCTIONS
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  function generateTriviaCards() {
    let cards = [];
    props.triviaData.forEach((triviaItem, index) => {
      cards.push(createTriviaCard(triviaItem, index));
    });
    return cards;
  }

  function shuffleAnswers(answers) {
    return answers.sort(() => Math.random() - 0.5);
  }

  function createTriviaCard(triviaItem, index) {
    let id = nanoid();
    return {
      id: id,
      triviaData: triviaItem,
      questionNum: index + 1,
      answers: shuffleAnswers([
        triviaItem.correct_answer,
        ...triviaItem.incorrect_answers,
      ]),
      selectedAnswer: "",
      getNextTriviaCard: getNextTriviaCard,
    };
  }

  function setAnswerForCurrentCard(selectedAnswer) {
    let updatedCards = [];
    triviaSessionData.triviaCards.forEach((card, index) => {
      updatedCards.push(
        index === currentCardIndex
          ? {
              ...card,
              selectedAnswer: selectedAnswer,
            }
          : card
      );
    });
    return updatedCards;
  }

  function submitAnswer(selectedAnswer) {
    console.log("QUESTIONS LEFT: " + triviaSessionData.questionsLeft);

    // TODO: Pause timer to ensure it is inactive
    pauseTimer();

    // Update remaining questions
    setTriviaSessionData((prevData) => {
      return {
        ...prevData,
        questionsLeft: prevData.questionsLeft - 1,
        triviaCards: setAnswerForCurrentCard(selectedAnswer),
      };
    });

    // Handle case if selected answer is correct
    if (props.triviaData[currentCardIndex].correct_answer === selectedAnswer) {
      setTriviaSessionData((prevData) => {
        return {
          ...prevData,
          score: prevData.score + props.pointsPerCorrectAnswer,
        };
      });
      // Handle case if selected answer is incorrect
    } else {
      console.log("Incorrect answer");
    }
  }

  function getNextTriviaCard() {
    setCurrentCardIndex((prevIndex) => {
      if (prevIndex + 1 < triviaCards.length) {
        return prevIndex + 1;
      } else {
        // TODO: Handle case when all trivia cards have been used
        setTriviaSessionData((prevData) => {
          return {
            ...prevData,
            allQuestionsAnswered: true,
            showTimer: false,
            showScoreInHeader: false,
          };
        });
        return 0;
      }
    });
    // Reset timer
    resetTimer();
    startTimer();
  }

  let triviaCards = triviaSessionData.triviaCards.map((triviaCard) => {
    return (
      <TriviaCard
        key={triviaCard.id}
        id={triviaCard.id}
        triviaData={triviaCard.triviaData}
        answers={triviaCard.answers}
        questionNum={triviaCard.questionNum}
        getNextTriviaCard={getNextTriviaCard}
        submitAnswer={submitAnswer}
        timeUp={timerEnded}
      />
    );
  });

  return (
    <div className="trivia-container">
      <TriviaHeader
        displayTimer={triviaSessionData.showTimer}
        displayScore={triviaSessionData.showScoreInHeader}
        secondsLeft={secondsLeft}
        minutesLeft={minutesLeft}
        exitTrivia={props.exitTrivia}
        score={triviaSessionData.score}
      />
      <main>
        {triviaSessionData.allQuestionsAnswered ? (
          <TriviaResults
            score={triviaSessionData.score}
            triviaData={props.triviaData}
            cardData={triviaSessionData.triviaCards}
            exitTrivia={props.exitTrivia}
          />
        ) : (
          <>{triviaCards[currentCardIndex]}</>
        )}
      </main>
    </div>
  );
}
