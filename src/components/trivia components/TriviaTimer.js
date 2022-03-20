import React from "react";

export default function TriviaTimer(props) {
  const [timerInitialized, settimerInitialized] = React.useState(false);
  const [secondsLeft, setSecondsLeft] = React.useState(0);
  const [minutesLeft, setMinutesLeft] = React.useState(0);

  React.useEffect(() => {
    initializeTimer();
  }, []);

  function initializeTimer() {
    let minutes = Math.floor(props.secondsPerQuestion / 60);
    let seconds = props.secondsPerQuestion - minutes * 60;
    setMinutesLeft(minutes);
    setSecondsLeft(seconds);
    settimerInitialized(true);
  }

  return (
    <div className="trivia-timer">
      <h2>Timer: </h2>
      <span>
        {minutesLeft}:{("0" + secondsLeft).slice(-2)}
      </span>
    </div>
  );
}
