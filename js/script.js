let root = document.documentElement;
const pomodoro = document.querySelector(".pomodoro-tab");
const shortBreak = document.querySelector(".short-tab");
const longBreak = document.querySelector(".long-tab");
const clockMins = document.querySelector(".clock-mins");
const clockSecs = document.querySelector(".clock-secs");
let pomodoroLengthFix = 25 * 60;
let shortLengthFix = 5 * 60;
let longLengthFix = 15 * 60;
let pomodoroLength = 25 * 60;
let shortLength = 5 * 60;
let longLength = 15 * 60;

const clockOptions = document.querySelectorAll(".clock-option");
clockOptions.forEach((option) =>
  option.addEventListener("click", function () {
    clockOptions.forEach((opt) => {
      if (opt.classList.contains("active")) {
        opt.classList.remove("active");
      }
    });
    this.classList.add("active");
  })
);

const openModal = document.querySelector(".settings-icon");
const modal = document.querySelector(".settings-modal");
openModal.addEventListener("click", function () {
  modal.classList.add("active");
});

const closeModal = document.querySelector(".settings-close");
closeModal.addEventListener("click", () => modal.classList.remove("active"));

// zbog lenjosti da se prati stajling resenje inputa sa gugla :/
const tUp = document.querySelector(".time-up");
const sUp = document.querySelector(".short-up");
const lUp = document.querySelector(".long-up");
const tDown = document.querySelector(".time-down");
const sDown = document.querySelector(".short-down");
const lDown = document.querySelector(".long-down");

const t = document.querySelector(".time-value");
const s = document.querySelector(".short-value");
const l = document.querySelector(".long-value");

function incrementTime() {
  if (+t.textContent + 1 > 60) return;
  t.textContent = +t.textContent + 1;
}
function incrementShort() {
  if (+s.textContent + 1 > 10) return;
  s.textContent = +s.textContent + 1;
}
function incrementLong() {
  if (+l.textContent + 1 > 25) return;
  l.textContent = +l.textContent + 1;
}
function decrementTime() {
  if (+t.textContent - 1 < 15) return;
  t.textContent = +t.textContent - 1;
}
function decrementShort() {
  if (+s.textContent - 1 < 1) return;
  s.textContent = +s.textContent - 1;
}
function decrementLong() {
  if (+l.textContent - 1 < 11) return;
  l.textContent = +l.textContent - 1;
}
tUp.addEventListener("click", incrementTime);
sUp.addEventListener("click", incrementShort);
lUp.addEventListener("click", incrementLong);
tDown.addEventListener("click", decrementTime);
sDown.addEventListener("click", decrementShort);
lDown.addEventListener("click", decrementLong);

const boxesFont = document.querySelectorAll(".choose-font");
boxesFont.forEach((box) =>
  box.addEventListener("click", function () {
    boxesFont.forEach((box) => {
      if (box.classList.contains("active")) {
        box.classList.remove("active");
      }
    });
    this.classList.add("active");
  })
);

const boxesColor = document.querySelectorAll(".choose-color");
boxesColor.forEach((box) =>
  box.addEventListener("click", function () {
    boxesColor.forEach((box) => {
      if (box.classList.contains("active")) {
        box.classList.remove("active");
      }
    });
    this.classList.add("active");
  })
);

const confirmSettings = document.querySelector(".settings-btn button");

confirmSettings.addEventListener("click", function () {
  let chosenFont = "";
  let chosenColor = "";
  pomodoroLength = t.textContent * 60;
  pomodoroLengthFix = t.textContent * 60;
  shortLength = s.textContent * 60;
  shortLengthFix = s.textContent * 60;
  longLength = l.textContent * 60;
  longLengthFix = l.textContent * 60;
  boxesFont.forEach((box) => {
    if (box.classList.contains("active")) {
      chosenFont = window
        .getComputedStyle(box, null)
        .getPropertyValue("font-family");
    }
  });
  boxesColor.forEach((box) => {
    if (box.classList.contains("active")) {
      chosenColor = window
        .getComputedStyle(box, null)
        .getPropertyValue("background-color");
    }
  });
  root.style.setProperty("--font", chosenFont);
  root.style.setProperty("--color", chosenColor);
  root.style.setProperty("--degree", "0deg");
  modal.classList.remove("active");
  clockMins.textContent = pomodoroLength;
  clockOptions.forEach((opt) => {
    if (opt.classList.contains("active")) {
      opt.classList.remove("active");
    }
  });
  pomodoro.classList.add("active");
  formatMinsSecs(pomodoroLength);
  clearInterval(pomodoroTimer);
  clearInterval(shortTimer);
  clearInterval(longTimer);
});

