// Quick Quiz – with Timer + Randomization

// --- Questions ---
// You can edit this array to make your own quiz!
const QUESTIONS = [
  {
    question:  "What is the chemical symbol for gold?",
    choices:["Ag", "Au", "Gd", "Go"],
    answer: 1
  },
  {
    question: "What does CSS stand for?",
    choices: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"],
    answer: 1
  },
  {
    question: "What does HTML stand for?",
    choices: ["Hypertext Markup Language", "Hypertext Markdown Language", "Hyperloop Machine Language", "Helicopters Terminals Motorboats Lamborghinis"],
    answer: 1
  },
  {
    question: "Which organ in the human body is primarily responsible for detoxification?",
    choices: ["Lungs", "Liver", "Kidneys", "Stomach"],
    answer: 1
  },
  {
    question:  "What is the speed of light in vacuum?",
    choices:["3 × 10^6 m/s", "3 × 10^7 m/s", "3 × 10^8 m/s", "3 × 10^9 m/s"],
    answer: 2
  }
];

// --- State ---
let questions = []; // will hold randomized questions
let current = 0;
let score = 0;
let timer = null;
let timeLeft = 15; // seconds per question

// --- Elements ---
const startScreen   = document.getElementById('start-screen');
const quizScreen    = document.getElementById('quiz-screen');
const resultScreen  = document.getElementById('result-screen');

const questionNumber = document.getElementById('question-number');
const questionTotal  = document.getElementById('question-total');
const questionText   = document.getElementById('question-text');
const choicesList    = document.getElementById('choices');
const scorePill      = document.getElementById('score-pill');
const progressBar    = document.getElementById('progress-bar');

const startBtn    = document.getElementById('start-btn');
const nextBtn     = document.getElementById('next-btn');
const restartBtn  = document.getElementById('restart-btn');
const playAgainBtn= document.getElementById('play-again-btn');
const resultSummary = document.getElementById('result-summary');
const shareLink = document.getElementById('share-link');

// Create and show timer UI
const timerPill = document.createElement('span');
timerPill.className = 'pill';
timerPill.id = 'timer-pill';
timerPill.textContent = `Time: ${timeLeft}`;
document.querySelector('.status').appendChild(timerPill);

// --- Helpers ---
function show(el)  { el.classList.remove('hidden'); }
function hide(el)  { el.classList.add('hidden'); }
function disable(el){ el.setAttribute('disabled', ''); }
function enable(el) { el.removeAttribute('disabled'); }

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function updateProgress() {
  const pct = Math.round((current / questions.length) * 100);
  progressBar.style.width = pct + '%';
}

function renderQuestion() {
  if (timer) clearInterval(timer);
  timeLeft = 15;
  timerPill.textContent = `Time: ${timeLeft}`;

  const q = questions[current];
  questionNumber.textContent = (current + 1).toString();
  questionTotal.textContent  = questions.length.toString();
  questionText.textContent   = q.question;
  choicesList.innerHTML = '';

  q.choices.forEach((choice, idx) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.className = 'choice';
    btn.textContent = choice;
    btn.addEventListener('click', () => handleChoice(idx));
    li.appendChild(btn);
    choicesList.appendChild(li);
  });

  disable(nextBtn);
  scorePill.textContent = `Score: ${score}`;
  updateProgress();

  // start countdown
  timer = setInterval(() => {
    timeLeft--;
    timerPill.textContent = `Time: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      handleChoice(-1); // timeout acts like wrong answer
    }
  }, 1000);
}

function handleChoice(idx) {
  const q = questions[current];
  const buttons = Array.from(document.querySelectorAll('.choice'));
  buttons.forEach(b => disable(b));
  const correctIdx = q.answer;

  if (idx >= 0) {
    buttons[idx].classList.add(idx === correctIdx ? 'correct' : 'wrong');
  }
  buttons[correctIdx].classList.add('correct');

  if (idx === correctIdx) score++;
  scorePill.textContent = `Score: ${score}`;
  enable(nextBtn);

  if (timer) clearInterval(timer);
}

function startQuiz() {
  current = 0;
  score = 0;
  questions = shuffleArray([...QUESTIONS]); // copy and shuffle
  hide(startScreen);
  hide(resultScreen);
  show(quizScreen);
  renderQuestion();
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    renderQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  hide(quizScreen);
  show(resultScreen);
  if (timer) clearInterval(timer);
  const pct = Math.round((score / questions.length) * 100);
  resultSummary.textContent = `You scored ${score} out of ${questions.length} (${pct}%).`;
  shareLink.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent('I scored ' + pct + '% on Quick Quiz!')}`;
}

function restartQuiz() {
  startQuiz();
}

// --- Events ---
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);
playAgainBtn.addEventListener('click', restartQuiz);

// Focus main for accessibility after load
window.addEventListener('load', () => {
  document.getElementById('app').focus();
});
