console.log("Welcome to Spotify");

//Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let mastersongName = document.getElementById('mastersongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    { songName: "Maa tujhe Salam", filePath: "songs/1.mp3", CoverPath: "covers/bg.jpg" },
    { songName: "song2", filePath: "songs/2.mp3", CoverPath: "covers/2.jpg" },
    { songName: "song3", filePath: "songs/3.mp3", CoverPath: "covers/3.jpg" },
    { songName: "song4", filePath: "songs/4.mp3", CoverPath: "covers/4.jpg" },
    { songName: "song5", filePath: "songs/5.mp3", CoverPath: "covers/5.jpg" },
    { songName: "song6", filePath: "songs/6.mp3", CoverPath: "covers/6.jpg" },
    { songName: "song7", filePath: "songs/7.mp3", CoverPath: "covers/7.jpg" },
    { songName: "song8", filePath: "songs/8.mp3", CoverPath: "covers/8.jpg" },
    { songName: "song9", filePath: "songs/9.mp3", CoverPath: "covers/9.jpg" }
];
//audioElement.play();

const makeAllplay = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.src = 'palyb.png';
    });
};

songItem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].CoverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterplay.src = 'pause.png';
        gif.style.opacity = 1;
    }

    else {
        audioElement.pause();
        masterplay.src = 'palyb.png';
        gif.style.opacity = 0;
        makeAllplay();
    }
});

function formateDuration(time) {
    let seconds = Math.floor(time % 60);
    let minutes = Math.floor(time / 60) % 60;
    let hours = Math.floor(time / 3600);

    if (seconds < 10) {
        return `0${minutes}:0${seconds}`;
    }

    else {
        return `0${minutes}:${seconds}`;
    }
}

audioElement.addEventListener('timeupdate', () => {
    //update seedbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
    currentTime.innerText = formateDuration(audioElement.currentTime);
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})




Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {



        if (e) {
            audioElement.pause();
            gif.style.opacity = 0;
            masterplay.src = 'palyb.png';
            e.target.src = 'palyb.png';
        }

        songIndex = parseInt(e.target.id);
        console.log(e.target);
        makeAllplay();
        e.target.src = 'pause.png';
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        mastersongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterplay.src = 'pause.png';
        console.log(audioElement.duration);

    });
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex > 4) {
        songIndex = 0;
    }

    else {
        songIndex += 1;
    }

    audioElement.src = `songs/${songIndex + 1}.mp3`;
    mastersongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    makeAllplay();
    document.getElementById(`${songIndex}`).src = "pause.png";
    gif.style.opacity = 1;
    masterplay.src = 'pause.png';

});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex < 0) {
        songIndex = 5;
    }

    else {
        songIndex -= 1;
    }

    audioElement.src = `songs/${songIndex + 1}.mp3`;
    mastersongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterplay.src = 'pause.png';

});