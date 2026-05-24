// ─── COMPLETE BULLET-PROOF SCRIPT ───

let songs = [
    { songName: "Choo Lo (Khada Hu Aaj Bhi)", filePath: "./khada.mp3", coverPath: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400" },
    { songName: "Kalank Title Track", filePath: "./kalank.mp3", coverPath: "https://c.saavncdn.com/784/Kalank-Hindi-2019-20200508163312-500x500.jpg" },
    { songName: "Badtameez Dil", filePath: "./dil.mp3", coverPath: "https://i.ytimg.com/vi/II2EO3Nw4m0/maxresdefault.jpg" },
    { songName: "Kajra Re", filePath: "./kajra.mp3", coverPath: "https://i.ytimg.com/vi/4dsFQFCvVGU/maxresdefault.jpg" },
    { songName: "Dhoom Machale", filePath: "./dhoom.mp3", coverPath: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400" },
    { songName: "Rock Tha Party (Aari Aari)", filePath: "./aari.mp3", coverPath: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=400" },
    { songName: "Nadaan Parinde", filePath: "./nadaan.mp3", coverPath: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=400" },
    { songName: "Kun Faya Kun", filePath: "./kun.mp3", coverPath: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=400" } 
];

let songIndex = 0;
let audioelement = new Audio(songs[songIndex].filePath);

function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    if (sec < 10) { sec = "0" + sec; }
    return min + ":" + sec;
}

window.onload = function() {
    console.log("DOGE-IFY Multitrack Engine Loaded!");

    let playBtn = document.getElementById('play-btn');
    let playIcon = document.getElementById('play-icon');
    let prevBtn = document.getElementById('prev-btn');
    let nextBtn = document.getElementById('next-btn');
    let progressBar = document.querySelector('.custom-slider');
    
    let currentTimeLabel = document.getElementById('current-time');
    let totalDurationLabel = document.getElementById('total-duration');

    let currentCover = document.getElementById('current-cover');
    let currentTitle = document.getElementById('current-title');
    let currentArtist = document.getElementById('current-artist');

    // 1. CHANGE TRACK FUNCTION (Yeh isi window.onload ke andar hona chahiye)
    function changeTrack() {
        audioelement.pause();
        audioelement.src = "./" + songs[songIndex].filePath;
        audioelement.currentTime = 0;
        
        // Agar HTML me IDs hain toh text aur cover badlega, nahi toh crash nahi hoga
        if (currentTitle) currentTitle.innerText = songs[songIndex].songName.toUpperCase();
        if (currentArtist) currentArtist.innerText = "PLAYING FROM PLAYLIST"; 
        if (currentCover) currentCover.src = songs[songIndex].coverPath;

        audioelement.play();
        if (playIcon) playIcon.innerHTML = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>`;
    }

    // 2. PLAY / PAUSE BUTTON
    playBtn.addEventListener('click', function() {
        if (audioelement.paused || audioelement.currentTime <= 0) {
            audioelement.play();
            if (playIcon) playIcon.innerText = "▶"; // Play ka symbol
        } else {
            audioelement.pause();
            if (playIcon) playIcon.innerText = "⏸"; // Pause ka symbol
        }
    });

    // 3. NEXT BUTTON
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (songIndex >= songs.length - 1) { songIndex = 0; } 
            else { songIndex += 1; }
            changeTrack();
        });
    }

    // 4. PREVIOUS BUTTON
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (songIndex <= 0) { songIndex = songs.length - 1; } 
            else { songIndex -= 1; }
            changeTrack();
        });
    }

    // 5. PROGRESS BAR UPDATE
    audioelement.addEventListener('timeupdate', function() {
        if (!isNaN(audioelement.duration)) {
            let progress = parseInt((audioelement.currentTime / audioelement.duration) * 100);
            progressBar.value = progress;
            if (currentTimeLabel) currentTimeLabel.innerText = formatTime(audioelement.currentTime);
            if (totalDurationLabel) totalDurationLabel.innerText = formatTime(audioelement.duration);
        }
    });

    // 6. SEEK CONTROL
    progressBar.addEventListener('change', function() {
        if (!isNaN(audioelement.duration)) {
            audioelement.currentTime = (progressBar.value * audioelement.duration) / 100;
        }
    });

    // 7. AUTO-INDEX PLAYLIST CLICK LOGIC
    let songItems = document.querySelectorAll('.song-item');
    songItems.forEach(function(element, index) {
        element.addEventListener('click', function() {
            songIndex = index; 
            changeTrack();
            console.log("SUCCESS! Playing song index: " + songIndex);
        });
    });
};
