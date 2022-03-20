import React from "react";
import StartContainer from "./components/StartContainer";
import TriviaContainer from "./components/TriviaContainer";

// https://opentdb.com/api_category.php
// ^ URL for trivia categories
export default function App() {
  const [triviaActive, setTriviaActive] = React.useState(false);
  const [triviaData, setTriviaData] = React.useState([]);
  let triviaConfigData = {
    secondsPerQuestion: 90,
    numOfQuestions: 3,
    category: 0,
    difficulty: "easy",
    multipleChoice: true,
  };

  // Run effect when triviaActive is toggled; fetch data if true/active
  React.useEffect(() => {
    if (triviaActive) {
      async function getTriviaData() {
        let response = await fetch(
          `https://opentdb.com/api.php?amount=${
            triviaConfigData.numOfQuestions
          }&category=${triviaConfigData.category}&difficulty=${
            triviaConfigData.difficulty
          }&type=${
            triviaConfigData.multipleChoice ? "multiple" : "boolean"
          }&encode=base64`
        );
        let data = await response.json();
        if (data.response_code === 0) {
          const triviaData = data.results.map((triviaItem) => {
            return {
              category: window
                .atob(triviaItem.category)
                .replace(/Entertainment: |Science: /, ""),
              correct_answer: window.atob(triviaItem.correct_answer),
              difficulty: window.atob(triviaItem.difficulty),
              incorrect_answers: triviaItem.incorrect_answers.map((answer) =>
                window.atob(answer)
              ),
              question: window.atob(triviaItem.question),
              type: window.atob(triviaItem.type),
            };
          });
          // setTriviaData(data.results); <- original base64 encoded data
          console.log(triviaData);
          setTriviaData(triviaData);
        }
      }
      // getTriviaData();
      // TEST DATA BELOW, ACTUAL API CALL FOR DATA ON LINE ABOVE
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
          question: "TEST QUESTION: True or false?",
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

  function endTrivia() {
    setTriviaActive(false);
    setTriviaData([]);
  }

  return (
    <main>
      {!triviaActive ? (
        <StartContainer startTrivia={startTrivia} />
      ) : (
        <TriviaContainer
          triviaData={triviaData}
          exitTrivia={endTrivia}
          secondsPerQuestion={triviaConfigData.secondsPerQuestion}
        />
      )}
    </main>
  );
}
