import "./style.css";

let timeElapsedMs = 0;
let previousTimestamp;

let countdownMilliseconds = 10000;

const startCountdownButton = document.getElementById("start-countdown");
const pauseCountdownButton = document.getElementById("pause-countdown");
const resumeCountdownButton = document.getElementById("resume-countdown");
const resetCountdownButton = document.getElementById("reset-countdown");
const countdownInput = document.getElementById("countdown-input");
const countdown = document.getElementById("countdown");
const countdownChanges = document.getElementById("countdown-changes");

// Takes milliseconds and returns it in the form of
// seconds.milliseconds
function formatMilliseconds(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  // Getting the first 2 digits
  const remainingMilliseconds = Math.floor((milliseconds % 1000) / 10);

  const paddedMilliseconds = ("00" + remainingMilliseconds.toString()).slice(
    -2
  );

  return `${seconds}.${paddedMilliseconds}`;
}

let countdownInterval;
function stopCountdown() {
  clearInterval(countdownInterval);
}

function updateCountdown() {
  const currentTimestamp = new Date().getTime();
  timeElapsedMs += currentTimestamp - previousTimestamp;
  previousTimestamp = currentTimestamp;
  if (timeElapsedMs > countdownMilliseconds) {
    stopCountdown();
    countdown.innerText = "0.00";
  } else {
    const countdownString = formatMilliseconds(
      countdownMilliseconds - timeElapsedMs
    );

    countdown.innerText = countdownString;
  }
}

function startCountdownInterval() {
  countdownInterval = setInterval(() => {
    updateCountdown();
  }, 4);
}

function startCountdown() {
  startCountdownButton.style.display = "none";
  pauseCountdownButton.style.display = "block";
  countdownChanges.style.display = "none";
  resetCountdownButton.style.display = "block";

  timeElapsedMs = 0;
  previousTimestamp = new Date().getTime();
  startCountdownInterval();
}

function resumeCountdown() {
  resumeCountdownButton.style.display = "none";
  pauseCountdownButton.style.display = "block";
  resetCountdownButton.style.display = "block";

  previousTimestamp = new Date().getTime();
  startCountdownInterval();
}

function pauseCountdown() {
  pauseCountdownButton.style.display = "none";
  resumeCountdownButton.style.display = "block";
  resetCountdownButton.style.display = "block";

  clearInterval(countdownInterval);
}

function resetCountdown() {
  stopCountdown();
  startCountdownButton.style.display = "block";
  pauseCountdownButton.style.display = "none";
  resumeCountdownButton.style.display = "none";
  resetCountdownButton.style.display = "none";
  countdownChanges.style.display = "block";
  timeElapsedMs = 0;
  updateCountdownDisplay();
}

startCountdownButton.addEventListener("click", () => {
  startCountdown();
});

pauseCountdownButton.addEventListener("click", () => {
  pauseCountdown();
});

resumeCountdownButton.addEventListener("click", () => {
  resumeCountdown();
});

resetCountdownButton.addEventListener("click", () => {
  resetCountdown();
});

countdown.innerText = Math.floor(countdownMilliseconds / 1000);

function updateCountdownDisplay() {
  countdown.innerText = Math.floor(countdownMilliseconds / 1000);
}

countdownInput.value = Math.floor(countdownMilliseconds / 1000);
countdownInput.addEventListener("input", () => {
  let value = countdownInput.value;
  if (Number(value) < 0) {
    countdownInput.value = 0;
    value = 0;
  }
  countdownMilliseconds = value * 1000;
  updateCountdownDisplay();
});
