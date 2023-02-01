import { useEffect, useState } from 'react';
import './DrumMachine.css';
import sound1 from './sounds/Cev_H2.mp3';
import sound2 from './sounds/Dsc_Oh.mp3';
import sound3 from './sounds/Heater-1.mp3';
import sound4 from './sounds/Heater-2.mp3';
import sound5 from './sounds/Heater-3.mp3';
import sound6 from './sounds/Heater-4_1.mp3';
import sound7 from './sounds/Heater-6.mp3';
import sound8 from './sounds/Kick_n_Hat.mp3';
import sound9 from './sounds/RP4_KICK_1.mp3';

/*Drum Sounds, keyCodes, id's, and src*/
const drumSounds = [
  {
    keyCode: 81,
    key: 'Q',
    id: 'Heater-1',
    src: sound3,
  },
  {
    keyCode: 87,
    key: 'W',
    id: 'Heater-2',
    src: sound4,
  },
  {
    keyCode: 69,
    key: 'E',
    id: 'Heater-3',
    src: sound5,
  },
  {
    keyCode: 65,
    key: 'A',
    id: 'Heater-4',
    src: sound6,
  },
  {
    keyCode: 83,
    key: 'S',
    id: 'Clap',
    src: sound7,
  },
  {
    keyCode: 68,
    key: 'D',
    id: 'OpenHH',
    src: sound2,
  },
  {
    keyCode: 90,
    key: 'Z',
    id: "Kick n' Hat",
    src: sound8,
  },
  {
    keyCode: 88,
    key: 'X',
    id: 'Kick',
    src: sound9,
  },
  {
    keyCode: 67,
    key: 'C',
    id: 'Closed HH',
    src: sound1,
  },
];

const SoundBoardKey = ({ play, sound: { key, src, keyCode, id } }) => {
  const [isActive, setActive] = useState(false);
  const keyDownHandler = (e) => {
    if (e.keyCode === keyCode) {
      play(key, id);
      setActive(!isActive);
    }
  };
  const keyUpHandler = (e) => {
    if (e.keyCode === keyCode) {
      setActive(!isActive);
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
  });
  return (
    <button
      id={id}
      className={`drum-pad${isActive ? ' active' : ''}`}
      onClick={() => play(key, id)}
    >
      <audio src={src} id={key} className="clip" />
      {key}
    </button>
  );
};

const Soundboard = ({ power, play }) => (
  <div className="soundboard">
    {power
      ? drumSounds.map((sound) => <SoundBoardKey play={play} sound={sound} />)
      : drumSounds.map((sound) => (
          <SoundBoardKey play={play} sound={{ ...sound, src: '#' }} />
        ))}
  </div>
);

const Display = ({ soundName }) => <h2 id="display">{soundName}</h2>;

const VolumeControl = ({ volume, handleVolumeChange }) => (
  <input
    max="1"
    min="0"
    onChange={handleVolumeChange}
    step="0.01"
    type="range"
    value={volume}
  />
);

const DrumMachine = () => {
  const [soundName, setSoundName] = useState('Heater Kit');
  const [volume, setVolume] = useState('.5');
  const [power, setPower] = useState(true);

  const powerChange = () => {
    setPower(!power);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const play = (key, sound) => {
    setSoundName(sound);
    const audioObj = document.getElementById(key);
    audioObj.currentTime = 0;
    audioObj.play();
  };

  const setSoundVolume = () => {
    const audios = drumSounds.map((sound) =>
      document.getElementById(sound.key)
    );
    audios.forEach((audio) => {
      if (audio) {
        audio.volume = volume;
      }
    });
  };

  return (
    <div id="drum-machine">
      {setSoundVolume()}
      <Soundboard play={play} power={power} />
      <div className="info-container">
        <Display soundName={soundName} />
        <h3 className="volume-level">
          Volume Level:{Math.ceil(volume * 100)}%
        </h3>
        <VolumeControl
          handleVolumeChange={handleVolumeChange}
          volume={volume}
        />
        <label className="power-switch">
          <h3>Power {power ? 'true' : 'false'}</h3>
          <input type="checkbox" power={power} onChange={powerChange} />
          <span className="power-slide round" />
        </label>
      </div>
    </div>
  );
};

export default DrumMachine;
