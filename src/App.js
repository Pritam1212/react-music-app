//styles
import './styles/app.scss';
//components
import Player from './components/Player';
import Song from './components/Song';
//utils
import data from "./data";
import { useState, useRef } from 'react';
import Library from './components/Library';
import Nav from './components/Nav';

function App() {
   //Ref
    const audioRef = useRef(null);
  //State
  const[songs, setSongs] = useState(data());
  const[currentSong, setCurrentSong] = useState(songs[0]);
  const[isPlaying, setIsPlaying] = useState(false);
  const[songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
    });
  const[libraryStatus, setLibraryStatus] = useState(false); 
//Event Handler
  const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        //calc percent
        const roundCurrent = Math.round(current);
        const roundDuration = Math.round(duration);
        const animation = Math.round((roundCurrent/roundDuration) * 100);      
        setSongInfo({...songInfo, currentTime: current, duration, animationPercentage: animation})
    };

    const songEndHandler = async () => {
      let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      if (isPlaying) audioRef.current.play();
      // return;

      // if(isPlaying){
      //       // console.log(audioRef.current.play());
      //       const playPromise = audioRef.current.play();
      //       if(playPromise !== undefined){
      //           playPromise.then(audio => {
      //               audio.current.play();
      //           })
      //           .catch(error => {
      //             console.log(error);
      //           })
      //       }
      //   }
  };

  return (
    <div className={`App ${libraryStatus? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong = {currentSong}/>
      <Player isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong = {currentSong} setCurrentSong={setCurrentSong} audioRef={audioRef}
      songInfo={songInfo} setSongInfo={setSongInfo} songs={songs} setSongs={setSongs}
      />
      <Library setCurrentSong={setCurrentSong} songs={songs} audioRef={audioRef} isPlaying={isPlaying} setSongs={setSongs}
      libraryStatus={libraryStatus} />
      <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio}
      onEnded={songEndHandler}
      ></audio>

    </div>
  );
}

export default App;
