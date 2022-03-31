import React from "react";
import DataFetcher from "./components/DataFetcher";
import MessageContainer from "./components/MessageContainer";
import StartContainer from "./components/StartContainer";
import TriviaContainer from "./components/trivia components/TriviaContainer";

// https://opentdb.com/api_category.php
// ^ URL for trivia categories
export default function App() {
  const [triviaActive, setTriviaActive] = React.useState(false);
  const [triviaConstraints, setTriviaConstraints] = React.useState({
    maxQuestions: 50,
    maxSecondsPerQuestion: 120,
    categories: [
      {
        id: 0,
        mainCategory: "Misc",
        subCategory: "Any",
      },
    ],
  });
  const [triviaConfigData, setTriviaConfigData] = React.useState({
    pointsPerCorrectAnswer: 100,
    secondsPerQuestion: 2,
    numOfQuestions: 10,
    categoryId: 0,
    difficulty: "easy",
    quizType: "",
  });

  // Run effect when triviaActive is toggled; fetch data if true/active
  React.useEffect(() => {
    if (triviaConstraints.categories.length <= 1) {
      async function getTriviaCategoryData() {
        let response = await fetch("https://opentdb.com/api_category.php");
        let data = await response.json();
        parseTriviaCategories(data.trivia_categories);
      }
      getTriviaCategoryData();
    }
  }, []);

  function decodeTriviaData(data) {
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
    return triviaData;
  }

  function parseTriviaCategories(data) {
    data.map((category) => {
      setTriviaConstraints((prevConstraints) => {
        let { name } = category;
        let categorySplitIndex = name.indexOf(":");
        let mainCategory =
          categorySplitIndex > -1 ? name.slice(0, categorySplitIndex) : "Misc";
        let subCategory =
          categorySplitIndex > -1 ? name.slice(categorySplitIndex + 2) : name;
        return {
          ...prevConstraints,
          categories: [
            ...prevConstraints.categories,
            {
              id: category.id,
              mainCategory: mainCategory,
              subCategory: subCategory,
            },
          ],
        };
      });
    });
  }

  // TODO: implement max questions allowed based on data retrieved from API (use category Id for this data)
  function getMaxQuestions() {}

  function handleFormChange(e) {
    const { type, name, value, checked } = e.target;
    let finalValue = value;
    // Limit all number inputs to either the minimum value of 1 or the given max value for that constraint
    if (type === "number") {
      if (value < 0) {
        finalValue = 0;
      } else if (
        name === "numOfQuestions" &&
        value > triviaConstraints.maxQuestions
      ) {
        finalValue = triviaConstraints.maxQuestions;
      } else if (
        name === "secondsPerQuestion" &&
        value > triviaConstraints.maxSecondsPerQuestion
      ) {
        finalValue = triviaConstraints.maxSecondsPerQuestion;
      }
    }
    setTriviaConfigData((prevData) => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : finalValue,
      };
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    startTrivia();
  }

  function startTrivia() {
    setTriviaActive(true);
  }

  function endTrivia() {
    setTriviaActive(false);
  }

  return (
    <>
      {!triviaActive ? (
        <main>
          <StartContainer
            startTrivia={startTrivia}
            secondsPerQuestion={triviaConfigData.secondsPerQuestion}
            numOfQuestions={triviaConfigData.numOfQuestions}
            categoryId={triviaConfigData.categoryId}
            difficulty={triviaConfigData.difficulty}
            quizType={triviaConfigData.quizType}
            triviaConstraints={triviaConstraints}
            handleFormChange={handleFormChange}
            handleFormSubmit={handleFormSubmit}
          />
        </main>
      ) : (
        <DataFetcher
          url={`https://opentdb.com/api.php?amount=${triviaConfigData.numOfQuestions}&category=${triviaConfigData.categoryId}&difficulty=${triviaConfigData.difficulty}&type=${triviaConfigData.quizType}&encode=base64`}
        >
          {({ data, loading, error }) => {
            return loading ? (
              <MessageContainer message="Loading..." />
            ) : error ? (
              <MessageContainer styles={{ color: "red" }} message={error.message} />
            ) : (
              <TriviaContainer
                triviaData={decodeTriviaData(data)}
                exitTrivia={endTrivia}
                secondsPerQuestion={triviaConfigData.secondsPerQuestion}
                pointsPerCorrectAnswer={triviaConfigData.pointsPerCorrectAnswer}
              />
            );
          }}
        </DataFetcher>
      )}
    </>
  );
}
