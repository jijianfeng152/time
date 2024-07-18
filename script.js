// script.js
const currentTimeElement = document.getElementById('current-time');
const countdownTimeElement = document.getElementById('countdown-time');
const startCountdownButton = document.getElementById('start-countdown');
const daysInput = document.getElementById('days');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const millisecondsInput = document.getElementById('milliseconds');
const audio = document.getElementById('audio');
const themeToggle = document.getElementById('theme-toggle');

let countdownInterval;

function updateCurrentTime() {
    const now = new Date();
    currentTimeElement.textContent = now.toLocaleTimeString();
}

function startCountdown() {
    const days = parseInt(daysInput.value, 10);
    const hours = parseInt(hoursInput.value, 10);
    const minutes = parseInt(minutesInput.value, 10);
    const seconds = parseInt(secondsInput.value, 10);
    const milliseconds = parseInt(millisecondsInput.value, 10);

    let totalMilliseconds = (days * 24 * 60 * 60 * 1000) + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000) + milliseconds;

    audio.play();

    countdownInterval = setInterval(() => {
        if (totalMilliseconds <= 0) {
            clearInterval(countdownInterval);
            audio.pause();
            countdownTimeElement.textContent = '00:00:00:000';
            return;
        }

        totalMilliseconds -= 10;
        const timeLeft = new Date(totalMilliseconds);
        const daysLeft = Math.floor(totalMilliseconds / (24 * 60 * 60 * 1000));
        const hoursLeft = timeLeft.getUTCHours();
        const minutesLeft = timeLeft.getUTCMinutes();
        const secondsLeft = timeLeft.getUTCSeconds();
        const millisecondsLeft = timeLeft.getUTCMilliseconds();

        countdownTimeElement.textContent = `${daysLeft.toString().padStart(2, '0')}:${hoursLeft.toString().padStart(2, '0')}:${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}:${millisecondsLeft.toString().padStart(3, '0')}`;

        if (totalMilliseconds <= (totalMilliseconds / 2)) {
            countdownTimeElement.style.color = 'darkyellow';
        }
        if (totalMilliseconds <= (totalMilliseconds / 5)) {
            countdownTimeElement.style.color = 'red';
        }
    }, 10);
}

startCountdownButton.addEventListener('click', startCountdown);
themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-theme', themeToggle.checked);
});

setInterval(updateCurrentTime, 1000);
updateCurrentTime();
