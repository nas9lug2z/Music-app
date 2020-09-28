import {songsList as songs, songsList} from "./../data/songs.js";

export const PlaylistMainFunction =  ( _ => {
    //---DECLARATIONS & caching the DOM

    let currentPlayingIndex = 1;
    let currentSong = new Audio(songs[currentPlayingIndex-1].url);
    let isPlaying = false;

    const playListEl = document.querySelector(".song-list");
    const mainPlayButton = document.querySelector(".play-button");
    const playerPlayButton = document.querySelector(".player-playpause-button");
    const playIcons = document.querySelectorAll(".fa-play")



    //---AUXULIARY FUNCTIONS (OR REPEATED MORE THAN ONCE)

    //visual changes for an active song - highlighting etc
    const highlightActiveSongElement = (clickedId) => {
        const currentPlaylist = playListEl.children;
        for (let j = 1; j < currentPlaylist.length; j++) {
            if (j === clickedId) {
                currentPlaylist[j].classList.add("song-active-row");
                //get children elements of li item
                const children = currentPlaylist[j].children;
                children[1].classList.add("song-active");
                children[3].firstElementChild.classList.add("song-active");
            }
            else {
                currentPlaylist[j].classList.remove("song-active-row");
                const children = currentPlaylist[j].children;
                children[1].classList.remove("song-active");
                children[3].firstElementChild.classList.remove("song-active");
            }
        }
    }

    // //function to toggle play/pause icon when a song is playing
    const togglePlayPause = _ => {
        if (currentSong.paused) {
            currentSong.play();
            for (let icon of playIcons) {
                icon.classList.remove("fa-play");
                icon.classList.add("fa-pause");
            }
        }
        else {
            currentSong.pause();
            for (let icon of playIcons) {
                icon.classList.remove("fa-pause");
                icon.classList.add("fa-play");
            }
        }
    }

    //change audio source of the current song
    const changeURLofSong = songId => {
        for (let i = 0; i < songs.length; i++) {
            if (songs[i].id == songId) {
                currentSong.src = songs[i].url;
            }
        }
        // currentSong.src = songs[currentPlayingIndex-1].url;
    }


    //---MAIN FUNCTIONS

    //1. Insert music from the playlist
    const importAllSongs = _ => {
        //add all songs from the file + highligth the active song
        for (let i = 0; i < songs.length; i++) {
            //create a new li item function
            ( _ => {
                const newLiEl = document.createElement("li");
                newLiEl.classList.add("song-table");
                newLiEl.classList.add("song-single");
                const addHtml = `<span class="song-id">${songs[i].id}</span>
                                    <span class="song-number">${i+1}</span>
                                        <img src="${songs[i].cover}" alt="" class="song-cover-img">
                                        <span class="song-title">
                                            <span class="song-name">${songs[i].title}</span>
                                            <span class="song-author">${songs[i].artist}</span>
                                        </span>
                                        <span class="song-album">Best Album Ever</span>
                                        <span class="song-add-to-fav"><i class="far fa-heart"></i></span>
                                        <span class="song-length">${songs[i].time}</span>
                                        <span class="song-dropdown-menu-button"><i class="fas fa-ellipsis-h three-dots-icon"></i></span>`;
                newLiEl.innerHTML = addHtml;
                playListEl.appendChild(newLiEl);
            })();
        }
    };


    //2. Change current playing index to the index of the clicked song
    const getClickedSongIndex = e => {
        const currentPlaylist = playListEl.children;
        for (let j = 1; j < currentPlaylist.length; j++) {
            currentPlaylist[j].addEventListener('click', e => {
                let liChildren = currentPlaylist[j].children;
                const clickedNoOfSong = Number(liChildren[1].innerHTML);
                const clickedIdOfSong = Number(liChildren[0].innerHTML);
                highlightActiveSongElement(clickedNoOfSong);
                mainPlay(clickedNoOfSong, clickedIdOfSong);
            })
        }
    }

    //3. Main play function
    const mainPlay = (clickedIndex, clickedId) => {
        if (currentPlayingIndex === clickedIndex) {
            togglePlayPause();
        }
        else {
            currentPlayingIndex = clickedIndex;
            changeURLofSong(clickedId);
            togglePlayPause();
        }

    }

    //???. Run all event listeners
    const listeners = _ => {
        mainPlayButton.addEventListener('click', (e) => {
            e.preventDefault();
            togglePlayPause()
            highlightActiveSongElement(currentPlayingIndex);
        });
        playerPlayButton.addEventListener('click', (e) => {
            e.preventDefault();
            togglePlayPause();
            highlightActiveSongElement(currentPlayingIndex);
        });
    }



    //---RUN ALL MAIN FUNCTIONS TOGETHER
    const runAll = _ => {
        importAllSongs();
        getClickedSongIndex();
        listeners();
    }

    //---PUBLIC FUNCTION
    return {
        runAll: runAll
    }
})()
