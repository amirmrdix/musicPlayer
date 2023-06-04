// Assign to DOM
const playSongButton = document.querySelector('.playSong');
const playsong_colored = document.querySelector('.playsong-colored');
const playSongIcon = document.querySelector('.playSongIcon');
const prevSong = document.querySelector('.prevSong');
const nextSong = document.querySelector('.nextSong');
const favSong = document.querySelector('.favSong');

const songProgress = document.querySelector('.songProgress');
const progressContainer = document.querySelector('.progressContainer');

const audio = document.querySelector('audio');
const file = document.querySelector('#file');
let songIndex = 0;

const songName = document.querySelector('.songName');
const songSinger = document.querySelector('.songSinger');


document.addEventListener('DOMContentLoaded',loadFavMusic)


// add Event Listeners
file.addEventListener('change',song);
playSongButton.addEventListener('click', playingSong)
audio.addEventListener('timeupdate',progressUpdate)
progressContainer.addEventListener('click',seekSong)
favSong.addEventListener('click', addFavMusic);


prevSong.addEventListener('click',() => { song('prev') });
nextSong.addEventListener('click',() => { song('next') });






// Functions
function song(go) {
    if(go === 'next') {
        songIndex++
        favSong.classList.remove('afterFavSong')
    }
    else if(go === 'prev') {
        songIndex--
        favSong.classList.remove('afterFavSong')
    }

    const songs = Array.from(file.files);
    audio.src = `music/${songs[songIndex].name}`;


    const currentFileName = songs[songIndex].name;
    
    songName.innerText = currentFileName.split('-')[1].split('.')[0];
    songSinger.innerText = currentFileName.split('-')[0];

    
    playSong()
    playSongButton.disabled = false;



    favSong.classList.remove('afterFavSong');




    const musicList = localStorage.getItem("music") ? JSON.parse(localStorage.getItem("music")) : [];

    const currentSongName = songName.innerText;
    const currentSongSinger = songSinger.innerText;

    const index = musicList.findIndex(
        item => item.name === currentSongName && item.singer === currentSongSinger
    )

    if(index !== -1){
        favSong.classList.add('afterFavSong')
    }
}


function playingSong(){
    if( playSongIcon.classList.contains('fa-play') ) playSong()
    else pauseSong()
}


function playSong(){
    playSongIcon.classList.remove('fa-play');
    playSongIcon.classList.add('fa-pause');
    playsong_colored.style.animationPlayState = 'running';
    audio.play()
}


function pauseSong() {
    playSongIcon.classList.remove('fa-pause');
    playSongIcon.classList.add('fa-play');
    playsong_colored.style.animationPlayState = 'paused';
    audio.pause()
}


function progressUpdate(ev) {
    const {duration,currentTime} = ev.srcElement;
    songProgress.style.width = currentTime/duration * 243.2;
}


function seekSong(ev){
    const {duration} = audio;
    audio.currentTime = ev.offsetX/243.2 * duration
}


function addFavMusic() {
    favSong.classList.toggle('afterFavSong');

    const musicList = localStorage.getItem("music") ? JSON.parse(localStorage.getItem("music")) : [];
    const currentSongName = songName.innerText;
    const currentSongSinger = songSinger.innerText;

    const index = musicList.findIndex(item => item.name === currentSongName && item.singer === currentSongSinger)

    if(index === -1){
        
        const musicListLocal = {
            name : currentSongName,
            singer : currentSongSinger
        }

        musicList.push(musicListLocal)
    }

    else {
        musicList.splice(index,1);
    }

    localStorage.setItem("music",JSON.stringify(musicList))
}


function loadFavMusic() {
    const musicList = localStorage.getItem("music") ? JSON.parse(localStorage.getItem("music")) : [] ;

    const currentSongName = songName.innerText;
    const currentSongSinger = songSinger.innerText;

    const index = musicList.findIndex(
        item => item.name === currentSongName && item.singer === currentSongSinger
    )

    if(index !== -1){
        favSong.classList.add('afterFavSong')
    }
}