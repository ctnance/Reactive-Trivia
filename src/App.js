import React from "react";
import StartContainer from "./components/StartContainer";
import TriviaContainer from "./components/TriviaContainer";

export default function App() {
  const [triviaActive, setTriviaActive] = React.useState(false);

  function startTrivia() {
    setTriviaActive(true);
  }

  return (
    <main>
      {!triviaActive ? (
        <StartContainer startTrivia={startTrivia} />
      ) : (
        <TriviaContainer />
      )}
    </main>
  );
}
