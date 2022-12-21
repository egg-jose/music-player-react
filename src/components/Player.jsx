import { useEffect, useState } from "react";
import useSound from "use-sound"; // for handling the sound
import soyUnCacaguate from "../assets/soy-un-cacahuate.mp3"; // importing the music
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // icons for play and pause
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; // icons for next and previous track
import { IconContext } from "react-icons"; // for customazing the icons

function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currTime, setCurrTime] = useState({
    min: "",
    sec: "",
  });
  const [time, setTime] = useState({
    min: "",
    sec: "",
  });

  const [seconds, setSeconds] = useState(); // current position of the audio in seconds
  const [play, { pause, duration, sound }] = useSound(soyUnCacaguate);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([])); // setting the seconds state with the current state
        const currMin = Math.floor(sound.seek([]) / 60);
        const currSec = Math.floor(sound.seek([]) % 60);
        const sec = duration / 1000 - sound.seek([]);
        const min = Math.floor(sec / 60);
        const secRemain = Math.floor(sec % 60);
        setCurrTime({
          min: currMin,
          sec: currSec,
        });
        setTime({
          min,
          sec: secRemain,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);
  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };
  return (
    <div className="component">
      <h2>Playing Now</h2>
      <img
        className="musicCover"
        src="https://picsum.photos/200/200"
        alt="song cover"
      />
      <div>
        <h3 className="title">Soy un cacaguate</h3>
        <p className="subTitle">Bob Esponja</p>
      </div>
      <div>
        <div>
          <div className="time">
            <p>
              {currTime.min}:
              {currTime.sec.toLocaleString(undefined, {
                minimumIntegerDigits: 2,
              })}
            </p>
            <p>
              {time.min}:{time.sec.toLocaleString(undefined, {
                minimumIntegerDigits: 2,
              })}
            </p>
          </div>
          <input
            type="range"
            min="0"
            max={duration / 1000}
            default="0"
            value={seconds}
            className="timeline"
            onChange={(e) => {
              sound.seek([e.target.value]);
            }}
          />
        </div>
        <button className="playButton">
          <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
            <BiSkipPrevious />
          </IconContext.Provider>
        </button>
        {!isPlaying ? (
          <button className="playButton" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
              <AiFillPlayCircle />
            </IconContext.Provider>
          </button>
        ) : (
          <button className="playButton" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
              <AiFillPauseCircle />
            </IconContext.Provider>
          </button>
        )}
        <button className="playButton">
          <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
            <BiSkipNext />
          </IconContext.Provider>
        </button>
      </div>
    </div>
  );
}

export default Player;
