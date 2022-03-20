import { nanoid } from "nanoid";
import React from "react";
import TriviaHeader from "./TriviaHeader";
import TriviaCard from "../TriviaCard";

export default function TriviaContainer(props) {
  const [currentCardIndex, setCurrentCardIndex] = React.useState(0);

  function setUpTrivia() {
    let triviaCards = props.triviaData.map((triviaItem, index) => {
      let id = nanoid();
      return (
        <TriviaCard
          key={id}
          id={id}
          cardData={triviaItem}
          questionNum={index + 1}
          getNextTriviaCard={getNextTriviaCard}
        />
      );
    });
    return triviaCards;
  }

  function getNextTriviaCard() {
    setCurrentCardIndex((prevIndex) => {
      if (prevIndex + 1 < triviaCards.length) {
        return prevIndex + 1;
      } else {
        // TODO: Handle casr when all trivia cards have been used
        return 0;
      }
    });
  }

  let triviaCards = setUpTrivia();

  return (
    <div className="trivia-container">
      <TriviaHeader exitTrivia={props.exitTrivia} />
      {triviaCards[currentCardIndex]}
    </div>
  );
}
