// Глобальні змінні для таймера
let timerInterval;
let sessionTime = 0;
let elapsedTime = 0;
let startTime, endTime;

// Функція для старту таймера
function startTimer() {
  // Отримуємо значення введеного часу з поля вводу
  const sessionTimeInput = document.getElementById("sessionTimeInput");
  sessionTime = parseInt(sessionTimeInput.value) * 60; // Переводимо хвилини в секунди

  // Перевіряємо, чи введено дійсне значення часу
  if (isNaN(sessionTime) || sessionTime <= 0) {
    alert("Please enter a valid session time.");
    return;
  }

  // Отримуємо ім'я сеансу
  const sessionNameInput = document.getElementById("sessionNameInput");
  const sessionName = sessionNameInput.value || "Unknown Session";

  // Встановлюємо ім'я сеансу
  document.getElementById("timerDisplay").textContent = sessionName;

  // Запам'ятовуємо час початку
  startTime = new Date();

  // Запускаємо таймер
  timerInterval = setInterval(updateTimer, 1000);
}

// Функція для оновлення таймера
function updateTimer() {
  if (elapsedTime >= sessionTime) {
    // Досягнуто кінця сеансу
    clearInterval(timerInterval);
    alert("Session completed!");
    // Отримуємо час завершення
    endTime = new Date(startTime.getTime() + sessionTime * 1000);
    // Оновлюємо графу End Time
    document.getElementById("endTime").textContent = endTime.toLocaleTimeString();
    return;
  }

  // Оновлюємо таймер
  const minutes = Math.floor((sessionTime - elapsedTime) / 60);
  const seconds = (sessionTime - elapsedTime) % 60;
  const timerDisplay = document.getElementById("timerDisplay");
  timerDisplay.textContent = formatTime(minutes) + ":" + formatTime(seconds);

  elapsedTime++;

  // Отримуємо час завершення на основі початкового часу таймера та тривалості
  const endTime = new Date(startTime.getTime() + sessionTime * 1000);
  document.getElementById("endTime").textContent = endTime.toLocaleTimeString();
}

// Функція для призупинки таймера
function pauseTimer() {
  clearInterval(timerInterval);
}

// Функція для продовження таймера
function resumeTimer() {
  timerInterval = setInterval(updateTimer, 1000);
}

// Функція для зупинки таймера
function stopTimer() {
  clearInterval(timerInterval);
  document.getElementById("timerDisplay").textContent = "00:00";
  elapsedTime = 0;
}

// Функція для форматування часу
function formatTime(time) {
  return time < 10 ? "0" + time : time;
}

// Функція для збереження сесії
function saveSession() {
  const sessionName = document.getElementById("sessionNameInput").value || "Unknown Session";

  // Оновлюємо таблицю сесій
  const sessionTable = document.getElementById("sessionTable");
  const row = sessionTable.insertRow(-1);
  const nameCell = row.insertCell(0);
  const startCell = row.insertCell(1);
  const endCell = row.insertCell(2);

  nameCell.textContent = sessionName;
  startCell.textContent = startTime.toLocaleTimeString();
  endCell.textContent = new Date(startTime.getTime() + sessionTime * 1000).toLocaleTimeString();;
}

// Отримуємо потрібні елементи з DOM
const sessionNameInput = document.getElementById("sessionNameInput");

// Отримання посилання на кнопку та додавання обробника події
const startTimerButton = document.getElementById("startTimer");
startTimerButton.addEventListener("click", startTimer);

const saveSessionButton = document.getElementById("saveSession");
saveSessionButton.addEventListener("click", saveSession);
