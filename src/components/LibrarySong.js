import React from "react";

const LibrarySong = ({audioRef, song, songs, setCurrentSong, id, isPlaying, setSongs}) => {
    const songSelectHandler = async () =>{
        await setCurrentSong(song);
        const newSong = songs.map(song => {
            if(song.id === id){
                return{
                    ...song,
                    active: true,
                };
            }else{
                return{
                    ...song,
                    active: false,
                };
            }
        });
        setSongs(newSong);
        //check if song is playing
        if(isPlaying) audioRef.current.play();
    }
    return(
        <div onClick={songSelectHandler} className={`library-song ${song.active ? "selected" : ""}`} >
            <img src={song.cover} />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
}

export default LibrarySong;