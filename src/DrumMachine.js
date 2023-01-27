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
  const keyDownHandler = (e) => {
    if (e.keyCode === keyCode) {
      play(key, id);
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);
  });
  return (
    <button id={id} className="drum-pad" onClick={() => play(key, id)}>
      <audio src={src} id={key} className="clip" />
      {key}
    </button>
  );
};

const SoundBoard = ({ play }) => {
  return drumSounds.map((sound) => <SoundBoardKey play={play} sound={sound} />);
};

const DrumMachine = () => {
  const [soundName, setSoundName] = useState('');

  const Display = () => {
    return <h2 id="display">{soundName}</h2>;
  };

  const play = (key, sound) => {
    setSoundName(sound);
    const audioObj = document.getElementById(key);
    audioObj.currentTime = 0;
    audioObj.play();
  };

  return (
    <div id="drum-machine">
      <div className="pad-container">
        <SoundBoard play={play} />
      </div>
      <div className="info-container">
        <Display soundName={soundName} />
      </div>
    </div>
  );
};

export default DrumMachine;
