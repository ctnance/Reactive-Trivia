import React from "react";

export default function TriviaTimer(props) {
  const [timerInitialized, setTimerInitialized] = React.useState(false);
  const [secondsLeft, setSecondsLeft] = React.useState(0);
  const [minutesLeft, setMinutesLeft] = React.useState(0);

  // Run when active status or secondsLeft value changes
  React.useEffect(() => {
    let timerId = null;
    if (props.timerShouldReset) {
      resetTimer();
    }

    if (props.timerActive) {
      if (!timerInitialized) {
        initializeTimer();
      } else if (secondsLeft > 0 || minutesLeft > 0) {
        timerId = setInterval(() => {
          countDown();
        }, 1000);
      } else {
        props.timerEnded();
        setTimerInitialized(false);
      }
    }
    return () => clearInterval(timerId);
  }, [props.timerActive, props.timerShouldReset, secondsLeft]);

  function initializeTimer() {
    let minutes = Math.floor(props.secondsPerQuestion / 60);
    let seconds = props.secondsPerQuestion - minutes * 60;
    setMinutesLeft(minutes);
    setSecondsLeft(seconds);
    setTimerInitialized(true);
  }

  function countDown() {
    // If seconds are depleted but minutes remain, adjust accordingly
    if (secondsLeft <= 0 && minutesLeft > 0) {
      setMinutesLeft((prevValue) => prevValue - 1);
      setSecondsLeft(59);
      // subtract seconds by 1
    } else {
      setSecondsLeft((prevValue) => prevValue - 1);
    }
  }

  function resetTimer() {
    setTimerInitialized(false);
    props.toggleTimerReset();
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
