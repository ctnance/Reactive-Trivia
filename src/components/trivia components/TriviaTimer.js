import { useState, useEffect } from "react";

export default function TriviaTimer(secondsPerQuestion = 10) {
  const [timerInitialized, setTimerInitialized] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);

  // Run when active status or secondsLeft value changes
  useEffect(() => {
    let timerId = null;

    if (timerActive) {
      if (!timerInitialized) {
        initializeTimer();
      } else if (secondsLeft > 0 || minutesLeft > 0) {
        timerId = setInterval(() => {
          countDown();
        }, 1000);
      } else {
        setTimerEnded(true);
        setTimerInitialized(false);
      }
    }
    return () => clearInterval(timerId);
  }, [timerActive, secondsLeft]);

  function initializeTimer() {
    let minutes = Math.floor(secondsPerQuestion / 60);
    let seconds = secondsPerQuestion - minutes * 60;
    setMinutesLeft(minutes);
    setSecondsLeft(seconds);
    setTimerInitialized(true);
  }

  function countDown() {
    setSecondsElapsed((prevValue) => prevValue + 1);
    // If seconds are depleted but minutes remain, adjust accordingly
    if (secondsLeft <= 0 && minutesLeft > 0) {
      setMinutesLeft((prevValue) => prevValue - 1);
      setSecondsLeft(59);
      // subtract seconds by 1
    } else {
      setSecondsLeft((prevValue) => prevValue - 1);
    }
  }

  function startTimer() {
    setTimerActive(true);
  }

  function pauseTimer() {
    setTimerActive(false);
  }

  function resetTimer() {
    setSecondsElapsed(0);
    setTimerEnded(false);
    initializeTimer();
  }

  return [
    secondsElapsed,
    secondsLeft,
    minutesLeft,
    timerEnded,
    startTimer,
    pauseTimer,
    resetTimer,
  ];
}
