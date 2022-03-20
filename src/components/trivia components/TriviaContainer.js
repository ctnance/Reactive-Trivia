import { nanoid } from "nanoid";
import React from "react";
import TriviaHeader from "./TriviaHeader";
import TriviaCard from "./TriviaCard";
import TriviaResults from "./TriviaResults";

export default function TriviaContainer(props) {
  const [triviaSessionData, setTriviaSessionData] = React.useState({
    score: 0,
    allQuestionsAnswered: false,
    triviaCards: [],
  });
  const [currentCardIndex, setCurrentCardIndex] = React.useState(0);

  React.useEffect(() => {
    if (props.triviaData.length) {
      setTriviaSessionData(initializeTriviaSession());
    }
  }, [props.triviaData]);

  function initializeTriviaSession() {
    let obj = {
      ...triviaSessionData,
      triviaCards: generateTriviaCards(),
    };
    return obj;
  }

  function generateTriviaCards() {
    let cards = [];
    props.triviaData.forEach((triviaItem, index) => {
      let isLastCard = index + 1 === props.triviaData.length;
      cards.push(createTriviaCard(triviaItem, index, isLastCard));
    });
    return cards;
  }

  function createTriviaCard(triviaItem, index, isLastCard) {
    let id = nanoid();
    return {
      id: id,
      triviaData: triviaItem,
      questionNum: index + 1,
      getNextTriviaCard: getNextTriviaCard,
      answerSubmitted: false,
      isLastCard: isLastCard,
    };
  }

  function submitAnswer(selectedAnswer) {
    console.log("Checking answer: " + selectedAnswer);
    // Handle case if selected answer is correct
    if (props.triviaData[currentCardIndex].correct_answer === selectedAnswer) {
      setTriviaSessionData((prevData) => {
        return {
          ...prevData,
          score: prevData.score + props.pointsPerCorrectAnswer,
        };
      });
    } else {
      console.log("Incorrect");
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
          };
        });
        return 0;
      }
    });
  }

  let triviaCards = triviaSessionData.triviaCards.map((triviaCard) => {
    return (
      <TriviaCard
        key={triviaCard.id}
        id={triviaCard.id}
        triviaData={triviaCard.triviaData}
        questionNum={triviaCard.questionNum}
        getNextTriviaCard={getNextTriviaCard}
        answerSubmitted={triviaCard.answerSubmitted}
        submitAnswer={submitAnswer}
        isLastCard={triviaCard.isLastCard}
      />
    );
  });

  return (
    <div className="trivia-container">
      {triviaSessionData.allQuestionsAnswered ? (
        <TriviaResults
          score={triviaSessionData.score}
          exitTrivia={props.exitTrivia}
        />
      ) : (
        <>
          <TriviaHeader
            displayTimer={true}
            displayScore={true}
            exitTrivia={props.exitTrivia}
            secondsPerQuestion={props.secondsPerQuestion}
            score={triviaSessionData.score}
          />
          {triviaCards[currentCardIndex]}
        </>
      )}
    </div>
  );
}
