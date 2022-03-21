import { nanoid } from "nanoid";
import React from "react";
import TriviaHeader from "./TriviaHeader";
import TriviaCard from "./TriviaCard";
import TriviaResults from "./TriviaResults";

export default function TriviaContainer(props) {
  const [triviaSessionData, setTriviaSessionData] = React.useState({
    score: 0,
    allQuestionsAnswered: false,
    showTimer: true,
    showScoreInHeader: true,
    triviaCards: [],
    timerData: {
      timerActive: false,
      timerEnded: false,
      timerShouldReset: false,
    },
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
      timerData: {
        ...triviaSessionData.timerData,
        timerActive: true,
      },
    };
    return obj;
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // TIMER FUNCTIONS
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  function toggleTimerActive() {
    setTriviaSessionData((prevData) => {
      return {
        ...prevData,
        timerData: {
          ...prevData.timerData,
          timerActive: !prevData.timerData.timerActive,
        },
      };
    });
  }

  function timerEnded() {
    setTriviaSessionData((prevData) => {
      return {
        ...prevData,
        timerData: {
          ...prevData.timerData,
          timerEnded: true,
          timerActive: false,
        },
      };
    });
  }

  function toggleTimerReset() {
    setTriviaSessionData((prevData) => {
      return {
        ...prevData,
        timerData: {
          ...prevData.timerData,
          timerShouldReset: !prevData.timerData.timerShouldReset,
        },
      };
    });
  }

  function setTimerData(nowActive, shouldReset, didEnd) {
    setTriviaSessionData((prevData) => {
      return {
        ...prevData,
        timerData: {
          timerActive: nowActive,
          timerShouldReset: shouldReset,
          timerEnded: didEnd,
        },
      };
    });
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // TRIVIA CARD FUNCTIONS
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
      isLastCard: isLastCard,
    };
  }

  function submitAnswer(selectedAnswer) {
    // Toggle timer off if active
    if (triviaSessionData.timerData.timerActive) {
      toggleTimerActive();
    }
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
    // Configure timer data to be active, reset but not set as ended
    setTimerData(true, true, false);
  }

  let triviaCards = triviaSessionData.triviaCards.map((triviaCard) => {
    return (
      <TriviaCard
        key={triviaCard.id}
        id={triviaCard.id}
        triviaData={triviaCard.triviaData}
        questionNum={triviaCard.questionNum}
        getNextTriviaCard={getNextTriviaCard}
        submitAnswer={submitAnswer}
        timeUp={triviaSessionData.timerData.timerEnded}
        isLastCard={triviaCard.isLastCard}
      />
    );
  });

  return (
    <div className="trivia-container">
      <TriviaHeader
        displayTimer={triviaSessionData.showTimer}
        displayScore={triviaSessionData.showScoreInHeader}
        timerActive={triviaSessionData.timerData.timerActive}
        timerShouldReset={triviaSessionData.timerData.timerShouldReset}
        toggleTimerReset={toggleTimerReset}
        timerEnded={timerEnded}
        exitTrivia={props.exitTrivia}
        secondsPerQuestion={props.secondsPerQuestion}
        score={triviaSessionData.score}
      />
      <main>
        {triviaSessionData.allQuestionsAnswered ? (
          <TriviaResults
            score={triviaSessionData.score}
            exitTrivia={props.exitTrivia}
          />
        ) : (
          <>{triviaCards[currentCardIndex]}</>
        )}
      </main>
    </div>
  );
}
