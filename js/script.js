const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const progress = document.getElementById('progress');

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
    }
});

audio.addEventListener('timeupdate', () => {
    progress.value = (audio.currentTime / audio.duration) * 100;
});

progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

const audios = [
    document.getElementById('audio-0'),
    document.getElementById('audio-1'),
    // agrega más si tienes más pistas
];

let currentIndex = null;

const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const volumeSlider = document.getElementById('volumeSlider');

function selectTrack(index) {
    if (currentIndex !== null && currentIndex !== index) {
        audios[currentIndex].pause();
        audios[currentIndex].currentTime = 0;
    }
    currentIndex = index;
    playAudio();
}

function playAudio() {
    const audio = audios[currentIndex];
    if (!audio) return;

    if (audio.paused) {
        audio.volume = volumeSlider.value;
        audio.play();
        playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
    } else {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
    }
}

playPauseBtn.addEventListener('click', () => {
    if (currentIndex === null) return;
    playAudio();
});

prevBtn.addEventListener('click', () => {
    if (currentIndex === null) return;
    audios[currentIndex].pause();
    audios[currentIndex].currentTime = 0;
    currentIndex = (currentIndex - 1 + audios.length) % audios.length;
    audios[currentIndex].volume = volumeSlider.value;
    audios[currentIndex].play();
    playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
});

nextBtn.addEventListener('click', () => {
    if (currentIndex === null) return;
    audios[currentIndex].pause();
    audios[currentIndex].currentTime = 0;
    currentIndex = (currentIndex + 1) % audios.length;
    audios[currentIndex].volume = volumeSlider.value;
    audios[currentIndex].play();
    playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
});

volumeSlider.addEventListener('input', () => {
    if (currentIndex !== null) {
        audios[currentIndex].volume = volumeSlider.value;
    }
});

document.getElementById('searchInput').addEventListener('input', function() {
    const filter = this.value.toLowerCase();
    const cards = document.querySelectorAll('.grid .card');

    cards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        if (title.includes(filter)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

const toggleBtn = document.getElementById('searchToggle');
const searchContainer = document.getElementById('searchContainer');
const searchInput = document.getElementById('searchInput');

toggleBtn.addEventListener('click', () => {
    const isActive = searchContainer.classList.contains('active');
    if (!isActive) {
        searchContainer.classList.add('active');
        searchContainer.setAttribute('aria-hidden', 'false');
        searchInput.focus();
    } else {
        searchContainer.classList.remove('active');
        searchContainer.setAttribute('aria-hidden', 'true');
        searchInput.value = '';
    }
});

// Opcional: cerrar buscador si clic fuera de él
document.addEventListener('click', (e) => {
    if (!searchContainer.contains(e.target) && !toggleBtn.contains(e.target)) {
        if (searchContainer.classList.contains('active')) {
            searchContainer.classList.remove('active');
            searchContainer.setAttribute('aria-hidden', 'true');
            searchInput.value = '';
        }
    }
});