pomodoro.addEventListener("click", function () {
  formatMinsSecs(pomodoroLength);
});

shortBreak.addEventListener("click", function () {
  formatMinsSecs(shortLength);
});

longBreak.addEventListener("click", function () {
  formatMinsSecs(longLength);
});

window.addEventListener("load", function () {
  formatMinsSecs(pomodoroLength);
});

const play = document.querySelector(".pause-text");
const playText = document.querySelector(".pause-text small");
let pomodoroTab = true;
let pomodoroTimer;
let pomodoroStop = false;
let shortTab = false;
let shortTimer;
let shortStop = false;
let longTab = false;
let longTimer;
let longStop = false;

play.addEventListener("click", function () {
  if (pomodoroTab) {
    if (pomodoroStop) {
      clearInterval(pomodoroTimer);
      pomodoroStop = false;
      playText.textContent = "P L A Y";
    } else {
      pomodoroTimer = setInterval(function () {
        pomodoroLength = pomodoroLength - 1;
        formatMinsSecs(pomodoroLength);
        makeBorder(pomodoroLengthFix, pomodoroLength);
      }, 1000);
      pomodoroStop = true;
      playText.textContent = "P A U S E";
    }
  } else if (shortTab) {
    if (shortStop) {
      clearInterval(shortTimer);
      shortStop = false;
      playText.textContent = "P L A Y";
    } else {
      shortTimer = setInterval(function () {
        shortLength = shortLength - 1;
        formatMinsSecs(shortLength);
        makeBorder(shortLengthFix, shortLength);
      }, 1000);
      shortStop = true;
      playText.textContent = "P A U S E";
    }
  } else if (longTab) {
    if (longStop) {
      clearInterval(longTimer);
      longStop = false;
      playText.textContent = "P L A Y";
    } else {
      longTimer = setInterval(function () {
        longLength = longLength - 1;
        formatMinsSecs(longLength);
        makeBorder(shortLengthFix, shortLength);
      }, 1000);
      longStop = true;
      playText.textContent = "P A U S E";
    }
  }
});

pomodoro.addEventListener("click", function () {
  pomodoroTab = true;
  shortTab = false;
  longTab = false;
  clearInterval(pomodoroTimer);
  clearInterval(shortTimer);
  clearInterval(longTimer);
  pomodoroStop = false;
  shortStop = false;
  longStop = false;
  playText.textContent = "P L A Y";
  makeBorder(pomodoroLengthFix, pomodoroLength);
});

shortBreak.addEventListener("click", function () {
  pomodoroTab = false;
  shortTab = true;
  longTab = false;
  clearInterval(pomodoroTimer);
  clearInterval(shortTimer);
  clearInterval(longTimer);
  pomodoroStop = false;
  shortStop = false;
  longStop = false;
  playText.textContent = "P L A Y";
  makeBorder(shortLengthFix, shortLength);
});

longBreak.addEventListener("click", function () {
  pomodoroTab = false;
  shortTab = false;
  longTab = true;
  clearInterval(pomodoroTimer);
  clearInterval(shortTimer);
  clearInterval(longTimer);
  pomodoroStop = false;
  shortStop = false;
  longStop = false;
  playText.textContent = "P L A Y";
  makeBorder(longLengthFix, longLength);
});

function formatMinsSecs(timeInSeconds) {
  if (timeInSeconds < 0) {
    return;
  }
  const mins = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds - mins * 60;
  clockMins.textContent = mins;
  clockSecs.textContent = seconds < 10 ? "0" + seconds : seconds;
}

// --degree: 0deg; procenat proteklih sekundi od startnih
// taj procenat od 360

function makeBorder(timeFixed, timePassed) {
  let percent = timePassed / timeFixed;
  root.style.setProperty("--degree", `${360 - Math.floor(percent * 360)}deg`);
}
