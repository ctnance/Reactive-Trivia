import React from "react";
import StartContainer from "./components/StartContainer";
import TriviaContainer from "./components/TriviaContainer";

// https://opentdb.com/api_category.php
// ^ URL for trivia categories
export default function App() {
  const [triviaActive, setTriviaActive] = React.useState(false);
  const [triviaConfigData, setTriviaConfigData] = React.useState({
    numOfQuestions: 3,
    category: 0,
    difficulty: "easy",
    multipleChoice: false,
  });
  const [triviaData, setTriviaData] = React.useState([]);

  React.useEffect(() => {
    if (triviaActive) {
      async function getTriviaData() {
        let response = await fetch(
          `https://opentdb.com/api.php?amount=${
            triviaConfigData.numOfQuestions
          }&category=${triviaConfigData.category}&difficulty=${
            triviaConfigData.difficulty
          }&type=${triviaConfigData.multipleChoice ? "multiple" : "boolean"}`
        );
        let data = await response.json();
        if (data.response_code === 0) {
          console.log(data.results);
          setTriviaData(data.results);
        }
      }
      // getTriviaData();
      // TEST DATA BELOW, ACTUAL API CALL FOR DATA COMMENTED OUT ON LINE ABOVE
      setTriviaData([
        {
          question: "TEST QUESTION: Which game?",
          correct_answer: "Bingo",
          incorrect_answers: ["Yatzee", "Sorry", "Trouble"],
          category: "General Knowledge",
          type: "multiple",
          difficulty: "easy",
        },
        {
          question: "TEST QUESTION: true or false?",
          correct_answer: "False",
          incorrect_answers: ["True"],
          category: "General Knowledge",
          type: "boolean",
          difficulty: "easy",
        },
        {
          question: "TEST QUESTION: Which number?",
          correct_answer: "7",
          incorrect_answers: ["6", "8", "9"],
          category: "General Knowledge",
          type: "multiple",
          difficulty: "hard",
        },
      ]);
    }
  }, [triviaActive]);

  function configureTrivia(e) {
    e.preventDefault();
    // TODO: Expand modal and parse inputs for configuring custom trivia settings
  }

  function startTrivia() {
    setTriviaActive(true);
  }

  return (
    <main>
      {!triviaActive && !triviaData.length ? (
        <StartContainer startTrivia={startTrivia} />
      ) : (
        <TriviaContainer triviaData={triviaData} />
      )}
    </main>
  );
}
