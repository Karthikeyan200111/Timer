import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [play, setPlay] = useState(false);
  const [title, setTitle] = useState("Session");
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionlength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(1500);

  const timeout = setTimeout(() => {
    if (play && timeLeft) {
      setTimeLeft(timeLeft - 1);
    }
  }, 1000);

  const handleIncrement = () => {
    if (breakLength < 60) setBreakLength(breakLength + 1);
  };
  const handleDecrement = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };
  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
      setSessionlength(sessionLength + 1);
      setTimeLeft(timeLeft + 60);
    }
  };
  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionlength(sessionLength - 1);
      setTimeLeft(timeLeft - 60);
    }
  };
  const handleStart = () => {
    clearTimeout(timeout);
    setPlay(!play);
  };
  const handleRest = () => {
    clearTimeout(timeout);
    setBreakLength(5);
    setSessionlength(25);
    setTitle("Session");
    setPlay(false);
    setTimeLeft(1500);
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  const timeFormat = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formatMinute = minutes < 10 ? "0" + minutes : minutes;
    const formatSeconds = seconds < 10 ? "0" + seconds : seconds;
    return `${formatMinute} : ${formatSeconds}`;
  };

  const resetTime = () => {
    const audio = document.getElementById("beep");
    if (!timeLeft && title === "Session") {
      setTimeLeft(breakLength * 60);
      setTitle("Break");
      audio.play();
    }
    if (!timeLeft && title === "BREAK") {
      setTimeLeft(sessionLength * 60);
      setTitle("SESSION");
      audio.pause();
      audio.currentTime = 0;
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (play && timeLeft) {
        setTimeLeft(timeLeft - 1);
      }
      resetTime(); // Call resetTime during the timer update
    }, 1000);

    return () => clearInterval(interval);
  }, [play, timeLeft]);

  const timeTitle = title === "Session" ? "Session" : "Break";
  return (
    <div className="flex flex-col justify-center items-center h-screen border-solid ">
      <div className="backdrop-blur-md min-w-80 max-w-5xl md:p-8 p-4 flex flex-col rounded-5xl border-5 border-solid">
        <div className="border-black p-3">
          <h1 className="text-center text-xl font-bold my-4 md:text-3xl uppercase text-white border-black border-3 border-solid">
            
            25 + 5 Clock
          </h1>
        </div>
        <div className="flex gap-5 md:flex-row flex-col justify-center items-center">
          <div className="border-solid border-2 border-black md:p-7 p-3 rounded-xl ">
            <h2 className="text-center mb-4 md:text-xl uppercase font-bold">
              Break length
            </h2>

            <button
              className="align-middle select-none  font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none md:text-xs text-xs px-3 py-1 rounded-md md:py-3 md:px-5  md:rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              disabled={play}
              onClick={handleIncrement}
            >
              Increment
            </button>

            <strong className="mx-3 text-white">{breakLength}</strong>

            <button
              className="align-middle select-none  font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none md:text-xs text-xs px-3 py-1 rounded-md md:py-3 md:px-5  md:rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              disabled={play}
              onClick={handleDecrement}
            >
              Decrement
            </button>
          </div>
          <div className="flex gap-5 md:flex-row flex-col justify-center items-center">
            <div className="border-solid border-2 border-black md:p-7 p-3 rounded-xl ">

            
            <h2 className="text-center mb-4 md:text-xl uppercase font-bold">
              Session Length
            </h2>
            <button
              className="align-middle select-none  font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none md:text-xs text-xs px-3 py-1 rounded-md md:py-3 md:px-6  md:rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              disabled={play}
              onClick={handleSessionIncrement}
            >
              Increment
            </button>

            <strong className="mx-3 text-white">{sessionLength}</strong>
            <button
              className="align-middle select-none  font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none md:text-xs text-xs px-3 py-1 rounded-md md:py-3 md:px-6  md:rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              disabled={play}
              onClick={handleSessionDecrement}
            >
              Decrement
            </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mx-auto flex-col border-solid border-2 border-black mt-4 p-11  rounded-xl">
          <div>
            <h1 className="font-bold uppercase md:text-2xl text-xl text-center ">{timeTitle}</h1>
            <h1 className="font-bold uppercase text-3xl text-center my-2 text-white">
              {timeFormat()}
            </h1>
          </div>
          <div className="flex justify-center items-center gap-3">
            <button
              className="align-middle select-none  font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none md:text-xs text-xs px-4 py-2 rounded-md md:py-3 md:px-6  md:rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              onClick={handleStart}
            >
              Start/Stop
            </button>
            <button
              className="align-middle select-none  font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none md:text-xs text-xs px-4 py-2 rounded-md md:py-3 md:px-6  md:rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              onClick={handleRest}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      <audio
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
}

export default App;
